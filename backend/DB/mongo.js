const mongoose= require('mongoose');
// const dotenv = require('dotenv-defaults');
// dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connect to mongoDB'))
  .catch((err) => console.log(err));