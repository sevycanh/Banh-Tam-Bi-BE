const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyForHeader } = require('../middleware/authen');
const router = express.Router();

router.patch("/:id", AccountController.updateAddress)
router.get("/:id/address",verifyForHeader, AccountController.getAddress)

module.exports = router;