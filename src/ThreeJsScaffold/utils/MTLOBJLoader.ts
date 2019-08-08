import * as THREE from 'three';
import { MTLLoader } from './MTLLoader';
import { OBJLoader } from './OBJLoader';

MTLLoader(THREE);
OBJLoader(THREE);

/**
 * Wrapper around my OBJLoader and MTLLoader wrappers
 */
export function MTLOBJLoader(
  mtlUrl: string,
  objUrl: string,
  scaledRadius: number,
  objectHandle: THREE.Object3D | undefined,
  // group: THREE.Group | undefined
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
      (object: any) => {
        // Need to iterate through all meshes
        let biggestSphereRadius: number = Math.pow(10, -10);

        object.traverse(function(child: any) {
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

        // const boundingSphere = new THREE.BoundingBoxHelper(object);
        // const x = boundingSphere.geometry.boundingSphere.radius;

        // const x = boundingBox.max;

        console.log('x vs radius', boundingBox.max.x, boundingBox.min.x, biggestSphereRadius);

        // scene.add(object);
        console.log('THREE.OBJLoader Object: ', object);
        console.log('THREE.OBJLoader Object: ', object);
        // group.add(object);
        objectHandle = object;
        cbOnReady(object);
        // if (!!group) group.add(objectHandle!);
      },
      // called when loading is in progresses
      (xhr: any) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // called when loading has errors
      (error: any) => {
        console.log('An error happened');
      }
    );
  });
}
