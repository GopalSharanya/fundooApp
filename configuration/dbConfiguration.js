// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const express = require('express');
// // const app = express();
// require('dotenv').config();
// // const bodyParser = require('body-parser');

// // app.use(bodyParser.urlencoded({ extended: true }));


// const connection = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connection.on('connected', () => {
//   console.log('connected to mongodb');
//   // process.exit();
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('connection disconnected');

//   process.exit();
// });

// mongoose.connection.on("error",()=>{
// console.log("error in connecting data base")
// process.exit();
// })




require('dotenv').config()
const mongoose = require('mongoose');

exports.dbConnection = () => {

    var db = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connection.on("connected", () => {
        console.log("Succesfully connected to Database")
    })
    mongoose.connection.on("disconnected", () => {
        console.log("Could not connect to the database ");
        process.exit();
    })

    mongoose.connection.on("error", () => {
        console.log("Error in Connecting to Database");
        process.exit(1)
    })

}