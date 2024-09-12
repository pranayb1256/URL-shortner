const express = require("express");
const {handleGenerateNewshortURL} = require('../controllers/url');
const {handleGeTAnalytics} = require("../controllers/url");
const router = express.Router();
router.post('/',handleGenerateNewshortURL);
router.get("/analytics/:shortId",handleGeTAnalytics)
module.exports = router;

