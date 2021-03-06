import valueOf from './valueOf';
import isBoolean from './isBoolean';

function next() {
    var uuid = require('uuid/v4');
    return uuid().replace(/-/g, '');
}

export const GUID_SENTINEL = '[[GlobalUniqueID]]';
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
    return !!obj && ['function', 'object'].indexOf(typeof obj) >= 0;
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
export default function (obj, id, enumerable = false) {
    if (!canBind(obj)) {
        return null;
    }
    if (isBoolean(id)) {
        enumerable = id;
    }

    var value = valueOf(obj);
    var isBinding = !!id;
    var boundId = obj[GUID_SENTINEL] || (canBind(value) && value[GUID_SENTINEL]);

    if (!boundId || isBinding) {
        bind(obj, isBinding ? id : (boundId = next()), enumerable);
    }
    return isBinding ? obj : boundId;
}
