import * as React from 'react';

import { SketchPad } from '../../lib/SketchPad';
import { CommunitySketch } from './CommunitySketch';

export const CommunitySeed0 = () => (
  <SketchPad width={1920} height={1080} sketchCreator={canvas => new CommunitySketch(canvas)} />
);
