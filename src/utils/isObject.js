/**
 * Check if the `obj` is an object or not.
 *
 * NOTE: Passing `null` and `undefined` will return `false`.
 */
export default function (obj) {
    return !!obj && typeof obj === 'object';
}
