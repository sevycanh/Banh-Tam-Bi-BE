const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyForHeader, verifyForCart } = require('../middleware/authen');
const { verifyAdmin } = require('../middleware/verifyToken');
const router = express.Router();

router.patch("/:id", verifyForCart, AccountController.updateAddress)
router.get("/:id/address",verifyForHeader, AccountController.getAddress)

router.patch("/:id/restore", verifyAdmin, AccountController.restoreUser)
router.get("/trash", verifyAdmin, AccountController.getTrashUser)
router.delete("/:id", verifyAdmin, AccountController.deleteUser)
router.get("/", verifyAdmin, AccountController.getAllUser)

module.exports = router;