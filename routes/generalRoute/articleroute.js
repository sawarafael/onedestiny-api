const express = require('express');
const articleroute = express.Router();

const general = require('./../../controllers/general');
const auth = require('./../../middlewares/verify');

articleroute.get('/view/articles', auth.Auth, general.seeArticle);
articleroute.get('/view/tags', auth.Auth, general.seeTags);

module.exports = articleroute;