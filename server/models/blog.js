var mongoose = require('mongoose');

// User Schema
var BlogSchema = mongoose.Schema({
  title: {
    type: String,
    index:true
  },
  body: {
    type: String
  }
});

var Blog = module.exports = mongoose.model('Blog', BlogSchema);
