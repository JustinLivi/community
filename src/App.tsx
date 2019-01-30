import './App.css';

import React, { Component } from 'react';

import { SketchPad } from './lib/SketchPad';
import { Community } from './sketches/seed0';

export class App extends Component {
  createSketch = (canvas: HTMLCanvasElement) => {
    return new Community(canvas);
  };

  render() {
    return (
      <div className='App'>
        <SketchPad
          width={1920}
          height={1080}
          sketchCreator={this.createSketch}
        />
      </div>
    );
  }
}
