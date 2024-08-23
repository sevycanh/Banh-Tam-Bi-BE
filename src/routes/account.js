const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyForHeader, verifyForCart } = require('../middleware/authen');
const router = express.Router();

router.patch("/:id", AccountController.updateAddress)
router.get("/:id/address",verifyForHeader, AccountController.getAddress)
router.get("/:id/order", verifyForCart, AccountController.getUserOrder)

module.exports = router;