import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, match, Route } from 'react-router-dom';

import { CommunitySeed0 } from './sketches/seed0/CommunitySeed0';

export interface SketchProps {
  match: match<{ seedId: string }>;
}

export interface SketchState {
  Sketch?: any;
}

export class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/seed/0" exact component={CommunitySeed0} />
      </Router>
    );
  }
}
