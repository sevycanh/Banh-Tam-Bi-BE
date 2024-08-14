const express = require('express');
const ProductController = require('../controllers/ProductController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.put("/:id", ProductController.editProduct)
router.get("/:id/edit", ProductController.editPage)

router.delete("/:id/destroy", ProductController.destroyProduct)
router.patch("/:id/restore", ProductController.restoreProduct)
router.get("/trash", ProductController.getTrash)

router.get("/create", ProductController.createProductPage)
router.post("/create", ProductController.createProduct)

router.delete("/:id", ProductController.stopSellingProduct)
//stop product is checked
router.post("/stop-selling-products", ProductController.stopProductsIsChecked)
router.post("/resume-selling-products", ProductController.resumeProductsIsChecked)

router.get("/", ProductController.getAllProduct)


module.exports = router;