import isNullOrUndefined from './isNullOrUndefined';
import isFunction from './isFunction';

export default function (obj) {
    return !isNullOrUndefined(obj) && isFunction(obj.valueOf) ? obj.valueOf() : obj;
}
