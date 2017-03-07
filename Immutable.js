import invariant from 'invariant';

import isPlainObject from './utils/isPlainObject';
import isArray from './utils/isArray';
import isFunction from './utils/isFunction';
import isDate from './utils/isDate';
import isRegExp from './utils/isRegExp';
import isPrimitive from './utils/isPrimitive';
import isNullOrUndefined from './utils/isNullOrUndefined';
import isEnumerable from './utils/isEnumerable';
import createNE from './utils/createNE';
import hasOwn from './utils/hasOwn';
import guid, {GUID_SENTINEL} from './utils/guid';

/**
 * 功能特性：
 * - Immutable对象反映原始对象的完整结构，但各属性均为只读，一切变更均通过接口进行
 * - Primitive自身即为immutable，无需处理
 * - 支持将Date、RegExp转换为Plain object
 * - 支持通过外部函数对Function和复杂对象进行Plain转换
 * - 支持循环引用结构，并确保结构不丢失
 * - 可快速定位到处于任意位置的对象，而无需遍历
 * - 可快速实施变更，而无需clone整个数据结构
 * - 同源Immutable的差异对比，即，比较前后的变更情况，避免全结构遍历
 */

const IMMUTABLE_PATH_LINK = '__[IMMUTABLE_PATH_LINK]__';
const IMMUTABLE_CYCLE_REF = '__[IMMUTABLE_CYCLE_REF]__';
const IMMUTABLE_DATE = '[[DATE]]';
const IMMUTABLE_REGEXP = '[[REGEXP]]';

function cycleRefTo(obj) {
    return {[IMMUTABLE_CYCLE_REF]: guid(obj)};
}

/**
 * @param {*} obj
 * @param {Object} [options={}]
 * @param {Function} [options.toPlain]
 *          A plain object converter for Function and Complex Object.
 *          e.g. `toPlain: (fn) => ({$fn: 'function name'})`,
 *          `toPlain: (obj) => Object.assign({$class: 'complex class name'}, obj)`
 */
function createImmutable(obj, options = {}) {
    if (isImmutable(obj)) {
        return obj;
    }

    const toPlain = options.toPlain;
    // Make sure the guid was bound to `obj`.
    const objGUID = guid(obj);
    const isPlainObj = isPlainObject(obj);
    const isArrayObj = isArray(obj);
    const isDateObj = isDate(obj);
    const isRegExpObj = isRegExp(obj);
    // NOTE: Do not record current obj's path link.
    // Because the same immutable object may be referenced more than once.
    const objPathLink = {};

    function hasCycleRefTo(obj) {
        return !!objPathLink[guid(obj)];
    }

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
            // TODO Check if cycle reference existing? Different path but same guid.
            if (value[IMMUTABLE_PATH_LINK]) {
                Object.assign(objPathLink, value[IMMUTABLE_PATH_LINK]());
            }
        }
    }

    // Convert source object.
    let processedObj = obj;
    if (isDateObj) {
        processedObj = {[IMMUTABLE_DATE]: obj.getTime()};
    } else if (isRegExpObj) {
        processedObj = {[IMMUTABLE_REGEXP]: obj.toString()};
    } else if (isFunction(obj)) {
        invariant(
            isFunction(toPlain),
            'Detected the source object is a Function or a complex Object,'
            + ' the "options.toPlain" must be specified to make sure plain the source object correctly.'
        );
        processedObj = toPlain(obj);
        invariant(
            isPlainObject(processedObj),
            'Expected to convert the source object to a plain object,'
            + ` but "options.toPlain" returned '${processedObj}'.`
        );
    } else if (!isPlainObj && !isArrayObj && isFunction(toPlain)) {
        processedObj = toPlain(obj);
        invariant(
            isPlainObject(processedObj),
            'Expected to convert the source object to a plain object,'
            + ` but "options.toPlain" returned '${processedObj}'.`
        );
    }
    // Keep the original guid.
    guid(processedObj, objGUID);

    const privateMethods = {
        [IMMUTABLE_PATH_LINK]: function () {
            return Object.assign({}, objPathLink);
        }
    };

    const commonMethods = {
        toString: function () {
            return JSON.stringify(this);
        },
        valueOf: function () {
            if (this.isDate()) {
                return this[IMMUTABLE_DATE];
            } else if (this.isRegExp()) {
                return this[IMMUTABLE_REGEXP];
            } else if (this.isCycleRef()) {
                return this[IMMUTABLE_CYCLE_REF];
            } else {
                return this;
            }
        },
        toJS: function () {
            return this;
        },
        toJSON: function () {
            return this;
        },
        isArray: () => isArrayObj,
        isDate: function () {
            return hasOwn(this, IMMUTABLE_DATE);
        },
        isRegExp: function () {
            return hasOwn(this, IMMUTABLE_REGEXP);
        },
        isCycleRef: function () {
            return hasOwn(this, IMMUTABLE_CYCLE_REF);
        },
        equals: function () {
        },
        path: function () {
        },
        has: function () {
        },
        get: function () {
        },
        set: function () {
        },
        update: function () {
        },
        merge: function () {
        },
        mergeDeep: function () {
        },
        remove: function () {
        },
        clear: function () {
        },
        find: function () {
        },
        filter: function () {
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
        insert: function () {
        },
        sort: function () {
        },
        reverse: function () {
        },
        first: function () {
        },
        last: function () {
        },
        at: function () {
        },
        findIndex: function () {
        },
        size: function () {
            return this.length;
        },
        isEmpty: function () {
            return this.size() === 0;
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
    let objKeys = Object.keys(processedObj).concat(isArrayObj ? ['length'] : []);
    // NOTE: Make sure GUID was bound at first.
    reservedKeys
        .concat(objKeys)
        .forEach((key) => {
            var value = processedObj[key];
            if (hasCycleRefTo(value)) {
                value = cycleRefTo(value);
            }

            var enumerable = isEnumerable(processedObj, key);
            var immutableValue = createImmutable(value, options);
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
Immutable.create = (obj, options) => createImmutable(obj, options);
// TODO 1. 返回diff格式的差异，以path为键值；2. 比较path link的增删节点；3. 比较相同id的immutable的属性是否存在差异，但不做深度比较
Immutable.diff = (source, other) => ({});
/**
 * Value equality check with semantics similar to `Object.is`.
 */
Immutable.is = (source, other) => ({});

export function isImmutable(obj) {
    return isNullOrUndefined(obj)
           || isPrimitive(obj)
           // Frozen object should be convert to Immutable object also.
           // || Object.isFrozen(obj)
           || obj instanceof Immutable
           || obj.constructor === Immutable;
}

export default Immutable;
