const express   = require('express');
const bp        = require('body-parser');
const co        = require('colors');
const cors      = require('cors');

const conn      = require('./utils/dbConn');

const userRouter        = require('./routes/usersRoute/userroute');
const premiumRouter     = require('./routes/usersRoute/premiumroute');
const modRouter         = require('./routes/usersRoute/modroute');
const adminRouter       = require('./routes/usersRoute/adminroute')
const articlesRouter    = require('./routes/articlesRoute/articleroute');
const roomRouter        = require('./routes/roomRoute/roomroute');

const app = express();
require('dotenv').config();

app.use(cors());

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use('/users',  userRouter);
app.use('/premium', premiumRouter);
app.use('/mod', modRouter);
app.use('/admin',  adminRouter);
app.use('/articles', articlesRouter);
app.use('/room', roomRouter);

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