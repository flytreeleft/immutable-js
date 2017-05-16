"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj, prop) {
    if (!obj || !prop || !(prop in obj)) {
        return true;
    }

    var des = Object.getOwnPropertyDescriptor(obj, prop);
    return !des || des.configurable !== false;
};

module.exports = exports["default"];