'use strict';

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// port: 6379

var client = _redis2.default.createClient(6379, '127.0.0.1');

var r = require('request').defaults({
    json: true
});

module.exports = function (app) {

    /* Read */
    app.get('/transport', function (req, res) {
        _async2.default.parallel({
            flight: function flight(calback) {
                r({ uri: 'http://localhost:3001/flight' }, function (error, response, body) {
                    if (error) {
                        calback({ service: 'flight', error: error });
                        return;
                    }

                    if (!error && response.statusCode === 200) {
                        calback(null, body.data);
                    } else {
                        calback(response.statusCode);
                    }
                });
            },
            car: function car(calback) {
                client.get('http://localhost:3002/car', function (error, car) {
                    if (error) {
                        throw error;
                    }

                    if (car) {
                        calback(null, JSON.parse(car));
                    } else {
                        r({ uri: 'http://localhost:3002/car' }, function (error, response, body) {
                            if (error) {
                                throw error;
                                return;
                            }
                            if (!error && response.statusCode === 200) {
                                res.json(body);
                                client.send(req.params.id, JSON.stringify(body), function (error) {
                                    if (error) {
                                        throw error;
                                    }
                                });
                            } else {
                                r({ uri: 'http://localhost:3002/car' }, function (error, response, body) {
                                    if (error) {
                                        calback({ service: 'car', error: error });
                                        return;
                                    }

                                    if (!error && response.statusCode === 200) {
                                        calback(null, body.data);
                                        client.set('http://localhost:3002/car', JSON.stringify(body), function (error) {
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

        app.get('/ping', function (req, res) {
            res.json({ pong: Date.now() });
        });
    });
};