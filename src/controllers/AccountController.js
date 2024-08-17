const User = require("../models/User");
module.exports = {
    getAccountInfo: (req, res)=> {
        res.render("account/information", {
            data: {
                isAdmin:
                  req.data && req.data.isAdmin !== undefined
                    ? req.data.isAdmin
                    : -1,
                id: req.data && req.data.id !== undefined ? req.data.id : -1,
              },
          });
    }
}