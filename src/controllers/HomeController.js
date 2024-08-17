module.exports = {
  homePage: (req, res) => {
    if (req.data.isAdmin === true) {
      res.render("home/home", {
        data: {
          isAdmin: true,
          id: req.data && req.data.id !== undefined ? req.data.id : -1,
        },
      });
    } else if (req.data.isAdmin === false) {
      res.render("home/home", {
        data: {
          isAdmin: false,
          id: req.data && req.data.id !== undefined ? req.data.id : -1,
        },
      });
    } else {        
      res.render("home/home", {
        data: {
          isAdmin: -1,
          id: req.data && req.data.id !== undefined ? req.data.id : -1,
        },
      });
    }
  },
};
