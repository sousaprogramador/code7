const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth");

class AuthController {
  async store(req,res){
    const {email, password} = req.body;
    try {     
      const user = await User.findOne({ email }).select('+password'); 
      
      if(!user){
        return res.status(400).json({msg:"username or password invalid"})
      }

      if(!await bcrypt.compare(password,user.password)){
        return res.status(400).json({msg:"username or password invalid"})
      }

      const token = jwt.sign( { id:user._id } ,authConfig.secret,{
        expiresIn:86500,
       })

      return res.send({user,token});
    } catch (error) {
      return res.status(500).json({error});
    }
  }
}

module.exports = new AuthController();