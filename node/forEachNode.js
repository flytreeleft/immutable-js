import isObject from '../utils/isObject';
import isFunction from '../utils/isFunction';

import getNodeByPath from './getNodeByPath';

/**
 * Traverse all properties of the target node.
 *
 * @param {*} root
 * @param {Array} path
 * @param {Function} sideEffect A traverse function
 *          with signature `(node, topKey, topNode, fullPath) => Boolean`.
 *          If it return `false`, the traversing will be stop.
 */
export default function (root, path, sideEffect) {
    var target = getNodeByPath(root, path);
    if (!isObject(target) || !isFunction(sideEffect)) {
        return;
    }

    var keys = target.isArray && target.isArray()
        ? Array.apply(null, new Array(target.size())).map((v, i) => i)
        : Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = target[key];

        var ret = sideEffect(value, key, target, path.concat(key));
        if (ret === false) {
            return;
        }
    }
}
