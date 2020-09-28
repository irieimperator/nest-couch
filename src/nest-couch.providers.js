"use strict";
exports.__esModule = true;
exports.createNestCouchProviders = void 0;
var constants_1 = require("./constants");
function createNestCouchProviders(options) {
    return [
        {
            provide: constants_1.NEST_COUCH_OPTIONS,
            useValue: options
        }
    ];
}
exports.createNestCouchProviders = createNestCouchProviders;
