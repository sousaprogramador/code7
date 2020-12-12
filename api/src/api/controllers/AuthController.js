const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
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

      const token = jwt.sign( { id: "75253385b188d3113aea2cfe416dd0f3" } ,authConfig.secret,{
        expiresIn:86500,
       })

      return res.send({user,token});
    } catch (error) {
      return res.status(500).json({error});
    }
  }
}

module.exports = new AuthController();