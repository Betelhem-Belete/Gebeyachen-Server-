const items = require("../model/ITEMS");
const catagory = require("../model/CATAGORY");
const User = require("../model/USERMODEL");

const handle_Items_post = async (req, res) => {
  const {
    Item_Name,
    Item_Description,
    Item_Brand,
    Item_Price,
    Item_Images,
    Item_Category,
    Item_poster,
  } = req.body;

  if (
    !Item_Name ||
    !Item_Description ||
    !Item_Brand ||
    !Item_Price ||
    !Item_Images ||
    !Item_Category ||
    !Item_poster
  ) {
    return res.status(400).json({ message: "fill all the space" });
  }

  // const checking_user = await User.findById({ _id: Item_poster });
  // const checking_cat = await catagory.findById({ _id: Item_Category });

  // if (!checking_cat) {
  //   return res.status(400).json({ message: "Unknown category" });
  // }

  // if (!checking_user) {
  //   return res.status(400).json({ message: "unauthorized user" });
  // }

  try {
    var item = await items.create({
      Item_Name,
      Item_Description,
      Item_Brand,
      Item_Price,
      Item_Images,
      Item_Category,
      Item_poster,
    });
    item = await item.populate("Item_Category");
    item = await item.populate("Item_poster");

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
////////////////////////
const handel_Items_one = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "no category found" });
  }
  try {
    const cat_one = await items.find({ Item_Category: id });
    if (!cat_one) {
      return res.status(400).json({ message: "no category found" });
    }
    return res.status(200).json({ cat_one });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//////////////////////
const handle_UserItems_get = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "no category found" });
  }
  try {
    const cat_one = await items.find({ Item_poster: id });
    if (!cat_one) {
      return res.status(400).json({ message: "no category found" });
    }
    return res.status(200).json({ cat_one });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
////////////////////////
const handle_AllItems_get = async (req, res) => {
  try {
    const all_Items = await items
      .find()
      .sort({ createdAt: -1 })
      .populate("Item_poster")
      .populate("Item_Category");
    return res.status(200).json({ all_Items });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//////////////////////////
const handle_oneItems_get = async (req, res) => {
  const id = req.params.id;
  try {
    const all_Items = await items
      .findById(id)
      .populate("Item_poster")
      .populate("Item_Category");
    return res.status(200).json({ all_Items });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
/////////////////////////////
const handle_Items_put = async (req, res) => {
  const {
    Item_Name,
    Item_Description,
    Item_Brand,
    Item_Price,
    Item_Images,
    Item_Category,
    Item_id,
    user_id,
  } = req.body;

  if (!Item_id || !user_id) {
    return res.status(400).json({ message: "unknown item or user" });
  }

  const changing = {};

  if (Item_Name) {
    changing.Item_Name = Item_Name;
  }

  if (Item_Description) {
    changing.Item_Description = Item_Description;
  }

  if (Item_Brand) {
    changing.Item_Brand = Item_Brand;
  }

  if (Item_Price) {
    changing.Item_Price = Item_Price;
  }

  if (Item_Images) {
    changing.Item_Images = Item_Images;
  }

  if (Item_Category) {
    changing.Item_Category = Item_Category;
  }

  try {
    const checking_user = await User.findById(user_id);
    const checking_item = await items.findById(Item_id);

    if (!checking_user || !checking_item) {
      return res.status(400).json({ message: "unauthorized user or item" });
    }
    const item = await items.findByIdAndUpdate(Item_id, changing, {
      new: true,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
///////////////////////////
const handle_Items_delete = async (req, res) => {
  const { user_id, item_id } = req.body;
  if (!user_id || !item_id) {
    return res.status(400).json({ message: "no user and item" });
  }
  try {
    const checking_user = await User.findById(user_id);
    const checking_item = await items.findById(item_id);

    if (!checking_user || !checking_item) {
      return res.status(400).json({ message: "unauthorized user or item" });
    }

    const deleting = await items.findByIdAndDelete(item_id);
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
///////////////////////////
const handle_Items_search = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { Item_Brand: { $regex: req.query.search, $options: "i" } },
          { Item_Name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const Item = await items.find(keyword);
  //
  return res.json({ Item });
};
module.exports = {
  handle_Items_search,
  handle_Items_post,
  handle_AllItems_get,
  handle_Items_put,
  handle_Items_delete,
  handel_Items_one,
  handle_oneItems_get,
  handle_UserItems_get,
};
