'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (root, path) {
    if (!path) {
        return undefined;
    }

    var node = root;
    for (var i = 0; i < path.length && (0, _isObject2.default)(node); i++) {
        var key = path[i];
        node = node[key];
    }
    return i >= path.length ? node : undefined;
};

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * Get target node object from `root` following the `path`.
 *
 * @param {*} root The root node of object tree.
 * @param {Array} path The path of target node.
 * @return {*}
 */