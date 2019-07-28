import {
  Uniform
} from 'three';

export interface BleachBypassShader {
  uniforms: {
    tDiffuse: Uniform;
    opacity: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
