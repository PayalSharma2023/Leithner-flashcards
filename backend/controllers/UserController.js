require('dotenv').config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.create({
      ...req.body,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${email}`,
    });
    const token = createToken(user._id, user.role);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      user: user._id,
    });
  } catch (err) {
    res.status(400).json({ err});
  }
};


module.exports.login_get = (req, res) => {
  res.render("signup");
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: maxAge * 1000,
    // });
    res.status(200).json({ token});
  } catch (err) {
    res.status(400).json({ err});
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};