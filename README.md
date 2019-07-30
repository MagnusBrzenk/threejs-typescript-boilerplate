# Threejs Typescript Boilerplate

## Operating Instructions

### Quick Start

To run the app locally in development mode (with hot reloading), run:

```
git clone https://github.com/MagnusBrzenk/threejs-typescript-boilerplate.git
cd threejs-typescript-boilerplate
npm i
./_build_js_bundle --dev
```

... and checkout at `localhost:3000`.

### Production Build

Run `./_build_js_bundle` to generate a `dist` directory. You can then serve up the minified bundle locally using `node_modules/.bin/http-server` and then going to `localhost:3000/dist/`.

### Deploy to Github Pages

Set your git remote repo to point to one at your own github account, set the credential variables in `_deploy_github_pages`, and run this script.

## Goal / Philosophy

### Overview

The threeJs code has been structured using typescript classes to organize all the interacting parts.

The goal of this repo is to make it easy to spin out threeJs webpages. I've tried to separate the ThreeJs boilerplate that all threeJs apps have in common from the details of the scene to be built. This boilerplate is found within `src/threeJsScaffold` and, in theory, doesn't need to be altered when you want to build a customized scene.

To build a customized scene, you implement a class that extends the `SceneManagerBase`, which already has the scene, renderer, camera, orbit controls, etc. initialized. When you create your own scene, you therefore only need to think about the `scene entities` (see below) that are to be added to the scene, and any logic for moving the camera around during the animation. See `src/threeJsDemo/DemoSceneManager.ts` for a simple demo.

A `scene entity` is a class that manages the state and evolution of any threeJs lights, meshes, groups, etc. that you might wish to add to the scene.

### Code Details

#### Typescript

You're crazy not to code ThreeJs using typescript. It is awesome!

#### Webpack

Webpack is used to transpile typescript files into a minified bundle. It also has tons of configurations for local development, compiling scss, etc.

A lot of thought has gone into making sure that we can develop with typescript types for threeJs and its extras (like orbit controls) _without_ including the main threeJs code as part of the bundle. Instead, threeJs gets included at runtime as a UMD from a CDN (see script tag in `src/index.html`) thanks to the `externals` property in the `webpack.config.ts` file.

#### ThreeJs 'Extras'

It was tricky to enable one to include what are being called here `threeJs extras`, such as orbit controls. (NOTE: in the official jargon, I think these are called `Importable Examples`, though this nomenclature sounds odd to me.) The normal/recommended way of importing something like orbit controls from the npm package is by:

```ts
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
```

Unfortunately, this will cause the main threeJs code base to get included in your bundle since `OrbitControls.js` imports content from a local js build of threeJs, and the `externals` property of `webpack.config.ts` does not affect this. This and other subtleties lead me to the conclusion that the cleanest way to enable importing `extras` from the official npm package for threeJs was to add a script `_extract_three_extras` that copied all files from `node_modules/three/examples/jsm/*` into this code base and replace all their import paths so as to import types/code from typescript/CDN respectively.

Don't worry if that paragraph didn't make much sense; all that matters is that IF you want to update your threeJs package version, then you'll want to run this script again.

## Development Issues

- Webpack-dev-server live reloading is super temperamental. If it isn't working then just switch the option `poll: true` in `webpack.config.ts`.

## TODOs

- There are loads of unused dependencies that need to be slashed. Unfortunately, [depcheck](https://github.com/depcheck/depcheck/issues/400) isn't yet capable of sifting through webpack loaders. So keep an eye out for when it is improved.
