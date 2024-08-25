const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { trusted } = require("mongoose");

module.exports = {
  verifyLogin: (req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
    }
    const token = localStorage.getItem("token");

    if (!token) {
      res.render("home/home", {
        data: {
          isAdmin: -1,
          id: -1,
        },
      });
    } else {
      jwt.verify(token, process.env.JWT_SEC, (err, data) => {
        if (err) {
          // console.log(err);
          res.render("home/home", {
            data: {
              isAdmin: -1,
              id: -1,
            },
          });
        } else {
          req.data = data;
          next();
        }
      });
    }
  },

  verifyForHeader: (req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
    }
    const token = localStorage.getItem("token");

    if (!token) {
      next();
    } else {
      jwt.verify(token, process.env.JWT_SEC, (err, data) => {
        if (err) {
          next();
        } else {
          req.data = data;
          next();
        }
      });
    }
  },

  verifyForCart: (req, res, next) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
    }
    const token = localStorage.getItem("token");

    if (!token) {
      res.render("auth/login", {
        data: {
          isAdmin: -1,
          id: -1,
        },
      });
    } else {
      jwt.verify(token, process.env.JWT_SEC, (err, data) => {
        if (err) {
          // console.log(err);
          res.render("auth/login", {
            data: {
              isAdmin: -1,
              id: -1,
            },
          });
        } else {
          req.data = data;
          next();
        }
      });
    }
  },

  verifyForAddress: (req, res, next) => {
    User.findOne({ _id: req.data.id })
      .then((user) => {
        if (user._doc.address !== "" || user._doc.isAdmin === true) {
          next();
        } else {
          res.render("account/address", {
            data: {
              isAdmin:
                req.data && req.data.isAdmin !== undefined
                  ? req.data.isAdmin
                  : -1,
              id: req.data && req.data.id !== undefined ? req.data.id : -1,
            },
          });
        }
      })
      .catch(() =>
        res.render("auth/login", {
          data: {
            isAdmin: -1,
            id: -1,
          },
        })
      );
  },
};
