import isObject from '../utils/isObject';

/**
 * @param {*} root
 * @param {Array} path
 */
export default function (root, path) {
    if (!path) {
        return undefined;
    }

    var node = root;
    for (var i = 0; i < path.length && isObject(node); i++) {
        var key = path[i];
        node = node[key];
    }
    return i >= path.length ? node : undefined;
}
