var mongoose = require('mongoose');
//this middleware is used to check for duplicates case insensitively
var uniqueValidator = require('mongoose-unique-validator');

var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
	uniqueCaseInsensitive: true
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  },
  fields: {
    type: [String]
  }
});

Schema.plugin(uniqueValidator, {message: 'Agency Name Must Be Unique'});

var Category = module.exports = mongoose.model('category', Schema);

module.exports.createCategory = function(newCategory, callback) {
  newCategory.save(callback);
};

module.exports.findAllCategories = function(callback) {
  Category.find({}, callback);
};

module.exports.findCategoryByID = function(id, callback) {
  Category.findById(id, callback);
};

module.exports.findCategoryByName = function(name, callback) {
  Category.findOne({
    name: name
  }, callback);
};

module.exports.removeCategory = function(id, callback) {
  Category.remove({_id: id}).exec(callback);
};
