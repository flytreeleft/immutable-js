'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mergeNode;

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = require('../utils/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _guid = require('../utils/guid');

var _cloneNode = require('./cloneNode');

var _cloneNode2 = _interopRequireDefault(_cloneNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reservedKeys = [_guid.GUID_SENTINEL];
/**
 * Merge node and return the new merged copy of `target`.
 */
function mergeNode(target, source) {
    var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (target === source || !(0, _isObject2.default)(target) || !(0, _isObject2.default)(source) || (0, _isArray2.default)(target) && !(0, _isArray2.default)(source) || !(0, _isArray2.default)(target) && (0, _isArray2.default)(source)) {
        return source;
    }

    // TODO 处理value内的循环引用，直接忽略循环引用节点，最终由Immutable处理循环引用
    var changed = false;
    var targetCopy = (0, _cloneNode2.default)(target);
    Object.keys(source).forEach(function (key) {
        if (reservedKeys.indexOf(key) >= 0 || target[key] === source[key]) {
            return;
        }

        targetCopy[key] = deep ? mergeNode(target[key], source[key], true) : source[key];
        changed = true;
    });

    return changed ? targetCopy : target;
}
module.exports = exports['default'];