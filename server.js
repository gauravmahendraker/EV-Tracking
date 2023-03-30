// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').parse()
// }

const express= require('express')
const app= express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true})

// const db= mongoose.connection

// db.on('error', error=>console.log(error))
// db.once('open',()=>console.log('Connected to Datbase'))

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://mahendrakergaurav:gauravaryasonakshi@cluster0.cdycnzq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use('/', indexRouter)
app.listen( process.env.PORT || 3000)
// app.listen(3000)

 console.log('Server running at http://localhost:3000');