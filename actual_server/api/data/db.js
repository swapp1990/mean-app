var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/monthly_spend';

mongoose.connect(dburl);

mongoose.connection.on('connected',function() {
 console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('disconnected',function() {
 console.log('Mongoose disconnected');
});
mongoose.connection.on('error',function() {
 console.log('Mongoose connection error: ' + err);
});

process.on('SIGINT', function() {
    mongoose.connection.close( function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

//Bring in schemas and models
require('./hotels.model.js');
require('./month.model.js');
require('./tasks.model.js');
