
const service = require('../services/service.js')
const token = require('../middleware/token')
const mailer = require('../middleware/nodemailer')

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
                console.log()
            }
        })
    }

}

exports.login = (req, res) => {
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
                res.status(422).send(response)
            }
            else {
                response.data = data;
                let id = data[0]._id;
                let code = token.GenerateToken(id, req);
                response.token = code.token;
                response.data = data;
                response.sucess = true;
                res.status(200).send(response)
            }
        })
    }

}

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
                let url = `http://localhost:4500/resetPassword/${code.token}`
                mailer.sendMail(url, data[0].email, code);
                response.sucess = true;
                res.status(200).send(response);
            }
        })
    }
}


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
