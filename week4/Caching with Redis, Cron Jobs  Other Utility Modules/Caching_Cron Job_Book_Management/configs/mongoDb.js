let mongoose = require ('mongoose');
require ('dotenv').config ();
let connectToDb = async () => {
  try {
    await mongoose.connect (process.env.mongoUrl);
    console.log ('Connected to Db');
  } catch (error) {
    console.log (error.message);
  }
};

module.exports = connectToDb;
