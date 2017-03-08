import isObject from '../utils/isObject';
import isArray from '../utils/isArray';
import {GUID_SENTINEL} from '../utils/guid';

import cloneNode from './cloneNode';

const reservedKeys = [GUID_SENTINEL];
/**
 * Merge node and return the new merged copy of `target`.
 */
export default function mergeNode(target, source, deep = false) {
    if (target === source
        || !isObject(target) || !isObject(source)
        || (isArray(target) && !isArray(source))
        || (!isArray(target) && isArray(source))) {
        return source;
    }

    var changed = false;
    var targetCopy = cloneNode(target);
    Object.keys(source).forEach((key) => {
        if (reservedKeys.indexOf(key) >= 0
            || target[key] === source[key]) {
            return;
        }

        targetCopy[key] = deep ? mergeNode(target[key], source[key], true) : source[key];
        changed = true;
    });

    return changed ? targetCopy : target;
}
