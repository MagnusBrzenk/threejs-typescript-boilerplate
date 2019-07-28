import * as THREE from 'three';
import { ISceneEntity, SceneEntityBase } from '../../ThreeJsScaffold/scene.entity';
import { ISceneManager } from '../../ThreeJsScaffold/scene.manager';

export class SimpleLight extends SceneEntityBase implements ISceneEntity {
  constructor(parentSceneManager: ISceneManager) {
    super(parentSceneManager);
  }

  init = () => {
    // Add ambient light
    this._sceneEntityGroup.add(new THREE.AmbientLight(0x333333, 1));

    // Finish
    this._isSceneEntityReady = true;
    this._parentSceneManager.attemptStart();
  };

  update = (time: number) => {
    // Move light around, etc.
  };
}
