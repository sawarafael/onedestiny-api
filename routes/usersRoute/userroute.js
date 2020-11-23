const express = require('express');
const Userroute = express.Router();

const user = require('./../../controllers/users');
const auth = require('./../../middlewares/verify');

Userroute.post('/normal/signup', user.signupUser);
Userroute.get('/normal/signin', user.signinUser);

Userroute.get('/normal/dataview', auth.UserAuth, user.dataview);
Userroute.put('/normal/datachange', auth.UserAuth, user.datachange);
Userroute.put('/normal/lvlup', auth.UserAuth, user.levelup);

Userroute.post('/normal/friend/request', auth.UserAuth, user.friendListRequest);
Userroute.put('/normal/friend/update', auth.UserAuth, user.friendListUpdate);
Userroute.get('/normal/friend/view', auth.UserAuth, user.friendListView);


module.exports = Userroute;