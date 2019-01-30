import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, match, Route } from 'react-router-dom';

import { Sketch, SketchPad } from './lib/SketchPad';
import { Community } from './sketches/seed0';

export interface SketchProps {
  match: match<{ seedId: string }>;
}

export interface SketchState {
  Sketch?: any;
}

export class SketchComponent extends Component<SketchProps, SketchState> {
  constructor(props: SketchProps) {
    super(props);
    this.state = {};
    import(`./sketches/seed${props.match.params.seedId}`).then(LoadedSketch => {
      this.setState({ Sketch: LoadedSketch.Community });
    });
  }

  createSketch = (canvas: HTMLCanvasElement) => {
    if (!this.state.Sketch) {
      return new Community(canvas);
    }
    return new this.state.Sketch(canvas);
  };

  render() {
    return this.state.Sketch ? (
      <div className='App'>
        <SketchPad
          width={1920}
          height={1080}
          sketchCreator={this.createSketch}
        />
      </div>
    ) : (
      <React.Fragment />
    );
  }
}

export class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/seed/:seedId' exact component={SketchComponent} />
      </Router>
    );
  }
}
