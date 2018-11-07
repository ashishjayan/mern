const mongoose = require("mongoose");
//all done creating the model
const Schema = mongoose.Schema;

//create schema

const ItemSchema = new Schema({
  student: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  gpa: {
    type: String,
    require: true
  }
});

module.exports = Item = mongoose.model("grade", ItemSchema);
