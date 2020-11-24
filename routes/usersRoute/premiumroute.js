const express = require('express');
const PremiumRouter = express.Router();

const user = require('./../../controllers/users');
const premiumAuth = require('./../../middlewares/verify');

PremiumRouter.get('/normal/dataview', premiumAuth.PremiumAuth, user.dataview);
PremiumRouter.put('/normal/datachange', premiumAuth.PremiumAuth, user.datachange);
PremiumRouter.put('/normal/lvlup', premiumAuth.PremiumAuth, user.levelup);

PremiumRouter.post('/normal/friend/request', premiumAuth.PremiumAuth, user.friendListRequest);
PremiumRouter.put('/normal/friend/update', premiumAuth.PremiumAuth, user.friendListUpdate);
PremiumRouter.get('/normal/friend/view', premiumAuth.PremiumAuth, user.friendListView);

module.exports = PremiumRouter;