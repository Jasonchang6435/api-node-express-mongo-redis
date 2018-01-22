import _ from 'lodash';
import Car from '../models/car';

module.exports = function(app) {

    /* Create */
    app.post('/car', (req, res) => {
        const newCar = new Car(req.body);
        newCar.save((err) => {
           if (err) {
               res.json({info: 'error during car creation', error: err});
           }
           res.json({info: 'car created successfully'});
        });
    });

    /* Read */
    app.get('/car', (req, res) => {
        Car.find(req.params.id, (err, cars) => {
           if (err) {
               res.json({info: 'error during find car', error: err});
           }
           res.json({info: 'cars found successfully', data: cars});
        });
    });

    app.get('/car/:id', (req, res) => {
        Car.findById(req.params.id, (err, car) => {
           if (err) {
               res.json({info: 'error during find car', error: err});
           }
           if (car) {
               res.json({info: 'car found successfully', data: car});
           } else {
               res.json({info: 'car not found'});
           }

        });
    });

    /* Update */
    app.put('/car/:id', (req, res) => {
        Car.findById(req.params.id, (err, car) => {
            if (err) {
                res.json({info: 'error during find car', error: err});
            }
            if (car) {
                _.merge(car, req.body);
                car.save((err) => {
                   if (err) {
                       res.json({info: 'error during car update', error: err});
                   }
                   res.json({info: 'car updated successfully'});
                });
            } else {
                res.json({info: 'car not found'});
            }
        });
    });

    /* Delete */
    app.delete('/car/:id', (req, res) => {
        Car.findByIdAndRemove(req.params.id, (err) => {
           if (err) {
               res.json({info: 'error during remove car', error: err});
           }
            res.json({info: 'car removed successfully'});
        });

    });
};