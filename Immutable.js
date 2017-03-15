import invariant from 'invariant';

import isPlainObject from './utils/isPlainObject';
import isObject from './utils/isObject';
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
import cloneNode from './node/cloneNode';
import copyNodeByPath, {removeTheNode} from './node/copyNodeByPath';
import mergeNode from './node/mergeNode';
import forEachNode from './node/forEachNode';

/**
 * 功能特性：
 * - Immutable对象反映原始对象的完整结构，但各属性均为只读，一切变更均通过接口进行
 * - Primitive自身即为immutable，无需处理
 * - 支持将Date、RegExp转换为Plain object
 * - 支持通过外部函数对Function和复杂对象进行Plain转换
 * - 支持循环引用结构，并确保结构不丢失（循环引用检查始终在root进行）
 * - 支持对循环引用的更新，其最终在真实被引用对象上做变更
 * - 可快速定位到处于任意位置的对象，而无需遍历
 * - 可快速实施变更，而无需clone整个数据结构
 * - 同源Immutable的差异对比，即，比较前后的变更情况，避免全结构遍历
 */

const IMMUTABLE_PATH_LINK = '[[ImmutablePathLink]]';
const IMMUTABLE_CYCLE_REF = '[[ImmutableCycleRef]]';
const IMMUTABLE_DATE = '[[ImmutableDate]]';
const IMMUTABLE_REGEXP = '[[ImmutableRegExp]]';

function getPathLink(obj) {
    return obj[IMMUTABLE_PATH_LINK] ? obj[IMMUTABLE_PATH_LINK]() : {};
}

function isCycleRef(obj) {
    return hasOwn(obj, IMMUTABLE_CYCLE_REF);
}

/**
 * Arrive the actual node following the cycle reference node.
 */
function extractImmutablePath(immutable, path, untilToEnd = true) {
    var extractedPath = extractPath(path);
    if (!extractedPath || extractedPath.length === 0) {
        return extractedPath;
    }

    var realPath = [];
    var node = immutable;
    for (var i = 0, len = extractedPath.length; untilToEnd ? i <= len : i < len; i++) {
        // Maybe some cycle reference was referenced by other,
        // just follow cycle reference until to the real node,
        // or unlimited recursion error is thrown.
        while (isCycleRef(node)) {
            // NOTE: The path is always starting from root node.
            realPath = immutable.path(node.valueOf());

            if (i < extractedPath.length) {
                node = immutable.get(realPath);
            } else {
                break;
            }
        }

        if (i < extractedPath.length) {
            if (isPrimitive(node)) {
                return null; // Broken path!
            } else {
                var key = extractedPath[i];
                node = node[key];
                realPath.push(key);
            }
        }
    }
    return realPath;
}

function createImmutable(obj, options = {}/*, rootPathLink, rootGUID*/) {
    if (isImmutable(obj)) {
        return obj;
    }

    // Make sure the guid was bound to `obj`.
    const objGUID = guid(obj);
    // NOTE: Do not record current obj's path link.
    // Because the same immutable object may be referenced more than once.
    const rootObjPathLink = arguments[2];
    const rootObjGUID = arguments[3];
    const objPathLink = {};

    // Hold current node in the root path link to
    // detect the cycle reference in the depth direction at root node.
    rootObjPathLink && (rootObjPathLink[objGUID] = {});

    function isCycleRefTo(target) {
        var targetGUID = guid(target);
        return contains(targetGUID) /* cross cycle reference check */
               || targetGUID === rootObjGUID /* root cycle reference check */
               || (!!rootObjPathLink && rootObjPathLink[targetGUID]) /* depth cycle reference check */;
    }

    function hasCycleRefs() {
        for (var key in objPathLink) {
            if (objPathLink[key].refer) {
                return true;
            }
        }
        return false;
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
                path: `${key}`,
                refer: isCycleRef(value)
            });
            // TODO 如何处理挂载的Immutable子树中存在的循环引用？
            // TODO 如何处理循环引用的循环引用成环问题？需要确保不出现引用环！！
            var valuePathLink = getPathLink(value);
            Object.assign(objPathLink, valuePathLink);
        }
    }

    function contains(guid) {
        return !!objPathLink[guid] || guid === objGUID;
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
    const createInnerImmutable = (obj, rootPathLink, rootGUID) => {
        return createImmutable(obj, globalOpts, rootPathLink, rootGUID);
    };
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
            return isCycleRef(this);
        },
        hasCycleRefs: () => hasCycleRefs(),
        /** Deeply check if the specified immutable is equal to `this`. */
        equals: function (other) {
            return Immutable.equals(this, other);
        },
        /** @return {String[]} */
        keys: function () {
            return Object.keys(this);
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
         * Get the relative path from `topNode` to `subNode`.
         *
         * @param {Object/String} [topNode] The guid of top node, or node self.
         * @param {Object/String} [subNode] The guid of sub node, or node self.
         * @return {Array/undefined} Return `[]` if two nodes are same,
         *          otherwise return `undefined` if it's unreachable from `topNode` to `subNode`.
         */
        subPath: function (topNode, subNode) {
            var topNodePath = this.path(topNode);
            var subNodePath = this.path(subNode);

            if (!topNodePath || !subNodePath) {
                return undefined;
            }
            for (var i = 0; i < topNodePath.length; i++) {
                if (topNodePath[i] !== subNodePath[i]) {
                    return undefined;
                }
            }
            return subNodePath.slice(topNodePath.length);
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
            var extractedPath = extractImmutablePath(this, path, false);
            var root = getNodeByPath(this, extractedPath);
            // TODO 若子树还存在循环引用该如何处理？
            return createInnerImmutable(root);
        },
        /**
         * Set new value to the target node or create a new node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @param {*} value The new value which will replace the target node.
         * @return {Immutable} Return the Immutable self if the `path` is unreachable.
         */
        set: function (path, value) {
            // NOTE: Avoid to replace the root when the path is unreachable!
            var extractedPath = extractImmutablePath(this, path, false);

            var root;
            if (extractedPath && extractedPath.length === 0) {
                root = value;
            } else {
                // TODO 若value为Immutable，则其可能存在A引用当前Immutable内的B。注意：其内部的循环引用无需处理，但若是其引用了A，则最终需将其调整为引用B
                // Copy and create a new node, then make it immutable.
                // NOTE: Do not make value immutable directly,
                // the new immutable will collect path link and process cycle references.
                root = copyNodeByPath(this, extractedPath, () => value);
            }
            return createInnerImmutable(root);
        },
        /**
         * Update the target node.
         *
         * @param {Array/String} path The array path, or string path split by `.`.
         * @param {Function} updater The update function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => *`.
         *          If the updater return `undefined`, the target node will not be changed.
         *          If `path` is null or empty, the Immutable self will be passed to the updater.
         */
        update: function (path, updater) {
            var extractedPath = extractImmutablePath(this, path);
            var root = this;

            if (isFunction(updater)) {
                if (extractedPath.length === 0) {
                    root = updater(root);
                    root = root === undefined ? this : root;
                } else {
                    // TODO 若目标节点内还存在循环引用，在updater里该如何处理？传入root，通过root更新子树？
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
            var extractedPath = extractImmutablePath(this, path);
            // TODO 若移除的包含被引用对象，该如何处理？
            var updater = (target, key, top) => hasOwn(top, key) ? removeTheNode(target) : undefined;
            var root = copyNodeByPath(this, extractedPath, updater);

            return createInnerImmutable(root);
        },
        /**
         * Clear all properties or elements, and return empty immutable array or object.
         *
         * @return {Immutable} The immutable array or object with the same GUID with `this`.
         */
        clear: function () {
            var target = this.isArray() ? [] : {};
            guid(target, guid(this));

            return createInnerImmutable(target);
        },
        /**
         * Find the matched node.
         *
         * @param {Function} predicate A matching function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => Boolean`
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
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => Boolean`
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
         *          with signature `(node: Immutable, topKey, topNode: Immutable, fullPath) => Boolean`.
         *          If it return `false`, the traversing will be stop.
         */
        forEach: function (path, sideEffect) {
            if (isFunction(path)) {
                sideEffect = path;
                path = [];
            }

            var extractedPath = extractImmutablePath(this, path);
            forEachNode(this, extractedPath, sideEffect);
        },
        /**
         * Returns a new Array/Object with values passed through the `mapper`.
         *
         * @param {Function} mapper Mapper function
         *          with signature `(value: Immutable, key, this) => *`.
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
         *          with signature `(reduction: Immutable, value: Immutable, key, this) => *`.
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
        /**
         * Put elements to the array tail.
         *
         * @param {...T} values
         * @return {Immutable} If no arguments, return `this`.
         */
        push: function (...values) {
            if (arguments.length === 0) {
                return this;
            }

            var root = cloneNode(this);
            Array.prototype.push.apply(root, arguments);

            return createInnerImmutable(root);
        },
        /**
         * Remove the element at the array tail.
         *
         * @return {Immutable} If it's an empty immutable array, return `this`.
         */
        pop: function () {
            if (this.isEmpty()) {
                return this;
            }

            var root = cloneNode(this);
            root.pop();
            return createInnerImmutable(root);
        },
        /**
         * Put elements to the array head.
         *
         * @param {...T} values
         * @return {Immutable} If no arguments, return `this`.
         */
        unshift: function (...values) {
            if (arguments.length === 0) {
                return this;
            }

            var root = cloneNode(this);
            Array.prototype.unshift.apply(root, arguments);

            return createInnerImmutable(root);
        },
        /**
         * Remove the element at the array head.
         *
         * @return {Immutable} If it's an empty immutable array, return `this`.
         */
        shift: function () {
            if (this.isEmpty()) {
                return this;
            }

            var root = cloneNode(this);
            root.shift();
            return createInnerImmutable(root);
        },
        /**
         * Remove the specified count elements and insert new elements.
         *
         * @param {Number} [start]
         * @param {Number} [removeNum]
         * @param {...T} [values]
         * @return {Immutable} If no arguments, return `this`.
         */
        splice: function (start, removeNum, ...values) {
            if (arguments.length === 0) {
                return this;
            }

            var root = cloneNode(this);
            Array.prototype.splice.apply(root, arguments);

            return createInnerImmutable(root);
        },
        /**
         * Selects a part of an array, and returns the new array.
         *
         * @param {Number} [start]
         * @param {Number} [end]
         * @return {Immutable} If no arguments, return `this`.
         */
        slice: function (start, end) {
            if (arguments.length === 0) {
                return this;
            }

            var root = cloneNode(this);
            root = Array.prototype.slice.apply(root, arguments);
            guid(root, guid(this));

            return createInnerImmutable(root);
        },
        /**
         * Joins two or more arrays, and returns a copy of the joined arrays.
         *
         * @param {...T/T[]} [arrays]
         * @return {Immutable} If no arguments, return `this`.
         */
        concat: function (...arrays) {
            if (arguments.length === 0) {
                return this;
            }
            arrays = arrays.map((array) => {
                if (Immutable.isInstance(array) && array.isArray()) {
                    array = cloneNode(array);
                }
                return array;
            });

            var root = cloneNode(this);
            root = Array.prototype.concat.apply(root, arrays);
            guid(root, guid(this));

            return createInnerImmutable(root);
        },
        /**
         * Insert new elements to the specified location.
         *
         * NOTE: If the inserted `values` is a big array,
         * using `.insert()` will be better than `.splice()`.
         *
         * @param {Number} [index]
         * @param {T/T[]} [values]
         * @return {Immutable} If no arguments or `values` is empty, return `this`.
         */
        insert: function (index, values) {
            if (arguments.length <= 1) {
                return this;
            }
            if (Immutable.isInstance(values) && values.isArray()) {
                values = cloneNode(values);
            }

            var root = cloneNode(this);
            [].concat(values).forEach((value, i) => {
                root.splice(index + i, 0, value);
            });

            return createInnerImmutable(root);
        },
        /**
         * Sort the elements.
         *
         * @param {Function} [compareFn]
         * @return {Immutable} If the size <= 1, return `this`.
         */
        sort: function (compareFn) {
            if (this.size() <= 1) {
                return this;
            }

            var root = cloneNode(this).sort(compareFn);
            return createInnerImmutable(root);
        },
        /**
         * Reverse the elements.
         *
         * @return {Immutable} If the size <= 1, return `this`.
         */
        reverse: function () {
            if (this.size() <= 1) {
                return this;
            }

            var root = cloneNode(this).reverse();
            return createInnerImmutable(root);
        },
        /**
         * Return the first element.
         *
         * @return {*}
         */
        first: function () {
            return this[0];
        },
        /**
         * Return the last element.
         *
         * @return {*}
         */
        last: function () {
            return this.isEmpty() ? undefined : this[this.size() - 1];
        },
        /**
         * Return the element which is at `index`.
         *
         * @return {*}
         */
        at: function (index) {
            return this[parseInt(index, 10)];
        },
        /**
         * Find the location of matched element.
         *
         * @param {Function} predicate A matching function
         *          with signature `(node: Immutable, topKey, topNode: Immutable) => Boolean`
         * @return {Number} Return `-1` if no element matched.
         */
        findIndex: function (predicate) {
            var index = -1;

            if (isFunction(predicate)) {
                this.forEach((node, topKey, topNode) => {
                    if (predicate(node, topKey, topNode)) {
                        index = topKey;
                        return false;
                    }
                });
            }
            return index;
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
            var immutableValue = createInnerImmutable(value, rootObjPathLink || objPathLink, rootObjGUID || objGUID);
            bindValue(immutableObj, immutableValue, key, enumerable);
        });

    // Not allow to add new properties or remove, change the existing properties.
    return Object.freeze(immutableObj);
}

function isImmutable(obj) {
    return isNullOrUndefined(obj)
           || isPrimitive(obj)
           // Frozen object should be convert to Immutable object also.
           // || Object.isFrozen(obj)
           || Immutable.isInstance(obj);
}

function Immutable() {
    // Just an immutable constructor, no business logic.
    throw new Error('new Immutable() or Immutable() isn\'t supported,'
                    + ' please use Immutable.create() to create an immutable object.');
}

/**
 * Bind GUID to `obj` or get the GUID bound to `obj`.
 *
 * @param {Object} obj
 * @param {String} [id] A custom id which will be bound to `obj`.
 * @return {String/Object} Return `obj` if the parameter `id` was specified,
 *          otherwise, return the id bound to `obj`.
 */
Immutable.guid = guid;
/**
 * Check whether `obj` is immutable or not.
 *
 * NOTE: `null`, `undefined` or any primitive are immutable too.
 *
 * @param {*} obj
 */
Immutable.isImmutable = isImmutable;
/**
 * Check whether `obj` is an instance of {@link Immutable} or not.
 *
 * @param {*} obj
 */
Immutable.isInstance = (obj) => obj && (obj instanceof Immutable || obj.constructor === Immutable);
/**
 * Create {@link Immutable} instance of `obj`.
 *
 * @param {*} obj
 * @param {Object} [options={}]
 * @param {Function} [options.toPlain]
 *          A plain object converter(Signature: `(value: [Function/Object]) => Object`)
 *          for Function and Complex Object.
 *          e.g. `toPlain: (fn) => ({$fn: 'function name'})`,
 *          `toPlain: (obj) => Object.assign({$class: 'complex class name'}, obj)`
 * @return {Immutable} Return an immutable object, or Array-like immutable object when `obj` is an array.
 */
Immutable.create = (obj, options) => createImmutable(obj, options);
/**
 * Check if `source` and `other` represent a same object.
 *
 * NOTE: The same objects maybe isn't {@link #equals equal}.
 *
 * @return {Boolean}
 */
Immutable.same = (source, other) => isObject(source) && guid(source) === guid(other);
// TODO 1. 返回diff格式的差异，以path为键值；2. 比较path link的增删节点；3. 比较相同id的immutable的属性是否存在差异，但不做深度比较
Immutable.diff = (source, other) => ({});
/**
 * Deep value equality check.
 *
 * @return {Boolean}
 */
Immutable.equals = (source, other) => {
    if (source === other || !isObject(source) || !isObject(other)) {
        return source === other;
    }

    var sourceKeys = Object.keys(source).sort();
    var otherKeys = Object.keys(other).sort();
    // NOTE: Array-like object maybe equal to an actual array.
    if (sourceKeys.length === otherKeys.length) {
        for (var i = 0; i < sourceKeys.length; i++) {
            var sourceKey = sourceKeys[i];
            var otherKey = otherKeys[i];

            if (sourceKey !== otherKey
                || !Immutable.equals(source[sourceKey], other[otherKey])) {
                return false;
            }
        }
        return true;
    }
    return false;
};

export default Immutable;
