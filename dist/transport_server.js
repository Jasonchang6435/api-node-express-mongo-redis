'use strict';

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
                r({ uri: 'http://localhost:3002/car' }, function (error, response, body) {
                    if (error) {
                        calback({ service: 'car', error: error });
                        return;
                    }

                    if (!error && response.statusCode === 200) {
                        calback(null, body.data);
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