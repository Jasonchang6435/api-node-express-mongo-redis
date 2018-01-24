'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _car = require('../models/car');

var _car2 = _interopRequireDefault(_car);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {

    /* Create */
    app.post('/car', function (req, res) {
        var newCar = new _car2.default(req.body);
        newCar.save(function (err) {
            if (err) {
                res.json({ info: 'error during car creation', error: err });
            }
            res.json({ info: 'car created successfully' });
        });
    });

    /* Read */
    app.get('/car', function (req, res) {
        _car2.default.find(req.params.id, function (err, cars) {
            if (err) {
                res.json({ info: 'error during find car', error: err });
            }
            res.json({ info: 'cars found successfully', data: cars });
        });
    });

    app.get('/car/:id', function (req, res) {
        _car2.default.findById(req.params.id, function (err, car) {
            if (err) {
                res.json({ info: 'error during find car', error: err });
            }
            if (car) {
                res.json({ info: 'car found successfully', data: car });
            } else {
                res.json({ info: 'car not found' });
            }
        });
    });

    /* Update */
    app.put('/car/:id', function (req, res) {
        _car2.default.findById(req.params.id, function (err, car) {
            if (err) {
                res.json({ info: 'error during find car', error: err });
            }
            if (car) {
                _lodash2.default.merge(car, req.body);
                car.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during car update', error: err });
                    }
                    res.json({ info: 'car updated successfully' });
                });
            } else {
                res.json({ info: 'car not found' });
            }
        });
    });

    /* Delete */
    app.delete('/car/:id', function (req, res) {
        _car2.default.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove car', error: err });
            }
            res.json({ info: 'car removed successfully' });
        });
    });
};