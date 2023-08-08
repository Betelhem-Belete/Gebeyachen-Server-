const express = require("express");
const {
  handle_cat_post,
  handle_cat_get,
  handle_cat_put,
  handle_cat_delete,
} = require("../controller/cat_Controller");
const Router = express.Router();

Router.post("/newcat", handle_cat_post);
Router.get("/allcat", handle_cat_get);
Router.put("/catedit", handle_cat_put);
Router.delete("/catdelete", handle_cat_delete);

module.exports = Router;
