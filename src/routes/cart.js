const express = require('express');
const CartController = require('../controllers/CartController');
const { verifyForHeader } = require('../middleware/authen');
const router = express.Router();

router.get("/",verifyForHeader, CartController.getCart)
router.post("/shipping-address", verifyForHeader, CartController.shoppingAddressPage)

module.exports = router;