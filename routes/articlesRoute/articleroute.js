const express = require('express');
const articleroute = express.Router();

const art = require('../../controllers/admins')

articleroute.get('/view/all', art.AdmSeeArticle);
articleroute.get('/view/tags', art.AdmSeeTag);

module.exports = articleroute;