"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return obj instanceof Boolean || obj === true || obj === false;
};

module.exports = exports["default"];