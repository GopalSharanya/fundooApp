const jwt = require('jsonwebtoken');

exports.checkTokenAuth = (req, res, next) => {
    console.log("in middlwware",req.body)
    var token1 = req.headers.token;
    if (token1) {
        jwt.verify(token1, "secretkey-auth", (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    status: false,
                    message: 'Unauthorised access, please provide valid token!'
                });
            } else {
                req.decoded = decoded;
                console.log(req.decoded,"KKKKKKKKKKK")
                next();
            }
        });
    } else {
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }
}