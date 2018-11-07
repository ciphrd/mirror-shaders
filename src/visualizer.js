/**
 * Pay attention to how the config object is used dynamically for the render
 * This shows how easy it can be to add and use controlled parameters :)
 */

import Canvas from "@creenv/canvas";
import Vector2 from "@creenv/vector/vector2";
import Color from "@creenv/color";
import AudioData from "@creenv/audio/audio-analysed-data";

import Shader from "./shaddy";

// the values of the config object will be modifier by user controls 
import config from "./config";

import * as THREE from "three";



class Visualizer {
  init () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.setZ(5);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(this.renderer.domElement);

    let loader = new THREE.TextureLoader();
    let text = loader.load("in.jpg");

    this.material = new THREE.ShaderMaterial({
      vertexShader: Shader.vertex,
      fragmentShader: Shader.fragment,
      uniforms: {
        texture: { type: "t", value: text },
        time: { type: "f", value: 0.0 }
      }
    });

    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(), this.material);

    this.scene.add(this.plane);
  }

  /**
   * The render method uses the time variable to "create" movement.
   * 
   * @param {number} deltaT the time elapsed since last frame call
   * @param {number} time the total elapsed time since the beginning of the app
   * @param {AudioData} audio the audio analysed data, with peak informations
   */
  render (deltaT, time, audio) {
    this.renderer.render(this.scene, this.camera);

    this.material.uniforms.time.value = time;
    this.material.uniforms.time.needsUpdate = true;

    console.log(this.material);
  }
}

export default Visualizer;