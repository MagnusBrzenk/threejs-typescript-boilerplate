import {
  Mesh,
  BufferGeometry,
  Color,
  WebGLRenderTarget
} from 'three';

export interface RefractorOptions {
  color?: Color;
  textureWidth?: number;
  textureHeight?: number;
  clipBias?: number;
  shader?: object;
}

export class Refractor extends Mesh {
  constructor(geometry?: BufferGeometry, options?: RefractorOptions);

  getRenderTarget(): WebGLRenderTarget;
}
