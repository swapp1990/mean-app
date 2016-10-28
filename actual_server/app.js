//require('./api/data/dbconnection.js').open(); //Intialize connection to native db.
require('./api/data/db.js')
var express = require('express');
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');
var app = express();

// Define the port to run on
app.set('port', 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
console.log("Me first!");
