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
    exports.CommunityStatement = function () { return (React.createElement("div", null,
        React.createElement("p", null, "The first in a series exploring the emergent properties of spatial optimization algorithms. Investigations focus on the disconnect between the inorganic, sterile systems of code and the resulting animate, biological entities."),
        React.createElement("h3", null, "Algorithm"),
        React.createElement("p", null, "One hundred community members are generated, each with a unique location, represented by a three pixel square. Each community member is spawned with the desire to be a unique optimal distance from all of its neighbors. Each member attempts to achieve its own optimal state by adjusting its position relative to its nearest and farthest neighbors. It extends a twenty-point dotted line to both of these neighbors, signifying the special relationships."),
        React.createElement("p", null, "The canvas is cleared only when spawning a new generation, preserving an index of the paths taken. This index serves both an aethestic and metaphorical purpose: the resulting image resembles a mechanical creature, an emergent system greater than the sum of its parts. In the same manner in which a painting emerges from a series of brush strokes, the image manifests itself from the relationships of the community members."),
        React.createElement("p", null, "Life of the system is limited to fifty cycles."))); };
});
