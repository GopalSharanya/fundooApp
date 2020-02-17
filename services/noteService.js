/**
 * required modules are imported
 */


const model = require('../model/noteModel');

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