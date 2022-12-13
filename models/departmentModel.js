const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, "Please enter your departmentName"],
      unique: true,
    },
    code: {
      type: String,
      required: [true, "Please enter department code"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("department", departmentSchema);
