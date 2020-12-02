const express = require('express');
const Userroute = express.Router();

const user = require('./../../controllers/users');
const auth = require('./../../middlewares/verify');

Userroute.post('/normal/signup', user.signupUser);
Userroute.post('/normal/signin', user.signinUser);

Userroute.get('/normal/dataview', auth.Auth, user.dataview);
Userroute.put('/normal/datachange', auth.Auth, user.datachange);
Userroute.put('/normal/lvlup', auth.Auth, user.levelup);

Userroute.post('/normal/friend/request', auth.Auth, user.friendListRequest);
Userroute.put('/normal/friend/update', auth.Auth, user.friendListUpdate);
Userroute.get('/normal/friend/view', auth.Auth, user.friendListView);

Userroute.put('/normal/favorite/add', auth.Auth, user.UserFavoriteAddFavorites);


module.exports = Userroute;