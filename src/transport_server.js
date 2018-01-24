import async from 'async';

const r = require('request').defaults({
    json: true
});

module.exports = function (app) {

    /* Read */
    app.get('/transport', (req, res) => {
        async.parallel({
            flight: function (calback) {
                r({uri: 'http://localhost:3001/flight'}, (error, response, body) => {
                    if (error) {
                        calback({service: 'flight', error: error});
                        return;
                    }

                    if (!error && response.statusCode === 200) {
                        calback(null, body);
                    } else {
                        calback(response.statusCode);
                    }
                });
            },
            car: function (calback) {
                r({uri: 'http://localhost:3002/car'}, (error, response, body) => {
                    if (error) {
                        calback({service: 'car', error: error});
                        return;
                    }

                    if (!error && response.statusCode === 200) {
                        calback(null, body);
                    } else {
                        calback(response.statusCode);
                    }
                });
            }

        }, function (error, results) {
            res.json({
                error: error,
                result: results
            });
        });
    });
};

