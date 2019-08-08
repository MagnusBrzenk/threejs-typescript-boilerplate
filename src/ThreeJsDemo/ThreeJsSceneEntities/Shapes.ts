import * as THREE from 'three';
import { ISceneEntity, SceneEntityBase } from '../../ThreeJsScaffold/scene.entity';
import { ISceneManager } from '../../ThreeJsScaffold/scene.manager';
import { MTLOBJLoader } from '../../threeJsScaffold/utils/MTLOBJLoader';

export class Shapes extends SceneEntityBase implements ISceneEntity {
  constructor(parentSceneManager: ISceneManager, private sideLength: number) {
    super(parentSceneManager);
  }

  init = () => {
    // Build Square Mesh

    const objHandle: THREE.Object3D | undefined = undefined;

    MTLOBJLoader('images/play1.mtl', 'images/play1.obj', 10, objHandle, (obj: THREE.Object3D) => {
      this._sceneEntityGroup.add(obj);
      this._isSceneEntityReady = true;
      this._parentSceneManager.attemptStart();
    });
  };

  update = (time: number) => {
    // this._sceneEntityGroup.children.forEach(el => {
    //   el.rotation.x += 0.01;
    //   el.rotation.y += 0.02;
    // });
  };
}
