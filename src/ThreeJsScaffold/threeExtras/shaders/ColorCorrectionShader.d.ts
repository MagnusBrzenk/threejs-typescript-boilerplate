import {
  Uniform
} from 'three';

export interface ColorCorrectionShader {
  uniforms: {
    tDiffuse: Uniform;
    powRGB: Uniform;
    mulRGB: Uniform;
    addRGB: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
