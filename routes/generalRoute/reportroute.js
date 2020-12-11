const express = require('express');
const Reportroute = express.Router();

const auth = require('./../../middlewares/verify');
const general = require('./../../controllers/general');

Reportroute.post('/add/ticket', auth.Auth, general.addTicket);
Reportroute.get('/verify/userpunished/', auth.Auth, general.seeIfUserIsPunished);

module.exports = Reportroute;