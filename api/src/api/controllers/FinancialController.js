const Financial = require('../models/financial');

class FinancialController {
  async index(req,res){
    try {
      const financial = await Financial.find({});
      return res.status(200).json({ financial });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req,res){
   const financial = new Financial(req.body);
   try {     
     const save = await financial.save(); 

     return res.status(201).json({ save });
   } catch (error) {
     return res.status(500).json({ error });
   }
  }
  
  async show(req,res){
    const { _id } = req.params;
    try {
      const financial = await Financial.findById({ _id });
      return res.status(200).json({ financial });
    } catch (error) {
      return res.status(500).json({ err });
    }
  }

  async update(req,res) {
    const { _id } = req.params;
    try {
      const financial = await Financial.findOne({ _id });
      financial.overwrite(req.body);
      await financial.save();
      return res.status(200).json({ financial });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async destroy(req,res){
    const { _id } = req.params;
    try {
      const financial = await Financial.findOne({ _id });
      await financial.remove();
      return res.status(200);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new FinancialController();