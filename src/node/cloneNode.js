import isObject from '../utils/isObject';
import isArray from '../utils/isArray';
import guid from '../utils/guid';

/**
 * NOTE: Ignore Function and primitive node.
 */
export default function (node) {
    if (!isObject(node)) {
        return node;
    }

    var nodeId = guid(node);
    var newNode;
    if (isArray(node)) {
        newNode = node.concat();
    } else if (node.isArray && node.isArray()) { // Immutable array-like object
        newNode = Array.prototype.slice.call(node);
    } else {
        newNode = {...node};
    }
    guid(newNode, nodeId);

    return newNode;
}
