const express = require('express');
const Userroute = express.Router();

const user = require('./../../controllers/users');
const veri = require('./../../middlewares/verify');

Userroute.post('/normal/signup', user.signupUser);
Userroute.get('/normal/signin', user.signinUser);

Userroute.get('/normal/dataview', veri.freeAuth, user.dataview);
Userroute.put('/normal/datachange', veri.freeAuth, user.datachange);
Userroute.put('/normal/lvlup', veri.freeAuth, user.levelup);

Userroute.post('/normal/friend/request', veri.freeAuth, user.friendListRequest);
Userroute.put('/normal/friend/update', veri.freeAuth, user.friendListUpdate);
Userroute.get('/normal/friend/view', veri.freeAuth, user.friendListView);

module.exports = Userroute;