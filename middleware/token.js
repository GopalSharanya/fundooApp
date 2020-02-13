const jwt = require('jsonwebtoken');

exports.GenerateToken = (payload, req) => {
    const token = jwt.sign({ payload }, process.env.KEY, { expiresIn: '1h' })
    const obj = {
        sucess: true,
        message: 'Token generated',
        token: token
    }
    return obj;

}

exports.verify = (req, res, next) => {
    var token = req.headers.token;
    jwt.verify(token, process.env.KEY, (err, result) => {
        if (err) {
            res.status(422).send({ "message": "token not generated" });
        }
        else {
            req.decoded = result;
            next();
        }
    })
}