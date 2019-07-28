import * as THREE from 'three';
import { ISceneEntity, SceneEntityBase } from '../../ThreeJsScaffold/scene.entity';
import { ISceneManager } from '../../ThreeJsScaffold/scene.manager';

export class Square extends SceneEntityBase implements ISceneEntity {
  constructor(parentSceneManager: ISceneManager, private sideLength: number) {
    super(parentSceneManager);
  }

  init = () => {
    // Build Square Mesh

    const isSimple = true;

    // const material =   new THREE.MeshNormalMaterial();

    // const material = new THREE.MeshBasicMaterial({
    //       map: new THREE.TextureLoader().load(`/images/scipio.jpg`, () => {
    //         this._isSceneEntityReady = true;
    //         this._parentSceneManager.attemptStart();
    //       })
    //     });

    const material = new THREE.MeshPhongMaterial();

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(this.sideLength, this.sideLength, this.sideLength),
      material
    );

    this._sceneEntityGroup.add(mesh);

    // Finish
    if (!!isSimple) {
      this._isSceneEntityReady = true;
      this._parentSceneManager.attemptStart();
    }
  };

  update = (time: number) => {
    this._sceneEntityGroup.children.forEach(el => {
      el.rotation.x += 0.01;
      el.rotation.y += 0.02;
    });
  };
}
