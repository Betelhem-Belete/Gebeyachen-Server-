const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user_router = require('./router/User_router');
const cat_router = require('./router/Catagory_router');
const items_router = require('./router/Items_router');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use('/ip/user', user_router);
app.use('/ip/cat', cat_router);
app.use('/ip/item', items_router);
