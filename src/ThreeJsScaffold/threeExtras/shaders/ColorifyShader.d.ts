import {
  Uniform
} from 'three';

export interface ColorifyShader {
  uniforms: {
    tDiffuse: Uniform;
    color: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
