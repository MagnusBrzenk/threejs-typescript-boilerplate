import { SceneManagerBase, ISceneManager } from '../ThreeJsScaffold/scene.manager';
import { MiscHelpers } from './ThreeJsSceneEntities/Helpers';
import { DirectionalLight } from './ThreeJsSceneEntities/DirectionalLight';
import { Square } from './ThreeJsSceneEntities/Square';

export class DemoSceneManager extends SceneManagerBase implements ISceneManager {
  constructor(container: HTMLElement) {
    super(container);

    // Style canvas
    container.style.backgroundColor = 'rgba(0,0,0,1)';

    // Create entities
    this._sceneEntities = [
      //
      new DirectionalLight(this),
      new MiscHelpers(this),
      // new SimpleLight(this),
      new Square(this, 1)
    ];

    // Set this as entities parent
    this._sceneEntities.forEach(el => el.init());
  }

  updateCamera = (time: number) => {
    //
  };
}
