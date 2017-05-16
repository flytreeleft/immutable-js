'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return !(0, _isNullOrUndefined2.default)(obj) && (0, _isFunction2.default)(obj.valueOf) ? obj.valueOf() : obj;
};

var _isNullOrUndefined = require('./isNullOrUndefined');

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];