/**
 * modules to be imported
 */
const model = require('../model/model');
const bcrypt = require('bcrypt');


/**
 * @module register
 * @param {req} - request from user contains user information to be added
 * @param {res}- response to be sent back to client
 */

exports.register = (req, callback) => {

    model.find({
        "email": req.body.email
    }, (err, data) => {
        if (err) {
            callback("user exist")
        }
        else if (data.length > 0) {
            callback("email exists")
        }
        else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                var newRegister = new model({
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "email": req.body.email,
                    "password": hash
                })
                newRegister.save((err, data) => {
                    console.log("not here")
                    if (err) {

                        callback(err)
                    }
                    else {
                        console.log("data sucefully created user", data)
                        callback(null, data);
                    }
                })
            })
        }
    })
}

/**
 * @module login
 * @param {req} - request from user contains user information to login
 * @param {res}- response to be sent back to client
 */

exports.login = (req, callback) => {
    model.find({
        "email": req.body.email
    }, (err, data1) => {
        if (err) {
            callback(err)
        }
        else {

            function hashing(pass) {
                var hash = bcrypt.hash(pass, 10);
                return (hash);
            }
            bcrypt.compare(data1[0].password, req.body.password, function (err, data) {
                if (err) {
                    callback(err)
                }
                else {
                    callback(null, data1);
                }
            })

        }
    })
}

/**
 * @module forgotPassword
 * @param {req} - request from user contains user information to reset forgotPassword
 * @param {res}- response to be sent back to client
 */

exports.forgotPassword = (req, callback) => {
    model.find({
        "email": req.body.email
    },
        (err, data) => {
            if (data) {
                callback(null, data);
            }
            else {
                callback("email doesnt exist");
            }
        })
}


/**
 * @module resetpassword
 * @param {req} - request from user contains user information to reset password
 * @param {res}- response to be sent back to client
 */

exports.resetpassword = (req, callback) => {

    bcrypt.hash(req.body.confirmpassword, 10, (err, data) => {
        model.updateOne(
            { "email": req.body.email },
            {
                password: data
            }, (err, data) => {
                if (data) {
                    callback(null, data);

                }
                else {
                    callback("error");
                }
            }
        )
    })
}

