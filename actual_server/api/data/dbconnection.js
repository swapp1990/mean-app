var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

var open = function() {
    MongoClient.connect(dburl, function(err, db) {
        if(err) {
            console.log('Error: ', err);
            return;
        }
        _connection = db;
        console.log("DB Connection Open");
    });
};

var get = function() {
    return _connection;
};

module.exports = {
   open : open,
    get : get
};