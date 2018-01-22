import _ from 'lodash';

module.exports = function(app) {
    const _cars = [];

    /* Create */
    app.post('/car', (req, res) => {
        _cars.push(req.body);
        res.json({info: 'car created successfully'});
    });

    /* Read */
    app.get('/cars', (req, res) => {
        res.send(_cars);
    });

    app.get('/car/:id', (req, res) => {
        res.send(
            _.find(
                _cars,
                {
                    name: req.params.id
                }
            )
        );
    });

    /* Update */
    app.put('/car/:id', (req, res) => {
        const idx = _.findIndex(
            _cars,
            {
                name: req.params.id
            }
        );
        _.merge(_cars[idx], req.body);
        res.json({info: 'car updated successfully'});
    });

    /* Delete */
    app.delete('/car/:id', (req, res) => {
        _.remove(_cars, (car) => {
            return car.name === req.params.id;
        });
        res.json({info: 'car removed successfully'});
    });
};