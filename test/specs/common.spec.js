import {expect} from 'chai';

import isObject from 'lodash/isObject';

import Immutable from 'immutable-js';

describe('Immutable Object:', function () {
    it('Has same structure as original object', function () {
        var obj = {
            a: 1,
            b: {c: 'c', d: 'd'},
            e: false
        };
        var immutableObj = Immutable.create(obj);
        expect(Immutable.isInstance(immutableObj)).to.be.true;
        expect(immutableObj).to.have.properties(obj);

        var array = [0, {a: 'a', b: 0, c: false}, [{d: [0, true, 'd']}, false, 1]];
        var immutableArray = Immutable.create(array);
        expect(Immutable.isInstance(immutableArray)).to.be.true;
        expect(immutableArray.isArray()).to.be.true;
        expect(Array.isArray(immutableArray)).to.be.false;
        expect(immutableArray).to.have.properties(array);
        expect(immutableArray).to.have.lengthOf(array.length);
    });

    it('Path link check', function () {
        const IMMUTABLE_PATH_LINK = '[[ImmutablePathLink]]';
        var obj = {
            a: 'a',
            b: {c: [1, 2, {3: '3'}], d: 'd'},
            e: [{f: 'f'}, 'g', 1]
        };
        var immutableObj = Immutable.create(obj);
        expect(immutableObj).to.have.properties(obj);
        expect(immutableObj[IMMUTABLE_PATH_LINK]).to.be.an.instanceof(Function);

        var pathLink = immutableObj[IMMUTABLE_PATH_LINK]();
        expect(pathLink[Immutable.guid(obj)]).to.be.undefined;
        expect(Object.keys(pathLink)).to.have.lengthOf(countObj(obj));
        expect(pathLink[Immutable.guid(obj.b.c)]).to.have.properties({top: Immutable.guid(obj.b), path: 'c'});
        expect(pathLink[Immutable.guid(obj.e[0])]).to.have.properties({top: Immutable.guid(obj.e), path: '0'});

        // Check the path link of sub property.
        pathLink = immutableObj.b[IMMUTABLE_PATH_LINK]();
        expect(pathLink[Immutable.guid(obj.b)]).to.be.undefined;
        expect(Object.keys(pathLink)).to.have.lengthOf(countObj(obj.b));
        expect(pathLink[Immutable.guid(obj.b.c[2])]).to.have.properties({top: Immutable.guid(obj.b.c), path: '2'});

        // The mutation of path link will not affect the source's.
        pathLink[Immutable.guid(obj.b)] = {top: null, path: null};
        expect(pathLink).to.not.deep.equal(immutableObj.b[IMMUTABLE_PATH_LINK]);
    });

    it('Frozen check', function () {
        // TODO Add, remove properties should throw errors
        // TODO GUID enumerable check: Immutable has enumerable GUID property, the original doesn't
    });

    it('Immutable.equals()', function () {
        // TODO Array-like and array comparision.
    });

    it('Immutable.keys()', function () {
        // TODO 数组仅得到序号列表，对象可得到GUID等标识
    });
});

function countObj(obj, includeObj = false) {
    var count = 0;

    if (isObject(obj)) {
        count += includeObj ? 1 : 0;
        Object.keys(obj).forEach((key) => {
            count += countObj(obj[key], true);
        });
    }
    return count;
}
