const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = (req = request, res = response) => {
  const params = req.query;
  res.json({
    msg: "get API - Controller",
  });
};

const usersPost = async (req, res = response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put API - Controller",
    id,
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "delete API - Controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
