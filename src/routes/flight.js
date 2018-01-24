import _ from 'lodash';
import Flight from '../models/flight';

module.exports = function(app) {

    /* Create */
    app.post('/flight', (req, res) => {
        const newFlight = new Flight(req.body);
        newFlight.save((err) => {
            if (err) {
                res.json({info: 'error during flight creation', error: err});
            }
            res.json({info: 'flight created successfully'});
        });
    });

    /* Read */
    app.get('/flight', (req, res) => {
        Flight.find(req.params.id, (err, flights) => {
            if (err) {
                res.json({info: 'error during find flight', error: err});
            }
            res.json({info: 'flights found successfully', data: flights});
        });
    });

    app.get('/flight/:id', (req, res) => {
        Flight.findById(req.params.id, (err, flight) => {
            if (err) {
                res.json({info: 'error during find flight', error: err});
            }
            if (flight) {
                res.json({info: 'flight found successfully', data: flight});
            } else {
                res.json({info: 'flight not found'});
            }

        });
    });

    /* Update */
    app.put('/flight/:id', (req, res) => {
        Flight.findById(req.params.id, (err, flight) => {
            if (err) {
                res.json({info: 'error during find flight', error: err});
            }
            if (flight) {
                _.merge(flight, req.body);
                flight.save((err) => {
                    if (err) {
                        res.json({info: 'error during flight update', error: err});
                    }
                    res.json({info: 'flight updated successfully'});
                });
            } else {
                res.json({info: 'flight not found'});
            }
        });
    });

    /* Delete */
    app.delete('/flight/:id', (req, res) => {
        Flight.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.json({info: 'error during remove flight', error: err});
            }
            res.json({info: 'flight removed successfully'});
        });

    });
};