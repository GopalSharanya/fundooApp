let schedule = require('node-schedule')
let sns = require('./sns')
let services = require('../services/noteService')
let noteCon = require('../controller/noteController')
const note = require('../model/noteModel')



exports.scheduleReminder = (req) => {

    var d = new Date(req.body.reminder);
    console.log("inside scheduler");
    var email = req.decoded.payload.email;
    var date = req.body.reminder;
    console.log(date);
    var _id = req.body._id;
    var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 1}, function () {
        sns.notification(_id, email);
    });


}