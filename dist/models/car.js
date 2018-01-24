'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carSchema = _mongoose2.default.Schema({
   name: String,
   speed: Number
});

exports.default = _mongoose2.default.model('Car', carSchema);