import { Animator } from '../../lib/Animator';
import { ArtBox } from '../../lib/ArtBox';
import { dist } from '../../lib/math';
import { Sketch } from '../../lib/SketchPad';
import { CNode } from './CNode';

export class Community implements Sketch {
  private readonly animator: Animator;
  private readonly artBox: ArtBox;
  private readonly width: number;
  private readonly height: number;

  private readonly nodecount: number;
  private readonly nodes: CNode[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.artBox = new ArtBox(canvas);
    this.width = canvas.width;
    this.height = canvas.height;
    this.draw = this.draw.bind(this);
    this.nodecount = 80;
    this.resetNodes();
    this.animator = new Animator({ draw: this.draw });
    this.animator.start();
  }

  public reset() {
    this.resetNodes();
    this.animator.reset();
    this.animator.start();
  }

  resetNodes() {
    for (let count = 0; count < this.nodecount; count += 1) {
      this.nodes[count] = new CNode(this.width, this.height);
    }
  }

  findFarthest(nodeId: number, targetNode: CNode) {
    let farthest;
    let farthestDistance = 0;
    const {
      loc: { x: x1, y: y1 },
      optimal
    } = targetNode;
    for (let count = 0; count < this.nodecount; count += 1) {
      const comparator = this.nodes[count];
      if (!comparator) continue;
      const {
        loc: { x: x2, y: y2 }
      } = comparator;
      const distance = Math.abs(dist(x1, y1, x2, y2) - optimal);
      if (count !== nodeId && distance > farthestDistance) {
        farthest = comparator;
        farthestDistance = distance;
      }
    }
    return farthest;
  }

  findClosest(nodeId: number, targetNode: CNode) {
    let closest;
    let closestDistance;
    const {
      loc: { x: x1, y: y1 },
      optimal
    } = targetNode;
    for (let count = 0; count < this.nodecount; count += 1) {
      const comparator = this.nodes[count];
      if (!comparator) continue;
      const {
        loc: { x: x2, y: y2 }
      } = comparator;
      const distance = Math.abs(dist(x1, y1, x2, y2) - optimal);
      if (
        count !== nodeId &&
        (closestDistance === undefined || distance < closestDistance)
      ) {
        closest = comparator;
        closestDistance = distance;
      }
    }
    return closest;
  }

  optimizeDistance(targetNode: CNode, comparator: CNode) {
    const {
      optimal,
      loc: { x: x1, y: y1 },
      speed,
      grey,
      alpha
    } = targetNode;
    const {
      loc: { x: x2, y: y2 }
    } = comparator;
    const distance = dist(x1, y1, x2, y2);
    const adjustedDistance = distance / speed;
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
  }

  draw() {
    for (let nodeId = 0; nodeId < this.nodecount; nodeId += 1) {
      const targetNode = this.nodes[nodeId];
      if (!targetNode) continue;
      const farthest = this.findFarthest(nodeId, targetNode);
      if (farthest) {
        this.optimizeDistance(targetNode, farthest);
      }
      const closest = this.findClosest(nodeId, targetNode);
      if (closest) {
        this.optimizeDistance(targetNode, closest);
      }
      const {
        loc: { x, y }
      } = targetNode;
      this.artBox.rect(x, y, 6, 6);
      this.artBox.fill();
    }
  }
}
