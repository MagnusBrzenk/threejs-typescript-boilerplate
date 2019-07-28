import {
  BufferGeometry,
  Geometry
} from 'three';

export class SimplifyModifier {
  constructor();
  modify(geometry: BufferGeometry | Geometry, count: number): BufferGeometry;
}
