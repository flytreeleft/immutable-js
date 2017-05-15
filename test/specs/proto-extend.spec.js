import {expect} from 'chai';

import {createNE} from 'immutable-js';

describe('Prototype extend', function () {
    it('Extend Array.prototype', function () {
        var extendArrayProto = Object.create(Array.prototype, createNE({
            $set: function () {
            },
            $remove: function () {
            },
            splice: function () {
            }
        }));
        var extendArray = Object.create(extendArrayProto);

        expect(extendArray).to.be.instanceof(Array);
        expect(extendArray.splice).to.not.equal(Array.prototype.splice);
        expect(extendArray.splice).to.be.equal(extendArrayProto.splice);
        expect(extendArray.$set).to.be.equal(extendArrayProto.$set);
        expect(extendArray.$remove).to.be.equal(extendArrayProto.$remove);

        extendArray.push(0, 1, 2);
        expect(extendArray).to.have.lengthOf(3);
        expect(extendArray).to.have.properties([0, 1, 2]);
    });

    it('Reflect prototype', function () {
        function Car() {
            this.name = 'Toy car';
        }

        Car.prototype.getName = function () {
            return this.name;
        };
        Car.prototype.run = function () {
            console.log('Running');
        };

        var car = new Car();
        expect(car).to.be.instanceof(Car);
        expect(car.constructor).to.be.equal(Car);
        expect(car.run).to.be.equal(Car.prototype.run);

        var proto = Object.create(Car.prototype, createNE({
            run: function () {
                console.log('Running failed!');
            }
        }));
        var newCar = Object.setPrototypeOf(car, proto);
        expect(newCar).to.be.equal(car);
        expect(newCar).to.be.instanceof(Car);
        expect(newCar.constructor).to.be.equal(Car);
        expect(newCar.run).to.not.equal(Car.prototype.run);
        expect(newCar.run).to.be.equal(proto.run);
    });
});
