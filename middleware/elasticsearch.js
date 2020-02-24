var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

module.exports = {
    ping: function () {
        elasticClient.ping({
            requestTimeout: 30000,
        }).then(data => {
            console.log("done!")
        }).catch(err => {
            console.log("err")
        })
    },

    // 1. Create index
    initIndex: function (indexName) {

        elasticClient.indices.create({
            index: indexName
        }).then(data => {
            console.log("index created");
        })
            .catch(error => {
                console.log("error in index creating");
            })
    },

    // 4. Add/Update a document
    addDocument: function (data) {
        var notes = [];
        for (let i = 0; i < data.length; i++) {
            var details = {
                index: data[i].user_id,
                type: "note",
                title: data[i].title,
                discription: data[i].discription
            }
            console.log("yyyfffffffffffffffffffffffffffffffff",details)
            let str = JSON.stringify(details)
            notes.push(details);
        }
        elasticClient.bulk({ body: notes })
            .then(data => {
                console.log("data saved");
            },function(err){
                console.log("error",err)
            })
            

    },

    // 6. Search
    search: function (req, res, indexName, docType, payload) {
        elasticClient.search({
            index: indexName,
            type: docType,
            body: payload
        }).then(function (resp) {
            console.log(resp);
            return res.json(resp)
        }, function (err) {
            console.log(err.message);
            return res.json(err.message)
        });
    }
}