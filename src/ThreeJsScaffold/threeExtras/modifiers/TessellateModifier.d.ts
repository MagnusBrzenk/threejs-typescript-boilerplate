import {
  Geometry
} from 'three';

export class SubdivisionModifier {
  constructor(maxEdgeLength: number);
  maxEdgeLength: number;

  modify(geometry: Geometry): void;
}
