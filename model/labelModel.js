const mongoose = require('mongoose');
var schema = mongoose.Schema;

var labMod = new schema({

    label:{
        type : String,
        required: true
    },

    user_id : {
        type : Array
    }
 
},
{
    timestamps: true
});


var labz = mongoose.model("labels", labMod);


module.exports = labz;