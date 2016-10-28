var mongoose = require('mongoose');

var monthSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
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
    type : String
});

mongoose.model('Month', monthSchema, 'october');