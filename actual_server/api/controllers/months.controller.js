var mongoose = require('mongoose');
var Month = mongoose.model('Month');

var runCategoryQuery = function(req, res) {

};

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
            //console.log("Found Hotels", months.length);
            res.json(months);
        });
};

module.exports.getDataBasedOnQuery = function(req, res) {
  var query = {

  };

  if(req.query) {
    if(req.query.name) {
      query.name = req.query.name;
    }
  }
  Month
    .find()
    .where(query)
    //.where('details.Game','Gone Home')
    .exec(function(err, months) {
      console.log("Found Rows", months.length);
      res.json(months);
    });
};

module.exports.getDataByDetails = function(req, res) {
  var key = 'details.';
  key = key + req.query.key;

  Month
    .find()
    .where(key,req.query.value)
    .exec(function(err, months) {
      console.log("Found Rows", months.length);
      res.json(months);
    });
};

module.exports.monthGetCategory = function(req, res) {
  var query = {
    month: req.query.month
  };

  if(req.query && req.query.category) {
    console.log(req.query.category);
    query.category = req.query.category;
  }
  Month
    .find()
    .where(query)
    .exec(function(err, months) {
      console.log("Found Rows", months.length);
      res.json(months);
    });
};

//Aggregation function
module.exports.getTotalCost = function(req, res) {
  var query = {};
  if(req.query) {
    if(req.query.month) {
      query.month = req.query.month;
    }
    if(req.query.category) {
      query.category = req.query.category;
    }
    if(req.query && req.query.isIncome) {
      query.isIncome = req.query.isIncome;
    }
    if(req.query.isEssential) {
      query.isEssential = req.query.isEssential;
    }
  }
  Month.aggregate([
    {
      $match: query
    },
    {
      $group: {
        _id: {
          "category": "$category",
          "month": "$month"
        },
        balance: { $sum: "$price"  }
      }
    }
  ], function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    //console.log(result);
    res.json(result);
  });
}

module.exports.monthGetAllCost = function(req, res) {
  var query = {
    month: req.query.month
  };

  if(req.query && req.query.category) {
    query.category = req.query.category;
  }
  if(req.query && req.query.isIncome) {
    query.isIncome = req.query.isIncome;
  }

  Month
    .find()
    .where(query)
    .select('price')
    .exec(function(err, months) {
      //console.log("Found Rows", months.length);
      res.json(months);
    });
};

module.exports.monthGetAllNames = function(req, res) {
  var query = {

  };

  if(req.query && req.query.category) {
    query.category = req.query.category;
  }

  Month
    .find()
    .where(query)
    //.distinct(req.query.distinct)
    .distinct('name')
    .exec(function(err, months) {
      res.json(months);
    });
};

module.exports.monthGetAllDetails = function (req, res) {
  var query = {

  };

  Month
    .find()
    .where(query)
    .distinct('details')
    .exec(function(err, data) {
      res.json(data);
    });
};

module.exports.monthCreateOne = function(req,res) {
  Month
    .create({
      name : req.body.name,
      date : req.body.date,
      price : req.body.price,
      payment : req.body.payment,
      category: req.body.category,
      month: req.body.month,
      isIncome: req.body.isIncome,
      isEssential: req.body.isEssential,
      details: req.body.details
    }, function(err, body) {
      if(err) {
        console.log("Error creating new data");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Data Created");
        res
          .status(201)
          .json(body);
      }
    });
};

module.exports.monthDeleteOne = function(req,res) {
  var monthId = req.params.monthId;
  Month
    .findByIdAndRemove(monthId)
    .exec(function(err, doc) {
      if(err) {
        console.log("Error deleting month data");
        res.status(500).json(err);
      } else {
        console.log("Deleting month data successfull");
        res.status(204).json(doc);
      }
    });
};

module.exports.monthUpdateOne = function(req,res) {
  var monthId = req.params.monthId;
  Month
    .findById(monthId)
    //.select("-reviews -rooms") exclude nested models.
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if(err) {
        console.log("Error finding month data");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        response.status = 404;
        response.message = {
          "message": "Month Id not found"
        };
      }
      if(response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        //console.log("req " , req.body);
        if(req.body.name) {
          doc.name = req.body.name;
          doc.date = req.body.date;
          doc.price = req.body.price;
          doc.category = req.body.category;
          doc.payment = req.body.payment;
          doc.month = req.body.month;
          doc.isIncome = req.body.isIncome;
          doc.isEssential = req.body.isEssential;
          if(req.body.details) {
            doc.details = req.body.details;
          } else {
            // var value = {"val1": 5, "val2": "hello"};
            // doc.details = value;
          }
          console.log("doc " , doc);
          //services = _splitArray(req.body.services),
          doc.save(function(err, monthUpdated) {
            if(err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(monthUpdated);
            }
          });
        }
      }
    });
};

var _splitArray = function(input) {
  var output;
  if(input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};

// module.exports.hotelsGetById = function(req, res) {
//     var hotelId = req.params.hotelId;
//     Hotel
//         .findById(hotelId)
//         .exec(function(err, doc) {
//             res.status(200).json(doc);
//         });
// };

// module.exports.dataAddOne = function(req, res) {
//     var db = dbconn.get();
//     var collection = db.collection('october');
//     var newHotel;
//
//     if(req.body) {
//         newHotel = req.body;
//         collection.insertOne(newHotel, function(err, response) {
//             res.status(201).json(response.ops);
//         });
//
//     } else {
//        console.log("Data Missing from body");
//         res.status(200).json('Missing');
//     }xw
// };

