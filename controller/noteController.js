/**
 * imports the required modules
 */
var service = require('../services/noteService');
var redis = require('../middleware/redisCache');
var reminder = require('../middleware/reminder');
var scheduler = require('../middleware/reminder')

/**
 * @module addNote
 * @param {req} - request from user contains note information to be added
 * @param {res}- response to be sent back to client
 */

try{
exports.addNote = (req, res) => {
    req.checkBody("discription", "enter discription ").notEmpty();
    req.checkBody("title", "title not entered").notEmpty();

    var error = req.validationErrors();
    var response = {};

    if (error) {
        response.data = error;
        response.sucess = false;
        res.status(422).send(response);
    }

    else {
        service.addNote(req)
            .then((data) => {
                redis.redisdeleteNotes(req.decoded.payload.user_id)
                response.data = data;
                response.sucess = true;
                res.status(200).send(response);
            })
            .catch((err) => {
                response.data = err;
                response.sucess = false;
                res.status(422).send(response);
            })
    }
}
}
catch(err){
    console.log(err);
}

/**
 * @module getNotes
 * @param {req} - request from user to show back all the registered notes
 * @param {res}- response to be sent back to client
 */


 try{
exports.getNotes = (req, res) => {
    var id = {
        userId: req.decoded.payload.user_id
    }

    var response = {};

    redis.redisgetNotes(id.userId, (err, data) => {     //if the notes are present in chache memory itll be retrived back from chache
        if (data) {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response);
        }
        else {
            service.getNotes(id)
                .then((data) => {
                    redis.redissetNotes(JSON.stringify(data), id.userId)
                    response.data = data;
                    response.sucess = true;
                    res.status(200).send(response);
                })
                .catch((err) => {
                    response.data = err;
                    response.sucess = false;
                    res.status(422).send(response);
                })
        }
    })
}
 }
 catch(err){
     console.log(err);
 }


/**
 * @module updateNotes
 * @param {req} - request from user contains note information to be updated
 * @param {res}- response to be sent back to client
 */

 try{
exports.updateNotes = (req, res) => {

    req.checkBody("title", "title cant be empty").notEmpty();
    req.checkBody("discription", "discription cant be empty").notEmpty();

    var response = {};
    var error = req.validationErrors();

    if (error) {
        response.data = error;
        response.sucess = false;
        res.status(422).send(response);
    }

    else {
        service.updateNotes(req)
            .then((data) => {
                response.data = data;
                response.sucess = true;
                res.status(200).send(response);
            })
            .catch((err) => {
                response.data = err;
                response.sucess = false;
                res.status(422).send(response);
            })
    }
}
 }
 catch(err){
     console.log(err);
 }
/**
 * @module deleteNote
 * @param {req} - request from user contains note information to be deleted
 * @param {res}- response to be sent back to client
 */

exports.deleteNote = (req, res) => {
    var response = {}

    service.deleteNote(req)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response);
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}

/**
 * @module imageUpload
 * @param {req} - request from user contains image information to be added
 * @param {res}- response to be sent back to client
 */

 try{
exports.imageUpload = (req, res) => {
    var imageUrl = req.file.location;
    var response = {};

    service.imageUpload(req, imageUrl)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response);
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}
 }
 catch(err){
     console.log(err);
 }

/**
 * @module collabAdd
 * @param {req} - request from user contains user information to be collaborate
 * @param {res}- response to be sent back to client
 */

exports.collabAdd = (req, res) => {
    var response = {};
    if (req.noteId === req.decoded.payload.user_id) {
        response.data = " invalid id";
        response.sucess = false
        res.status(422).send(response);
    }

    else {
        service.collabAdd(req)
            .then((data) => {
                response.data = data;
                response.sucess = true;
                res.status(200).send(response)
            }
            )
    }
}

/**
 * @module collabDelete
 * @param {req} - request from user contains user information to be removed from collaborate
 * @param {res}- response to be sent back to client
 */

exports.collabDelete = (req, res) => {
    var response = {};

    service.collabDelete(req)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}

/**
 * @module toArchive
 * @param {req} - request from user contains note information to be archived
 * @param {res}- response to be sent back to client
 */

exports.toArchive = (req, res) => {
    var response = {};

    service.toArchive(req)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}

/**
 * @module unArchive
 * @param {req} - request from user contains note information to be removed from archived
 * @param {res}- response to be sent back to client
 */

exports.unArchive = (req, res) => {
    var response = {};

    service.unArchive(req)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}

/**
 * @module toTrash
 * @param {req} - request from user contains note information to be trashed
 * @param {res}- response to be sent back to client
 */


exports.toTrash = (req, res) => {
    var response = {};

    service.toTrash(req)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}

/**
 * @module noTrash
 * @param {req} - request from user contains note information to be removed from trash
 * @param {res}- response to be sent back to client
 */

exports.noTrash = (req, res) => {
    var response = {};

    service.toTrash(req)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}

/**
 * @module addReminder
 * @param {req} - request from user contains note information to be added to reminder
 * @param {res}- response to be sent back to client
 */


exports.addReminder = (req, res) => {
    var response = {};

    service.addReminder(req)
        .then((data) => {
            scheduler.scheduleReminder(req)
            console.log("PPPPPPPPPPPP", data)
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}

/**
 * @module noteSequ
 * @param {req} - request from user to sequense note in order
 * @param {res}- response to be sent back to client
 */

exports.noteSequ = (req, res) => {

    var response = {};

    service.noteSequ(req)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })

}


/**
 * @module elasticsearch
 * @param {req} - request from user to elasticsearch 
 * @param {res}- response to be sent back to client
 */

exports.elasticsearch = (req, res) => {
    var response = {};

    service.elasticsearch(req, (err, data) => {
        if (err) {
            response.data = err
            response.sucess = false
            res.status(422).send(response)
        }

        else {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)

        }
    }
    )
}



/**
 * @module elasticsearchDel
 * @param {req} - request from user to delete from elasticsearch 
 * @param {res}- response to be sent back to client
 */

exports.elasticsearchDel = (req, res) => {
    var response = {};

    service.elasticsearchDel(req, (err, data) => {
        if (err) {
            response.data = err
            response.sucess = false
            res.status(422).send(response)
        }

        else {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response)

        }
    }
    )
}