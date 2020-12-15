const User = require('../models/User');

class UserController {
  async index(req,res){
    try {
      const user = await User.find({});
      return res.status(200).json({user});
    } catch (error) {
      return res.status(500).json({error});
    }
  }

  async store(req,res){
   const user = new User(req.body);
   try {    
     const save = await user.save(); 

     return res.status(201).json({save});
   } catch (error) {
     return res.status(500).json({error});
   }
  }
  
  async show(req,res){
    const {_id} = req.params;
    try {
      const user = await User.findById(_id);
      return res.status(200).json({user});
    } catch (error) {
      return res.status(500).json({err});
    }
  }

  async update(req,res) {
    const { _id } = req.params;
    try {
      const user = await User.findOne({ _id });
      user.overwrite(req.body);
      await user.save();
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async destroy(req,res){
    const { _id } = req.params;
    try {
      User.deleteOne({ _id }, function(error) {
        if (error) {
         res.status(503).send({ message: "erro ao deletar" });
        } else {
         res.status(200).send({ message: "registro deletado com sucesso" });
        }
       });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new UserController();