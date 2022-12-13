const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const jwt = require("jsonwebtoken");

const verifyToken = catchAsyncErrors(async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err)
        res
          .status(403)
          .json({ statusCode: 403, message: "Token is not valid" });

      req.user = user;
      next();
    });
  } else {
    return res
      .status(403)
      .json({ statusCode: 401, message: "You are not authenticated!" });
  }
});

module.exports = {
  verifyToken,
};
