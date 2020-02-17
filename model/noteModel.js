var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema;

var noteSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    discription: {
        type: String,
        required: true
    },

    title: {

        type: String,

    },
    image :{
        type : String
    }

})


exports.notes = mongoose.model("notes", noteSchema);
