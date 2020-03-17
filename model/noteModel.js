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
    image: {
        type: String
    },

    isArchive: {
        type: Boolean,
        default: false
    },

    isTrash : {
        type : Boolean,
        default: false
    },
    reminder : {
        type: String
    },
    color: {
        type: String,
        default: "#FFFFFF"
    }


},
    {
        timestamps: true
    })


exports.notes = mongoose.model("notes", noteSchema);
