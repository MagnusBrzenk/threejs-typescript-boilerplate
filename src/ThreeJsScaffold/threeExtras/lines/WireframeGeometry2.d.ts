import {
  BufferGeometry,
  Geometry
} from 'three';

import { LineSegmentsGeometry } from './LineSegmentsGeometry';

export class WireframeGeometry2 extends LineSegmentsGeometry {
  constructor(geometry: Geometry | BufferGeometry);
  isWireframeGeometry2: boolean;
}
