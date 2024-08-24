const express = require('express');
const OrderController = require('../controllers/OrderController');
const { verifyForCart, } = require('../middleware/authen');
const router = express.Router();

router.get("/manager/:id", verifyForCart, OrderController.getDetail)
router.get("/manager", verifyForCart, OrderController.getAllOrder)

router.get("/:id/order-detail", verifyForCart, OrderController.getOrderDetail)
router.get("/:id", verifyForCart, OrderController.getUserOrder)

module.exports = router;