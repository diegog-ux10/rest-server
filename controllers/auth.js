const { response } = require("express");
const User = require("../models/user");
const bcrypjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user.status) {
      return res.status(400).json({
        msg: "user/password is incorrect - email",
      });
    }
    const validPassword = bcrypjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "user/password is incorrect - password",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Tall to Support",
    });
  }
};

module.exports = {
  login,
};
