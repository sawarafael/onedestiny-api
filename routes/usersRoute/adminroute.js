const express = require('express');
const Adminroute = express.Router();

const usera = require('./../../controllers/admins');
const auth = require('./../../middlewares/verify');

Adminroute.post('/create/tags', auth.Auth, usera.AdmNewTag);
Adminroute.patch('/update/tags', auth.Auth, usera.AdmUpdateTag);
Adminroute.delete('/remove/tags', auth.Auth, usera.AdmRemoveTag);

Adminroute.post('/create/article', auth.Auth, usera.AdmNewArticle);
Adminroute.patch('/update/article', auth.Auth, usera.AdmUpdateArticle);
Adminroute.delete('/remove/article', auth.Auth, usera.AdmRemoveArticle);

Adminroute.get('/see/tickets', auth.Auth, usera.AdmSeeAllTickets);
Adminroute.patch('/set/coord', auth.Auth, usera.AdmSetCoord);
Adminroute.patch('/set/action/:id', auth.Auth, usera.AdmSetAction);

Adminroute.patch('/new/mod', auth.Auth, usera.newMod);
Adminroute.patch('/remove/mod', auth.Auth, usera.removeMod);

module.exports = Adminroute;