const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const userModel = schema(
  {
    Name: { type: "String", required: true },
    Email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    Phone: { type: "Number", required: true },
    Address: { type: "String", required: true },
    //   Ads: { type: mongoose.Schema.Types.ObjectId, ref: "ITEMS" },
  },
  { timestamps: true }
);

userModel.statics.signup = async function (
  Name,
  Email,
  password,
  pic,
  isAdmin,
  Phone,
  Address
) {
  if (!Email || !password || !Name || !Phone || !Address) {
    throw Error("fill the space first");
  }
  const match = await this.findOne({ Email });

  if (match) {
    throw Error("user alrady exists");
  }
  if (!validator.isEmail(Email)) {
    throw Error("invalid email");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await this.create({
    Name,
    Email,
    password: hashed,
    pic,
    isAdmin,
    Phone,
    Address,
  });
  return user;
};
userModel.statics.login = async function (Email, password) {
  if (!Email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ Email });
  if (!user) {
    throw Error("user not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};
const User = mongoose.model("user", userModel);
module.exports = User;
