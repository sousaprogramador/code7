const Financial = require('../models/financial');

module.exports = async (req,res) =>{
   const financial = new Financial(req.body);

   try {
     const save = await financial.save(); 

     return res.status(201).json({save});
   } catch (error) {
     console.log("error",error)
     //return res.status(500).json({error})
   }
   
}