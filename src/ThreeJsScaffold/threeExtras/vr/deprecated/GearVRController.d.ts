import {
  Object3D
} from '../three';

export class GearVRController extends Object3D {
  constructor(id: number);

	getTouchpadState(): boolean;
  getGamepad(): object;
  update(): void;
}
