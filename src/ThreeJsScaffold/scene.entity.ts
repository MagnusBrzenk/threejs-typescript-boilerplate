import * as THREE from 'three';
import { ISceneManager } from './scene.manager';

/**
 * Base class that any entity must extend in order that its threeJs group
 * might get added to the threeJs scene owned by the manager
 */
export class SceneEntityBase {
  // Class properties built from scratch
  protected _sceneEntityGroup: THREE.Group = new THREE.Group();
  protected _isSceneEntityReady: boolean = false;

  // Class properties passed on creation
  constructor(protected _parentSceneManager: ISceneManager) {}

  // Get Methods
  public isSceneEntityReady = () => this._isSceneEntityReady;
  public getSceneEntityGroup = () => this._sceneEntityGroup;

  // Set Methods
  public setParentSceneManager = (value: ISceneManager) => (this._parentSceneManager = value);
}

/**
 * The interface that any scene entity must implement in order that it can get added
 * to the scene
 *
 * NOTES:
 * - init: method to declare three geometries, add them to entity's group, and
 * - update: function of time tracked by the SceneManager that determines the state
 * of the threeJs meshes, lights, etc. within the scene entity's THREE.Group
 */
export interface ISceneEntity extends SceneEntityBase {
  init: () => void;
  update: (time: number) => void;
}
