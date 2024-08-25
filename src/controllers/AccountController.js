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

  getAllUser: (req, res) => {
    User.find({ isAdmin: false, deleted: false }).then((users) =>
      res.render("account/user", {
        users: multipleMongooseToObject(users),
        data: {
          isAdmin:
            req.data && req.data.isAdmin !== undefined ? req.data.isAdmin : -1,
          id: req.data && req.data.id !== undefined ? req.data.id : -1,
        },
      })
    );
  },

  deleteUser: (req, res) => {
    User.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(() => res.status(500).json("Lỗi Khóa tài khoản"));
  },

  getTrashUser: (req, res) => {
    User.findWithDeleted({ deleted: true })
      .then((users) =>
        res.render("account/trash", {
          data: {
            isAdmin: true,
            id: req.data && req.data.id !== undefined ? req.data.id : -1,
          },
          users: multipleMongooseToObject(users),
        })
      )
      .catch(() => res.status(500).json("Lỗi lấy danh sách tài khoản đã xóa"));
  },

  restoreUser: (req, res)=> {
    User.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(() => res.status(500).json("Lỗi restore user"));
  }
};
