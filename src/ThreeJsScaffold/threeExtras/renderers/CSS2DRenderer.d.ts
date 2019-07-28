import {
  Object3D,
  Scene,
  Camera
} from 'three';

export class CSS2DObject extends Object3D {
  constructor(element: HTMLElement);
  element: HTMLElement;
}

export class CSS2DRenderer {
  constructor();
  domElement: HTMLElement;

  getSize(): {width: number, height: number};
  setSize(width: number, height: number): void;
  render(scene: Scene, camera: Camera): void;
}
