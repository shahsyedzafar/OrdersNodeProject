// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router()

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/telecom/bear'); // connect to our database

var Bear     = require('./app/models/bear');
var Order    = require('./app/models/Order');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//loading static files
//app.use(express.static());

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname + '/public')));

app.get('/', function(req, res) {
    console.log("First request");
    res.sendFile(path.join(__dirname+'/public/index.html'));
});



var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

    console.log("in api")
    //res.json({ message: 'hooray! welcome to our api!' });   
});




var router = express.Router();              // get an instance of the express Router
// more routes for our API will happen here
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    })


    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

router.route('/orders')
    
    .get(function(req, res) {
        Order.find(function(err, orders) {
            if (err)
                res.send(err);


            res.json(orders);
        });

    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);