

// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').parse()
// }

const express= require('express')
const app= express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const expressLayouts = require('express-ejs-layouts')
// const bodyParser = require('body-parser')
// var http = require('node:http');
var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/assets'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const indexRouter = require('./routes/index')
const driverRouter = require('./routes/drivers')
const adminRouter = require('./routes/admin')

app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
// app.use(bodyParser.urlencoded({limit:'10mb',extended: false}))
// app.locals.http = http

 const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true})

// const db= mongoose.connection

// db.on('error', error=>console.log(error))
// db.once('open',()=>console.log('Connected to Datbase'))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('sendLocation',(location)=>{
      //  console.log(location)
        var loc = location
        socket.broadcast.emit("driverLocation",loc)
    })
  });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mahendrakergaurav:gauravaryasonakshi@cluster0.cdycnzq.mongodb.net/test1?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// }).then(()=>console.log('connected to mongodb'))
// .catch(e=>console.log(e));
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("connected"))
mongoose.connect(uri,{
    useNewUrlParser: true,
   
    useUnifiedTopology: true
});

app.use('/', indexRouter)
app.use('/drivers',driverRouter)
app.use('/admin',adminRouter)


server.listen( process.env.PORT || 3001)
// app.listen(3000)

 console.log('Server running at http://localhost:3001');