const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ITEMS_SCHEMA = schema(
  {
    Item_Name: { type: "String", required: true },
    Item_Description: { type: "String", required: true },
    Item_Brand: { type: "String", required: true },
    Item_Category: { type: mongoose.Schema.Types.ObjectId, ref: "catagory" },
    Item_Price: { type: "Number", required: true },
    Item_Images: {
      type: "String",
      required: true,
      default:
        "https://res.cloudinary.com/yeabtsega/image/upload/v1683738835/cld-sample-5.jpg",
    },
    Item_poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("items", ITEMS_SCHEMA);
