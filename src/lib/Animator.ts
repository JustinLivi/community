import raf from 'raf';

export type Draw = (timingAdjustment: number, frame: number) => void;

export interface AnimatorProps {
  draw: Draw;
  maxFrames?: number;
  fps?: number;
}

export class Animator {
  private readonly maxFrames?: number;
  private running: boolean = false;
  private frame: number = 0;
  private now: number = window.performance.now();
  private then: number = this.now;
  private fpsInterval: number;
  private draw: Draw;

  constructor({ draw, maxFrames, fps = 60 }: AnimatorProps) {
    this.draw = draw;
    this.animate = this.animate.bind(this);
    this.maxFrames = maxFrames;
    this.fpsInterval = 1000 / fps;
  }

  public start() {
    if (this.running) {
      return;
    }
    this.running = true;
    this.animate();
  }

  public pause() {
    this.running = false;
  }

  public stop() {
    this.pause();
    this.reset();
  }

  public reset() {
    this.frame = 0;
  }

  private animate() {
    if (
      (this.maxFrames !== undefined && this.frame > this.maxFrames) ||
      !this.running
    ) {
      this.running = false;
      return;
    }
    raf(this.animate);
    this.frame += 1;
    this.now = window.performance.now();
    const elapsed = this.now - this.then;

    if (elapsed > 2000) {
      this.then = this.now - (elapsed % this.fpsInterval);
    } else if (elapsed > this.fpsInterval) {
      this.then = this.now - (elapsed % this.fpsInterval);
      this.draw(
        1 + (elapsed - this.fpsInterval) / this.fpsInterval,
        this.frame
      );
    }
  }
}
