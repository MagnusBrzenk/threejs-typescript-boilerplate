import {
  Uniform
} from 'three';

export interface DOFMipMapShader {
  uniforms: {
    tColor: Uniform;
    tDepth: Uniform;
    focus: Uniform;
    maxblur: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
