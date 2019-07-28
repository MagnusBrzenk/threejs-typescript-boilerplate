import {CubeTexture, Renderer, WebGLRenderTarget} from 'three';

export class PMREMCubeUVPacker {
  CubeUVRenderTarget:WebGLRenderTarget;

  constructor(cubeTextureLods: CubeTexture[]);
  update(renderer:Renderer): void;
  dispose(): void;
}
