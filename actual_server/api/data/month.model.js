var mongoose = require('mongoose');

var monthSchema = new mongoose.Schema({
    name : {
        type : String
    },
    date : {
        type : Number,
        min : 1,
        max : 31,
        default : 1
    },
    price : Number,
    category : String,
    payment : String,
    type : String,
    month: String,
    isIncome: String,
    details: String
});

mongoose.model('Month', monthSchema, 'monthlySpent');
