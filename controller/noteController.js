/**
 * imports the required modules
 */
var service = require('../services/noteService');
var redis = require('../middleware/redisCache')

/**
 * @module addNote
 * @param {req} - request from user contains note information to be added
 * @param {res}- response to be sent back to client
 */


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

/**
 * @module getNotes
 * @param {req} - request from user to show back all the registered notes
 * @param {res}- response to be sent back to client
 */

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


/**
 * @module updateNotes
 * @param {req} - request from user contains note information to be updated
 * @param {res}- response to be sent back to client
 */

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