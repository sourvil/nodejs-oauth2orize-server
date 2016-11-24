var mongoose = require("mongoose");
var express = require("express");

var Client = mongoose.model('Client');
var router = express.Router();

var authController = require('../controllers/auth');
router.use('/', authController.isAuthenticated);

// Create endpoint /api/users for POST
router.route('/')
    .post(function(req,res){

          // Create a new instance of the Client model
            var client = new Client();

            // Set the client properties that came from the POST data
            client.name = req.body.name;
            client.id = req.body.id;
            client.secret = req.body.secret;
            client.userId = req.user._id;

            // Save the client and check for errors
            client.save(function(err) {
                if (err)
                return res.send(err);

                res.json({ message: 'Client is saved.', data: client });
            });
            
    })

     .get(function(req, res){ 
        Client.find({ userId: req.user._id }, function(err, clients) {
            if (err)
            return res.send(err);

            res.json(clients);
        });
    })
;

module.exports = router;
