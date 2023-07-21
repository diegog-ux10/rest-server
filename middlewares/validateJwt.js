const { response, request } = require("express");
const User = require("../models/user");

const jwt = "jsonwebtoken";

const validateJwt = async (request = request, response = response, next) => {
  const token = request.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "missing token auth",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: "User Not Exists",
      });
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "User Not Active",
      });
    }
    request.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "something bad happened",
    });
  }
};

module.exports = {
  validateJwt,
};
