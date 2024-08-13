const express = require('express');
const ProductController = require('../controllers/ProductController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get("/trash", ProductController.getTrash)
router.get("/create", ProductController.createProductPage)
router.post("/create", ProductController.createProduct)
router.delete("/:id", ProductController.stopSellingProduct)
router.get("/", ProductController.getAllProduct)


module.exports = router;