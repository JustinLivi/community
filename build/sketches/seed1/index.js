(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../lib/Animator", "../../lib/ArtBox", "../../lib/math", "./CNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Animator_1 = require("../../lib/Animator");
    var ArtBox_1 = require("../../lib/ArtBox");
    var math_1 = require("../../lib/math");
    var CNode_1 = require("./CNode");
    var Community = /** @class */ (function () {
        function Community(canvas) {
            this.nodes = [];
            this.artBox = new ArtBox_1.ArtBox(canvas);
            this.width = canvas.width;
            this.height = canvas.height;
            this.draw = this.draw.bind(this);
            this.nodecount = 80;
            this.resetNodes();
            this.animator = new Animator_1.Animator({ draw: this.draw });
            this.animator.start();
        }
        Community.prototype.reset = function () {
            this.resetNodes();
            this.animator.reset();
            this.animator.start();
        };
        Community.prototype.resetNodes = function () {
            for (var count = 0; count < this.nodecount; count += 1) {
                this.nodes[count] = new CNode_1.CNode(this.width, this.height);
            }
        };
        Community.prototype.findFarthest = function (nodeId, targetNode) {
            var farthest;
            var farthestDistance = 0;
            var _a = targetNode.loc, x1 = _a.x, y1 = _a.y, optimal = targetNode.optimal;
            for (var count = 0; count < this.nodecount; count += 1) {
                var comparator = this.nodes[count];
                if (!comparator)
                    continue;
                var _b = comparator.loc, x2 = _b.x, y2 = _b.y;
                var distance = Math.abs(math_1.dist(x1, y1, x2, y2) - optimal);
                if (count !== nodeId && distance > farthestDistance) {
                    farthest = comparator;
                    farthestDistance = distance;
                }
            }
            return farthest;
        };
        Community.prototype.findClosest = function (nodeId, targetNode) {
            var closest;
            var closestDistance;
            var _a = targetNode.loc, x1 = _a.x, y1 = _a.y, optimal = targetNode.optimal;
            for (var count = 0; count < this.nodecount; count += 1) {
                var comparator = this.nodes[count];
                if (!comparator)
                    continue;
                var _b = comparator.loc, x2 = _b.x, y2 = _b.y;
                var distance = Math.abs(math_1.dist(x1, y1, x2, y2) - optimal);
                if (count !== nodeId &&
                    (closestDistance === undefined || distance < closestDistance)) {
                    closest = comparator;
                    closestDistance = distance;
                }
            }
            return closest;
        };
        Community.prototype.optimizeDistance = function (targetNode, comparator) {
            var optimal = targetNode.optimal, _a = targetNode.loc, x1 = _a.x, y1 = _a.y, speed = targetNode.speed, grey = targetNode.grey, alpha = targetNode.alpha;
            var _b = comparator.loc, x2 = _b.x, y2 = _b.y;
            var distance = math_1.dist(x1, y1, x2, y2);
            var adjustedDistance = distance / speed;
            if (distance < optimal) {
                targetNode.vel.x = -(x2 - x1) / adjustedDistance;
                targetNode.vel.y = -(y2 - y1) / adjustedDistance;
            }
            if (distance > optimal) {
                targetNode.vel.x = (x2 - x1) / adjustedDistance;
                targetNode.vel.y = (y2 - y1) / adjustedDistance;
            }
            targetNode.update();
            this.artBox.setFill(grey, grey, grey, alpha);
            this.artBox.line(x2, y2, x1, y1);
        };
        Community.prototype.draw = function () {
            for (var nodeId = 0; nodeId < this.nodecount; nodeId += 1) {
                var targetNode = this.nodes[nodeId];
                if (!targetNode)
                    continue;
                var farthest = this.findFarthest(nodeId, targetNode);
                if (farthest) {
                    this.optimizeDistance(targetNode, farthest);
                }
                var closest = this.findClosest(nodeId, targetNode);
                if (closest) {
                    this.optimizeDistance(targetNode, closest);
                }
                var _a = targetNode.loc, x = _a.x, y = _a.y;
                this.artBox.rect(x, y, 6, 6);
                this.artBox.fill();
            }
        };
        return Community;
    }());
    exports.Community = Community;
});
