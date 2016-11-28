var mongoose = require("mongoose");
var express = require("express");

var carModel = mongoose.model('Car');
var router = express.Router();

var authController = require('../controllers/auth');
//router.use('/', authController.isBearerAuthenticated);
router.use('/', authController.isClientAuthenticated);

router.route('/')
    .post(function(req,res){
        
        var car = new carModel();
        car.owner = req.body.owner;
        car.year = req.body.year;

        car.save(function( err, car){
            if(err){
                console.log('car could not be saved!');
                return res.send(500, err);
            }
            console.log(req.body.owner + ' \'s ' + req.body.year + ' year of car is saved');
            return res.json(car);
        });
    })

    .get(function(req, res){
        carModel.find(function(err, cars){
            if(err)
                return res.send(500, err);
            return res.send(cars);
        })
    })
;

router.route('/:id')
    .put(function(req, res){
        carModel.findById(req.params.id, function(err, car){
            if(err)
                return res.send(err);
            
            car.owner = req.body.owner;
            car.year = req.body.year;

            car.save(function(err, car){
                if(err)
                    res.send(err);
                return res.json(car);
            });
        })
    })

    .get(function(req, res){
        carModel.findById(req.params.id, function(err, car){
            if(err)
                return res.send(err);
            return res.json(car);
        })
    })
    .delete( function(req,res){
        carModel.findById(req.params.id, function(err, car){
            if(err)
                return res.send(err);
            car.remove(function(err){
                if(err)
                    return res.send(err);
                return res.json("car is deleted");
            });
        })
    })
;

module.exports = router;
