'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Check if the `obj` is an object or not.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * NOTE: Passing `null` and `undefined` will return `false`.
                                                                                                                                                                                                                                                                               */


exports.default = function (obj) {
  return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};

module.exports = exports['default'];