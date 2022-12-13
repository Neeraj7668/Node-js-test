const Users = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
// const { signUpSchema } = require("../helper/validatorSchema");
const ErrorHandler = require("../utils/ErrorHandler");
const { getAllUsers, getAllDepartment } = require("../helper/common");

exports.createNewAccount = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user)
    return next(
      new ErrorHandler(`${req.body.email} is already been registered.`, 400)
    );

  const newUser = new Users(req.body);

  try {
    const saveUser = await newUser.save();
    const accessToken = jwt.sign(
      { _id: saveUser._id, role: saveUser.role },
      process.env.JWT_SECRET
    );
    const { password, role, ...others } = saveUser._doc;

    res.status(201).json({
      statusCode: 201,
      message: "User has been created successfully",
      data: { ...others, accessToken },
    });
  } catch (error) {
    next(error);
  }
});

exports.loginAccount = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user)
    return next(new ErrorHandler(`${req.body.email} is not registered.`, 400));
  const isMatch = await user.isValidPassword(req.body.password);

  if (!isMatch) return next(new ErrorHandler(`Invalid Username/Password`, 400));
  try {
    const accessToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    const { password, role, ...others } = user._doc;

    res.status(200).json({
      statusCode: 200,
      message: "User has been loggedIn successfully",
      data: { ...others, accessToken },
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const user = await getAllUsers();

  return res.status(200).json({
    statusCode: 200,
    message: "All users",
    data: user?.users,
  });
});

// Example for Aggregate Lookup property

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const departments = await Users.aggregate([
    {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "departmentName",
        as: "departmentDetail",
      },
    },
  ]);
  res.status(200).json({
    statusCode: 200,
    message: "All Department",
    data: departments,
  });
});

// 4. Example for populate on a array field (like: postIds:['asd345566666','dfsfs2342frfrsd'])

exports.insertDepartment = catchAsyncErrors(async (req, res, next) => {
  const user = await Users.findByIdAndUpdate(req.params.id, {
    $addToSet: {
      departmentIds: req.body.departmentIds,
    },
  });

  return res.status(200).json({
    statusCode: 200,
    message: "Department has been added successfully",
  });
});

exports.getDepartmentWithPopulate = catchAsyncErrors(async (req, res, next) => {
  const userDetails = await Users.find().populate("departmentIds");
  res.status(200).json({
    statusCode: 200,
    message: "All Department",
    data: userDetails,
  });
});

// 6. Example for promise.all & resolve, reject

exports.get_all_user_and_department = catchAsyncErrors(
  async (req, res, next) => {
    const user = getAllUsers();
    const department = getAllDepartment();

    Promise.all([user, department])
      .then((resolve) => {
        return res.status(200).json({
          statusCode: 200,
          message: "All users and department",
          data: resolve,
        });
      })
      .catch((reject) => {
        next(reject);
      });
  }
);
