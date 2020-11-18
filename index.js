const express   = require('express');
const bp        = require('body-parser');
const co        = require('colors');

const conn      = require('./utils/dbConn');

const userRouter = require('./routes/usersRoute/userroute');

const app = express();
require('dotenv').config();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use('/users',  userRouter)

app.listen(process.env.API_PORT, () => {
    console.log(co.yellow(`\n API rodando no endereço: ` + co.bold(`http://localhost:${process.env.API_PORT}`)
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