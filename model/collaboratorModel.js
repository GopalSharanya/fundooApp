var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;

var collSchema = new Schema({
    userId : {
        type : String,
        required: true
    },

    collbId : [{
        type : Array,
        required: true
    }],

    noteId : {
        type: String,
        required:true
    
    }
},
{
    timestamps: true
})

exports.ids = mongoose.model("collab", collSchema);