'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.default = isNullOrUndefined;
function isNull(obj) {
    return obj === null;
}

function isUndefined(obj) {
    return typeof obj === 'undefined';
}

function isNullOrUndefined(obj) {
    return isNull(obj) || isUndefined(obj);
}