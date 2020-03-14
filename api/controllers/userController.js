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
        User.findOne({username: req.params.username}, function (err, user){
            if (user.username) {
                res.status(409).status()
            }
        }
        // Store user in database
        var new_user = new User({
            username: req.body.username,
            password: hash
        });
        new_user.save(function(err, user) {
            if (err){
                res.status(401).send(err);
            } else {
            res.status(201).send(user.username);
            }
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
                 res.status(401).send();
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
                 res.status(401).send();
                } 
              });
    });
}


