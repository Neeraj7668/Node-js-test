const Department = require("../models/departmentModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createDepartMent = catchAsyncErrors(async (req, res, next) => {
  const newDepartment = new Department(req.body);
  try {
    const saveDepartment = await newDepartment.save();

    res.status(201).json({
      statusCode: 201,
      message: "Department has been created successfully",
      data: saveDepartment,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllDepartment = catchAsyncErrors(async (req, res, next) => {
  const departments = await Department.find();
  res.status(200).json({
    statusCode: 200,
    message: "All Department",
    data: departments,
  });
});
