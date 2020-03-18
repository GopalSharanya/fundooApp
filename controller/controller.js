/**
 * imports the required modules
 */
const service = require('../services/service.js')
const token = require('../middleware/token')
const mailer = require('../middleware/nodemailer')

/**
 * @module registers members
 * @param {req} - request from user contains all the information for registering the person
 * @param {res}- response to be sent back to client
 */

try{
exports.register = (req, res) => {
    req.checkBody("firstName", "firstName is not valid").isAlpha().not().isEmpty();
    req.checkBody("lastName", "lastName is not valid").isAlpha().not().isEmpty();
    req.checkBody("email", "email not valid").isEmail().not().isEmpty();
    req.checkBody("password", "password not valid").len(8, 13);

    var error = req.validationErrors();
    var response = {};

    if (error) {

        response.data = error;
        response.sucess = false
        res.status(422).send(response);
    }
    else {
        service.register(req, (err, data) => {
            if (err) {
                response.data = err
                response.sucess = false
                res.status(422).send(response)
            }

            else {
                response.data = data;
                response.sucess = true;
                res.status(200).send(response)
            }
        })
    }
}
}
catch(err){
    console.log(err);
}


/**
 * @module login members
 * @param {req} - request from user contains all the information to login the person
 * @param {res}- response to be sent back to client
 */

 try{
exports.login = (req, res) => {
    console.log(req,"kkkkkkkkkkkkkkkkkkkkk")
    req.checkBody("email", " email is not valid").isEmail();
    req.checkBody("password", "password is not valid").len(6, 13);
    var error = req.validationErrors();
    var response = {}

    if (error) {
        response.data = error;
        response.sucess = false;
        res.status(422).send(response)
    }

    else {
        service.login(req, (err, data) => {
            if (err) {
                response.data = err;
                response.sucess = false;
                res.status(422).send(response);
            }
            else {
                response.data = data;
                var payload = {
                    user_id: data[0]._id,
                    email : data[0].email
                }
                let code = token.GenerateTokenAuth(payload);    // generates token for auntentication of the
                response.token = code.token;                    // person for futher process
                response.data = data;
                response.sucess = true;
                res.status(200).send(response);
            }
        })
    }
}
 }
 catch(err){
     console.log(err);
 }


/**
 * @module forgotPassword 
 * @param {req} - request from user contains information to request forgotPassword 
 * @param {res}- response to be sent back to client
 */

try{
exports.forgotPassword = (req, res) => {
    req.checkBody("email", "email not vaild").isEmail();
    var error = req.validationErrors();
    var response = {}
    if (error) {
        response.data = error;
        response.sucess = false;
        res.status(422).send(response);
    }
    else {
        service.forgotPassword(req, (err, data) => {
            if (err) {
                response.data = err;
                response.sucess = false;
                res.status(422).send(response);
            }
            else {
                response.data = data;
                let id = data[0]._id;
                let code = token.GenerateToken(id, req);
                let url = `http://localhost:4500/resetPassword/${code.token}`  // generates URL to be sent
                mailer.sendMail(url, data[0].email, code);          // through nodemailer to reset password
                response.sucess = true;
                res.status(200).send(response);
            }
        })
    }
}
}
catch(err){
    console.log(err);
}


/**
 * @module resetpassword 
 * @param {req} - request from user contains information to  resetpassword 
 * @param {res}- response to be sent back to client
 */


 try{
exports.resetpassword = (req, res) => {

    req.checkBody("password", "password not vaild").len(8, 13);
    req.checkBody("confirmpassword", "set vaild password").len(8, 13);

    var error = req.validationErrors();
    var response = {}

    if (error) {
        response.data = error;
        response.sucess = false;
        res.status(422).send(response);
    }
    else {
        service.resetpassword(req, (err, data) => {
            if (err) {
                response.data = err;
                response.sucess = false;
                res.status(422).send(response);
            }
            else {
                response.data = data;
                response.sucess = true;
                res.status(200).send(response);
            }
        })
    }
}
 }
 catch(err){
     console.log(err);
 }