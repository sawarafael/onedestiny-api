const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    Auth(req, res, next) {
        
    const authToken = req.headers['authorization'];

    if(authToken != undefined) {

        const bearer = authToken.split(' ');
        var token = bearer[0]; 

        jwt.verify(token, process.env.JWT_SECRET_TOKEN_ADMIN, (err, data) => {
            if(err) {
                jwt.verify(token, process.env.JWT_SECRET_TOKEN_USER, (err, data) => {
                    if(err) {
                        jwt.verify(token, process.env.JWT_SECRET_TOKEN_PREMIUM, (err, data) => {
                            if(err) {
                                jwt.verify(token, process.env.JWT_SECRET_TOKEN_MOD, (err, data) => {
                                    if(err) {
                                        console.log(err)
                                    } else {
                                        next();
                                    }
                                })
                            } else {
                                next();
                            }
                        })
                    } else {
                        next();
                    }
                })
            } else {
                next();
            }
        })
    } else {
        res.status(500);
        res.json({ err: "Token inválido." })
    }
}
}