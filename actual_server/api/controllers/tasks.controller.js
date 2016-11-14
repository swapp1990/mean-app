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

module.exports.tasksGetCategory = function(req, res) {
  var query = {

  };

  if(req.query && req.query.month) {
    query.month = req.query.month
  }
  // if(req.query.category) {
  //   //console.log(req.query.category);
  //   query.category = [req.query.category];
  // }
  Tasks
    .find({category: req.query.category})
    .where()
    .exec(function(err, tasks) {
      //console.log("Found Rows", months.length);
      res.json(tasks);
    });
};

module.exports.taskCreateOne = function(req,res) {

  Tasks
    .create({
      name : req.body.name,
      percentage : req.body.percentage,
      weight: req.body.weight,
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

// GET all counters for a task
module.exports.countersGetAll = function(req, res) {
  var id = req.params.taskId;
  console.log('GET counters for taskId', id);

  Tasks
    .findById(id)
    .select('counters')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding task");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("Task id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Task ID not found " + id
        };
      } else {
        response.message = doc.counters ? doc.counters : [];
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

var _addTask = function (req, res, task) {

  task.counters.push({
    counter : req.body.counter,
    datePerformed : req.body.datePerformed,
    percentageGot : req.body.percentageGot
  });
  task.save(function(err, taskUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(taskUpdated.counters[taskUpdated.counters.length - 1]);
    }
  });

};

module.exports.counterAddOne = function(req, res) {
  console.log('POST counter to taskId');

  var id = req.params.taskId;
  Tasks
    .findById(id)
    .select('counters')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding Task");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("TaskId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Task ID not found " + id
        };
      }
      if (doc) {
        _addTask(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });

};

module.exports.taskUpdateOne = function(req,res) {
  var taskId = req.params.taskId;
  Tasks
    .findById(taskId)
    //.select("-reviews -rooms") exclude nested models.
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if(err) {
        console.log("Error finding task data");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        response.status = 404;
        response.message = {
          "message": "Task Id not found"
        };
      }
      if(response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        //console.log("req " + req.body.name + " res " + doc.name);
        if(req.body.name) {
          doc.name = req.body.name;
          doc.percentage = req.body.percentage;
          doc.weight = req.body.weight;
          doc.counterMax = req.body.counterMax;
          doc.category = req.body.category;
          doc.type = req.body.type;
          doc.month = req.body.month;
          //services = _splitArray(req.body.services),
          doc.save(function(err, taskUpdated) {
            if(err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(taskUpdated);
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
