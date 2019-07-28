import * as THREE from 'three';
import { ISceneEntity, SceneEntityBase } from '../../ThreeJsScaffold/scene.entity';
import { ISceneManager } from '../../ThreeJsScaffold/scene.manager';

export class DirectionalLight extends SceneEntityBase implements ISceneEntity {
  constructor(parentSceneManager: ISceneManager) {
    super(parentSceneManager);
  }

  init = () => {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(10, 10, 10);
    light.lookAt(0, 0, 0);
    const helper = new THREE.DirectionalLightHelper(light, 5);

    this._sceneEntityGroup.add(light);
    this._sceneEntityGroup.add(helper);

    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(-5, -5, -5);
    light1.lookAt(0, 0, 0);
    const helper1 = new THREE.DirectionalLightHelper(light1, 5);

    this._sceneEntityGroup.add(light1);
    this._sceneEntityGroup.add(helper1);

    // Finish
    this._isSceneEntityReady = true;
    this._parentSceneManager.attemptStart();
  };

  update = (time: number) => {
    // Move light around, etc.
  };
}
