export default function (obj) {
    return !!obj && (obj.constructor === Object || obj.constructor === undefined);
}
