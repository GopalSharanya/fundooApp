const model = require('../model/noteModel');


exports.addNote = (req) => {
    return new Promise((resolve, reject) => {

        let noteValue = new model.notes({
            "user_id": req.decoded.payload.user_id,
            "title": req.body.title,
            "discription": req.body.discription
        })

        noteValue.save((err, data) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("note created successfully", data);
                resolve(data);
            }
        })

    })
}


exports.getNotes = (req) => {
    return new Promise((resolve, reject) => {
        console.log("in service", req)
        model.notes.find(
            {
                user_id: req.userId
            }, (err, data) => {
                if (err) {
                    reject(err);
                }

                else {
                    resolve(data);
                }

            }
        )
    })
}


exports.updateNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.updateOne(
            { user_id: req.decoded.payload.user_id },
            { "title": req.body.title },
            { "discription": req.body.discription },
            (err, data) => {
                if (data) {
                    resolve(data)
                }
                else {
                    reject(err)
                }

            }
        )
    })
}


exports.deleteNote = (req) => {
    return new Promise((resolve, reject) => {
        model.notes.deleteOne(
            { user_id: req.decoded.payload.user_id },
            (err, data) => {
                if (data) {
                    resolve(data)
                }
                else {
                    reject(err)
                }

            }
        )
    })
}