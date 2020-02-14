const jwt = require('jsonwebtoken');

exports.GenerateToken = (payload) => {
    console.log("PPPPPPPPPPP", payload)
    const token = jwt.sign({ payload }, "secretkey-auth", { expiresIn: '1D' })
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
            console.log(result, "YYYYYYYYYYYYYYYYYYYYYYY")
            req.decoded = result;
            next();
        }
    })
}


exports.GenerateTokenAuth = (payload) => {
    const token = jwt.sign({ payload }, 'secretkey-auth', {
        expiresIn: '1D'
    })
    const obj = {
        status: true,
        message: 'Token Generated Successfully!!',
        token: token
    }
    return obj;
}
