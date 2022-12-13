const express = require("express");
const {
  createDepartMent,
  getAllDepartment,
} = require("../controllers/departmentController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.route("/create_department").post(verifyToken, createDepartMent);
router.route("/departments").get(verifyToken, getAllDepartment);

module.exports = router;
