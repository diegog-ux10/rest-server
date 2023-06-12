const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
  const params = req.query;
  res.json({
    msg: "get API - Controller",
  });
};

const usersPost = (req, res = response) => {
  const { name, age } = req.body;
  res.json({
    msg: "post API - Controller",
    name,
    age,
  });
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
