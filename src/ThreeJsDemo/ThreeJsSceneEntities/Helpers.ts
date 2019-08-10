import * as THREE from 'three';
import { ISceneEntity, SceneEntityBase } from '../../ThreeJsScaffold/scene.entity';
import { ISceneManager } from '../../ThreeJsScaffold/scene.manager';

export class MiscHelpers extends SceneEntityBase implements ISceneEntity {
  constructor(parentSceneManager: ISceneManager) {
    super(parentSceneManager);
  }

  init = () => {
    const axesHelper = new THREE.AxesHelper(500);
    const xxxHelper = new THREE.AxesHelper(500);
    // this._sceneEntityGroup.add(axesHelper);
    this._sceneEntityGroup.add(xxxHelper);

    // Finish
    this._isSceneEntityReady = true;
    this._parentSceneManager.attemptStart();
  };

  update = (time: number) => {
    //
  };
}
