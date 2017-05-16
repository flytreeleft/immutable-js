'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GUID_SENTINEL = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (obj, id) {
    var enumerable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!canBind(obj)) {
        return null;
    }
    if ((0, _isBoolean2.default)(id)) {
        enumerable = id;
    }

    var value = (0, _valueOf2.default)(obj);
    var isBinding = !!id;
    var boundId = obj[GUID_SENTINEL] || canBind(value) && value[GUID_SENTINEL];

    if (!boundId || isBinding) {
        bind(obj, isBinding ? id : boundId = next(), enumerable);
    }
    return isBinding ? obj : boundId;
};

var _valueOf = require('./valueOf');

var _valueOf2 = _interopRequireDefault(_valueOf);

var _isBoolean = require('./isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function next() {
    var uuid = require('uuid/v4');
    return uuid().replace(/-/g, '');
}

var GUID_SENTINEL = exports.GUID_SENTINEL = '[[GlobalUniqueID]]';
function bind(obj, id, enumerable) {
    Object.defineProperty(obj, GUID_SENTINEL, {
        writable: false,
        configurable: true,
        enumerable: enumerable,
        value: id
    });

    return obj;
}

function canBind(obj) {
    return !!obj && ['function', 'object'].indexOf(typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) >= 0;
}

/**
 * Get or bind a global unique id.
 *
 * @param {Object} obj
 * @param {String} [id] A custom id which will be bound to `obj`.
 * @param {Boolean} [enumerable=false] Bind id as enumerable property or not?
 * @return {String/Object} Return `obj` if the parameter `id` was specified,
 *          otherwise, return the id bound to `obj`.
 */