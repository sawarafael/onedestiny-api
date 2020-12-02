const express = require('express');
const ModRouter = express.Router();

const usera = require('./../../controllers/admins');
const Modauth = require('./../../middlewares/verify');

ModRouter.post('/request/create/tags', Modauth.Auth, usera.AdmNewTag);
ModRouter.get('/request/view/tags', Modauth.Auth, usera.AdmSeeTag);
ModRouter.put('/request/update/tags', Modauth.Auth, usera.AdmUpdateTag);
ModRouter.delete('/request/remove/tags', Modauth.Auth, usera.AdmRemoveTag);

ModRouter.post('/request/create/article', Modauth.Auth, usera.AdmNewArticle);
ModRouter.get('/request/view/article', Modauth.Auth, usera.AdmSeeArticle);
ModRouter.put('/request/update/article', Modauth.Auth, usera.AdmUpdateArticle);
ModRouter.delete('/request/remove/article', Modauth.Auth, usera.AdmRemoveArticle);

module.exports = ModRouter;