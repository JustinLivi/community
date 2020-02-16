var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = __importStar(require("react"));
    var Sketch = /** @class */ (function () {
        function Sketch(canvasRef) {
        }
        Sketch.prototype.reset = function () { };
        return Sketch;
    }());
    exports.Sketch = Sketch;
    var SketchPad = /** @class */ (function (_super) {
        __extends(SketchPad, _super);
        function SketchPad(props) {
            var _this = _super.call(this, props) || this;
            _this.handleClick = function () {
                if (_this.sketch) {
                    _this.sketch.reset();
                }
            };
            _this.getCanvasRef = function (canvasRef) {
                if (canvasRef) {
                    _this.sketch = _this.sketchCreator(canvasRef);
                }
            };
            _this.sketchCreator = props.sketchCreator;
            return _this;
        }
        SketchPad.prototype.render = function () {
            var _a = this.props, width = _a.width, height = _a.height;
            return (React.createElement("canvas", { width: width, height: height, ref: this.getCanvasRef, onClick: this.handleClick }));
        };
        return SketchPad;
    }(React.Component));
    exports.SketchPad = SketchPad;
});
