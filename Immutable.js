import isArray from './utils/isArray';
import isPrimitive from './utils/isPrimitive';
import isNullOrUndefined from './utils/isNullOrUndefined';
import isEnumerable from './utils/isEnumerable';
import createNE from './utils/createNE';

/**
 * 功能特性：
 * - Immutable对象反映原始对象的完整结构，但各属性均为只读，一切变更均通过接口进行
 * - Primitive自身即为immutable，无需处理
 * - 可快速定位到处于任意位置的对象，而无需遍历
 * - 可快速实施变更，而无需clone整个数据结构
 * - 支持循环引用结构，并确保结构不丢失
 */

export const IMMUTABLE_TOP_KEY = '__[IMMUTABLE_TOP_KEY]__';
export const IMMUTABLE_TOP_PARENT = '__[IMMUTABLE_TOP_PARENT]__';
export const IMMUTABLE_TOP_PATH = '__[IMMUTABLE_TOP_PATH]__';

/**
 * @param {*} obj
 * @param {Immutable} [topParent]
 * @param {String} [topKey]
 */
function createImmutable(obj, topParent, topKey) {
    if (isImmutable(obj)) {
        return obj;
    }

    const isArrayObj = isArray(obj);

    const privateMethods = {
        // [IMMUTABLE_TOP_KEY]: topKey,
        // [IMMUTABLE_TOP_PARENT]: topParent,
        [IMMUTABLE_TOP_PATH]: function () {
            return topParent ? topParent[IMMUTABLE_TOP_PATH].concat(topKey) : [];
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

    const immutableObj = Object.create(immutableProto);
    Object.keys(obj)
          .concat(isArrayObj ? ['length'] : [])
          .forEach((key) => {
              var value = obj[key];
              var enumerable = isEnumerable(obj, key);
              // TODO Cycle reference value?
              var immutableValue = createImmutable(value, immutableObj, key);

              // TODO Enable writing, but throw exception and suggestion in setter?
              Object.defineProperty(immutableObj, key, {
                  enumerable: enumerable,
                  value: immutableValue
              });
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
           // Frozen object should be convert to Immutable object
           // || Object.isFrozen(obj)
           || obj instanceof Immutable
           || obj.constructor === Immutable;
}

export default Immutable;
