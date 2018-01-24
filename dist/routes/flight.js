'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _flight = require('../models/flight');

var _flight2 = _interopRequireDefault(_flight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {

    /* Create */
    app.post('/flight', function (req, res) {
        var newFlight = new _flight2.default(req.body);
        newFlight.save(function (err) {
            if (err) {
                res.json({ info: 'error during flight creation', error: err });
            }
            res.json({ info: 'flight created successfully' });
        });
    });

    /* Read */
    app.get('/flight', function (req, res) {
        _flight2.default.find(req.params.id, function (err, flights) {
            if (err) {
                res.json({ info: 'error during find flight', error: err });
            }
            res.json({ info: 'flights found successfully', data: flights });
        });
    });

    app.get('/flight/:id', function (req, res) {
        _flight2.default.findById(req.params.id, function (err, flight) {
            if (err) {
                res.json({ info: 'error during find flight', error: err });
            }
            if (flight) {
                res.json({ info: 'flight found successfully', data: flight });
            } else {
                res.json({ info: 'flight not found' });
            }
        });
    });

    /* Update */
    app.put('/flight/:id', function (req, res) {
        _flight2.default.findById(req.params.id, function (err, flight) {
            if (err) {
                res.json({ info: 'error during find flight', error: err });
            }
            if (flight) {
                _lodash2.default.merge(flight, req.body);
                flight.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during flight update', error: err });
                    }
                    res.json({ info: 'flight updated successfully' });
                });
            } else {
                res.json({ info: 'flight not found' });
            }
        });
    });

    /* Delete */
    app.delete('/flight/:id', function (req, res) {
        _flight2.default.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove flight', error: err });
            }
            res.json({ info: 'flight removed successfully' });
        });
    });
};