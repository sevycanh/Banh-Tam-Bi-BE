const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");
module.exports = {
  getUserOrder: (req, res) => {
    Order.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .then(async (orders) => {
        for (let i = 0; i < orders.length; i++) {
          const orderDetails = await OrderDetail.findOne({
            orderId: orders[i]._id,
          }).populate("products.productId", "name");
          // console.log(JSON.stringify(orderDetails, null, 2));

          let productNames = [];

          orderDetails.products.forEach((product) => {
            productNames.push(product.productId.name);
          });

          let formatToString = productNames.join(", ");

          orders[i]._doc.productNames = formatToString;
        }

        res.render("order/order", {
          orders: multipleMongooseToObject(orders),
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
        res.status(500).json(`Lỗi lấy thông tin đơn hàng: ${error}`);
      });
  },

  getOrderDetail: (req, res) => {
    OrderDetail.findOne({ orderId: req.params.id })
      .populate("orderId", "-userId -createdAt -__v")
      .populate("products.productId", "name price")
      .then((orderDetail) => {
        //  console.log(JSON.stringify(orderDetail, null, 2));
        res.render("order/orderDetail", {
          products: multipleMongooseToObject(orderDetail.products),
          orderDetail: mongooseToObject(orderDetail),
          data: {
            isAdmin:
              req.data && req.data.isAdmin !== undefined
                ? req.data.isAdmin
                : -1,
            id: req.data && req.data.id !== undefined ? req.data.id : -1,
          },
        });
      })
      .catch(() => res.status(500).json("Lỗi lấy chi tiết đơn hàng"));
  },

  getAllOrder: (req, res) => {
    if (req.query.status === "0") {
      Order.find({})
        .sort({ createdAt: -1 })
        .then(async (orders) => {
          for (let i = 0; i < orders.length; i++) {
            const orderDetails = await OrderDetail.findOne({
              orderId: orders[i]._id,
            }).populate("products.productId", "name");
            // console.log(JSON.stringify(orderDetails, null, 2));

            let productNames = [];

            orderDetails.products.forEach((product) => {
              productNames.push(product.productId.name);
            });

            let formatToString = productNames.join(", ");

            orders[i]._doc.productNames = formatToString;
          }

          res.render("order/orderAdmin", {
            orders: multipleMongooseToObject(orders),
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
          res.status(500).json(`Lỗi lấy thông tin đơn hàng: ${error}`);
        });
    } else {
      Order.find({ status: req.query.status })
        .sort({ createdAt: -1 })
        .then(async (orders) => {
          for (let i = 0; i < orders.length; i++) {
            const orderDetails = await OrderDetail.findOne({
              orderId: orders[i]._id,
            }).populate("products.productId", "name");
            // console.log(JSON.stringify(orderDetails, null, 2));

            let productNames = [];

            orderDetails.products.forEach((product) => {
              productNames.push(product.productId.name);
            });

            let formatToString = productNames.join(", ");

            orders[i]._doc.productNames = formatToString;
          }

          res.render("order/orderAdmin", {
            orders: multipleMongooseToObject(orders),
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
          res.status(500).json(`Lỗi lấy thông tin đơn hàng: ${error}`);
        });
    }
  },

  getDetail: (req, res) => {
    OrderDetail.findOne({ orderId: req.params.id })
      .populate("orderId", "-userId -createdAt -__v")
      .populate("products.productId", "name price")
      .then((orderDetail) => {
        //  console.log(JSON.stringify(orderDetail, null, 2));
        res.render("order/orderDetailAdmin", {
          products: multipleMongooseToObject(orderDetail.products),
          orderDetail: mongooseToObject(orderDetail),
          data: {
            isAdmin:
              req.data && req.data.isAdmin !== undefined
                ? req.data.isAdmin
                : -1,
            id: req.data && req.data.id !== undefined ? req.data.id : -1,
          },
        });
      })
      .catch(() => res.status(500).json("Lỗi lấy chi tiết đơn hàng"));
  }
};
