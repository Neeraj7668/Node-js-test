const express = require("express");
const {
  createNewAccount,
  loginAccount,
  getUserDetails,
  insertDepartment,
  getDepartmentWithPopulate,
  getAllUser,
  get_all_user_and_department,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/register").post(createNewAccount);
router.route("/login").post(loginAccount);
router.route("/all_users").get(getAllUser);

// Example for Aggregate Lookup property

router.route("/get_user_detail").get(verifyToken, getUserDetails);

// 4. Example for populate on a array field (like: postIds:['asd345566666','dfsfs2342frfrsd'])
router.route("/add_departmentIds/:id").put(verifyToken, insertDepartment);
router
  .route("/get_user_details_with_populate")
  .get(verifyToken, getDepartmentWithPopulate);

//  Example for promise.all & resolve, reject

router.route("/get_all_user_and_department").get(get_all_user_and_department);

module.exports = router;
