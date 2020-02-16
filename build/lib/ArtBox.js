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
    var ArtBox = /** @class */ (function () {
        function ArtBox(canvas) {
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
            var ctx = canvas.getContext('2d');
            if (ctx === null) {
                throw new Error('Context is null');
            }
            this.ctx = ctx;
        }
        ArtBox.prototype.line = function (x1, y1, x2, y2) {
            this.ctx.beginPath();
            for (var count = 0; count < 20; count += 1) {
                this.ctx.rect(x1 + (count * (x2 - x1)) / 20, y1 + (count * (y2 - y1)) / 20, 2, 2);
            }
            this.ctx.fill();
        };
        ArtBox.prototype.clear = function () {
            this.ctx.clearRect(0, 0, this.width, this.height);
        };
        ArtBox.prototype.setFill = function (r, g, b, a) {
            this.ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        };
        ArtBox.prototype.rect = function (x, y, width, height) {
            this.ctx.rect(x, y, width, height);
        };
        ArtBox.prototype.fill = function () {
            this.ctx.fill();
        };
        return ArtBox;
    }());
    exports.ArtBox = ArtBox;
});
