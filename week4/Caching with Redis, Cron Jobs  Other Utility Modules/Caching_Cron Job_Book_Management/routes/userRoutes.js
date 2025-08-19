let express = require ('express');
let userRouter = express.Router ();

const bcrypt = require ('bcrypt');
const UserModel = require ('../models/userModel');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var jwt = require('jsonwebtoken');

// signup
userRouter.post ('/signup', async (req, res) => {
  try {
    let {name, password, email} = req.body;

    bcrypt.hash (password, saltRounds, async function (err, hash) {
      if (err) {
        return res.status (200).json ({message: 'Something went Wrong'});
      }
      let newUser = await UserModel.create ({name, email, password: hash});
      res.status (201).json ({message: 'Signup Success', newUser});
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});
// login
userRouter.post ('/login', async (req, res) => {
  try {
    let {email, password} = req.body;
    let user = await UserModel.findOne ({email});
    if (!user) {
      return res.status (400).json ({message: 'User not found , please login'});
    }
    let hash = user.password ;
    bcrypt.compare (password, hash, function (err, result) {
      if(result){
        var token = jwt.sign({ userId:user._id }, process.env.jwt_security_key,{expiresIn:500});
        res.status(200).json({message:"Login in success",token})
      }else{
        res.status(200).json({message:"Password Wrong"})
      }
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});
module.exports = userRouter;
