const Product = require("../models/Product");
const { multipleMongooseToObject } = require("../util/mongoose");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find();
      const productsSortDeleted = await Product.countDocumentsWithDeleted({
        deleted: true,
      });
      res.render("product/get", {
        data: {
          isAdmin: true
        },
        products: multipleMongooseToObject(products),
        productsSortDeleted
      })
    } catch (error) {
      res.status(500).json("Lỗi get all product");
    }
  },

  createProductPage: (req, res) => {
    res.render('product/create', {
      data: {
        isAdmin: true
      }
    })
  },

  createProduct: async (req, res) => {
    const newProduct = new Product(req.body)
    try {
      await newProduct.save();
      res.redirect("/products")
    } catch (error) {
      res.status(500).json("Lỗi tạo sản phẩm")
    }
  },

  stopSellingProduct: (req, res) => {
    Product.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(()=> res.status(500).json("Lỗi dừng bán sản phẩm"));
  },

  getTrash: (req, res) => {
    Product.findWithDeleted({ deleted: true })
      .then((products) =>
        res.render("product/trash", { 
          data: {
            isAdmin: true
          },
          products: multipleMongooseToObject(products) })
      )
      .catch(()=> res.status(500).json("Lỗi lấy sản phẩm dừng bán"));
  }

};
