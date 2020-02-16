(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./sketches/seed0/CommunitySeed0", "./data", "./statement"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommunitySeed0_1 = require("./sketches/seed0/CommunitySeed0");
    exports.CommunitySeed0 = CommunitySeed0_1.CommunitySeed0;
    var data_1 = require("./data");
    exports.data = data_1.data;
    var statement_1 = require("./statement");
    exports.CommunityStatement = statement_1.CommunityStatement;
});
