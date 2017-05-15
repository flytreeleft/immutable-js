/*!
 * Immutable JS v0.1.0
 * (c) 2017-2017 flytreeleft <flytreeleft@126.com>
 * Released under the license of Apache-2.0.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ ((function(module, exports, __webpack_require__) {

"use strict";


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

/***/ })),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isArray = Array.isArray;

exports.default = isArray;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _valueOf = __webpack_require__(15);

var _valueOf2 = _interopRequireDefault(_valueOf);

var _isBoolean = __webpack_require__(10);

var _isBoolean2 = _interopRequireDefault(_isBoolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function next() {
    var uuid = __webpack_require__(28);
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return obj instanceof Function;
};

module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * NOTE: Ignore Function and primitive node.
 */


exports.default = function (node) {
    if (!(0, _isObject2.default)(node)) {
        return node;
    }

    var nodeId = (0, _guid2.default)(node);
    var newNode;
    if ((0, _isArray2.default)(node)) {
        newNode = node.concat();
    } else if (node.isArray && node.isArray()) {
        // Immutable array-like object
        newNode = Array.prototype.slice.call(node);
    } else {
        newNode = _extends({}, node);
    }
    (0, _guid2.default)(newNode, nodeId);

    return newNode;
};

var _isObject = __webpack_require__(0);

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = __webpack_require__(1);

var _isArray2 = _interopRequireDefault(_isArray);

var _guid = __webpack_require__(2);

var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _isObject = __webpack_require__(0);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (path) {
    if ((0, _isNullOrUndefined2.default)(path)) {
        return null;
    }

    if ((0, _isString2.default)(path)) {
        return path.replace(/\[([^\[\]]+)\]/g, '.$1').replace(/(^\.+)|(\.+$)/g, '').split(/\./);
    } else if ((0, _isArray2.default)(path)) {
        return path;
    } else {
        throw new Error('Expected parameter "path" is' + (' an Array or String. But received \'' + path + '\'.'));
    }
};

var _isArray = __webpack_require__(1);

var _isArray2 = _interopRequireDefault(_isArray);

var _isString = __webpack_require__(23);

var _isString2 = _interopRequireDefault(_isString);

var _isNullOrUndefined = __webpack_require__(6);

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * @return {Array/null} Return `null` if `path` is null or undefined.
 */

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createNE;
/**
 * Creates non-enumerable property descriptors, to be used by Object.create.
 *
 * Source: https://github.com/arqex/freezer/blob/master/src/utils.js#L58
 *
 * @param  {Object} attrs Properties to create descriptors
 * @return {Object} A hash with the descriptors.
 */
function createNE(attrs) {
    var ne = {};

    Object.keys(attrs).forEach((function (attr) {
        ne[attr] = {
            writable: true,
            configurable: true,
            enumerable: false,
            value: attrs[attr]
        };
    }));

    return ne;
}
module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (obj, prop) {
    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && hasOwnProperty.call(obj, prop);
};

var hasOwnProperty = Object.prototype.hasOwnProperty;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return obj instanceof Boolean || obj === true || obj === false;
};

module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return obj instanceof Date;
};

module.exports = exports["default"];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj, prop) {
    if (!obj || !prop || !(prop in obj)) {
        return true;
    }

    var des = Object.getOwnPropertyDescriptor(obj, prop);
    return !des || des.enumerable !== false;
};

module.exports = exports["default"];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return !!obj && (obj.constructor === Object || obj.constructor === undefined);
};

module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
       value: true
});
exports.default = isPrimitive;
function isPrimitive(obj) {
       return !(obj instanceof Object) || obj instanceof Boolean || typeof obj === 'boolean' || obj instanceof Number || typeof obj === 'number' || obj instanceof String || typeof obj === 'string';
}
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return !(0, _isNullOrUndefined2.default)(obj) && (0, _isFunction2.default)(obj.valueOf) ? obj.valueOf() : obj;
};

var _isNullOrUndefined = __webpack_require__(6);

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

var _isFunction = __webpack_require__(3);

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guid = exports.isEnumerable = exports.isWritable = exports.isConfigurable = exports.hasOwn = exports.isBoolean = exports.isDate = exports.isPrimitive = exports.isFunction = exports.isPlainObject = exports.isObject = exports.isArray = exports.valueOf = exports.createNE = exports.getNodeByPath = exports.extractPath = undefined;

var _extractPath = __webpack_require__(7);

Object.defineProperty(exports, 'extractPath', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_extractPath).default;
  }
});

var _getNodeByPath = __webpack_require__(5);

Object.defineProperty(exports, 'getNodeByPath', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getNodeByPath).default;
  }
});

var _createNE = __webpack_require__(8);

Object.defineProperty(exports, 'createNE', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createNE).default;
  }
});

var _valueOf = __webpack_require__(15);

Object.defineProperty(exports, 'valueOf', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_valueOf).default;
  }
});

var _isArray = __webpack_require__(1);

Object.defineProperty(exports, 'isArray', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isArray).default;
  }
});

var _isObject = __webpack_require__(0);

Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isObject).default;
  }
});

var _isPlainObject = __webpack_require__(13);

Object.defineProperty(exports, 'isPlainObject', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isPlainObject).default;
  }
});

var _isFunction = __webpack_require__(3);

Object.defineProperty(exports, 'isFunction', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isFunction).default;
  }
});

var _isPrimitive = __webpack_require__(14);

Object.defineProperty(exports, 'isPrimitive', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isPrimitive).default;
  }
});

var _isDate = __webpack_require__(11);

Object.defineProperty(exports, 'isDate', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isDate).default;
  }
});

var _isBoolean = __webpack_require__(10);

Object.defineProperty(exports, 'isBoolean', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isBoolean).default;
  }
});

var _hasOwn = __webpack_require__(9);

Object.defineProperty(exports, 'hasOwn', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_hasOwn).default;
  }
});

var _isConfigurable = __webpack_require__(21);

Object.defineProperty(exports, 'isConfigurable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isConfigurable).default;
  }
});

var _isWritable = __webpack_require__(24);

Object.defineProperty(exports, 'isWritable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isWritable).default;
  }
});

var _isEnumerable = __webpack_require__(12);

Object.defineProperty(exports, 'isEnumerable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_isEnumerable).default;
  }
});

var _guid = __webpack_require__(2);

Object.defineProperty(exports, 'guid', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_guid).default;
  }
});

var _Immutable = __webpack_require__(17);

var _Immutable2 = _interopRequireDefault(_Immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Immutable2.default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _invariant = __webpack_require__(25);

var _invariant2 = _interopRequireDefault(_invariant);

var _isPlainObject = __webpack_require__(13);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isObject = __webpack_require__(0);

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = __webpack_require__(1);

var _isArray2 = _interopRequireDefault(_isArray);

var _isFunction = __webpack_require__(3);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isDate = __webpack_require__(11);

var _isDate2 = _interopRequireDefault(_isDate);

var _isRegExp = __webpack_require__(22);

var _isRegExp2 = _interopRequireDefault(_isRegExp);

var _isPrimitive = __webpack_require__(14);

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

var _isNullOrUndefined = __webpack_require__(6);

var _isNullOrUndefined2 = _interopRequireDefault(_isNullOrUndefined);

var _isEnumerable = __webpack_require__(12);

var _isEnumerable2 = _interopRequireDefault(_isEnumerable);

var _createNE = __webpack_require__(8);

var _createNE2 = _interopRequireDefault(_createNE);

var _hasOwn = __webpack_require__(9);

var _hasOwn2 = _interopRequireDefault(_hasOwn);

var _guid = __webpack_require__(2);

var _guid2 = _interopRequireDefault(_guid);

var _extractPath = __webpack_require__(7);

var _extractPath2 = _interopRequireDefault(_extractPath);

var _getNodeByPath = __webpack_require__(5);

var _getNodeByPath2 = _interopRequireDefault(_getNodeByPath);

var _cloneNode = __webpack_require__(4);

var _cloneNode2 = _interopRequireDefault(_cloneNode);

var _copyNodeByPath = __webpack_require__(18);

var _copyNodeByPath2 = _interopRequireDefault(_copyNodeByPath);

var _mergeNode = __webpack_require__(20);

var _mergeNode2 = _interopRequireDefault(_mergeNode);

var _forEachNode = __webpack_require__(19);

var _forEachNode2 = _interopRequireDefault(_forEachNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 功能特性：
 * - Immutable对象反映原始对象的完整结构，但各属性均为只读，一切变更均通过接口进行
 * - Primitive自身即为immutable，无需处理
 * - 支持将Date、RegExp转换为Plain object
 * - 支持通过外部函数对Function和复杂对象进行Plain转换
 * - 支持循环引用结构，并确保结构不丢失（循环引用检查始终在root进行）
 * - 支持对循环引用的更新，其最终在真实被引用对象上做变更
 * - 可快速定位到处于任意位置的对象，而无需遍历
 * - 可快速实施变更，而无需clone整个数据结构
 * - 同源Immutable的差异对比，即，比较前后的变更情况，避免全结构遍历
 */

var IMMUTABLE_PATH_LINK = '[[ImmutablePathLink]]';
var IMMUTABLE_CYCLE_REF = '[[ImmutableCycleRef]]';
var IMMUTABLE_DATE = '[[ImmutableDate]]';
var IMMUTABLE_REGEXP = '[[ImmutableRegExp]]';

function getPathLink(obj) {
    return obj[IMMUTABLE_PATH_LINK] ? obj[IMMUTABLE_PATH_LINK]() : {};
}

function _isCycleRef(obj) {
    return (0, _hasOwn2.default)(obj, IMMUTABLE_CYCLE_REF);
}

/**
 * Arrive the actual node following the cycle reference node.
 */
function extractImmutablePath(immutable, path) {
    var untilToEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var extractedPath = (0, _extractPath2.default)(path);
    if (!extractedPath || extractedPath.length === 0) {
        return extractedPath;
    }

    var realPath = [];
    var node = immutable;
    for (var i = 0, len = extractedPath.length; untilToEnd ? i <= len : i < len; i++) {
        // Maybe some cycle reference was referenced by other,
        // just follow cycle reference until to the real node,
        // or unlimited recursion error is thrown.
        while (_isCycleRef(node)) {
            // NOTE: The path is always starting from root node.
            realPath = immutable.path(node.valueOf());

            if (i < extractedPath.length) {
                node = immutable.get(realPath);
            } else {
                break;
            }
        }

        if (i < extractedPath.length) {
            if ((0, _isPrimitive2.default)(node)) {
                return null; // Broken path!
            } else {
                var key = extractedPath[i];
                node = node[key];
                realPath.push(key);
            }
        }
    }
    return realPath;
}

function createImmutable(obj) /*, rootPathLink, rootGUID*/{
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (isImmutable(obj)) {
        return obj;
    }

    // Make sure the guid was bound to `obj`.
    var objGUID = (0, _guid2.default)(obj);
    // NOTE: Do not record current obj's path link.
    // Because the same immutable object may be referenced more than once.
    var rootObjPathLink = arguments[2];
    var rootObjGUID = arguments[3];
    var objPathLink = {};

    // Hold current node in the root path link to
    // detect the cycle reference in the depth direction at root node.
    rootObjPathLink && (rootObjPathLink[objGUID] = {});

    function isCycleRefTo(target) {
        var targetGUID = (0, _guid2.default)(target);
        return contains(targetGUID) /* cross cycle reference check */
        || targetGUID === rootObjGUID /* root cycle reference check */
        || !!rootObjPathLink && rootObjPathLink[targetGUID] /* depth cycle reference check */;
    }

    function _hasCycleRefs() {
        for (var key in objPathLink) {
            if (objPathLink[key].refer) {
                return true;
            }
        }
        return false;
    }

    function bindValue(obj, value, key, enumerable) {
        Object.defineProperty(obj, key, {
            enumerable: enumerable,
            value: value
        });

        // Record current path link and merge path link of value.
        if (!(0, _isPrimitive2.default)(value)) {
            objPathLink[(0, _guid2.default)(value)] = Object.freeze({
                top: (0, _guid2.default)(obj),
                path: '' + key,
                refer: _isCycleRef(value)
            });
            // TODO 如何处理挂载的Immutable子树中存在的循环引用？
            // TODO 如何处理循环引用的循环引用成环问题？需要确保不出现引用环！！
            var valuePathLink = getPathLink(value);
            Object.assign(objPathLink, valuePathLink);

            // Hold all sub nodes in the root path link to
            // detect the cycle references between different sub-tree.
            rootObjPathLink && Object.assign(rootObjPathLink, objPathLink);
        }
    }

    function contains(guid) {
        return !!objPathLink[guid] || guid === objGUID;
    }

    function getPath(guid) {
        if (!contains(guid)) {
            return undefined;
        }

        var path = [];
        var nodeGUID = guid;
        while (nodeGUID && nodeGUID !== objGUID) {
            var link = objPathLink[nodeGUID];
            // NOTE: If link is broken, just throw error.
            path.unshift(link.path);
            nodeGUID = link.top;
        }
        return path;
    }

    var globalOpts = options;
    var toPlain = globalOpts.toPlain;
    var createInnerImmutable = function createInnerImmutable(obj, rootPathLink, rootGUID) {
        return createImmutable(obj, globalOpts, rootPathLink, rootGUID);
    };
    var isPlainObj = (0, _isPlainObject2.default)(obj);
    var isArrayObj = (0, _isArray2.default)(obj);
    var isDateObj = (0, _isDate2.default)(obj);
    var isRegExpObj = (0, _isRegExp2.default)(obj);

    // Convert source object.
    var processedObj = obj;
    if (isDateObj) {
        processedObj = _defineProperty({}, IMMUTABLE_DATE, obj.getTime());
    } else if (isRegExpObj) {
        processedObj = _defineProperty({}, IMMUTABLE_REGEXP, obj.toString());
    } else if ((0, _isFunction2.default)(obj)) {
        (0, _invariant2.default)((0, _isFunction2.default)(toPlain), 'Detected the source object is a Function or a complex Object,' + ' the "options.toPlain" must be specified to make sure plain the source object correctly.');
        processedObj = toPlain(obj);
        (0, _invariant2.default)((0, _isPlainObject2.default)(processedObj), 'Expected to convert the source object to a plain object,' + (' but "options.toPlain" returned \'' + processedObj + '\'.'));
    } else if (!isPlainObj && !isArrayObj && (0, _isFunction2.default)(toPlain)) {
        processedObj = toPlain(obj);
        (0, _invariant2.default)((0, _isPlainObject2.default)(processedObj), 'Expected to convert the source object to a plain object,' + (' but "options.toPlain" returned \'' + processedObj + '\'.'));
    }
    // Keep the original guid.
    (0, _guid2.default)(processedObj, objGUID);

    // Define prototype methods.
    var privateMethods = _defineProperty({}, IMMUTABLE_PATH_LINK, (function () {
        return Object.assign({}, objPathLink);
    }));

    var commonMethods = {
        toString: function toString() {
            return JSON.stringify(this);
        },
        valueOf: function valueOf() {
            if (this.isDate()) {
                return this[IMMUTABLE_DATE];
            } else if (this.isRegExp()) {
                return this[IMMUTABLE_REGEXP];
            } else if (this.isCycleRef()) {
                return this[IMMUTABLE_CYCLE_REF];
            } else {
                return this;
            }
        },
        toJS: function toJS() {
            return this;
        },
        toJSON: function toJSON() {
            return this;
        },
        isArray: function isArray() {
            return isArrayObj;
        },
        isDate: function isDate() {
            return (0, _hasOwn2.default)(this, IMMUTABLE_DATE);
        },
        isRegExp: function isRegExp() {
            return (0, _hasOwn2.default)(this, IMMUTABLE_REGEXP);
        },
        isCycleRef: function isCycleRef() {
            return _isCycleRef(this);
        },
        hasCycleRefs: function hasCycleRefs() {
            return _hasCycleRefs();
        },
        /** Deeply check if the specified immutable is equal to `this`. */
        equals: function equals(other) {
            return Immutable.equals(this, other);
        },
        /** Check if `this` and `other` represent a same object or not. */
        same: function same(other) {
            return Immutable.same(this, other);
        },
        /**
         * @return {String[]} Return the index of elements if the immutable self is an Array-like object.
         */
        keys: function keys() {
            return this.isArray() ? Array.apply(null, new Array(this.size())).map((function (v, i) {
                return i;
            })) : Object.keys(this);
        },
        /**
         * Get the array path of the specified node from the root node.
         *
         * @param {String/Object} node The guid of node, or node self.
         * @return {Array/undefined} If the specified node is root node, return `[]`.
         *          Else if the specified node isn't on the object tree, return `undefined`.
         */
        path: function path(node) {
            var nodeGUID = (0, _isPrimitive2.default)(node) ? node : (0, _guid2.default)(node);
            return getPath(nodeGUID);
        },
        /**
         * Get the relative path from `topNode` to `subNode`.
         *
         * @param {Object/String} [topNode] The guid of top node, or node self.
         * @param {Object/String} [subNode] The guid of sub node, or node self.
         * @return {Array/undefined} Return `[]` if two nodes are same,
         *          otherwise return `undefined` if it's unreachable from `topNode` to `subNode`.
         */
        subPath: function subPath(topNode, subNode) {
            var topNodePath = this.path(topNode);
            var subNodePath = this.path(subNode);

            if (!topNodePath || !subNodePath) {
                return undefined;
            }
            for (var i = 0; i < topNodePath.length; i++) {
                if (topNodePath[i] !== subNodePath[i]) {
                    return undefined;
                }
            }
            return subNodePath.slice(topNodePath.length);
        },
        /**
         * Check if the specified node is on the object tree.
         *
         * @param {String/Object} node The guid of node, or node self.
         */
        has: function has(node) {
            var nodeGUID = (0, _isPrimitive2.default)(node) ? node : (0, _guid2.default)(node);
            return contains(nodeGUID);
        },
        /**
         * Get the target immutable node by the specified path.
         *
         * If the `path` contains cycle reference node,
         * it will be turn back to the real node and
         * continue to search until to the target node.
         *
         * NOTE: The target node maybe contains cycle reference nodes,
         * they can be processed when need.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @return {Immutable/undefined} The immutable node,
         *          or `undefine` if the `path` cannot be reached.
         *          If `path` is empty, just return the Immutable self.
         */
        get: function get(path) {
            var extractedPath = extractImmutablePath(this, path, false);
            var root = (0, _getNodeByPath2.default)(this, extractedPath);
            return createInnerImmutable(root);
        },
        /**
         * Set new value to the target node or create a new node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @param {*} value The new value which will replace the target node.
         * @return {Immutable} Return the Immutable self if the `path` is unreachable.
         */
        set: function set(path, value) {
            // NOTE: Avoid to replace the root when the path is unreachable!
            var extractedPath = extractImmutablePath(this, path, false);

            var root;
            if (extractedPath && extractedPath.length === 0) {
                root = value;
            } else {
                // TODO 若value为Immutable，则其可能存在A引用当前Immutable内的B。注意：其内部的循环引用无需处理，但若是其引用了A，则最终需将其调整为引用B
                // Copy and create a new node, then make it immutable.
                // NOTE: Do not make value immutable directly,
                // the new immutable will collect path link and process cycle references.
                root = (0, _copyNodeByPath2.default)(this, extractedPath, (function () {
                    return value;
                }));
            }
            return createInnerImmutable(root);
        },
        /**
         * Update the target node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @param {Function} targetNodeUpdater The target node update function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => *`.
         *          If `path` is empty, the Immutable self will be passed to the updater.
         * @param {Function} [pathNodeUpdater] The path node update function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => *`.
         */
        update: function update(path, targetNodeUpdater, pathNodeUpdater) {
            var extractedPath = extractImmutablePath(this, path);
            var root = this;

            if ((0, _isFunction2.default)(targetNodeUpdater)) {
                if (extractedPath && extractedPath.length === 0) {
                    root = targetNodeUpdater(root);
                } else {
                    // TODO 若目标节点内还存在循环引用，在updater里该如何处理？传入root，通过root更新子树？
                    root = (0, _copyNodeByPath2.default)(this, extractedPath, (function (node, topKey, topNode) {
                        // NOTE: The target node is immutable already.
                        return targetNodeUpdater(node, topKey, topNode);
                    }), pathNodeUpdater ? function (node, topKey, topNode) {
                        node = createInnerImmutable(node);
                        topNode = createInnerImmutable(topNode);
                        return pathNodeUpdater(node, topKey, topNode);
                    } : null);
                }
            }
            return createInnerImmutable(root);
        },
        /**
         * Merge the specified node to `this`.
         *
         * @param {*} value
         * @param {Boolean} [deep=false] Merge deeply or not.
         * @return {Immutable}
         */
        merge: function merge(value, deep) {
            // TODO 将引用节点转换为其指向的节点
            var root = (0, _mergeNode2.default)(this, value, deep);
            return createInnerImmutable(root);
        },
        /**
         * Deeply merge the specified node to `this`.
         * It's equal to `this.merge(value, true)`.
         *
         * @param {*} value
         * @return {Immutable}
         */
        mergeDeep: function mergeDeep(value) {
            return this.merge(value, true);
        },
        /**
         * Remove the specified node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @return {Immutable} If `path` is null, empty or unreachable, the Immutable self will be returned.
         */
        remove: function remove(path) {
            var extractedPath = extractImmutablePath(this, path);
            // TODO 若移除的包含被引用对象，该如何处理？
            var updater = function updater(target, key, top) {
                return (0, _hasOwn2.default)(top, key) ? (0, _copyNodeByPath.removeTheNode)(target) : target;
            };
            var root = (0, _copyNodeByPath2.default)(this, extractedPath, updater);

            return createInnerImmutable(root);
        },
        /**
         * Clear all properties or elements, and return empty immutable array or object.
         *
         * @return {Immutable} The immutable array or object with the same GUID with `this`.
         */
        clear: function clear() {
            var target = this.isArray() ? [] : {};
            (0, _guid2.default)(target, (0, _guid2.default)(this));

            return createInnerImmutable(target);
        },
        /**
         * Find the matched node.
         *
         * @param {Function} predicate A matching function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => Boolean`
         * @return {Immutable/undefined} The matched node or `undefined` if no node matched.
         */
        find: function find(predicate) {
            var _this = this;

            var expected;
            if ((0, _isFunction2.default)(predicate)) {
                this.forEach((function (node, key) {
                    var accepted = predicate(node, key, _this);

                    if (accepted) {
                        expected = node;
                    }
                    return !accepted;
                }));
            }
            return expected;
        },
        /**
         * Filter the matched properties.
         *
         * @param {Function} predicate A filter function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => Boolean`
         * @return {Immutable}
         */
        filter: function filter(predicate) {
            var _this2 = this;

            var target = this.isArray() ? [] : {};

            if ((0, _isFunction2.default)(predicate)) {
                this.forEach((function (node, key) {
                    var accepted = predicate(node, key, _this2);

                    if (accepted) {
                        var prop = (0, _isArray2.default)(target) ? target.length : key;
                        target[prop] = node;
                    }
                }));
            }
            return createInnerImmutable(target);
        },
        /**
         * Traverse all properties of the target node.
         *
         * If the `path` is null or empty, traverse from the root.
         *
         * @param {Array/String} [path] The array path, or string path split by `.`.
         * @param {Function} sideEffect A traverse function
         *          with signature `(node: Immutable, topKey, topNode: Immutable, fullPath) => Boolean`.
         *          If it return `false`, the traversing will be stop.
         */
        forEach: function forEach(path, sideEffect) {
            if ((0, _isFunction2.default)(path)) {
                sideEffect = path;
                path = [];
            }

            var extractedPath = extractImmutablePath(this, path);
            (0, _forEachNode2.default)(this, extractedPath, sideEffect);
        },
        /**
         * Returns a new Array/Object with values passed through the `mapper`.
         *
         * @param {Function} mapper Mapper function
         *          with signature `(value: Immutable, key, this) => *`.
         * @return {Immutable} If `mapper` isn't specified or no changes happened, return `this`.
         */
        map: function map(mapper) {
            if (!(0, _isFunction2.default)(mapper)) {
                return this;
            }

            var changed = false;
            var target = this.isArray() ? [] : {};
            this.forEach((function (node, topKey, topNode) {
                var newNode = mapper(node, topKey, topNode);

                target[topKey] = newNode;
                newNode !== node && (changed = true);
            }));
            // Remain the GUID as the source.
            (0, _guid2.default)(target, (0, _guid2.default)(this));

            return changed ? createInnerImmutable(target) : this;
        },
        /**
         * Reduces the immutable to a value by calling the `reducer` for every entry
         * and passing along the reduced value.
         *
         * @param {Function} reducer Reducer function
         *          with signature `(reduction: Immutable, value: Immutable, key, this) => *`.
         * @param {*} initVal The initial value of reduction.
         * @return {Immutable} If `reducer` isn't specified, return `initVal`.
         */
        reduce: function reduce(reducer, initVal) {
            var target = initVal;

            if ((0, _isFunction2.default)(reducer)) {
                this.forEach((function (node, topKey, topNode) {
                    target = createInnerImmutable(target);
                    target = reducer(target, node, topKey, topNode);
                }));
            }
            return createInnerImmutable(target);
        }
    };

    var arrayMethods = {
        /**
         * Put elements to the array tail.
         *
         * @param {...T} values
         * @return {Immutable} If no arguments, return `this`.
         */
        push: function push() {
            for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
                values[_key] = arguments[_key];
            }

            if (arguments.length === 0) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this);
            Array.prototype.push.apply(root, arguments);

            return createInnerImmutable(root);
        },
        /**
         * Remove the element at the array tail.
         *
         * @return {Immutable} If it's an empty immutable array, return `this`.
         */
        pop: function pop() {
            if (this.isEmpty()) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this);
            root.pop();
            return createInnerImmutable(root);
        },
        /**
         * Put elements to the array head.
         *
         * @param {...T} values
         * @return {Immutable} If no arguments, return `this`.
         */
        unshift: function unshift() {
            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            if (arguments.length === 0) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this);
            Array.prototype.unshift.apply(root, arguments);

            return createInnerImmutable(root);
        },
        /**
         * Remove the element at the array head.
         *
         * @return {Immutable} If it's an empty immutable array, return `this`.
         */
        shift: function shift() {
            if (this.isEmpty()) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this);
            root.shift();
            return createInnerImmutable(root);
        },
        /**
         * Remove the specified count elements and insert new elements.
         *
         * @param {Number} [start]
         * @param {Number} [removeNum]
         * @param {...T} [values]
         * @return {Immutable} If no arguments, return `this`.
         */
        splice: function splice(start, removeNum) {
            for (var _len3 = arguments.length, values = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                values[_key3 - 2] = arguments[_key3];
            }

            if (arguments.length === 0) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this);
            Array.prototype.splice.apply(root, arguments);

            return createInnerImmutable(root);
        },
        /**
         * Selects a part of an array, and returns the new array.
         *
         * @param {Number} [start]
         * @param {Number} [end]
         * @return {Immutable} If no arguments, return `this`.
         */
        slice: function slice(start, end) {
            if (arguments.length === 0) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this);
            root = Array.prototype.slice.apply(root, arguments);
            (0, _guid2.default)(root, (0, _guid2.default)(this));

            return createInnerImmutable(root);
        },
        /**
         * Joins two or more arrays, and returns a copy of the joined arrays.
         *
         * @param {...T/T[]} [arrays]
         * @return {Immutable} If no arguments, return `this`.
         */
        concat: function concat() {
            for (var _len4 = arguments.length, arrays = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                arrays[_key4] = arguments[_key4];
            }

            if (arguments.length === 0) {
                return this;
            }
            arrays = arrays.map((function (array) {
                if (Immutable.isInstance(array) && array.isArray()) {
                    array = (0, _cloneNode2.default)(array);
                }
                return array;
            }));

            var root = (0, _cloneNode2.default)(this);
            root = Array.prototype.concat.apply(root, arrays);
            (0, _guid2.default)(root, (0, _guid2.default)(this));

            return createInnerImmutable(root);
        },
        /**
         * Insert new elements to the specified location.
         *
         * NOTE: If the inserted `values` is a big array,
         * using `.insert()` will be better than `.splice()`.
         *
         * @param {Number} [index]
         * @param {T/T[]} [values]
         * @return {Immutable} If no arguments or `values` is empty, return `this`.
         */
        insert: function insert(index, values) {
            if (arguments.length <= 1) {
                return this;
            }
            if (Immutable.isInstance(values) && values.isArray()) {
                values = (0, _cloneNode2.default)(values);
            }

            var root = (0, _cloneNode2.default)(this);
            [].concat(values).forEach((function (value, i) {
                root.splice(index + i, 0, value);
            }));

            return createInnerImmutable(root);
        },
        /**
         * Sort the elements.
         *
         * @param {Function} [compareFn]
         * @return {Immutable} If the size <= 1, return `this`.
         */
        sort: function sort(compareFn) {
            if (this.size() <= 1) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this).sort(compareFn);
            return createInnerImmutable(root);
        },
        /**
         * Reverse the elements.
         *
         * @return {Immutable} If the size <= 1, return `this`.
         */
        reverse: function reverse() {
            if (this.size() <= 1) {
                return this;
            }

            var root = (0, _cloneNode2.default)(this).reverse();
            return createInnerImmutable(root);
        },
        /**
         * Return the first element.
         *
         * @return {*}
         */
        first: function first() {
            return this[0];
        },
        /**
         * Return the last element.
         *
         * @return {*}
         */
        last: function last() {
            return this.isEmpty() ? undefined : this[this.size() - 1];
        },
        /**
         * Return the element which is at `index`.
         *
         * @return {*}
         */
        at: function at(index) {
            return this[parseInt(index, 10)];
        },
        /**
         * Find the location of matched element.
         *
         * @param {Function} predicate A matching function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => Boolean`
         * @return {Number} Return `-1` if no element matched.
         */
        findIndex: function findIndex(predicate) {
            var index = -1;

            if ((0, _isFunction2.default)(predicate)) {
                this.forEach((function (node, topKey, topNode) {
                    if (predicate(node, topKey, topNode)) {
                        index = topKey;
                        return false;
                    }
                }));
            }
            return index;
        },
        size: function size() {
            return this.length;
        },
        isEmpty: function isEmpty() {
            return this.size() === 0;
        }
    };

    var objectMethods = {};

    // Construct and create immutable object.
    var methods = Object.assign({}, privateMethods, commonMethods, isArrayObj ? arrayMethods : objectMethods);
    var immutableProto = Object.create(Immutable.prototype, (0, _createNE2.default)(methods));
    var immutableObj = Object.create(immutableProto);

    var reservedKeys = [_guid.GUID_SENTINEL];
    // Keep the immutable properties in the lower index to make sure to process them before others.
    var objKeys = Object.keys(processedObj).concat(isArrayObj ? ['length'] : []).sort((function (key, other) {
        return Immutable.isInstance(processedObj[key]) ? -1 : Immutable.isInstance(processedObj[other]) ? 1 : 0;
    }));
    // NOTE: Make sure GUID was bound at first.
    reservedKeys.concat(objKeys).forEach((function (key) {
        var value = processedObj[key];
        if (isCycleRefTo(value)) {
            value = _defineProperty({}, IMMUTABLE_CYCLE_REF, (0, _guid2.default)(value));
        }
        // Make sure GUID was bound as enumerable property.
        var enumerable = reservedKeys.indexOf(key) >= 0 || (0, _isEnumerable2.default)(processedObj, key);
        var immutableValue = createInnerImmutable(value, rootObjPathLink || objPathLink, rootObjGUID || objGUID);
        bindValue(immutableObj, immutableValue, key, enumerable);
    }));

    // Not allow to add new properties or remove, change the existing properties.
    return Object.freeze(immutableObj);
}

function isImmutable(obj) {
    return (0, _isNullOrUndefined2.default)(obj) || (0, _isPrimitive2.default)(obj)
    // Frozen object should be convert to Immutable object also.
    // || Object.isFrozen(obj)
    || Immutable.isInstance(obj);
}

function Immutable() {
    // Just an immutable constructor, no business logic.
    throw new Error('new Immutable() or Immutable() isn\'t supported,' + ' please use Immutable.create() to create an immutable object.');
}

/**
 * Bind GUID to `obj` or get the GUID bound to `obj`.
 *
 * @param {Object} obj
 * @param {String} [id] A custom id which will be bound to `obj`.
 * @param {Boolean} [enumerable=false] Bind id as enumerable property or not?
 * @return {String/Object} Return `obj` if the parameter `id` was specified,
 *          otherwise, return the id bound to `obj`.
 */
Immutable.guid = _guid2.default;
/**
 * Check whether `obj` is an {@link Immutable} object or not.
 *
 * NOTE: `null`, `undefined` or any primitive are immutable too.
 *
 * @param {*} obj
 */
Immutable.isImmutable = isImmutable;
/**
 * Check whether `obj` is an instance of {@link Immutable} or not.
 *
 * @param {*} obj
 */
Immutable.isInstance = function (obj) {
    return obj && (obj instanceof Immutable || obj.constructor === Immutable);
};
/**
 * Create {@link Immutable} instance of `obj`.
 *
 * @param {*} obj
 * @param {Object} [options={}]
 * @param {Function} [options.toPlain]
 *          A plain object converter(Signature: `(value: [Function/Object]) => Object`)
 *          for Function and Complex Object.
 *          e.g. `toPlain: (fn) => ({$fn: 'function name'})`,
 *          `toPlain: (obj) => Object.assign({$class: 'complex class name'}, obj)`
 * @return {Immutable} Return an immutable object, or Array-like immutable object when `obj` is an array.
 */
Immutable.create = function (obj, options) {
    return createImmutable(obj, options);
};
/**
 * Check if `source` and `other` represent a same object.
 *
 * NOTE: The same objects maybe isn't {@link #equals equal}.
 *
 * @return {Boolean}
 */
Immutable.same = function (source, other) {
    return (0, _isObject2.default)(source) && (0, _guid2.default)(source) === (0, _guid2.default)(other);
};
// TODO 1. 返回diff格式的差异，以path为键值；2. 比较path link的增删节点；3. 比较相同id的immutable的属性是否存在差异，但不做深度比较
Immutable.diff = function (source, other) {
    return {};
};
/**
 * Deep value equality check.
 *
 * @return {Boolean}
 */
Immutable.equals = function (source, other) {
    if (source === other || !(0, _isObject2.default)(source) || !(0, _isObject2.default)(other)) {
        return source === other;
    }

    var sourceKeys = Object.keys(source).sort();
    var otherKeys = Object.keys(other).sort();
    // NOTE: Array-like object maybe equal to an actual array.
    if (sourceKeys.length === otherKeys.length) {
        for (var i = 0; i < sourceKeys.length; i++) {
            var sourceKey = sourceKeys[i];
            var otherKey = otherKeys[i];

            if (sourceKey !== otherKey || !Immutable.equals(source[sourceKey], other[otherKey])) {
                return false;
            }
        }
        return true;
    }
    return false;
};

exports.default = Immutable;
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeTheNode = removeTheNode;

exports.default = function (root, path, targetNodeProcessor, pathNodeProcessor) {
    if (!(0, _isObject2.default)(root) || !(0, _isArray2.default)(path) || path.length === 0) {
        return root;
    }

    var pathNodes = [];
    var targetNode = root;
    var topKey = null;
    var topNode = null;
    // Walk to target, ignore Function node.
    for (var i = 0; i < path.length && (0, _isObject2.default)(targetNode); i++) {
        pathNodes.push({
            top: topNode,
            key: topKey
        });

        topNode = targetNode;
        topKey = path[i];
        targetNode = topNode[topKey];
    }
    // Unreachable? Return root.
    if (i < path.length) {
        return root;
    }

    // Process the target node.
    var processedNode = targetNodeProcessor ? targetNodeProcessor(targetNode, topKey, topNode, path.slice()) : targetNode;
    if (processedNode !== targetNode) {
        targetNode = processedNode;
    } else {
        // No mutation
        return root;
    }

    // Go back to the root following the path from bottom to up.
    do {
        if (shouldBeRemoved(targetNode)) {
            // Should be cut?
            // Cut the node from current top
            if (topNode) {
                topNode = (0, _cloneNode2.default)(topNode);
                if ((0, _isArray2.default)(topNode)) {
                    topNode.splice(topKey, 1);
                } else {
                    delete topNode[topKey];
                }
                targetNode = topNode;
            }
            // Already at root? Remove it.
            else {
                    targetNode = undefined;
                }
        }
        // Just update
        else {
                if (topNode) {
                    topNode = (0, _cloneNode2.default)(topNode);
                    topNode[topKey] = targetNode;
                }
                // Process the path node.
                processedNode = pathNodeProcessor ? pathNodeProcessor(targetNode, topKey, topNode, path.slice(0, pathNodes.length)) : targetNode;
                if (processedNode !== targetNode) {
                    targetNode = processedNode;
                    if (shouldBeRemoved(targetNode)) {
                        continue; // Cut the node first.
                    }
                }
                // Mount the processed node on the top.
                if (topNode) {
                    topNode[topKey] = targetNode;
                    targetNode = topNode;
                }
            }

        // Move to the top node.
        var pathNode = pathNodes.pop();
        topKey = pathNode && pathNode.key;
        topNode = pathNode && pathNode.top;
    } while (topNode !== undefined);

    return shouldBeRemoved(targetNode) ? undefined : targetNode;
};

var _isObject = __webpack_require__(0);

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = __webpack_require__(1);

var _isArray2 = _interopRequireDefault(_isArray);

var _cloneNode = __webpack_require__(4);

var _cloneNode2 = _interopRequireDefault(_cloneNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShouldBeRemovedNode = {};
function shouldBeRemoved(node) {
    return node === ShouldBeRemovedNode;
}

function removeTheNode(node) {
    return ShouldBeRemovedNode;
}

/**
 * Make a copy following the `path` from root,
 * and return the new copy of `root` if some changes happened.
 *
 * NOTE:
 * - If the target node isn't mutated, the `pathNodeProcessor`
 *   will not be called and the `root` will be returned;
 * - If the `path` is unreachable, `root` will be returned;
 *
 * @param {Object} root The start node to search.
 * @param {Array} path An array path from root to the target node.
 * @param {Function} [targetNodeProcessor]
 *          The function to process the target node.
 *          Signature: `(targetNode, topKey, topNode, fullPath) => *`.
 * @param {Function} [pathNodeProcessor]
 *          The function to process the path node(including target).
 *          Signature: `(targetNode, topKey, topNode, fullPath) => *`.
 */

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (root, path, sideEffect) {
    var target = (0, _getNodeByPath2.default)(root, path);
    if (!(0, _isObject2.default)(target) || !(0, _isFunction2.default)(sideEffect)) {
        return;
    }

    var keys = target.isArray && target.isArray() ? Array.apply(null, new Array(target.size())).map((function (v, i) {
        return i;
    })) : Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = target[key];

        var ret = sideEffect(value, key, target, path.concat(key));
        if (ret === false) {
            return;
        }
    }
};

var _isObject = __webpack_require__(0);

var _isObject2 = _interopRequireDefault(_isObject);

var _isFunction = __webpack_require__(3);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _getNodeByPath = __webpack_require__(5);

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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mergeNode;

var _isObject = __webpack_require__(0);

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = __webpack_require__(1);

var _isArray2 = _interopRequireDefault(_isArray);

var _guid = __webpack_require__(2);

var _cloneNode = __webpack_require__(4);

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
    Object.keys(source).forEach((function (key) {
        if (reservedKeys.indexOf(key) >= 0 || target[key] === source[key]) {
            return;
        }

        targetCopy[key] = deep ? mergeNode(target[key], source[key], true) : source[key];
        changed = true;
    }));

    return changed ? targetCopy : target;
}
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return obj instanceof RegExp;
};

module.exports = exports["default"];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return typeof obj === 'string';
};

module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj, prop) {
    if (!obj || !prop || !(prop in obj)) {
        return true;
    }

    var des = Object.getOwnPropertyDescriptor(obj, prop);
    return !des || des.writable !== false;
};

module.exports = exports["default"];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (__webpack_require__.i({"VERSION":"0.1.0"}).NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, (function() { return args[argIndex++]; }))
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(27);
var bytesToUuid = __webpack_require__(26);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 30 */
/***/ ((function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }))
/******/ ]);
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbbnVsbF0sInNvdXJjZXNDb250ZW50IjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztTQWNTLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUVGLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBcVN3QixDQUFBOzs7Ozs7O0tBTzFCLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0VBMmpCNkQsQ0FBQTs7S0FFN0QsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0ZBa0Q2RSxDQUFBOzthQUVyRSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswRUFtRjZELENBQUE7O2lCQUV6RCxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4RUF1QjZELENBQUE7OztxQkFHekQsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFzRVEsQ0FBQTs7Ozs7OztpQkFPWixDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFpQlksQ0FBQTs7Ozs7OztpQkFPWixDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQXFDUSxDQUFBOzs7OzthQUtaLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBbUJnQixDQUFBOzs7aUJBR1osQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQWlJZSxDQUFBOzs7OzthQUtuQixDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBMkJ5QixDQUFBOzthQUV6QixDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBa0VnQixDQUFBOzs7OztpQkFLWixDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0ZBcUJxRSxDQUFBOztLQUVqRixDQUFBOzt5Q0FFb0MsQ0FBQTs7Ozs7Ozs7O0tBU3BDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29HQWlRK0YsQ0FBQTs7S0FFL0YsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBZ0YyQixDQUFBOzs7Ozs7O0tBTzNCLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFpSXlCLENBQUEsdUNBQXVDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0o5RCxDQUFBOzs7OztPQUtBLENBQUE7O0NBRU4sQ0FBQSJ9