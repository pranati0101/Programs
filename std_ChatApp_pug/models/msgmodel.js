'use strict';
var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var msgSchema = new Schema({
      user: String,
      message: String,
      time: {
        type: Date,
        default: Date.now()
      }
    });
  module.exports = mongoose.model('Message', msgSchema);
// })
