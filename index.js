const express   = require('express');
const bp        = require('body-parser');
const co        = require('colors');
const cors      = require('cors');
const helmet    = require('helmet');
// const https     = require('https');
// const fs        = require('fs');

const conn      = require('./utils/dbConn');

const config    = require('./configs/configs');

const userRouter        = require('./routes/usersRoute/userroute');
const adminRouter       = require('./routes/usersRoute/adminroute');
const articlesRouter    = require('./routes/generalRoute/articleroute');
const roomRouter        = require('./routes/roomRoute/roomroute');
const reportRouter      = require('./routes/generalRoute/reportroute');

const app = express();
require('dotenv').config();

app.use(cors());

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use(helmet());

app.use('/users',  userRouter);
app.use('/admin',  adminRouter);
app.use('/articles', articlesRouter);
app.use('/reports', reportRouter)
app.use('/room', roomRouter);

app.get('/', (req, res) => {
    res.send("Bem vindo a esta página. :3")
})

// const ODServer = https.createServer({key: key, cert: cert}, app)

app.listen(config.PORT, () => {
    console.log(co.yellow(`\n API rodando no endereço: ` + co.bold(`http://localhost:${config.PORT}`)
    + `\n Inicializando Módulos: \n`))
})  

conn   
    .authenticate()
    .then(() => {
    console.log(co.bgGreen.black(`\n                                                                     
        CONEXÃO COM O BANCO DE DADOS REALIZADA COM SUCESSO!          
                                                                     \n`))
}).catch((err) => {
    console.log(err);
})