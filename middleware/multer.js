
require('dotenv').config();

var acessKey = process.env.AWS_SECRET_ACCESS_KEY;
var accessId = process.env.AWS_ACCESS_KEY_ID;

var express = require('express'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: acessKey,
    accessKeyId: accessId,
    region: 'eu-west-2'
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    }
    else {
        callback('invalid file')
    }
}

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'fundoobucket',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TEST" });
        },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now().toString()); // Date.now() for unique file keys
        }
    })
});

module.exports = upload;
