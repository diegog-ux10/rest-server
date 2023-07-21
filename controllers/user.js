const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  if (!Number(limit) || !Number(offset)) {
    return res.status(400).json({
      msg: "Query NaN",
    });
  }

  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(offset).limit(limit),
  ]);

  res.json({
    total,
    users,
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

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...rest } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.json(user);
};

const usersDelete = async (req, res) => {
  const { id } = req.params;
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { state: false });
  // const userAuthenticated = req.user;
  res.json({
    user,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
