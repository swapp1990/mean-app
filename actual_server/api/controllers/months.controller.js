var mongoose = require('mongoose');
var Month = mongoose.model('Month');

module.exports.monthGetAll = function(req, res) {
    var offset = 0;
    var count = 5;

    if(req.query && req.query.offset) {
     offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count) {
     count = parseInt(req.query.count, 10);
    }

  Month
        .find()
        .skip(offset)
        .exec(function(err, months) {
            console.log("Found Hotels", months.length);
            res.json(months);
        });
};

// module.exports.hotelsGetById = function(req, res) {
//     var hotelId = req.params.hotelId;
//     Hotel
//         .findById(hotelId)
//         .exec(function(err, doc) {
//             res.status(200).json(doc);
//         });
// };
//
// module.exports.hotelsAddOne = function(req, res) {
//     var db = dbconn.get();
//     var collection = db.collection('hotel');
//     var newHotel;
//
//     if(req.body && req.body.name && req.body.stars) {
//         newHotel = req.body;
//         newHotel.stars = parseInt(req.body.stars, 10);
//         collection.insertOne(newHotel, function(err, response) {
//             res.status(201).json(response.ops);
//         });
//
//     } else {
//        console.log("Data Missing from body");
//         res.status(200).json('Missing');
//     }
//
// };

