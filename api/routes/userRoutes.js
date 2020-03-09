'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');

  // todoList Routes
  app.route('/signup')
    .post(userController.signUp);

  app.route('/id/:username')
    .get(userController.getUserID)
    .post(userController.login)
    .delete(userController.logout);
};
