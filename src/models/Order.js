const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    userId: String,
    note: String,
    deliverAddress: String,
    paymentMethod: String,
    totalPrice: String,
    shippingFee: String,
    finalPrice: String,
    status: String,
    orderDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
