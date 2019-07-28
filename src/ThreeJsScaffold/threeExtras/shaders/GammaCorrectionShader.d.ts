import {
  Uniform
} from 'three';

export interface GammaCorrectionShader {
  uniforms: {
    tDiffuse: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
