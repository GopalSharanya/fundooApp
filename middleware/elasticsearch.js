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

    addDocument: (note) => {
        console.log(note, "JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
        let array = [];
        note.forEach(element => {
            console.log(element);
            array.push({
                index: {
                    _index: element.user_id,
                    _type: "notes"
                }
            })
            let data = {
                "title": element.title,
                "discription": element.discription,
            }
            array.push(data);
            console.log("tttttttt", array);
        });
        elasticClient.bulk({ body: array }, (err, res) => {
            if (err) {
                console.log(err);

            }
            else {
                console.log("sucess", res);

            }
        })

    },

    search: function (req, callback) {
        let body = {
            query: {
                query_string: {
                    query: `*${req.body.info}*`,
                    analyze_wildcard: true,
                    fields: ["title", "discription"]
                }
            }
        }
        elasticClient.search({ index: req.decoded.payload.user_id, body: body, type: 'notes' }, (err, data) => {
            if (err) {
                console.log("nooooo", err);

                callback(err);

            } else {
                console.log("Sucess", data);

                callback(null, data);

            }
        })

    }


}

