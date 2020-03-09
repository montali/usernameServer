'use strict';


const bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
  User = mongoose.model('Users');


exports.getUserID = function(req, res) {
    User.findOne({username: req.params.username}, function (err, user){
    if (err)
        res.send(err);
    res.send(user.connectionID);
    });
}
exports.signUp = function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        // Store user in database
        var new_user = new User({
            username: req.body.username,
            password: hash
        });
        new_user.save(function(err, user) {
            if (err)
                res.send(err);
            res.send(user.username);
        });
      });
}

exports.login = function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
        if(err)
            res.send(err);
        bcrypt.compare(req.body.password, user.password, function(err, hashRes) {
                if(hashRes) {
                 // Passwords match
                 user.connectionID = req.body.connectionID;
                 user.save();
                 res.send(req.params.username);
                } else {
                 // Passwords don't match
                 res.send();
                } 
              });
    });
}
exports.logout = function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
        if(err)
            res.send(err);
        bcrypt.compare(req.body.password, user.password, function(err, hashRes) {
                if(hashRes) {
                 // Passwords match
                 user.connectionID = req.body.connectionID;
                 user.save();
                 res.send(req.params.username);
                } else {
                 // Passwords don't match
                 res.send();
                } 
              });
    });
}


