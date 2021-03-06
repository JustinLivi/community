import * as React from 'react';

export const CommunityStatement = () => (
  <div>
    <p>
      The first in a series exploring the emergent properties of spatial optimization algorithms. Investigations focus
      on the disconnect between the inorganic, sterile systems of code and the resulting animate, biological entities.
    </p>
    <h3>Algorithm</h3>
    <p>
      One hundred community members are generated, each with a unique location, represented by a three pixel square.
      Each community member is spawned with the desire to be a unique optimal distance from all of its neighbors. Each
      member attempts to achieve its own optimal state by adjusting its position relative to its nearest and farthest
      neighbors. It extends a twenty-point dotted line to both of these neighbors, signifying the special relationships.
    </p>
    <p>
      The canvas is cleared only when spawning a new generation, preserving an index of the paths taken. This index
      serves both an aethestic and metaphorical purpose: the resulting image resembles a mechanical creature, an
      emergent system greater than the sum of its parts. In the same manner in which a painting emerges from a series of
      brush strokes, the image manifests itself from the relationships of the community members.
    </p>
    <p>Life of the system is limited to fifty cycles.</p>
  </div>
);
