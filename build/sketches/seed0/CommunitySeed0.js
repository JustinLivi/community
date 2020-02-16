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
        define(["require", "exports", "react", "../../lib/SketchPad", "./CommunitySketch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = __importStar(require("react"));
    var SketchPad_1 = require("../../lib/SketchPad");
    var CommunitySketch_1 = require("./CommunitySketch");
    exports.CommunitySeed0 = function () { return (React.createElement(SketchPad_1.SketchPad, { width: 1920, height: 1080, sketchCreator: function (canvas) { return new CommunitySketch_1.CommunitySketch(canvas); } })); };
});
