const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const app = express();
const router = require('./router/router.js');
const noteRouter = require('./router/noteRouter');
const cors = require('cors');
app.use(cors());

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/', router);
app.use('/note', noteRouter);



const connection = require('./configuration/dbConfiguration.js');
app.use(bodyParser.urlencoded({ extended: true }))


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

    next();
});


var server = app.listen(process.env.PORT, () => {
    console.log("server listening on port ", process.env.PORT);
    connection.dbConnection();
});


module.exports = app;