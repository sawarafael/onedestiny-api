const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    Auth(req, res, next) {
        
    const authToken = req.headers['authorization'];

    if(authToken != undefined) {

        const bearer = authToken.split(' ');
        var token = bearer[1];
        
    jwt.verify(token, process.env.JWT_SECRET_TOKEN_ADMIN, (err, data) => {
        if(err) {
            res.status(401);
            res.json({ err: "User-Token inválido." })
        } else {
            next();
        }
    }) 
    } else {
        res.status(500);
        res.json({ err: "Tempo esgotado. Tente novamente." });
    }
    },


    UserAuth(req, res, next) {

        const userToken = req.headers['authorization'];

        if(userToken != undefined) {

            const bearer = userToken.split(' ');
            var uToken = bearer[1];

            if(uToken === process.env.TOKEN_USER) {
                next();
            } else {
                res.status(401);
                res.json({ err: "Token inválido!" })
            }

        } else {
            res.status(500);
            res.json({ err: "Tempo esgotado. Tente novamente."})
        }

    }

}

