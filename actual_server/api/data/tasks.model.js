var mongoose = require('mongoose');

var counterSchema = new mongoose.Schema({
  counter : Number,
  datePerformed : {
    type : Number,
    min : 1,
    max : 31,
    default : 1
  },
  percentageGot: Number
});

var tasksSchema = new mongoose.Schema({
    name : {
        type : String
    },
    percentage : Number,
    weight : {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    counters : [counterSchema],
    counterMax: Number,
    category : [String],
    type : String,
    month: String
});

  mongoose.model('Tasks', tasksSchema, 'monthlyTasks');
