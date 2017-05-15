import {expect} from 'chai';

import padStart from 'lodash/padStart';

import Immutable from 'immutable-js';

function Timer() {
}

Timer.prototype.run = function (cb, reporter) {
    var start = Date.now();
    cb && cb();
    var end = Date.now();

    reporter && reporter(end - start);
};

describe.skip('Immutable Object - Performance restriction:', function () {
    it('One depth with 100,000 items', function () {
        var itemCount = 100000;
        var obj = {};
        for (let i = 0; i < itemCount; i++) {
            var key = padStart(`${i}`, `${itemCount}`.length, '0');
            obj[key] = {i: i};
        }

        var timer = new Timer();
        timer.run(() => {
            Immutable.create(obj);
        }, (consume) => {
            console.log(`${consume}ms.`);
        });

        var array = [];
        for (let i = 0; i < itemCount; i++) {
            array[i] = {i: i};
        }

        timer.run(() => {
            Immutable.create(array);
        }, (consume) => {
            console.log(`${consume}ms.`);
        });
    });

    it('1,000 depth with 10,000 items', function () {
        var depth = 100;
        var itemCount = 100;
        var obj = [];
        for (let i = 0; i < itemCount; i++) {
            var key = padStart(`${i}`, `${itemCount}`.length, '0');
            var child = obj[key] = {};
            for (let j = 0; j < depth; j++) {
                key += `.${j}`;
                child = child[key] = {};
            }
        }

        var timer = new Timer();
        timer.run(() => {
            Immutable.create(obj);
        }, (consume) => {
            console.log(`${consume}ms.`);
        });
    });
});
