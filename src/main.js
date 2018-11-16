
import Creenv from "@creenv/core";


import HUD from "@creenv/hud";
import GUI from "@creenv/gui";
import Stats from "@creenv/stats";
import Capture from "@creenv/capture";

// config + user controls 
import config from "./config";
import controls from "./user-controls";

import AudioManager from "@creenv/audio/manager";

import Visualizer from "./visualizer";


const CAPTURE = false;

class MyProject extends Creenv {
  constructor () {
    super();
    this.audio = new AudioManager(AudioManager.SOURCE_TYPE.FILE, {
      filepath: "bbx.wav",
      analyser: {
        peakDetection: {
          options: {
            threshold: 1.4
          }
        }
      }
    }, CAPTURE);
  }

  init() {
    // REQUIRED - calls the parent method 
    super.init();  

    // you can specify a custom framerate (frames/sec) here 
    super.framerate(80);

    //this.stats = new Stats();
    this.guiControls = new GUI(controls, GUI.POSITION.TOP_RIGHT);
    this.hud = new HUD();
    //this.hud.add(this.stats);
    this.hud.add(this.guiControls);

    // we initialize our visualizer
    this.visualizer = new Visualizer();
    this.visualizer.init();

    return new Promise(resolve => {
      this.audio.init().then(resolve);
    });
  }

  /**
   * will be called at each frame 
   */
  render() {
    //this.stats.begin();

    let analysed = this.audio.getAnalysedAudioData(this.deltaT, this.elapsedTime);

    this.visualizer.render(this.deltaT, this.elapsedTime, analysed);

    //this.stats.end();
  }
}

let project = new MyProject();
if (!CAPTURE) project.bootstrap(); 

if (CAPTURE) {
  new Capture(project, {
    framerate: 30,
    export: {
      type: "jpeg-sequence",
      framerate: 30,
      filename: "sequence.zip"
    },
    audio: {
      manager: project.audio
    }
  });
}