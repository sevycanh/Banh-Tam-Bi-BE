const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyForHeader } = require('../middleware/authen');
const router = express.Router();

router.get("/:id",verifyForHeader, AccountController.getAccountInfo)

module.exports = router;