const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const User = new Schema(
  {
    phone: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    address: { type: String },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);

User.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("User", User);
