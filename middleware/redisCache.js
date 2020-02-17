var redis = require('redis');
var client = redis.createClient();

client.on('connect', function () {
    console.log('connected');
});


var query = "notesincache"

exports.redisgetNotes = (userId, callback) => {
    client.get(`notes : ${query + userId}`, (err, data) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, data)
        }
    })
}


exports.redissetNotes = (userId, note) => {
    client.set(`notes : ${query + userId}`, JSON.stringify({
        from: "cache memory",
        note
    }))
}


exports.redisdeleteNotes = (userId) => {
    client.del(`notes : ${query + userId}`, JSON.stringify({
        from: "cache memory",
    }), (err, data) => {
        if (err) {
            console.log("eroor");
        }
        else {
            console.log("deleted", data)
        }
    })
}





