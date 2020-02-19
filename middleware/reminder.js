let schedule = require('node-schedule')
let sns = require('./sns')
let services = require('../services/noteService')
let noteCon = require('../controller/noteController')


exports.scheduleReminder = (req) => {
    let details;

    console.log(email,"LLLLLLLLLL")
    return new Promise((resolve, reject) => {
        console.log("KKKKKKKKKKKKKKKKKKK",req.body)
        let date2 = new Date(req.body.reminder);

        var j = schedule.scheduleJob(date2, function () {

            console.log('The world is going to end today.');
            console.log("true");
            const arr = {
                "index": "reaminder",
                "name": "sharanya"
            }
            sns.notification(arr, email);
            resolve('triggered')



        })
    });
}