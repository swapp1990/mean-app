var mongoose = require('mongoose');
var Tasks = mongoose.model('Tasks');

module.exports.tasksGetAll = function(req, res) {
  var offset = 0;
  var count = 5;

  if(req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if(req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  Tasks
    .find()
    .skip(offset)
    .exec(function(err, tasks) {
      //console.log("Found Hotels", months.length);
      res.json(tasks);
    });
};

module.exports.taskCreateOne = function(req,res) {
  Tasks
    .create({
      name : req.body.name,
      percentage : req.body.percentage,
      counterMax: req.body.counterMax,
      category: req.body.category,
      type: req.body.type,
      month: req.body.month
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

var _splitArray = function(input) {
  var output;
  if(input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};
