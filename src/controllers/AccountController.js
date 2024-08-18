const User = require("../models/User");
const { mongooseToObject } = require("../util/mongoose");
module.exports = {
  getAddress: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        const address = user._doc.address.split(", ")
        
        res.render("account/address", {
          user: mongooseToObject(user),
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
    console.log(address);
    User.findByIdAndUpdate(req.params.id, { address: address })
      .then(() => res.redirect("/"))
      .catch(() => res.status(500).json("Lỗi cập nhật địa chỉ"));
  },
};
