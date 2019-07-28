import {
  Uniform
} from 'three';

export interface AfterimageShader {
  uniforms: {
    damp: Uniform;
    tOld: Uniform;
    tNew: Uniform;
  };
  vertexShader: string;
  fragmentShader: string;
}
