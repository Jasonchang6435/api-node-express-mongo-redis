'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _transport_server = require('./transport_server');

var _transport_server2 = _interopRequireDefault(_transport_server);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mongoose.connect('mongodb://localhost/cars');
var app = (0, _express2.default)();

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));*/

(0, _transport_server2.default)(app);

app.listen(3000, function () {
  console.log('transport server running on port 3000!');
});