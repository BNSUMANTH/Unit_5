let mongoose = require ('mongoose');
let bookSchema = new mongoose.Schema ({
  bookname: {type: String, required: true},
  description: {type: String},
  addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
let BookModel = mongoose.model ('Book', bookSchema);
module.exports = BookModel;
