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
import clamp from "clamp";
import { EffectComposer, RenderPass, BloomEffect, EffectPass, RealisticBokehEffect,
  BrightnessContrastEffect, BlendFunction, PixelationEffect, NoiseEffect } from "postprocessing";



class Visualizer {
  init () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.setZ(5);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(this.renderer.domElement);

    let loader = new THREE.TextureLoader();
    let text = loader.load("in-res.jpg");

    this.material = new THREE.ShaderMaterial({
      vertexShader: Shader.vertex,
      fragmentShader: Shader.fragment,
      uniforms: {
        texture: { type: "t", value: text },
        time: { type: "f", value: 0.0 },
        iResolution: { type: "f", value: window.innerWidth/window.innerHeight },
        colorStrength: { type: "f", value: 0.0 },
        backgroundColor: { type: "vec3", value: config.backgroundColor.convert(THREE.Vector3, x => x/255) },
        seed: { type: "f", value: Math.random()*1000.0 },
        color1: { type: "vec3", value: new THREE.Vector3(0.0, 1.0, 0.0) },
        color2: { type: "vec3", value: new THREE.Vector3(1.0, 0.0, 1.0) },
      }
    });

    this.plane = new THREE.Mesh(new THREE.PlaneGeometry(), this.material);
    this.scene.add(this.plane);

    this.timeSpeed = 0;

    /** EFFECT COMPOSER */
    this.composer = new EffectComposer(this.renderer, { depthTexture: true });

    this.bloomEffect = new BloomEffect();
    this.brightnessEffect = new BrightnessContrastEffect({
      blendFunction: BlendFunction.SCREEN
    });

    this.effectPass = new EffectPass(this.camera, this.bloomEffect, this.brightnessEffect);
    //this.effectPass2 = new EffectPass(this.camera, this.pixelEffect);

    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.effectPass);

    this.effectPass.renderToScreen = true;
  }

  /**
   *  
   * @param {number} time 
   * @param {AudioData} audio 
   */
  updatePasses (time, audio) {
    this.bloomEffect.distinction = 0.05-audio.peak.value*0.1;
    this.bloomEffect.kernelSize = 3;

    this.brightnessEffect.uniforms.get("contrast").value = 0.8 - audio.energyAverage/20.0;
  }

  /**
   *  
   * @param {number} time 
   * @param {AudioData} audioData 
   */
  updateUniforms (deltaT, time, audioData) {
    this.timeSpeed+= 10+audioData.energy/2.0*20.0;

    this.material.uniforms.time.value = this.timeSpeed;
    this.material.uniforms.time.needsUpdate = true;

    this.material.uniforms.colorStrength.value = clamp((15+audioData.energyAverage)/20.0, 0, 1.0);
    this.material.uniforms.colorStrength.needsUpdate = true;

    this.material.uniforms.backgroundColor.value = config.backgroundColor.convert(THREE.Vector3, x => x/255);
  }

  /**
   * The render method uses the time variable to "create" movement.
   * 
   * @param {number} deltaT the time elapsed since last frame call
   * @param {number} time the total elapsed time since the beginning of the app
   * @param {AudioData} audio the audio analysed data, with peak informations
   */
  render (deltaT, time, audio) {
    this.updatePasses(time, audio);
    this.updateUniforms(deltaT, time, audio);

    //this.renderer.render(this.scene, this.camera);
    this.composer.render(deltaT);
  }
}

export default Visualizer;