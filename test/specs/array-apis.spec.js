import {expect} from 'chai';

import Immutable from 'immutable-js';

describe('Immutable Object - Array APIs:', function () {
    it('Immutable.push()', function () {
        var array = [];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.push()).to.be.equal(immutableArray);
        expect(immutableArray.push(null)).to.not.equal(immutableArray);
        expect(immutableArray.push(undefined)).to.not.equal(immutableArray);
        expect(immutableArray.push('')).to.not.equal(immutableArray);

        var newValue = 'a';
        var newImmutableArray = immutableArray.push(newValue);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(1);
        expect(newImmutableArray[0]).to.be.equal(newValue);

        newValue = [0, 1, 2];
        newImmutableArray = immutableArray.push(newValue);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(1);
        expect(newImmutableArray[0]).to.have.properties(newValue);

        newImmutableArray = immutableArray.push(1, 2, 3);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(3);
        expect(newImmutableArray).to.have.properties([1, 2, 3]);

        newValue = Immutable.create([0, 1, 2]);
        newImmutableArray = immutableArray.push(newValue);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(1);
        expect(newImmutableArray[0]).to.be.equal(newValue);
    });

    it('Immutable.pop()', function () {
        var array = [];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.pop()).to.be.equal(immutableArray);

        var newImmutableArray = immutableArray.push(1, 2, 3).pop();
        expect(immutableArray.isEmpty()).to.be.true;
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(2);
        expect(newImmutableArray).to.have.properties([1, 2]);
    });

    it('Immutable.unshift()', function () {
        var array = [];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.unshift()).to.be.equal(immutableArray);
        expect(immutableArray.unshift(null)).to.not.equal(immutableArray);
        expect(immutableArray.unshift(undefined)).to.not.equal(immutableArray);
        expect(immutableArray.unshift('')).to.not.equal(immutableArray);

        var newValue = 'a';
        var newImmutableArray = immutableArray.unshift(newValue);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(1);
        expect(newImmutableArray[0]).to.be.equal(newValue);

        newValue = [0, 1, 2];
        newImmutableArray = immutableArray.unshift(newValue);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(1);
        expect(newImmutableArray[0]).to.have.properties(newValue);

        newImmutableArray = immutableArray.unshift(1, 2, 3);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(3);
        expect(newImmutableArray).to.have.properties([1, 2, 3]);

        newValue = Immutable.create([0, 1, 2]);
        newImmutableArray = immutableArray.unshift(newValue);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(1);
        expect(newImmutableArray[0]).to.be.equal(newValue);
    });

    it('Immutable.shift()', function () {
        var array = [];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.shift()).to.be.equal(immutableArray);

        var newImmutableArray = immutableArray.push(1, 2, 3).shift();
        expect(immutableArray.isEmpty()).to.be.true;
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(2);
        expect(newImmutableArray).to.have.properties([2, 3]);
    });

    it('Immutable.splice()', function () {
        var array = [1, 2, 3, 4];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.splice()).to.be.equal(immutableArray);

        var newImmutableArray = immutableArray.splice(1, 1);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(array.length - 1);
        expect(newImmutableArray).to.have.properties(spliceArray(array.concat(), 1, 1));

        newImmutableArray = immutableArray.splice(array.length * 2, 0, 'a', 'b', 'c');
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(array.length + 3);
        expect(newImmutableArray).to.have.properties(spliceArray(array.concat(), array.length * 2, 0, 'a', 'b', 'c'));

        var newVal = Immutable.create(['a', 'b', 'c']);
        newImmutableArray = immutableArray.splice(1, 0, newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray[1]).to.be.equal(newVal);
    });

    it('Immutable.slice()', function () {
        var array = [1, 2, 3, 4];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.slice()).to.be.equal(immutableArray);

        var newImmutableArray = immutableArray.slice(1);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.slice(1));

        newImmutableArray = immutableArray.slice(1, 1);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.slice(1, 1));

        newImmutableArray = immutableArray.slice(array.length * 2);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.slice(array.length * 2));
    });

    it('Immutable.concat()', function () {
        var array = [1, 2, 3];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.concat()).to.be.equal(immutableArray);
        expect(immutableArray.concat(null)).to.not.equal(immutableArray);
        expect(immutableArray.concat(undefined)).to.not.equal(immutableArray);
        expect(immutableArray.concat('')).to.not.equal(immutableArray);
        expect(immutableArray.concat([])).to.not.equal(immutableArray);

        var newVal = 'a';
        var newImmutableArray = immutableArray.concat(newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.concat(newVal));

        newVal = ['a', 'b', 'c'];
        newImmutableArray = immutableArray.concat(newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.concat(newVal));

        newVal = Immutable.create(['a', 'b', 'c']);
        newImmutableArray = immutableArray.concat(newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.concat(Array.prototype.slice.call(newVal)));
    });

    it('Immutable.insert()', function () {
        var array = [1, 2, 3, 4];
        var immutableArray = Immutable.create(array);

        expect(immutableArray.insert()).to.be.equal(immutableArray);
        expect(immutableArray.insert(1)).to.be.equal(immutableArray);
        expect(immutableArray.insert(1, null)).to.not.equal(immutableArray);
        expect(immutableArray.insert(1, undefined)).to.not.equal(immutableArray);
        expect(immutableArray.insert(1, '')).to.not.equal(immutableArray);
        expect(immutableArray.insert(1, [])).to.not.equal(immutableArray);

        var newVal = 'a';
        var newImmutableArray = immutableArray.insert(1, newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(spliceArray(array.concat(), 1, 0, newVal));

        newVal = ['a', 'b', 'c'];
        newImmutableArray = immutableArray.insert(1, newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties([].concat(array.slice(0, 1), newVal, array.slice(1)));

        newVal = ['a', 'b', 'c'];
        newImmutableArray = immutableArray.insert(array.length * 2, newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties([].concat(array, newVal));

        newVal = Immutable.create(['a', 'b', 'c']);
        newImmutableArray = immutableArray.insert(array.length * 2, newVal);
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties([].concat(array, Array.prototype.slice.call(newVal)));
    });

    it('Immutable.sort()', function () {
        var array = [3, 1, 4, 8, 0];
        var immutableArray = Immutable.create([1]);

        expect(immutableArray.sort()).to.be.equal(immutableArray);
        expect(immutableArray.sort(() => 0)).to.be.equal(immutableArray);

        immutableArray = Immutable.create([]);
        expect(immutableArray.sort()).to.be.equal(immutableArray);
        expect(immutableArray.sort(() => 0)).to.be.equal(immutableArray);

        immutableArray = Immutable.create(array);
        var newImmutableArray = immutableArray.sort();
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.sort());
    });

    it('Immutable.reverse()', function () {
        var array = [3, 1, 4, 8, 0];
        var immutableArray = Immutable.create([1]);

        expect(immutableArray.reverse()).to.be.equal(immutableArray);

        immutableArray = Immutable.create([]);
        expect(immutableArray.reverse()).to.be.equal(immutableArray);

        immutableArray = Immutable.create(array);
        var newImmutableArray = immutableArray.reverse();
        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray).to.have.properties(array.reverse());
    });

    it('Immutable.clear()', function () {
        var array = [1, 2, 3];
        var immutableArray = Immutable.create(array);
        var newImmutableArray = immutableArray.clear();

        expect(immutableArray).to.have.properties(array);
        expect(Immutable.guid(newImmutableArray)).to.be.equal(Immutable.guid(immutableArray));
        expect(newImmutableArray).to.not.equal(immutableArray);
        expect(newImmutableArray.isArray()).to.be.true;
        expect(newImmutableArray.size()).to.be.equal(0);
        expect(array).to.have.properties(newImmutableArray);
    });

    it('Immutable.first()', function () {
    });

    it('Immutable.last()', function () {
    });

    it('Immutable.at()', function () {
    });

    it('Immutable.findIndex()', function () {
    });
});

function spliceArray(array, ...args) {
    Array.prototype.splice.apply(array, args);
    return array;
}
