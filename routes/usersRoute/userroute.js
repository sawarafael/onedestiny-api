const express = require('express');
const Userroute = express.Router();

const user = require('./../../controllers/users');
const auth = require('./../../middlewares/verify');

Userroute.post('/normal/signup', user.signupUser);
Userroute.post('/normal/signin', user.signinUser);

Userroute.get('/normal/dataview/id', auth.Auth, user.dataview);
Userroute.patch('/normal/datachange/:id', auth.Auth, user.datachange);
Userroute.patch('/normal/lvlup/id', auth.Auth, user.levelup);

Userroute.post('/normal/friend/request', auth.Auth, user.friendListRequest);
Userroute.patch('/normal/friend/update/:resp', auth.Auth, user.friendListUpdate);
Userroute.get('/normal/friend/view/all/id', auth.Auth, user.friendListViewAll);

Userroute.post('/normal/user/post/new', auth.Auth, user.userpostNewPost);
Userroute.post('/normal/user/post/comment/new', auth.Auth, user.userpostNewComment);
Userroute.get('/normal/user/post/view/id', auth.Auth, user.userpostView);

Userroute.post('/normal/favorites/add/tags', auth.Auth, user.addUserTagsFavorites);
Userroute.get('/normal/favorites/view/tags/id', auth.Auth, user.viewUserTagsFavorites);

Userroute.post('/normal/user/medals/add', auth.Auth, user.addUserMedals);
Userroute.get('/normal/user/medals/view/id', auth.Auth, user.viewUserMedals);

module.exports = Userroute;