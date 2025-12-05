let mongoose = require("mongoose");

const AdminRegister = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/,
        "Please fill a valid email address",
      ],
    },

    isInitialAdmin: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      trim: true,
    },

    otpExpires: {
      type: Date,
    },
  },

  // ✔ Correct place for schema options
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AdminData", AdminRegister);
