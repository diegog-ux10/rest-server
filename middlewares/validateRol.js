const { request, response } = require("express");

const validateRol = (request = request, response = response, next) => {
  if (!request.user) {
    return response.status(500).json({
      msg: "Token Error",
    });
  }
  const { role, name } = request.user;

  if (role !== "ADMIN_ROLE") {
    return response.status(401).json({
      msg: `${name} is not Admin`,
    });
  }
  next();
};

module.exports = {
  validateRol,
};
