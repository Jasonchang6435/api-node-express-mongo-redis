'use strict';

var r = require('request').defaults({
    json: true
});

module.exports = function (app) {

    /* Read */
    app.get('/transport', function (req, res) {
        r({ uri: 'http://localhost:3001/flight' }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.json(body);
            } else {
                res.send(response.statusCode);
            }
        });
    });

    /* todo aggregate data from 2 servers */
};