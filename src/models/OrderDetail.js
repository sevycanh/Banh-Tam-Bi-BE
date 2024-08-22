const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetail = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: String,
        totalAmount: String
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderDetail", OrderDetail);
