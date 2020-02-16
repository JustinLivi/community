var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "raf"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var raf_1 = __importDefault(require("raf"));
    var Animator = /** @class */ (function () {
        function Animator(_a) {
            var draw = _a.draw, maxFrames = _a.maxFrames, _b = _a.fps, fps = _b === void 0 ? 60 : _b;
            this.running = false;
            this.frame = 0;
            this.now = window.performance.now();
            this.then = this.now;
            this.draw = draw;
            this.animate = this.animate.bind(this);
            this.maxFrames = maxFrames;
            this.fpsInterval = 1000 / fps;
        }
        Animator.prototype.start = function () {
            if (this.running) {
                return;
            }
            this.running = true;
            this.animate();
        };
        Animator.prototype.pause = function () {
            this.running = false;
        };
        Animator.prototype.stop = function () {
            this.pause();
            this.reset();
        };
        Animator.prototype.reset = function () {
            this.frame = 0;
        };
        Animator.prototype.animate = function () {
            if ((this.maxFrames !== undefined && this.frame > this.maxFrames) ||
                !this.running) {
                this.running = false;
                return;
            }
            raf_1.default(this.animate);
            this.frame += 1;
            this.now = window.performance.now();
            var elapsed = this.now - this.then;
            if (elapsed > 2000) {
                this.then = this.now - (elapsed % this.fpsInterval);
            }
            else if (elapsed > this.fpsInterval) {
                this.then = this.now - (elapsed % this.fpsInterval);
                this.draw(1 + (elapsed - this.fpsInterval) / this.fpsInterval, this.frame);
            }
        };
        return Animator;
    }());
    exports.Animator = Animator;
});
