const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.post("/register", AuthController.register)
router.get("/register", AuthController.registerPage)

router.get("/login", AuthController.loginPage)
router.post("/login", AuthController.login)

router.get("/logout", AuthController.logout)


module.exports = router;