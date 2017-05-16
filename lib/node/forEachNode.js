'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (root, path, sideEffect) {
    var target = (0, _getNodeByPath2.default)(root, path);
    if (!(0, _isObject2.default)(target) || !(0, _isFunction2.default)(sideEffect)) {
        return;
    }

    var keys = target.isArray && target.isArray() ? Array.apply(null, new Array(target.size())).map(function (v, i) {
        return i;
    }) : Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = target[key];

        var ret = sideEffect(value, key, target, path.concat(key));
        if (ret === false) {
            return;
        }
    }
};

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isFunction = require('../utils/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _getNodeByPath = require('./getNodeByPath');

var _getNodeByPath2 = _interopRequireDefault(_getNodeByPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * Traverse all properties of the target node.
 *
 * @param {*} root
 * @param {Array} path
 * @param {Function} sideEffect A traverse function
 *          with signature `(node, topKey, topNode, fullPath) => Boolean`.
 *          If it return `false`, the traversing will be stop.
 */