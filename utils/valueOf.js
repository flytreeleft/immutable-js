import isNullOrUndefined from './isNullOrUndefined';

export default function (obj) {
    return !isNullOrUndefined(obj) && obj.valueOf instanceof Function ? obj.valueOf() : obj;
}
