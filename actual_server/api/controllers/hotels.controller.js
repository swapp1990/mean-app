var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.hotelsGetAll = function(req, res) {
    var offset = 0;
    var count = 5;
    
    if(req.query && req.query.offset) {
     offset = parseInt(req.query.offset, 10);   
    }
    if(req.query && req.query.count) {
     count = parseInt(req.query.count, 10);   
    }
    
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            console.log("Found Hotels", hotels.length);
            res.json(hotels);
        });
    
//    collection.find()
//    .skip(offset)
//    .limit(count)
//    .toArray(function(err, docs) {
//        console.log("Hotels", docs);
//        res.status(200).json(docs);
//    });
};

module.exports.hotelsGetById = function(req, res) {
    var hotelId = req.params.hotelId;
    Hotel
        .findById(hotelId)
        .exec(function(err, doc) {
            res.status(200).json(doc);
        });
};

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotel');  
    var newHotel;
    
    if(req.body && req.body.name && req.body.stars) { 
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        collection.insertOne(newHotel, function(err, response) { 
            res.status(201).json(response.ops);
        });
        
    } else {
       console.log("Data Missing from body"); 
        res.status(200).json('Missing');
    }
  
};

