const express = require('express');
const OrderController = require('../controllers/OrderController');
const { verifyForCart, } = require('../middleware/authen');
const { verifyAdmin } = require('../middleware/verifyToken');
const router = express.Router();

router.patch("/manager/:id", verifyAdmin, OrderController.updateStatus)
router.get("/manager/:id", verifyAdmin, OrderController.getDetail)
router.get("/manager", verifyAdmin, OrderController.getAllOrder)

router.get("/:id/order-detail", verifyForCart, OrderController.getOrderDetail)
router.get("/:id", verifyForCart, OrderController.getUserOrder)

module.exports = router;