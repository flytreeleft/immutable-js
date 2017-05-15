import isArray from '../utils/isArray';
import isString from '../utils/isString';
import isNullOrUndefined from '../utils/isNullOrUndefined';

/**
 * @return {Array/null} Return `null` if `path` is null or undefined.
 */
export default function (path) {
    if (isNullOrUndefined(path)) {
        return null;
    }

    if (isString(path)) {
        return path.replace(/\[([^\[\]]+)\]/g, '.$1')
                   .replace(/(^\.+)|(\.+$)/g, '')
                   .split(/\./);
    } else if (isArray(path)) {
        return path;
    } else {
        throw new Error('Expected parameter "path" is'
                        + ` an Array or String. But received '${path}'.`);
    }
}
