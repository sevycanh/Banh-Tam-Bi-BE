const Product = require("../models/Product");
const { multipleMongooseToObject } = require("../util/mongoose");
module.exports = {
  getCart: (req, res) => {
    let products;
    try {
      const cookies = req.cookies.products;
      if (cookies) {
        products = JSON.parse(cookies);
        const getProductInfo = async () => {
          const cartProducts = [];
          for (const product of products) {
            const productInfo = await getProductsByProductId(product.productId);
            if (productInfo) {
              productInfo._doc.quantity = product.quantity;
              cartProducts.push(productInfo);
            }
          }
          return cartProducts;
        };

        getProductInfo()
          .then((cartProducts) => {
            res.render("payment/cart", {
              cartProducts: multipleMongooseToObject(cartProducts),
              data: {
                isAdmin:
                  req.data && req.data.isAdmin !== undefined
                    ? req.data.isAdmin
                    : -1,
                id: req.data && req.data.id !== undefined ? req.data.id : -1,
              },
            });
          })
          .catch((error) => {
            res.status(500).json({ error: "Đã xảy ra lỗi khi xử lý giỏ hàng" });
          });
      } else {
        res.render("payment/cart", {
          data: {
            isAdmin:
              req.data && req.data.isAdmin !== undefined
                ? req.data.isAdmin
                : -1,
            id: req.data && req.data.id !== undefined ? req.data.id : -1,
          },
        });
      }
    } catch (error) {
      res.render("payment/cart", {
        data: {
          isAdmin:
            req.data && req.data.isAdmin !== undefined ? req.data.isAdmin : -1,
          id: req.data && req.data.id !== undefined ? req.data.id : -1,
        },
      });
    }
  },

  shoppingAddressPage: (req, res) => {
    const note = req.body.node;
    res.render("payment/shoppingAddress", {
      note,
    });
  },
};

const getProductsByProductId = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId });
    return product;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm");
    return null;
  }
};
