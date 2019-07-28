import {
  Uniform
} from 'three';

export interface BrightnessContrastShader {
  uniforms: {
    tDiffuse: Uniform;
    brightness: Uniform;
    contrast: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
