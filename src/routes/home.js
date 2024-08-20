const express = require('express');
const HomeController = require('../controllers/HomeController');
const { verifyLogin, verifyForAddress } = require('../middleware/authen');
const router = express.Router();

router.get("/", verifyLogin, verifyForAddress, HomeController.homePage)

module.exports = router;