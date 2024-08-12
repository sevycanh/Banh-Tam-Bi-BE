module.exports = {
  homePage: (req, res) => {
    if (req.data.isAdmin === true) {
      res.render("home/home", {
        data: {
          isAdmin: true,
        },
      });
    } else if (req.data.isAdmin === false) {
      res.render("home/home", {
        data: {
          isAdmin: false,
        },
      });
    } else {        
      res.render("home/home", {
        data: {
          isAdmin: -1,
        },
      });
    }
  },
};
