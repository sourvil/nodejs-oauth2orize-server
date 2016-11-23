var mongoose = require("mongoose");
var express = require("express");

var Client = mongoose.model('Client');
var router = express.Router();

// Create endpoint /api/users for POST
router.route('/')
    .post(function(req,res){

          // Create a new instance of the Client model
            var client = new Client();

            // Set the client properties that came from the POST data
            client.name = req.body.name;
            client.id = req.body.id;
            client.secret = req.body.secret;
            //client.userId = req.user._id;
            client.userId = "579479067793eb600f2566f7";

            // Save the client and check for errors
            client.save(function(err) {
                if (err)
                return res.send(err);

                res.json({ message: 'Client is saved.', data: client });
            });
            
    })

     .get(function(req, res){ 
        //Client.find({ userId: req.user._id }, function(err, clients) {
        Client.find({ userId: "579479067793eb600f2566f7" }, function(err, clients) {
            if (err)
            return res.send(err);

            res.json(clients);
        });
    })
;

module.exports = router;
