const mongoose = require("mongoose");
const schema = mongoose.Schema;

const catagory_schema = schema(
  {
    catagory_Name: { type: "String", required: true, unique: true },
    cat_description: { type: "String", required: true },
    cat_pic: {
      type: "String",
      required: true,
      default:
        "https://res.cloudinary.com/yeabtsega/image/upload/v1683738835/cld-sample-5.jpg",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("catagory", catagory_schema);
