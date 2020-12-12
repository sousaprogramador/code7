require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");
const mongoose = require('mongoose');

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.connect();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }

  connect(){
    mongoose.connect(process.env.MONGO_URL+process.env.MONGO_DB, { useNewUrlParser: true,useUnifiedTopology: true });
  }
}

module.exports = new AppController().express;