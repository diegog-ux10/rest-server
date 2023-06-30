const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role) => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`Role ${role} Does not exist`);
  }
};

const emailExists = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`The Email ${email} exists`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
};
