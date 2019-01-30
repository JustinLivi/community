import { random } from '../../lib/math';

export interface Vector {
  x: number;
  y: number;
}

export class CNode {
  optimal: number;
  theta: number;
  loc: Vector;
  vel: Vector;
  grey: number;
  alpha: number;
  speed: number;

  constructor(width: number, height: number) {
    this.optimal = random(height / 20, height / 10);
    this.theta = random(360);
    this.loc = {
      x: width / 2 + random(height / 20, height / 10),
      y: height / 2 + random(height / 20, height / 10)
    };
    this.vel = {
      x: 0,
      y: 0
    };
    this.grey = random(255);
    this.alpha = random(10, 70) / 255;
    this.speed = random(1, 3);
  }

  update() {
    this.grey += random(-1, 1);
    this.loc.x += this.vel.x;
    this.loc.y += this.vel.y;
  }
}
