var service = require('../services/noteService');

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



exports.getNotes = (req, res) => {
    var id = {
        userId : req.decoded.payload.user_id
    }
    
    var response = {};

    service.getNotes(id)
        .then((data) => {
            response.data = data;
            response.sucess = true;
            res.status(200).send(response);
        })

        .catch((err) =>{
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
}


exports.updateNotes = (req,res) =>{

    req.checkBody("title","title cant be empty").notEmpty();
    req.checkBody("discription","discription cant be empty").notEmpty();

    var response = {};

    var error = req.validationErrors();

    if (error) {
        response.data = error;
        response.sucess = false;
        res.status(422).send(response);
    }

    else{

        service.updateNotes(req)
        .then ((data)=>{
            response.data = data;
            response.sucess = true;
            res.status(200).send(response);
        })

        .catch((err) =>{
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
    }
    
}



exports.deleteNote = (req,res) =>{

   {
       var response= {}

        service.deleteNote(req)
        .then ((data)=>{
            response.data = data;
            response.sucess = true;
            res.status(200).send(response);
        })

        .catch((err) =>{
            response.data = err;
            response.sucess = false;
            res.status(422).send(response);
        })
    }
    
}