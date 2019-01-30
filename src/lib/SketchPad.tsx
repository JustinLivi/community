import * as React from 'react';

export abstract class Sketch {
  constructor(canvasRef?: HTMLCanvasElement) {}
  reset(): void {}
}

export interface SketchPadProps {
  width: number;
  height: number;
  sketchCreator: (canvasRef: HTMLCanvasElement) => Sketch;
}

export class SketchPad extends React.Component<SketchPadProps> {
  private sketch?: Sketch;
  private sketchCreator: (canvasRef: HTMLCanvasElement) => Sketch;

  constructor(props: SketchPadProps) {
    super(props);
    this.sketchCreator = props.sketchCreator;
  }

  handleClick: React.MouseEventHandler = () => {
    if (this.sketch) {
      this.sketch.reset();
    }
  };

  getCanvasRef = (canvasRef: HTMLCanvasElement | null) => {
    if (canvasRef) {
      this.sketch = this.sketchCreator(canvasRef);
    }
  };

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        width={width}
        height={height}
        ref={this.getCanvasRef}
        onClick={this.handleClick}
      />
    );
  }
}
