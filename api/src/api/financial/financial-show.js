const Financial = require('../models/financial');

module.exports = async (req,res)=>{
  const {_id} = req.params;
  try {
    const financial = await Financial.findById(_id);
    return res.status(200).json({financial});
  } catch (error) {
    return res.status(500).json({err});
  }
}