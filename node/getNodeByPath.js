import isObject from '../utils/isObject';

/**
 * Get target node object from `root` following the `path`.
 *
 * @param {*} root The root node of object tree.
 * @param {Array} path The path of target node.
 * @return {*}
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
