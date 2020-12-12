const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = Schema({
    name: {
      type: String,
      required: true,
    },
    email : {
      type : String,
      required: true
    },
    password : {
      type : String,
      required: true,
      select:false,
    },
    created_at :{
      type : Date,
      default : new Date()
    }
});

User.pre('save',async function (next){
  const hash = await bcrypt.hash(this.password,10);
  this.password = hash;

  next();
})

module.exports = mongoose.model('User',User);