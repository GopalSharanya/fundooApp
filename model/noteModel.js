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
        type: Boolean
    },

    isTrash : {
        type : Boolean
    },
    reminder : {
        type: String
    }

},
    {
        timestamps: true
    })


exports.notes = mongoose.model("notes", noteSchema);
