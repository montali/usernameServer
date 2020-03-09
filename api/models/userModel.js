'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Kindly enter the username'
  },
  password: {
    type: String,
    required: 'Kindly enter the password'
  },
  connectionID: {
    type: String
  },
});

module.exports = mongoose.model('Users', UserSchema);