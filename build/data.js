(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.data = {
        title: 'Community',
        year: '2011',
        uri: 'community',
        source: {
            owner: 'justinlivi',
            repo: 'community',
            ref: 'master',
        },
    };
});
