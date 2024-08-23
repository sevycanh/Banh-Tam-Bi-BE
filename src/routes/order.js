const express = require('express');
const OrderController = require('../controllers/OrderController');
const { verifyForHeader, } = require('../middleware/authen');
const router = express.Router();

router.get("/:id",verifyForHeader, OrderController.getUserOrder)

module.exports = router;