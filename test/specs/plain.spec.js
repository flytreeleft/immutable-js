import {expect} from 'chai';

import Immutable from 'immutable-js';

describe('Immutable Object - Plain object:', function () {
    it('Plain Date, RegExp', function () {
        var obj = {
            date: new Date(),
            regexp: /\s+/g
        };
        var immutableObj = Immutable.create(obj);

        expect(Immutable.isInstance(immutableObj.date)).to.be.true;
        expect(immutableObj.date.isDate()).to.be.true;
        expect(Immutable.guid(immutableObj.date)).to.be.equal(Immutable.guid(obj.date));
        expect(immutableObj.date.valueOf()).to.be.equal(obj.date.getTime());

        expect(Immutable.isInstance(immutableObj.regexp)).to.be.true;
        expect(immutableObj.regexp.isRegExp()).to.be.true;
        expect(Immutable.guid(immutableObj.regexp)).to.be.equal(Immutable.guid(obj.regexp));
        expect(immutableObj.regexp.valueOf()).to.be.equal(obj.regexp.toString());
    });

    it('Plain Function', function () {
        var obj = {
            fn: function emptyFn() {
            }
        };

        expect(() => Immutable.create(obj)).to.throw(Error);
        expect(() => Immutable.create(obj, {toPlain: {}})).to.throw(Error);
        expect(() => Immutable.create(obj, {toPlain: (fn) => fn})).to.throw(Error);

        var immutableObj = Immutable.create(obj, {
            toPlain: (fn) => ({$fn: fn.name})
        });
        expect(Immutable.isInstance(immutableObj.fn)).to.be.true;
        expect(Immutable.guid(immutableObj.fn)).to.be.equal(Immutable.guid(obj.fn));
        expect(immutableObj.fn.$fn).to.be.equal(obj.fn.name);
    });

    it('Plain complex object', function () {
        function Complex(options = {}) {
            this.name = options.name;
        }

        var obj = {
            complex: new Complex({name: 'Complex Object'})
        };

        expect(() => Immutable.create(obj)).to.not.throw(Error);
        expect(() => Immutable.create(obj, {toPlain: {}})).to.not.throw(Error);
        expect(() => Immutable.create(obj, {toPlain: (obj) => []})).to.throw(Error);
        expect(() => Immutable.create(obj, {toPlain: (obj) => obj.constructor.name})).to.throw(Error);

        var immutableObj = Immutable.create(obj, {
            toPlain: (obj) => Object.assign({$class: obj.constructor.name}, obj)
        });
        expect(Immutable.isInstance(immutableObj.complex)).to.be.true;
        expect(immutableObj).to.have.properties(obj);
        expect(immutableObj.complex.$class).to.be.equal(Complex.name);
    });
});
