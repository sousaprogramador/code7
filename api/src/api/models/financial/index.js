const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Financial = Schema({
    client_id: {
      type: Number,
      required: true,
    },
    motive : {
      type : String,
      required: true
    },
    amount : {
      type : Number,
      required: true,
    },
    date : {
      type : Date,
      required: true,
    },
    created_at :{
      type : Date,
      default : new Date()
    }
});

module.exports = mongoose.model('Financial',Financial);