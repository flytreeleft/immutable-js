'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * NOTE: Ignore Function and primitive node.
 */


exports.default = function (node) {
    if (!(0, _isObject2.default)(node)) {
        return node;
    }

    var nodeId = (0, _guid2.default)(node);
    var newNode;
    if ((0, _isArray2.default)(node)) {
        newNode = node.concat();
    } else if (node.isArray && node.isArray()) {
        // Immutable array-like object
        newNode = Array.prototype.slice.call(node);
    } else {
        newNode = _extends({}, node);
    }
    (0, _guid2.default)(newNode, nodeId);

    return newNode;
};

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = require('../utils/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _guid = require('../utils/guid');

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];