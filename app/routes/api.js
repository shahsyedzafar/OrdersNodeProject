var express = require('express')
var router = express.Router()
var Bear     = require('../models/bear');



    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post(function(req, res) {
    
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    });

    router.get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


