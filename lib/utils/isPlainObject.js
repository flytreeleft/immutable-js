"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return !!obj && (obj.constructor === Object || obj.constructor === undefined);
};

module.exports = exports["default"];