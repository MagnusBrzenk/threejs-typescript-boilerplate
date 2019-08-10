import * as THREE from 'three';
import { ISceneEntity, SceneEntityBase } from '../../ThreeJsScaffold/scene.entity';
import { ISceneManager } from '../../ThreeJsScaffold/scene.manager';
import { MTLOBJLoader } from '../../threeJsScaffold/utils/MTLOBJLoader';

// import { OrbitControls } from './jsm/controls/OrbitControls.js';
// import { OrbitControls } from './threeExtras/controls/OrbitControls';
import { FBXLoader } from '../../threeJsScaffold/threeExtras/loaders/FBXLoader';

export class Shapes extends SceneEntityBase implements ISceneEntity {
  private xxx: any;

  constructor(parentSceneManager: ISceneManager, private sideLength: number) {
    super(parentSceneManager);
  }

  init = () => {
    // Build Square Mesh

    const objHandle: THREE.Object3D | undefined = undefined;

    if (!true) {
      MTLOBJLoader(
        'images/monster-confrontation4.mtl',
        'images/monster-confrontation4.obj',
        10,
        (obj: THREE.Object3D) => {
          obj.rotateX(Math.PI / 2);
          this._sceneEntityGroup.add(obj);
          this._isSceneEntityReady = true;
          this._parentSceneManager.attemptStart();
        }
      );
    }
    if (true) {
      const loader = new FBXLoader();
      loader.load('images/monster-confrontation.fbx', (object: THREE.Object3D) => {
        console.log('Debug0');

        // const mixer = new THREE.AnimationMixer(object);

        console.log('Debug1');

        // const action = mixer.clipAction(object.animations[0]);
        // action.play();

        console.log('Debug2');
        this.xxx = object;
        this.xxx.traverse((child: any) => {
          // @ts-ignore
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          console.log('child.type', child.type);
          // @ts-ignore
          if (child.type === 'SpotLight') {
            // console.log('--- SPOTLIGHT');
            // @ts-ignore
            // this._sceneEntityGroup.add(child.target);
            // this._parentSceneManager._scene.add(child.target);
          } else if (child.type === 'Mesh') {
            //
            // console.log('child.type!!!', child.type, JSON.stringify(new THREE.Mesh(), null, 2));
            // this._sceneEntityGroup.add(new THREE.Mesh());
            // this._sceneEntityGroup.add(child);
            // this._parentSceneManager._scene.add(child);
          }
        });

        console.log('Debug3');
        object.rotateX(Math.PI / 2);
        this._sceneEntityGroup.add(object);
        this._isSceneEntityReady = true;
        this._parentSceneManager.attemptStart();
        this._sceneEntityGroup.add(new THREE.Mesh());
        console.log('Debug4');
      });
    }
  };

  update = (time: number) => {
    this._sceneEntityGroup.children.forEach(el => {
      // el.rotation.x += 0.01;
      el.rotation.y += 0.02;
    });
  };
}
