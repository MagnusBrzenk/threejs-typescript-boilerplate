import * as THREE from 'three';
import { OrbitControls } from './threeExtras/controls/OrbitControls';
import { ISceneEntity } from './scene.entity';

export class SceneManagerBase {
  // Essential Properties for a threeJs production
  // protected _scene: THREE.Scene = new THREE.Scene();
  public _scene: THREE.Scene = new THREE.Scene();
  protected _renderer: THREE.WebGLRenderer;
  protected _canvas: HTMLCanvasElement;
  protected _camera: THREE.PerspectiveCamera;
  protected _sceneEntities: ISceneEntity[] = [];
  protected _requestAnimationFrameId: undefined | number;
  protected _orbitControls: OrbitControls;
  protected _clock: THREE.Clock | undefined;
  protected _initialViewingVector: THREE.Vector3 = new THREE.Vector3(10, 10, 10);
  protected _isSceneReady: boolean = false;
  protected _updateCamera: (time: number) => void = () => {};

  constructor(protected _container: HTMLElement, private _fps: number = 60) {
    // Set up canvas to fit precisely within HTML-container element
    this._canvas = document.createElement('canvas');
    this._canvas.width = this._container.offsetWidth;
    this._canvas.height = _container.offsetHeight;
    this._container.appendChild(this._canvas);

    // Build Renderer
    const DPR: number = window.devicePixelRatio ? window.devicePixelRatio : 1;
    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true
    });
    this._renderer.setPixelRatio(DPR);
    this._renderer.gammaInput = true;
    this._renderer.gammaOutput = true;
    this._renderer.sortObjects = false; // This prevents pesky rendering-disruption effect
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Build Camera
    const aspectRatio: number = this._canvas.width / this._canvas.height;
    const fieldOfView: number = 60;
    const nearPlane: number = 0.1; // Wow! Beware: changing this causes/fixes flickering/artifact-ing !!!
    const farPlane: number = 13500;
    this._camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    this._camera.position.copy(this._initialViewingVector);
    this._camera.up = new THREE.Vector3(0, 0, 1); // Vector defining up direction of camera
    this._camera.lookAt(0, 0, 0);

    // Define and configure orbitControls
    this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
    this._orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this._orbitControls.dampingFactor = 0.25;

    // Set up window event listeners
    window.onresize = this.onWindowResize;
    this.onWindowResize();
  }

  attemptStart = () => {
    // Check if ALL sceneEntities have been declared ready
    this._isSceneReady =
      !!this._sceneEntities &&
      this._sceneEntities.map(el => el.isSceneEntityReady()).every(el => el);

    if (!!this._isSceneReady) {
      // Add each entity's THREE.Group to scene
      this._sceneEntities.forEach(el => {
        this._scene.add(el.getSceneEntityGroup());
      });
      // Begin Clock and start animating
      console.log('STARTING ANIMATION!');
      this._clock = new THREE.Clock();
      this.render();
    } else {
      console.log('SCENE ENTITIES ARE NOT ALL READY!');
    }
  };

  update() {
    // Loop through scene entities and trigger their update methods
    const elapsedTime: number = !!this._clock ? this._clock.getElapsedTime() : 0;
    this._sceneEntities.forEach(el => el.update(elapsedTime));

    // Update camera
    this._updateCamera(elapsedTime);

    // Finish loop
    this._renderer.render(this._scene, this._camera);
  }

  ///////////////////////////////
  // RENDERING METHODS
  ///////////////////////////////

  onWindowResize = () => {
    const width = this._container.offsetWidth;
    const height = this._container.offsetHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  };

  render = () => {
    if (!!this._fps) {
      setTimeout(() => {
        this._requestAnimationFrameId = requestAnimationFrame(this.render);
        this.update();
      }, 1000 / this._fps);
    } else {
      this._requestAnimationFrameId = requestAnimationFrame(this.render);
      this.update();
    }
  };

  stopRendering = () => {
    if (!!this._requestAnimationFrameId) {
      cancelAnimationFrame(this._requestAnimationFrameId);
      this._requestAnimationFrameId = undefined;
    }
  };
}

/**
 * Every instance of an ISceneManage
 */
export interface ISceneManager extends SceneManagerBase {
  updateCamera: (time: number) => void;
}
