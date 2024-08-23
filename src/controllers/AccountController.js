const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const User = require("../models/User");
const { multipleMongooseToObject } = require("../util/mongoose");
module.exports = {
  getAddress: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        const address = user._doc.address.split(", ");

        res.render("account/address", {
          id: user._doc._id,
          address: {
            name: address[0] ? address[0] : "",
            phone: address[1] ? address[1] : "",
            city: address[2] ? address[2] : "",
            district: address[3] ? address[3] : "",
            ward: address[4] ? address[4] : "",
            number: address[5] ? address[5] : "",
            street: address[6] ? address[6] : "",
          },
          data: {
            isAdmin:
              req.data && req.data.isAdmin !== undefined
                ? req.data.isAdmin
                : -1,
            id: req.data && req.data.id !== undefined ? req.data.id : -1,
          },
        });
      })
      .catch((err) => {
        res.status(500).json("Lỗi lấy thông tin người dùng");
      });
  },

  updateAddress: (req, res) => {
    const address =
      req.body.name +
      ", " +
      req.body.phone +
      ", " +
      req.body.cityId +
      ", " +
      req.body.districtId +
      ", " +
      req.body.wardId +
      ", " +
      req.body.number +
      ", " +
      req.body.street;
    User.findByIdAndUpdate(req.params.id, { address: address })
      .then(() => res.redirect("/"))
      .catch(() => res.status(500).json("Lỗi cập nhật địa chỉ"));
  },

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

        res.render("account/order", {
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
};
