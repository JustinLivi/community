(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../lib/math"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var math_1 = require("../../lib/math");
    var CNode = /** @class */ (function () {
        function CNode(width, height) {
            this.optimal = math_1.random(20);
            this.theta = math_1.random(360);
            this.loc = {
                x: math_1.random(width),
                y: math_1.random(height),
            };
            this.vel = {
                x: 0,
                y: 0,
            };
            this.grey = math_1.random(255);
            this.alpha = math_1.random(10, 70) / 255;
            this.speed = math_1.random(0.1, 3);
        }
        CNode.prototype.update = function () {
            this.grey += math_1.random(-1, 1);
            this.loc.x += this.vel.x;
            this.loc.y += this.vel.y;
        };
        return CNode;
    }());
    exports.CNode = CNode;
});
