var mongoose = require("mongoose");
var express = require("express");

var User = mongoose.model('User');
var router = express.Router();

var authController = require('../controllers/auth');
router.use('/', authController.isAuthenticated);

// Create endpoint /api/users for POST
router.route('/')
    .post(function(req,res){

        var user = new User({
          username: req.body.username,
          password: req.body.password
        });

        user.save(function(err) {
          if (err)
            return res.send(err);

          res.json({ message: 'New user save!' });
        })
    })

     .get(function(req, res){ 
        User.find(function(err, users) {
            if (err)
              return res.send(err);

            res.json(users);
      });
    })
;

module.exports = router;
