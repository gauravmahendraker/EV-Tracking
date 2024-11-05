

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

// Redis setup
const redisClient = createClient(); // Create Redis client for publishing
const redisSubscriber = createClient(); // Create Redis client for subscribing

redisClient.connect();
redisSubscriber.connect();

redisClient.on('error', (err) => console.error('Redis client error:', err));
redisSubscriber.on('error', (err) => console.error('Redis subscriber error:', err));

// Use Redis as the adapter for Socket.IO
io.adapter(createAdapter(redisClient, redisSubscriber));

// Middleware setup
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


const indexRouter = require('./routes/index');
const driverRouter = require('./routes/drivers');
const adminRouter = require('./routes/admin');


const uri = "mongodb+srv://mahendrakergaurav:gauravaryasonakshi@cluster0.cdycnzq.mongodb.net/test1?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((e) => console.error('MongoDB connection error:', e));


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendLocation', (location) => {
        redisClient.publish('driverLocation', JSON.stringify(location));
    });
});


redisSubscriber.subscribe('driverLocation', (message) => {
    const location = JSON.parse(message);
    io.emit('driverLocation', location);
});

// Routes
app.use('/', indexRouter);
app.use('/drivers', driverRouter);
app.use('/admin', adminRouter);

// Start the server
server.listen(process.env.PORT || 3001, () => {
    console.log('Server running at http://localhost:3001');
});
