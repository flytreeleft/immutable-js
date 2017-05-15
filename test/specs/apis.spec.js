import {expect} from 'chai';

import has from 'lodash/has';

import Immutable from 'immutable-js';

describe('Immutable Object - APIs:', function () {
    it('Immutable.path()', function () {
        var obj = {a: 'a', b: {c: 'c'}, d: [{}]};
        var immutableObj = Immutable.create(obj);

        expect(immutableObj.path()).to.be.undefined;
        expect(immutableObj.path({})).to.be.undefine;
        expect(immutableObj.path([])).to.be.undefine;
        expect(immutableObj.path(obj.a)).to.be.undefine;
        expect(immutableObj.path(immutableObj.a)).to.be.undefine;
        expect(immutableObj.path(obj.b.c)).to.be.undefine;
        expect(immutableObj.path(immutableObj.b.c)).to.be.undefine;
        expect(immutableObj.path(obj)).to.be.eql([]);
        expect(immutableObj.path(immutableObj)).to.be.eql([]);
        expect(immutableObj.path(obj.b)).to.be.eql(['b']);
        expect(immutableObj.path(immutableObj.b)).to.be.eql(['b']);
        expect(immutableObj.path(obj.d[0])).to.be.eql(['d', '0']);
        expect(immutableObj.path(immutableObj.d[0])).to.be.eql(['d', '0']);
    });

    it('Immutable.subPath()', function () {
        var obj = {a: [0, 1], b: [{c: [0, 1]}]};
        var immutableObj = Immutable.create(obj);

        expect(immutableObj.subPath()).to.be.undefined;
        expect(immutableObj.subPath(immutableObj)).to.be.undefined;
        expect(immutableObj.subPath(immutableObj, obj)).to.have.lengthOf(0);
        expect(immutableObj.subPath(immutableObj, immutableObj)).to.have.lengthOf(0);
        expect(immutableObj.subPath(immutableObj, obj.a)).to.have.members(['a']);
        expect(immutableObj.subPath(immutableObj, obj.b[0].c)).to.have.members(['b', '0', 'c']);
        expect(immutableObj.subPath(obj.b, obj.b[0].c)).to.have.members(['0', 'c']);
        expect(immutableObj.subPath(obj.b[0], obj.b[0].c)).to.have.members(['c']);
        expect(immutableObj.subPath(obj.b, obj)).to.be.undefined;
        expect(immutableObj.subPath(obj.b, obj.a)).to.be.undefined;
    });

    it('Immutable.has()', function () {
        var obj = {a: 'a', b: {}, c: []};
        var immutableObj = Immutable.create(obj);

        expect(immutableObj.has()).to.be.false;
        expect(immutableObj.has({})).to.be.false;
        expect(immutableObj.has([])).to.be.false;
        expect(immutableObj.has(obj.a)).to.be.false;
        expect(immutableObj.has(immutableObj.a)).to.be.false;
        expect(immutableObj.has(obj)).to.be.true;
        expect(immutableObj.has(immutableObj)).to.be.true;
        expect(immutableObj.has(obj.b)).to.be.true;
        expect(immutableObj.has(immutableObj.b)).to.be.true;
        expect(immutableObj.has(obj.c)).to.be.true;
        expect(immutableObj.has(immutableObj.c)).to.be.true;
    });

    it('Immutable.get()', function () {
        var obj = {a: 'a', b: {c: [{}, {}]}};
        var immutableObj = Immutable.create(obj);

        expect(immutableObj.get()).to.be.undefined;
        expect(immutableObj.get([])).to.not.equal(obj);
        expect(immutableObj.get([])).to.be.equal(immutableObj);
        expect(immutableObj.get(['a', 0])).to.be.undefined;
        expect(immutableObj.get(['a'])).to.be.equal(obj.a);
        expect(immutableObj.get(['b', 'c'])).to.not.equal(obj.b.c);
        expect(immutableObj.get(['b', 'c'])).to.be.equal(immutableObj.b.c);
        expect(immutableObj.get(['b', 'c'])).to.deep.equal(immutableObj.b.c);
        expect(immutableObj.get('b.c')).to.not.equal(obj.b.c);
        expect(immutableObj.get('b.c')).to.be.equal(immutableObj.b.c);
        expect(immutableObj.get('b.c.0')).to.be.equal(immutableObj.b.c[0]);
        expect(immutableObj.get('b.c.1')).to.be.equal(immutableObj.b.c[1]);
    });

    it('Immutable.set()', function () {
        var obj = {a: 'a', b: [{}, {}]};
        var immutableObj = Immutable.create(obj);

        // No mutation
        expect(immutableObj.set()).to.be.equal(immutableObj);
        expect(immutableObj.set(null)).to.be.equal(immutableObj);
        expect(immutableObj.set('')).to.be.equal(immutableObj);
        expect(immutableObj.set([])).to.be.undefined;
        expect(immutableObj.set('e.f.g')).to.be.equal(immutableObj);
        expect(immutableObj.set(['e', 'f', 'g'])).to.be.equal(immutableObj);

        // New value
        var newValue = 'b';
        var newImmutableObj = immutableObj.set('b[0]', newValue);
        expect(immutableObj).to.have.properties(obj);
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj.b[0]).to.be.equal(newValue);
        expect(newImmutableObj.b[1]).to.be.equal(immutableObj.b[1]);

        // Undefined value
        newValue = undefined;
        newImmutableObj = immutableObj.set(['b'], newValue);
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj.b).to.be.undefined;
        // Null value
        newValue = null;
        newImmutableObj = immutableObj.set(['b'], newValue);
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(has(newImmutableObj, 'b')).to.be.true;
        expect(newImmutableObj.b).to.be.equal(newValue);

        // New property
        newValue = [{}, {}];
        newImmutableObj = immutableObj.set('c', newValue);
        expect(immutableObj).to.have.properties(obj);
        expect(immutableObj.c).to.be.undefined;
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj).to.have.properties(immutableObj);
        expect(newImmutableObj.c).to.have.properties(newValue);

        // New array index
        newValue = {};
        newImmutableObj = immutableObj.set('b[4]', newValue);
        expect(immutableObj).to.have.properties(obj);
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj.b.size()).to.be.equal(5);
        expect(newImmutableObj.b[2]).to.be.undefined;
        expect(newImmutableObj.b[3]).to.be.undefined;
        expect(newImmutableObj.b[4]).to.have.properties(newValue);
    });

    it('Immutable.set() with immutable value', function () {
        var obj = {a: 'a', b: [{}, {}]};
        var immutableObj = Immutable.create(obj);
        var obj1 = [0, 'a', {}, []];
        var immutableObj1 = Immutable.create(obj1);

        // New property
        var newImmutableObj = immutableObj.set('c', immutableObj1);
        expect(immutableObj).to.have.properties(obj);
        expect(has(immutableObj, 'c')).to.be.false;
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj).to.have.properties(immutableObj);
        expect(newImmutableObj.c).to.be.equal(immutableObj1);

        // New value
        newImmutableObj = immutableObj.set(['a'], immutableObj1);
        expect(immutableObj).to.have.properties(obj);
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj.a).to.be.equal(immutableObj1);
        expect(newImmutableObj.b).to.be.equal(immutableObj.b);
    });

    it('Immutable.update()', function () {
        // TODO path node updater接收Immutable节点
    });

    it('Immutable.merge()', function () {
    });

    it('Immutable.mergeDeep()', function () {
    });

    it('Immutable.remove()', function () {
        var obj = [{a: {b: [0, 1]}}, {}, 1];
        var immutableObj = Immutable.create(obj);

        expect(immutableObj.remove()).to.be.equal(immutableObj);
        expect(immutableObj.remove(null)).to.be.equal(immutableObj);
        expect(immutableObj.remove('')).to.be.equal(immutableObj);
        expect(immutableObj.remove([])).to.be.equal(immutableObj);
        expect(immutableObj.remove('a.b.c.g')).to.be.equal(immutableObj);
        expect(immutableObj.remove([1, 'e', 'f', 0])).to.be.equal(immutableObj);

        var newImmutableObj = immutableObj.remove('0.a.b.0');
        expect(immutableObj).to.have.properties(obj);
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj[0].a.b.length).to.be.equal(obj[0].a.b.length - 1);
        expect(newImmutableObj[0].a.b[0]).to.be.equal(obj[0].a.b[1]);

        newImmutableObj = immutableObj.remove([0, 'a', 'b']);
        expect(immutableObj).to.have.properties(obj);
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(has(newImmutableObj[0].a, 'b')).to.be.false;
        expect(obj).to.have.properties(newImmutableObj);

        newImmutableObj = immutableObj.remove([1]);
        expect(immutableObj).to.have.properties(obj);
        expect(Immutable.guid(newImmutableObj)).to.be.equal(Immutable.guid(immutableObj));
        expect(newImmutableObj).to.not.equal(immutableObj);
        expect(newImmutableObj.length).to.be.equal(obj.length - 1);
        expect(newImmutableObj[0]).to.be.equal(immutableObj[0]);
        expect(newImmutableObj[1]).to.be.equal(immutableObj[2]);
    });

    it('Immutable.clear()', function () {
        var obj = {o: {b: 'b'}, a: [{}, []]};
        var immutableObj = Immutable.create(obj);

        expect(immutableObj).to.be.have.properties(obj);

        expect(immutableObj.o.clear().isArray()).to.be.false;
        expect(immutableObj.o.clear()).to.be.have.properties({});
        expect(Immutable.guid(immutableObj.o.clear())).to.be.equal(Immutable.guid(obj.o));
        expect(immutableObj.o.clear()).to.not.equal(immutableObj.o.clear());
        expect(immutableObj.o.clear()).to.be.have.properties(immutableObj.o.clear());

        expect(immutableObj.a.clear().isArray()).to.be.true;
        expect(immutableObj.a.clear()).to.be.have.properties([]);
        expect(Immutable.guid(immutableObj.a.clear())).to.be.equal(Immutable.guid(obj.a));
        expect(immutableObj.a.clear()).to.not.equal(immutableObj.a.clear());
        expect(immutableObj.a.clear()).to.be.have.properties(immutableObj.a.clear());
    });

    it('Immutable.find()', function () {
    });

    it('Immutable.filter()', function () {
    });

    it('Immutable.forEach()', function () {
        // TODO 数组仅遍历其元素，不含GUID等标识
        // TODO 对象遍历包含GUID标识
    });

    it('Immutable.map()', function () {
    });

    it('Immutable.reduce()', function () {
    });
});
