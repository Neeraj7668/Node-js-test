const Users = require("../models/userModel");
const Department = require("../models/departmentModel");

const getAllUsers = async () => {
  const users = await Users.find();
  return { users };
};

const getAllDepartment = async () => {
  const department = await Department.find();
  return { department };
};

module.exports = {
  getAllUsers,
  getAllDepartment,
};
