'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (obj, prop) {
    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && hasOwnProperty.call(obj, prop);
};

var hasOwnProperty = Object.prototype.hasOwnProperty;
module.exports = exports['default'];