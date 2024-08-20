const express = require('express');
const CartController = require('../controllers/CartController');
const { verifyForHeader, verifyForCart, verifyForAddress } = require('../middleware/authen');
const router = express.Router();

router.get("/",verifyForHeader, verifyForCart, verifyForAddress, CartController.getCart)
router.post("/shipping-address", verifyForHeader, CartController.shoppingAddressPage)

module.exports = router;