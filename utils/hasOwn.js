var hasOwnProperty = Object.prototype.hasOwnProperty;
export default function (obj, prop) {
    return !!obj && typeof obj === 'object' && hasOwnProperty.call(obj, prop);
}
