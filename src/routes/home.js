const express = require('express');
const HomeController = require('../controllers/HomeController');
const { verifyLogin } = require('../middleware/authen');
const router = express.Router();

router.get("/", verifyLogin, HomeController.homePage)

module.exports = router;