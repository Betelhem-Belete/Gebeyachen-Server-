const express = require("express");
const {
  handle_Items_post,
  handle_AllItems_get,
  handle_Items_put,
  handle_Items_delete,
  handle_Items_search,
  handel_Items_one,
  handle_oneItems_get,
  handle_UserItems_get,
} = require("../controller/items_Controller");
const Router = express.Router();

Router.post("/newitems", handle_Items_post);
Router.get("/catitems/:id", handel_Items_one);
Router.get("/allitems", handle_AllItems_get);
Router.get("/oneitem/:id", handle_oneItems_get);
Router.get("/useritems/:id", handle_UserItems_get);
Router.put("/itemsedit", handle_Items_put);
Router.delete("/itemsdelete", handle_Items_delete);
Router.get("/", handle_Items_search);

module.exports = Router;
