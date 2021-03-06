export function isNull(obj) {
    return obj === null;
}

export function isUndefined(obj) {
    return typeof obj === 'undefined';
}

export default function isNullOrUndefined(obj) {
    return isNull(obj) || isUndefined(obj);
}
