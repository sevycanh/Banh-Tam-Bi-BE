const jwt = require("jsonwebtoken");

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
        },
      });
    } else {
      jwt.verify(token, process.env.JWT_SEC, (err, data) => {
        if (err){
        // console.log(err);
          res.render("home/home", {
            data: {
              isAdmin: -1,
            },
          });
        } else {
            req.data = data;
            next();
        }
      });
    }
  },

  verifyForHeader: (req, res, next)=>{
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require("node-localstorage").LocalStorage;
      localStorage = new LocalStorage("./scratch");
    }
    const token = localStorage.getItem("token");
    
    if (!token) {
      next()
    } else {
      jwt.verify(token, process.env.JWT_SEC, (err, data) => {
        if (err){
        next()
        } else {
            req.data = data;
            next();
        }
      });
    }
  }
};
