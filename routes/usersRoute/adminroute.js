const express = require('express');
const Adminroute = express.Router();

const usera = require('./../../controllers/admins');
const user = require('./../../controllers/users');
const auth = require('./../../middlewares/verify');

Adminroute.post('/request/create/tags', auth.Auth, usera.AdmNewTag);
Adminroute.get('/request/view/tags', auth.Auth, usera.AdmSeeTag);
Adminroute.put('/request/update/tags', auth.Auth, usera.AdmUpdateTag);
Adminroute.delete('/request/remove/tags', auth.Auth, usera.AdmRemoveTag);

Adminroute.post('/request/create/article', auth.Auth, usera.AdmNewArticle);
Adminroute.get('/request/view/article', auth.Auth, usera.AdmSeeArticle);
Adminroute.put('/request/update/article', auth.Auth, usera.AdmUpdateArticle);
Adminroute.delete('/request/remove/article', auth.Auth, usera.AdmRemoveArticle);

Adminroute.put('/request/new/mod', auth.Auth, usera.AdmNewMod);
Adminroute.delete('/request/remove/mod', auth.Auth, usera.AdmRemoveMod);
Adminroute.post('/request/punish/user', auth.Auth, usera.AdmPuneUser);
Adminroute.get('/request/see/user', auth.Auth, usera.AdmSeePuneUser);
Adminroute.put('/request/nice/user', auth.Auth, usera.AdmNiceUser);

Adminroute.get('/normal/dataview', auth.Auth, user.dataview);
Adminroute.put('/normal/datachange', auth.Auth, user.datachange);
Adminroute.put('/normal/lvlup', auth.Auth, user.levelup);

Adminroute.post('/normal/friend/request', auth.Auth, user.friendListRequest);
Adminroute.put('/normal/friend/update', auth.Auth, user.friendListUpdate);
Adminroute.get('/normal/friend/view', auth.Auth, user.friendListView);


module.exports = Adminroute;