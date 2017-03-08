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

import extractPath from './node/extractPath';
import getNodeByPath from './node/getNodeByPath';
import copyNodeByPath, {removeTheNode} from './node/copyNodeByPath';
import mergeNode from './node/mergeNode';
import forEachNode from './node/forEachNode';

/**
 * 功能特性：
 * - Immutable对象反映原始对象的完整结构，但各属性均为只读，一切变更均通过接口进行
 * - Primitive自身即为immutable，无需处理
 * - 支持将Date、RegExp转换为Plain object
 * - 支持通过外部函数对Function和复杂对象进行Plain转换
 * - 支持循环引用结构，并确保结构不丢失
 * - 支持对循环引用的更新，其最终在真实被引用对象上做变更
 * - 可快速定位到处于任意位置的对象，而无需遍历
 * - 可快速实施变更，而无需clone整个数据结构
 * - 同源Immutable的差异对比，即，比较前后的变更情况，避免全结构遍历
 */

const IMMUTABLE_PATH_LINK = '[[ImmutablePathLink]]';
const IMMUTABLE_CYCLE_REF = '[[ImmutableCycleRef]]';
const IMMUTABLE_DATE = '[[ImmutableDate]]';
const IMMUTABLE_REGEXP = '[[ImmutableRegExp]]';

/**
 * @param {*} obj
 * @param {Object} [options={}]
 * @param {Function} [options.toPlain]
 *          A plain object converter(Signature: `(value: [Function/Object]) => Object`)
 *          for Function and Complex Object.
 *          e.g. `toPlain: (fn) => ({$fn: 'function name'})`,
 *          `toPlain: (obj) => Object.assign({$class: 'complex class name'}, obj)`
 */
function createImmutable(obj, options = {}) {
    if (isImmutable(obj)) {
        return obj;
    }

    const rootPathLink = arguments[2];
    // Make sure the guid was bound to `obj`.
    const objGUID = guid(obj);
    // NOTE: Do not record current obj's path link.
    // Because the same immutable object may be referenced more than once.
    const objPathLink = {};

    function isCycleRefTo(target) {
        var targetGUID = guid(target);
        return !!objPathLink[targetGUID] || (!!rootPathLink && rootPathLink[targetGUID]);
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
            if (value[IMMUTABLE_PATH_LINK]) {
                Object.assign(objPathLink, value[IMMUTABLE_PATH_LINK]());
            }
        }
    }

    function contains(guid) {
        return !!objPathLink[guid];
    }

    function getPath(guid) {
        if (!contains(guid)) {
            return undefined;
        }

        var path = [];
        var nodeGUID = guid;
        while (nodeGUID && nodeGUID !== objGUID) {
            var link = objPathLink[nodeGUID];
            // NOTE: If link is broken, just throw error.
            path.unshift(link.path);
            nodeGUID = link.top;
        }
        return path;
    }

    const globalOpts = options;
    const toPlain = globalOpts.toPlain;
    const createInnerImmutable = (obj, rootPathLink) => createImmutable(obj, globalOpts, rootPathLink);
    const isPlainObj = isPlainObject(obj);
    const isArrayObj = isArray(obj);
    const isDateObj = isDate(obj);
    const isRegExpObj = isRegExp(obj);

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

    // Define prototype methods.
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
        /** Deeply check if the specified immutable is equal to `this`. */
        equals: function (other) {
            return Immutable.is(this, other);
        },
        /**
         * Get the array path of the specified node from the root node.
         *
         * @param {String/Object} node The guid of node, or node self.
         * @return {Array/undefined} If the specified node is root node, return `[]`.
         *          Else if the specified node isn't on the object tree, return `undefined`.
         */
        path: function (node) {
            var nodeGUID = isPrimitive(node) ? node : guid(node);
            return getPath(nodeGUID);
        },
        /**
         * Check if the specified node is on the object tree.
         *
         * @param {String/Object} node The guid of node, or node self.
         */
        has: function (node) {
            var nodeGUID = isPrimitive(node) ? node : guid(node);
            return contains(nodeGUID);
        },
        /**
         * Get the target immutable node by the specified path.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @return {Immutable/undefined} The immutable node,
         *          or `undefine` if the `path` cannot be reached.
         *          NOTE: If `path` is empty, just return the Immutable self.
         */
        get: function (path) {
            var extractedPath = extractPath(path);
            // TODO 将引用节点转换为其指向的节点
            return getNodeByPath(this, extractedPath);
        },
        /**
         * Set new value to the target node or create a new node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @param {*} value The new value which will replace the target node.
         * @return {Immutable} Return the Immutable self if the `path` is unreachable or empty.
         */
        set: function (path, value) {
            var extractedPath = extractPath(path) || [];
            // TODO 将引用节点转换为其指向的节点
            // Copy and create a new node, then make it immutable.
            // NOTE: Do not make value immutable directly,
            // the new immutable will collect path link and process cycle references.
            var root = copyNodeByPath(this, extractedPath, () => value);

            return createInnerImmutable(root);
        },
        /**
         * Update the target node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @param {Function} updater The update function with signature `(value: Immutable) => *`.
         *          If the updater return `undefined`, the target node will not be changed.
         *          If `path` is null or empty, the Immutable self will be passed to the updater.
         */
        update: function (path, updater) {
            var extractedPath = extractPath(path) || [];
            var root = this;

            if (isFunction(updater)) {
                if (extractedPath.length === 0) {
                    root = updater(root);
                    root = root === undefined ? this : root;
                } else {
                    // TODO 将引用节点转换为其指向的节点
                    root = copyNodeByPath(this, extractedPath, updater);
                }
            }
            return createInnerImmutable(root);
        },
        /**
         * Merge the specified node to `this`.
         *
         * @param {*} value
         * @param {Boolean} [deep=false] Merge deeply or not.
         * @return {Immutable}
         */
        merge: function (value, deep) {
            // TODO 将引用节点转换为其指向的节点
            var root = mergeNode(this, value, deep);
            return createInnerImmutable(root);
        },
        /**
         * Deeply merge the specified node to `this`.
         * It's equal to `this.merge(value, true)`.
         *
         * @param {*} value
         * @return {Immutable}
         */
        mergeDeep: function (value) {
            return this.merge(value, true);
        },
        /**
         * Remove the specified node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @return {Immutable} If `path` is null, empty or unreachable, the Immutable self will be returned.
         */
        remove: function (path) {
            var extractedPath = extractPath(path) || [];
            // TODO 将引用节点转换为其指向的节点
            var updater = (target, top, key) => hasOwn(top, key) ? removeTheNode(target) : undefined;
            var root = copyNodeByPath(this, extractedPath, updater);

            return createInnerImmutable(root);
        },
        /** Clear all properties or elements, and return empty immutable array or object. */
        clear: function () {
            return createInnerImmutable(this.isArray() ? [] : {});
        },
        /**
         * Find the matched node.
         *
         * @param {Function} predicate A matching function
         *          with signature `(node, topKey, topNode) => Boolean`
         * @return {Immutable/undefined} The matched node or `undefined` if no node matched.
         */
        find: function (predicate) {
            var expected;
            if (isFunction(predicate)) {
                this.forEach((node, key) => {
                    var accepted = predicate(node, key, this);

                    if (accepted) {
                        expected = node;
                    }
                    return !accepted;
                });
            }
            return expected;
        },
        /**
         * Filter the matched properties.
         *
         * @param {Function} predicate A filter function
         *          with signature `(node, topKey, topNode) => Boolean`
         * @return {Immutable}
         */
        filter: function (predicate) {
            var target = this.isArray() ? [] : {};

            if (isFunction(predicate)) {
                this.forEach((node, key) => {
                    var accepted = predicate(node, key, this);

                    if (accepted) {
                        var prop = isArray(target) ? target.length : key;
                        target[prop] = node;
                    }
                });
            }
            return createInnerImmutable(target);
        },
        /**
         * Traverse all properties of the target node.
         *
         * If the `path` is null or empty, traverse from the root.
         *
         * @param {Array/String} [path] The array path, or string path split by `.`.
         * @param {Function} sideEffect A traverse function
         *          with signature `(node, topKey, topNode, fullPath) => Boolean`.
         *          If it return `false`, the traversing will be stop.
         */
        forEach: function (path, sideEffect) {
            if (isFunction(path)) {
                sideEffect = path;
                path = [];
            }

            var extractedPath = extractPath(path);
            // TODO 将引用节点转换为其指向的节点
            forEachNode(this, extractedPath, sideEffect);
        },
        /**
         * Returns a new Array/Object with values passed through the `mapper`.
         *
         * @param {Function} mapper Mapper function with signature `(value, key, this) => *`.
         * @return {Immutable} If `mapper` isn't specified or no changes happened, return `this`.
         */
        map: function (mapper) {
            if (!isFunction(mapper)) {
                return this;
            }

            var changed = false;
            var target = this.isArray() ? [] : {};
            this.forEach((node, topKey, topNode) => {
                var newNode = mapper(node, topKey, topNode);

                target[topKey] = newNode;
                newNode !== node && (changed = true);
            });

            return changed ? createInnerImmutable(target) : this;
        },
        /**
         * Reduces the immutable to a value by calling the `reducer` for every entry
         * and passing along the reduced value.
         *
         * @param {Function} reducer Reducer function
         *          with signature `(reduction, value, key, this) => *`.
         * @param {*} initVal The initial value of reduction.
         * @return {Immutable} If `reducer` isn't specified, return `initVal`.
         */
        reduce: function (reducer, initVal) {
            var target = initVal;

            if (isFunction(reducer)) {
                this.forEach((node, topKey, topNode) => {
                    target = createInnerImmutable(target);
                    target = reducer(target, node, topKey, topNode);
                });
            }
            return createInnerImmutable(target);
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

    // Construct and create immutable object.
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
            if (isCycleRefTo(value)) {
                value = {[IMMUTABLE_CYCLE_REF]: guid(value)};
            }

            var enumerable = isEnumerable(processedObj, key);
            var immutableValue = createInnerImmutable(value, rootPathLink || objPathLink);
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
/**
 * @return {Immutable} Return an immutable object, or Array-like immutable object when `obj` is an array.
 */
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
