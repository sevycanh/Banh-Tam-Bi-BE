const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  registerPage: (req, res) => {
    res.render("auth/register");
  },

  register: async (req, res) => {
    if (req.body.password !== req.body.rePassword) {
      return res
        .status(400)
        .json({ error: "Đăng ký thất bại: Mật khẩu không khớp!" });
    }

    const user = await User.findOne({ phone: req.body.phone });
    // !user && res.status(409).json("User exist")
    if (user) {
      return res.status(409).json("User exist");
    }
    const newUser = new User({
      name: req.body.name,
      phone: req.body.phone,
      location: "",
      isAdmin: false,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.Crypto_SEC
      ).toString(),
    });

    try {
      await newUser.save();
      return res.redirect("/auth/login"); 
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  loginPage: (req, res) => {
    res.render("auth/login");
  },

  login: async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.body.phone });
        !user && res.status(401).json("Wrong Login Details");


        const deCryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.Crypto_SEC
          );

        const dePassword = deCryptedPass.toString(CryptoJS.enc.Utf8);
        dePassword !== req.body.password && res.status(401).json("Wrong Login Details");


        const userToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            {
                expiresIn: 900
            }
        )

        console.log(process.env.JWT_EXPIRE, "jwtsec:", process.env.JWT_SEC, "usetoken: ", userToken)
        localStorage.setItem('token', userToken)

        res.status(200).json("Success");
    } catch (error){
      res.status(500).json(error);
    }
  },

  logout: (req, res) => {
    res.render("auth/login");
  }
};
