const Product = require("../models/Product");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find();
      const productsSortDeleted = await Product.countDocumentsWithDeleted({
        deleted: true,
      });
      res.render("product/get", {
        data: {
          isAdmin: true,
        },
        products: multipleMongooseToObject(products),
        productsSortDeleted,
      });
    } catch (error) {
      res.status(500).json("Lỗi get all product");
    }
  },

  createProductPage: (req, res) => {
    res.render("product/create", {
      data: {
        isAdmin: true,
      },
    });
  },

  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.redirect("/products");
    } catch (error) {
      res.status(500).json("Lỗi tạo sản phẩm");
    }
  },

  stopSellingProduct: (req, res) => {
    Product.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(() => res.status(500).json("Lỗi dừng bán sản phẩm"));
  },

  getTrash: (req, res) => {
    Product.findWithDeleted({ deleted: true })
      .then((products) =>
        res.render("product/trash", {
          data: {
            isAdmin: true,
          },
          products: multipleMongooseToObject(products),
        })
      )
      .catch(() => res.status(500).json("Lỗi lấy sản phẩm dừng bán"));
  },

  restoreProduct: (req, res) => {
    Product.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(() => res.status(500).json("Lỗi restore sản phẩm"));
  },

  destroyProduct: (req, res) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(() => res.status(500).json("Lỗi xóa sản phẩm"));
  },

  editPage: (req, res) => {
    Product.findOne({ _id: req.params.id }).then((product) =>
      res.render("product/update", {
        data: {
          isAdmin: true,
        },
        product: mongooseToObject(product),
      })
    );
  },

  editProduct: (req, res) => {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/products"))
      .catch(() => res.status(500).json("Lỗi sửa sản phẩm"));
  },

  stopProductsIsChecked: (req, res) => {
    Product.delete({ _id: { $in: req.body.productsIds } })
      .then(() => res.redirect("back"))
      .catch(() => res.status(500).json("Lỗi dừng bán các sản phẩm đã chọn"));
  },

  resumeProductsIsChecked: (req, res) => {
    Product.restore({ _id: { $in: req.body.productsIds } })
      .then(() => res.redirect("back"))
      .catch(() => res.status(500).json("Lỗi dừng bán các sản phẩm đã chọn"));
  },

  getMonChinh: (req, res) => {
    getProductsByCategoryId(req, res, "1");
  },

  getMonPhu: (req, res) => {
    getProductsByCategoryId(req, res, "2");
  },

  getNuocUong: (req, res) => {
    getProductsByCategoryId(req, res, "3");
  },

  showInfoProduct: (req, res) => {
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        res.render("product/show", {
          product: mongooseToObject(product),
          data: {
            isAdmin:
              req.data && req.data.isAdmin !== undefined
                ? req.data.isAdmin
                : -1,
          },
        });
      })
      .catch(() => res.status(500).json("Lỗi show thông tin sản phẩm"));
  },
};

const getProductsByCategoryId = (req, res, categoryId) => {
  Product.find({ categoryId: categoryId })
    .then((products) => {
      res.render("home/products", {
        products: multipleMongooseToObject(products),
        categoryId: categoryId,
        data: {
          isAdmin:
            req.data && req.data.isAdmin !== undefined ? req.data.isAdmin : -1,
        },
      });
    })
    .catch(() => {
      res.status(500).json("Lỗi lấy sản phẩm");
    });
};
