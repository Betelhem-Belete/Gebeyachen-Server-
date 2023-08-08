const catagory = require("../model/CATAGORY");
const User = require("../model/USERMODEL");

const handle_cat_post = async (req, res) => {
  const { catagory_Name, cat_description, cat_pic } = req.body;
  if (!catagory_Name || !cat_description || !cat_pic) {
    return res.status(400).json({ message: "fill all the space" });
  }
  try {
    const checking = await catagory.findOne({ catagory_Name });
    if (checking) {
      return res.status(400).json({ message: "category already exists" });
    }
    const catagorys = await catagory.create({
      catagory_Name,
      cat_description,
      cat_pic,
    });
    if (!catagorys) {
      return res.status(400).json({ message: "no category added" });
    }
    return res.status(200).json({ catagorys });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const handle_cat_get = async (req, res) => {
  const cats = await catagory.find();
  return res.status(200).json({ cats });
};

const handle_cat_put = async (req, res) => {
  const { catagory_Name, cat_description, cat_pic, admin_id, cat_id } =
    req.body;
  if (!admin_id) {
    return res.status(400).json({ message: "unknown admin" });
  }
  if (!cat_id) {
    return res.status(400).json({ message: "unknown catagory" });
  }
  let obj = {};
  if (catagory_Name) {
    obj.catagory_Name = catagory_Name;
  }
  if (cat_description) {
    obj.cat_description = cat_description;
  }
  if (cat_pic) {
    obj.cat_pic = cat_pic;
  }
  try {
    const checking_adminID = await User.findOne({
      _id: admin_id,
      isAdmin: true,
    });

    if (!checking_adminID) {
      return res.status(400).json({ message: "Only admin can make changes" });
    }
    const updated_cat = await catagory.findByIdAndUpdate(cat_id, obj, {
      new: true,
    });
    return res.status(200).json({ updated_cat });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const handle_cat_delete = async (req, res) => {
  const { admin_id, cat_id } = req.body;
  if (!admin_id) {
    return res.status(400).json({ message: "unknown admin" });
  }
  if (!cat_id) {
    return res.status(400).json({ message: "unknown catagory" });
  }
  try {
    const checking_adminID = await User.findOne({
      _id: admin_id,
      isAdmin: true,
    });
    if (!checking_adminID) {
      return res.status(400).json({ message: "Only admin can make changes" });
    }
    const delete_cat = await catagory.findByIdAndDelete(cat_id);
    return res.status(200).json({ delete_cat });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  handle_cat_post,
  handle_cat_get,
  handle_cat_put,
  handle_cat_delete,
};
