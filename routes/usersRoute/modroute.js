const express = require('express');
const ModRouter = express.Router();

const usera = require('./../../controllers/admins');
const user = require('./../../controllers/users');
const Modauth = require('./../../middlewares/verify');

ModRouter.get('/normal/dataview', Modauth.ModAuth, user.dataview);
ModRouter.put('/normal/datachange', Modauth.ModAuth, user.datachange);
ModRouter.put('/normal/lvlup', Modauth.ModAuth, user.levelup);

ModRouter.post('/normal/friend/request', Modauth.ModAuth, user.friendListRequest);
ModRouter.put('/normal/friend/update', Modauth.ModAuth, user.friendListUpdate);
ModRouter.get('/normal/friend/view', Modauth.ModAuth, user.friendListView);

ModRouter.post('/request/create/tags', Modauth.ModAuth, usera.AdmNewTag);
ModRouter.get('/request/view/tags', Modauth.ModAuth, usera.AdmSeeTag);
ModRouter.put('/request/update/tags', Modauth.ModAuth, usera.AdmUpdateTag);
ModRouter.delete('/request/remove/tags', Modauth.ModAuth, usera.AdmRemoveTag);

ModRouter.post('/request/create/article', Modauth.ModAuth, usera.AdmNewArticle);
ModRouter.get('/request/view/article', Modauth.ModAuth, usera.AdmSeeArticle);
ModRouter.put('/request/update/article', Modauth.ModAuth, usera.AdmUpdateArticle);
ModRouter.delete('/request/remove/article', Modauth.ModAuth, usera.AdmRemoveArticle);

module.exports = ModRouter;