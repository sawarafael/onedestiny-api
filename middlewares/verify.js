const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    freeAuth(req, res, next) {

        const authFreeToken = req.headers['authorization'];

        if (authFreeToken != undefined) {
            
            const bearer = authFreeToken.split(' ');
            var token = bearer[1];

            jwt.verify(token, process.env.JWT_SECRET_TOKEN_USER, (err, data) => {
                if(err) {
                    res.status(401);
                    res.json({ err: "Token inválido." })
                } else {
                    next();
                }
            })


        } else {
            res.status(500);
            res.json({ err: "Tempo de Resposta muito Alta, tente novamente." });
        }

    },


    admAuth(req, res, next){

    }


}