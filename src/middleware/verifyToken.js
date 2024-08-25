const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }
  const token = localStorage.getItem("token");
  
  //   if (req.headers && req.headers.token) {

  //   } else {
  //     return res.status(401).json({
  //       message: "Phiên bản đăng nhập hết hạn. Vui lòng đăng nhập lại",
  //     });
  //   }

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
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.data.isAdmin) {
      next();
    } else {
      res.status(403).json("You are restricted from performing this operation");
    }
  });
}

module.exports = {
  verifyToken,
  verifyAdmin,
};
