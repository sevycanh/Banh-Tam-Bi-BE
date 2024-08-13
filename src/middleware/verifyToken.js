const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    if (req.headers && req.headers.token) {
      
    } else {
      return res.status(401).json({
        message: "Phiên bản đăng nhập hết hạn. Vui lòng đăng nhập lại",
      });
    }
  },
};
