import {
  Uniform
} from 'three';

export interface DotScreenShader {
  uniforms: {
    tDiffuse: Uniform;
    tSize: Uniform;
    center: Uniform;
    angle: Uniform;
    scale: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
