import { DemoSceneManager } from './threeJsDemo/DemoSceneManager';
import './global.scss';

initThreeJs();
if (process.env.NODE_ENV === 'development') displayFpsStats();

/**
 * Create threeJs canvas and inject into container
 */
function initThreeJs() {
  const containerId = 'canvas-container';
  const canvasContainer = document.getElementById('canvas-container');
  if (!!canvasContainer) {
    const demo = new DemoSceneManager(canvasContainer);
  } else {
    throw new Error('No container with id ' + containerId + ' found!!!');
  }
}

/**
 * Loads and runs stats.min.js to display FPS, etc.
 */
function displayFpsStats() {
  const script = document.createElement('script');
  script.onload = () => {
    // @ts-ignore
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    requestAnimationFrame(function loop() {
      stats.update();
      requestAnimationFrame(loop);
    });
  };
  script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
  document.head.appendChild(script);
}
