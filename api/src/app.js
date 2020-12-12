require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')

class AppController {
  constructor() {
    this.express = express();
    this.cors();
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

  cors(){
    this.express.use(cors());
  }

  connect(){
    mongoose.connect(process.env.MONGO_URL+process.env.MONGO_DB, { useNewUrlParser: true,useUnifiedTopology: true });
  }
}

module.exports = new AppController().express;