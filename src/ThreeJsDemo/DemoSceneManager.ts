import * as THREE from 'three';
import { SceneManagerBase, ISceneManager } from '../ThreeJsScaffold/scene.manager';
import { MiscHelpers } from './ThreeJsSceneEntities/Helpers';
import { DirectionalLight } from './ThreeJsSceneEntities/DirectionalLight';
import { Square } from './ThreeJsSceneEntities/Square';
import { Shapes } from './ThreeJsSceneEntities/shapes';
import { SimpleLight } from './ThreeJsSceneEntities/SimpleLight';

export class DemoSceneManager extends SceneManagerBase implements ISceneManager {
  constructor(container: HTMLElement) {
    super(container);

    // Style canvas
    container.style.backgroundColor = 'rgba(0,0,0,1)';

    this._camera.position.set(1970, 1970, 1970);

    // Create entities
    this._sceneEntities = [
      //
      // new DirectionalLight(this),
      // new MiscHelpers(this),
      // new SimpleLight(this),
      // new Square(this, 1),
      new Shapes(this, 1)
    ];

    // Set this as entities parent
    this._sceneEntities.forEach(el => el.init());

    this._updateCamera = this.updateCamera;
  }

  updateCamera = (time: number) => {
    //
    // console.log(this._camera.position.toArray());
  };
}
