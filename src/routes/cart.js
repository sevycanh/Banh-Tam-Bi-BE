const express = require('express');
const CartController = require('../controllers/CartController');
const { verifyForHeader, verifyForCart, verifyForAddress } = require('../middleware/authen');
const router = express.Router();

router.get("/",verifyForHeader, verifyForCart, verifyForAddress, CartController.getCart)
router.post("/payment", verifyForCart, CartController.createOrder)

module.exports = router;