var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';
var dbUrlMongoLab = 'mongodb://swapp1990:sS56291149@ds041546.mlab.com:41546/my-tasks';

var _connection = null;

var open = function() {
    MongoClient.connect(dbUrlMongoLab, function(err, db) {
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
