const express = require('express');
const PremiumRouter = express.Router();

const user = require('./../../controllers/users');
const premiumAuth = require('./../../middlewares/verify');

PremiumRouter.get('/normal/dataview', premiumAuth.Auth, user.dataview);
PremiumRouter.put('/normal/datachange', premiumAuth.Auth, user.datachange);
PremiumRouter.put('/normal/lvlup', premiumAuth.Auth, user.levelup);

PremiumRouter.post('/normal/friend/request', premiumAuth.Auth, user.friendListRequest);
PremiumRouter.put('/normal/friend/update', premiumAuth.Auth, user.friendListUpdate);
PremiumRouter.get('/normal/friend/view', premiumAuth.Auth, user.friendListView);

module.exports = PremiumRouter;