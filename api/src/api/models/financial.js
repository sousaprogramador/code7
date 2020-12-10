const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Financial = Schema({
    client_id: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    reason : {
      type : String,
      required: true
    },
    value : {
      type : Number,
      required: true,
      min: 0,
      max: 255
    },
    created_at :{
      type : Date,
      default : new Date()
    }
});

module.exports = mongoose.model('Financial',Financial);