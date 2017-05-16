'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (path) {
    if ((0, _isNullOrUndefined2.default)(path)) {
        return null;
    }

    if ((0, _isString2.default)(path)) {
        return path.replace(/\[([^\[\]]+)\]/g, '.$1').replace(/(^\.+)|(\.+$)/g, '').split(/\./);
    } else if ((0, _isArray2.default)(path)) {
        return path;
    } else {
        throw new Error('Expected parameter "path" is' + (' an Array or String. But received \'' + path + '\'.'));
    }
};

var _isArray = require('../utils/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isString = require('../utils/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNullOrUndefined = require('../utils/isNullOrUndefined');

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * @return {Array/null} Return `null` if `path` is null or undefined.
 */