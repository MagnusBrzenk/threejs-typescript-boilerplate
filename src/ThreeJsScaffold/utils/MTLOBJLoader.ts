import * as THREE from 'three';
import { MTLLoader } from './MTLLoader';
import { OBJLoader } from './OBJLoader';

// Augment THREE with MTL and OBJ loaders
MTLLoader(THREE);
OBJLoader(THREE);

/**
 * Wrapper around my OBJLoader and MTLLoader wrappers
 */
export function MTLOBJLoader(
  mtlUrl: string,
  objUrl: string,
  scaledRadius: number,
  cbOnReady: (obj: THREE.Object3D) => void
): void {
  //

  // THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
  // THREE.DDSLoader

  // @ts-ignore
  new THREE.MTLLoader().load(mtlUrl, materials => {
    materials.preload();
    // @ts-ignore
    const objLoader = new THREE.OBJLoader();
    console.log('Materials', materials);
    objLoader.setMaterials(materials);
    objLoader.load(
      objUrl,
      (object: THREE.Object3D) => {
        // Need to iterate through all meshes
        let biggestSphereRadius: number = Math.pow(10, -10);

        object.traverse((child: any) => {
          console.log('A child!');

          if (child instanceof THREE.Mesh) {
            child.geometry.computeBoundingSphere(); // Need to run this, else `child.geometry.boundingSphere.radius` will be undefined
            if (
              !!child.geometry &&
              !!child.geometry.boundingSphere &&
              child.geometry.boundingSphere.radius > biggestSphereRadius
            ) {
              // console.log("child.geometry.boundingSphere.radius", child.geometry.boundingSphere.radius);
              biggestSphereRadius = child.geometry.boundingSphere.radius;
            }
          }
        });
        console.log('biggestSphereRadius', biggestSphereRadius);
        const s: number = scaledRadius / biggestSphereRadius;
        object.scale.set(s, s, s);

        // object.position.copy(new THREE.Vector3(0, 0, -50));

        // These lines serve to reposition the object about its internal coord origin; source: https://stackoverflow.com/a/28860849/8620332
        const boundingBox = new THREE.Box3().setFromObject(object);
        boundingBox.getCenter(object.position);
        object.position.multiplyScalar(-1);

        // Signal object readiness
        cbOnReady(object);
      },
      // Called when loading is in progresses
      (xhr: any) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // Called when loading has errors
      (error: any) => {
        console.log('An error happened');
      }
    );
  });
}
