const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

mongoose.plugin(slug);

const Product = new Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
    categoryId: String
  },
  { timestamps: true }
);

Product.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Product", Product);
