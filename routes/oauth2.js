var mongoose = require("mongoose");
var express = require("express");
var passport = require("passport");
var router = express.Router();

var authController = require('../controllers/auth');
var oauth2Controller = require('../controllers/oauth2');


// Create endpoint handlers for oauth2 authorize
router.route('/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);


module.exports = router;
