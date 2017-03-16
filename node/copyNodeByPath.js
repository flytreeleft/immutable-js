import isObject from '../utils/isObject';
import isArray from '../utils/isArray';

import cloneNode from './cloneNode';

const ShouldBeRemovedNode = {};
function shouldBeRemoved(node) {
    return node === ShouldBeRemovedNode;
}

export function removeTheNode(node) {
    return ShouldBeRemovedNode;
}

/**
 * Make a copy following the `path` from root,
 * and return the new copy of `root` if some changes happened.
 *
 * NOTE:
 * - If the target node isn't mutated, the `pathNodeProcessor`
 *   will not be called and the `root` will be returned;
 * - If the `path` is unreachable, `root` will be returned;
 *
 * @param {Object} root The start node to search.
 * @param {Array} path An array path from root to the target node.
 * @param {Function} [targetNodeProcessor]
 *          The function to process the target node.
 *          Signature: `(targetNode, topKey, topNode, fullPath) => *`.
 * @param {Function} [pathNodeProcessor]
 *          The function to process the path node(including target).
 *          Signature: `(targetNode, topKey, topNode, fullPath) => *`.
 */
export default function (root, path, targetNodeProcessor, pathNodeProcessor) {
    if (!isObject(root) || !isArray(path) || path.length === 0) {
        return root;
    }

    var pathNodes = [];
    var targetNode = root;
    var topKey = null;
    var topNode = null;
    // Walk to target, ignore Function node.
    for (var i = 0; i < path.length && isObject(targetNode); i++) {
        pathNodes.push({
            top: topNode,
            key: topKey
        });

        topNode = targetNode;
        topKey = path[i];
        targetNode = topNode[topKey];
    }
    // Unreachable? Return root.
    if (i < path.length) {
        return root;
    }

    // Process the target node.
    var processedNode = targetNodeProcessor
        ? targetNodeProcessor(targetNode, topKey, topNode, path.slice())
        : targetNode;
    if (processedNode !== targetNode) {
        targetNode = processedNode;
    } else { // No mutation
        return root;
    }

    // Go back to the root following the path from bottom to up.
    do {
        if (shouldBeRemoved(targetNode)) { // Should be cut?
            // Cut the node from current top
            if (topNode) {
                topNode = cloneNode(topNode);
                if (isArray(topNode)) {
                    topNode.splice(topKey, 1);
                } else {
                    delete topNode[topKey];
                }
                targetNode = topNode;
            }
            // Already at root? Remove it.
            else {
                targetNode = undefined;
            }
        }
        // Just update
        else {
            if (topNode) {
                topNode = cloneNode(topNode);
                topNode[topKey] = targetNode;
            }
            // Process the path node.
            processedNode = pathNodeProcessor
                ? pathNodeProcessor(targetNode, topKey, topNode, path.slice(0, pathNodes.length))
                : targetNode;
            if (processedNode !== targetNode) {
                targetNode = processedNode;
                if (shouldBeRemoved(targetNode)) {
                    continue; // Cut the node first.
                }
            }
            // Mount the processed node on the top.
            if (topNode) {
                topNode[topKey] = targetNode;
                targetNode = topNode;
            }
        }

        // Move to the top node.
        var pathNode = pathNodes.pop();
        topKey = pathNode && pathNode.key;
        topNode = pathNode && pathNode.top;
    } while (topNode !== undefined);

    return shouldBeRemoved(targetNode) ? undefined : targetNode;
}
