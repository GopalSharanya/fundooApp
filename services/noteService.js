/**
 * required modules are imported
 */


const model = require('../model/noteModel');
const collbmodel = require('../model/collaboratorModel');
const userModel = require('../model/model')

/**
 * @module addNote
 * @param {req} - request from user contains notes information to be added
 * @param {res}- response to be sent back to client
 */

exports.addNote = (req) => {
    return new Promise((resolve, reject) => {

        let noteValue = new model.notes({
            "user_id": req.decoded.payload.user_id,
            "title": req.body.title,
            "discription": req.body.discription
        })
        noteValue.save().then(data => resolve(data)).catch(err => reject(err))

    })
}

/**
 * @module getNotes
 * @param {req} - request from user contains whose information to be retrived
 * @param {res}- response to be sent back to client
 */

exports.getNotes = (req) => {
    return new Promise((resolve, reject) => {
        console.log("in service", req)
        model.notes.find(
            { user_id: req.userId }
        ).then(data => resolve(data)).catch(err => reject(err))
    })
}

/**
 * @module updateNotes
 * @param {req} - request from user contains notes information to be updated
 * @param {res}- response to be sent back to client
 */

exports.updateNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.updateOne(
            { user_id: req.decoded.payload.user_id },
            { title: req.body.title },
            { discription: req.body.discription }
        ).then(data => resolve(data => resolve(data))).catch(err => reject(err))
    })
}

/**
 * @module deleteNote
 * @param {req} - request from user contains whose information to be deleted
 * @param {res}- response to be sent back to client
 */

exports.deleteNote = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.deleteOne(
            { user_id: req.decoded.payload.user_id }
        ).then(data => resolve(data)).catch((err => reject(err)))
    })
}

/**
 * @module imageUpload
 * @param {req} - request from user contains image information to be added
 * @param {res}- response to be sent back to client
 */

exports.imageUpload = (req, imageUrl, res) => {
    return new Promise((resolve, reject) => {
        model.notes.updateOne(
            { user_id: req.decoded.payload.user_id },
            { image: imageUrl }
        ).then(data => resolve(data)).catch((err) => reject(err))
    })
}

exports.collabAdd = (req) => {
    return new Promise((resolve, reject) => {

        collbmodel.ids.find(
            { noteId: req.body.noteId }
        ).then(data => {
            if (data.collbId.includes(req.body.collbId))
                reject("the collaborator exists")
            else {
                collbmodel.ids.findByIdAndUpdate(
                    { noteId: req.body.noteId },
                    { $push: { collbId: req.body.collbId } }
                ).then(data => resolve(data)).catch((err) => reject(err))
            }
        })
            .catch(err => {
                var newCollb = new collbmodel.ids(
                    {
                        userId: req.decoded.payload.user_id,
                        collbId: req.body.collbId,
                        noteId: req.body.noteId
                    }
                )
                newCollb.save().then(data => resolve(data)).catch(err => reject(err));
            })

    })
}

exports.collabDelete = (req) => {
    return new Promise((resolve, reject) => {
        collbmodel.ids.update(
            { _id: req.body.noteId },
            { $addToSet: { collbId: req.body.collbId } }

        ).then(data => resolve(data)).catch(err => reject(err))
    })
}




exports.toArchive = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.update(
            { _id: req.body.noteId },
            { isArchive: true }
        ).then(data => { console.log(data); resolve(data) }).catch(error => reject(error));
    })
}


exports.unArchive = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.update(
            { _id: req.body.noteId },
            { isArchive: false }
        ).then(data => { console.log(data); resolve(data) }).catch(error => reject(error));
    })
}

exports.toTrash = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.update(
            { _id: req.body.noteId },
            { isTrash: true }
        ).then(data => { console.log(data); resolve(data) }).catch(error => reject(error));
    })
}


exports.toTrash = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.update(
            { _id: req.body.noteId },
            { isTrash: false }
        ).then(data => { console.log(data); resolve(data) }).catch(error => reject(error));
    })
}



exports.addReminder = (req) => {
    var dating
    return new Promise((resolve, reject) => {
        model.notes.update(
            { user_id: req.decoded.payload.user_id },
            { reminder: req.body.reminder }
        ).then(data => {
            resolve(data)
        })
            .catch(error => reject(error))
    })
}

exports.noteSequ = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.find(
            { user_id: req.decoded.payload.user_id }
        ).sort({ createdAt: -1 }).then(data => resolve(data)).catch(err => reject(err))
    })
}