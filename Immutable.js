import isArray from './utils/isArray';
import isPrimitive from './utils/isPrimitive';
import isNullOrUndefined from './utils/isNullOrUndefined';
import isEnumerable from './utils/isEnumerable';
import createNE from './utils/createNE';
import guid, {GUID_SENTINEL} from './utils/guid';

/**
 * 功能特性：
 * - Immutable对象反映原始对象的完整结构，但各属性均为只读，一切变更均通过接口进行
 * - Primitive自身即为immutable，无需处理
 * - 可快速定位到处于任意位置的对象，而无需遍历
 * - 可快速实施变更，而无需clone整个数据结构
 * - 支持循环引用结构，并确保结构不丢失
 */

const IMMUTABLE_PATH_LINK = '__[IMMUTABLE_PATH_LINK]__';

/**
 * @param {*} obj
 */
function createImmutable(obj) {
    if (isImmutable(obj)) {
        return obj;
    }

    // Make sure the guid was bound to `obj`.
    const objGUID = guid(obj);
    const isArrayObj = isArray(obj);
    // NOTE: Do not record current obj's path link.
    // Because the same immutable object may be referenced more than once.
    const objPathLink = {};

    function bindValue(obj, value, key, enumerable) {
        // TODO Enable writing, but throw exception and suggestion in setter?
        Object.defineProperty(obj, key, {
            enumerable: enumerable,
            value: value
        });

        // Record current path link and merge path link of value.
        if (!isPrimitive(value)) {
            objPathLink[guid(value)] = Object.freeze({
                top: guid(obj),
                path: key
            });

            if (value[IMMUTABLE_PATH_LINK]) {
                Object.assign(objPathLink, value[IMMUTABLE_PATH_LINK]());
            }
        }
    }

    const privateMethods = {
        [IMMUTABLE_PATH_LINK]: function () {
            return Object.assign({}, objPathLink);
        }
    };

    const commonMethods = {
        toString: function () {
        },
        valueOf: function () {
        },
        toJS: function () {
            return this.valueOf();
        },
        toJSON: function () {
            return this.toJS();
        },
        isArray: function () {
            return isArrayObj;
        },
        forEach: function () {
        },
        map: function () {
        },
        reduce: function () {
        }
    };

    const arrayMethods = {
        push: function () {
        },
        pop: function () {
        },
        unshift: function () {
        },
        shift: function () {
        },
        splice: function () {
        },
        slice: function () {
        },
        concat: function () {
        },
        sort: function () {
        },
        reverse: function () {
        }
    };

    const objectMethods = {};

    let methods = Object.assign(
        {}, privateMethods, commonMethods,
        isArrayObj ? arrayMethods : objectMethods
    );
    let immutableProto = Object.create(Immutable.prototype, createNE(methods));
    let immutableObj = Object.create(immutableProto);
    let reservedKeys = [GUID_SENTINEL];
    let objKeys = Object.keys(obj).concat(isArrayObj ? ['length'] : []);

    // NOTE: Make sure GUID was bound at first.
    reservedKeys
        .concat(objKeys)
        .forEach((key) => {
            var value = obj[key];
            var enumerable = isEnumerable(obj, key);
            // TODO Cycle reference value?
            var immutableValue = createImmutable(value);

            bindValue(immutableObj, immutableValue, key, enumerable);
        });

    // Not allow to add new properties or remove, change the existing properties.
    return Object.freeze(immutableObj);
}

function Immutable() {
    // Just an immutable constructor, no business logic.
    throw new Error('new Immutable() or Immutable() isn\'t supported,'
                    + ' please use Immutable.create() to create an immutable object.');
}
Immutable.create = (obj) => createImmutable(obj);

export function isImmutable(obj) {
    return isNullOrUndefined(obj)
           || isPrimitive(obj)
           // Frozen object should be convert to Immutable object also.
           // || Object.isFrozen(obj)
           || obj instanceof Immutable
           || obj.constructor === Immutable;
}

export default Immutable;
