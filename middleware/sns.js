require('dotenv').config();
const AWS = require('aws-sdk');
const note = require('../model/noteModel')

exports.notification = (id, email) => {

console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")

    return new Promise((resolve, reject) => {
        var acessKey = process.env.AWS_SECRET_ACCESS_KEY;
        var accessId = process.env.AWS_ACCESS_KEY_ID;

        AWS.config.update({
            secretAccessKey: acessKey,
            accessKeyId: accessId,
            region: 'eu-west-2'
        });

        let description="hey do work";
        let title = "youRemember?";

        note.notes.find(
            { _id: id }, (err, data) => {
                if (data) {
                    description = data[0].discription
                    title = data[0].title
                    console.log(description,"%%%%%%%%%%%%%%%%",title,"&&&&&&&&&&&&")
                }
            }
        )

    

        var details = {
            description,
            title,
            TopicArn: process.env.AWS_TOPIC_ARN,
        }


        let params = {
            Message: `You have a reminder : ${description} and title : ${title} check note ${id}`, 
            TopicArn: process.env.AWS_TOPIC_ARN,
        };

        let sent = new AWS.SNS().publish(params).promise();

        sent.then((data) => {
            resolve(data)
        })
            .catch((error) => {
                reject(error)
            })
    })

}