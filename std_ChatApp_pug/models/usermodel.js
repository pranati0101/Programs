'use strict';
var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var userSchema = new Schema({
    name: {
      type: String,
      unique: true
    },
    password: String,
    lastLogin: Date
  });
module.exports = mongoose.model('User', userSchema);
