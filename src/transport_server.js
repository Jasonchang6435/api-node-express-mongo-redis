import async from 'async';
import redis from 'redis'; // port: 6379

const client = redis.createClient(6379, '127.0.0.1');

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
                        calback(null, body.data);
                    } else {
                        calback(response.statusCode);
                    }
                });
            },
            car: function (calback) {
                client.get('http://localhost:3002/car', (error, car) => {
                    if (error) {
                        throw error;
                    }

                    if (car) {
                        calback(null, JSON.parse(car));
                    } else {
                        r({uri: 'http://localhost:3002/car'}, (error, response, body) => {
                            if (error) {
                                throw error;
                                return;
                            }
                            if (!error && response.statusCode === 200) {
                                res.json(body);
                                client.send(req.params.id, JSON.stringify(body), (error) => {
                                    if (error) {
                                        throw error;
                                    }
                                });
                            } else {
                                r({uri: 'http://localhost:3002/car'}, (error, response, body) => {
                                    if (error) {
                                        calback({service: 'car', error: error});
                                        return;
                                    }

                                    if (!error && response.statusCode === 200) {
                                        calback(null, body.data);
                                        client.set('http://localhost:3002/car', JSON.stringify(body), (error) => {
                                           if (error) {
                                               throw error;
                                           }
                                        });
                                        // todo add cash expiration
                                    } else {
                                        calback(response.statusCode);
                                    }
                                });
                            }
                        });
                    }
                });

            }

        }, function (error, results) {
            res.json({
                error: error,
                result: results
            });
        });

        app.get('/ping', (req, res) => {
            res.json({pong: Date.now()});
        });
    });
};

