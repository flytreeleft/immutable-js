import {expect} from 'chai';

import Immutable from 'immutable-js';

describe('Immutable Object - Cycle reference:', function () {
    it('Check cycle reference', function () {
        var obj1 = {name: 'outer object'};
        var array = [{name: 'inner object'}, obj1];
        var obj = {o: obj1, a: array, b: array[0]};
        var immutableObj = Immutable.create(obj);

        expect(immutableObj.hasCycleRefs()).to.be.true;
        expect(Immutable.isInstance(immutableObj.o)).to.be.true;
        expect(Immutable.isInstance(immutableObj.a)).to.be.true;
        expect(Immutable.isInstance(immutableObj.b)).to.be.true;
        expect(immutableObj.a[1].isCycleRef()).to.be.true;
        expect(immutableObj.a[1].valueOf()).to.be.equal(Immutable.guid(obj.o));
        expect(immutableObj.b.isCycleRef()).to.be.true;
        expect(immutableObj.b.valueOf()).to.be.equal(Immutable.guid(obj.a[0]));
    });

    it('Check the cycle reference to root node', function () {
        var obj = {root: null, b: {root: null}};
        obj.root = obj.b.root = obj;

        var immutableObj = Immutable.create(obj);

        expect(immutableObj.hasCycleRefs()).to.be.true;
        expect(immutableObj.root.isCycleRef()).to.be.true;
        expect(immutableObj.root.valueOf()).to.be.equal(Immutable.guid(obj));
        expect(immutableObj.b.root.isCycleRef()).to.be.true;
        expect(immutableObj.b.root.valueOf()).to.be.equal(Immutable.guid(obj));
    });

    it('Check parent and child cycle reference', function () {
        var parent = {
            name: 'Parent',
            children: []
        };
        var child = {
            name: 'Child',
            parent: parent
        };
        parent.children.push(child);

        var obj = {
            p: parent
        };
        var immutableObj = Immutable.create(obj);

        expect(immutableObj.hasCycleRefs()).to.be.true;
        expect(Immutable.isInstance(immutableObj.p.children[0])).to.be.true;
        expect(Immutable.guid(immutableObj.p.children[0])).to.be.equal(Immutable.guid(child));
        expect(Immutable.isInstance(immutableObj.p.children[0].parent)).to.be.true;
        expect(immutableObj.p.children[0].parent.isCycleRef()).to.be.true;
        expect(immutableObj.p.children[0].parent.valueOf()).to.be.equal(Immutable.guid(parent));
    });

    it('Check the cycle references between different sub-tree', function () {
        var child = {name: 'Child', parent: null};
        var parent = child.parent = {name: 'Parent', child: child};
        // Make sure the referred object is in the more than 2 depth level.
        var obj = {root: {sub: parent, other: {refs: []}}};
        var immutableObj = Immutable.create(obj);
        var newImmutableObj = immutableObj.update('root.other', (other) => {
            return immutableObj.set('root.other.refs', [child]).get('root.other');
        });

        expect(newImmutableObj.root.sub.child.parent.isCycleRef()).to.be.true;
        expect(newImmutableObj.root.sub.child.parent.valueOf()).to.be.equal(Immutable.guid(parent));
        expect(newImmutableObj.root.other.refs[0].isCycleRef()).to.be.true;
        expect(newImmutableObj.root.other.refs[0].valueOf()).to.be.equal(Immutable.guid(child));
    });

    it('Get cycle reference by Immutable.get()', function () {
        // TODO Get the referenced object
        // TODO 中间路径存在循环引用
        // TODO 路径末尾为循环引用
    });

    it('Set value to the cycle reference node by Immutable.set()', function () {
        // TODO 直接对循环引用节点赋值，实为替换
        // TODO value为Immutable，其A引用当前Immutable内的B；此外，若其C引用了A，则最终需将其调整为引用B
    });

    it('Set value to the referenced node through cycle reference by Immutable.set()', function () {
        // TODO 指定路径的中间节点包含循环引用节点
    });
});
