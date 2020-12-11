const Financial = require('../models/financial');

module.exports = async (req,res)=>{
  try {
    const financial = await Financial.find({});
    return res.status(200).json({financial});
  } catch (error) {
    return res.status(500).json({err});
  }
}