"use strict";

describe("RandomizerTest", function () {

    var assert = chai.assert;


    it(" ", function () {
        var r = tutao.locator.randomizer;
        for (var i = 1; i < 20; i++) {
            assert.equal(i * 2, r.generateRandomData(i).length);
        }
    });

    it("Seeding ", function () {
        var r = new tutao.crypto.SjclRandomizer();
        assert.isFalse(r.isReady());
        try {
            r.generateRandomData(1);
            assert.fail("could generate random data");
        } catch (e) {
            assert.instanceOf(e,tutao.crypto.CryptoError);
        }
        r.addEntropy(10, 255, tutao.crypto.RandomizerInterface.ENTROPY_SRC_MOUSE);
        assert.isFalse(r.isReady());
        try {
            r.generateRandomData(1);
            assert.fail("could generate random data");
        } catch (e) {
            assert.instanceOf(e,tutao.crypto.CryptoError);
        }
        r.addEntropy(10, 1, tutao.crypto.RandomizerInterface.ENTROPY_SRC_KEY);
        assert.isTrue(r.isReady());
        assert.isNotNull(r.generateRandomData(1)); // must work now
    });


});