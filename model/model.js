const mongoose = require('mongoose');
var schema = mongoose.Schema;

var storage = new schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});


var user = mongoose.model("dataStorage", storage);


module.exports = user;