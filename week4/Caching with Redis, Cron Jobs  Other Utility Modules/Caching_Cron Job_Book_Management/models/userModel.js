let mongoose = require ('mongoose');
let userSchema = new mongoose.Schema ({
  name: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});
let UserModel = mongoose.model ("User",userSchema);
module.exports = UserModel;
