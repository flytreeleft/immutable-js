import valueOf from './valueOf';

const ID_LENGTH = 16;
function next() {
    return require('crypto').randomBytes(ID_LENGTH)
                            .toString('hex')
                            .substr(0, ID_LENGTH);
}

export const GUID_SENTINEL = '[[GlobalUniqueID]]';
function bind(obj, id) {
    Object.defineProperty(obj, GUID_SENTINEL, {
        writable: false,
        configurable: true,
        enumerable: true,
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
 * @return {String/Object} Return `obj` if the parameter `id` was specified,
 *          otherwise, return the id bound to `obj`.
 */
export default function (obj, id) {
    if (!canBind(obj)) {
        return null;
    }

    var value = valueOf(obj);
    var isBinding = !!id;
    var boundId = obj[GUID_SENTINEL] || (canBind(value) && value[GUID_SENTINEL]);

    if (!boundId || isBinding) {
        bind(obj, isBinding ? id : (boundId = next()));
    }
    return isBinding ? obj : boundId;
}
