/**
 * This is the demonstration project, it is installed when running the command 
 * create-creenv --mode demo
 * 
 * Hello. Welcome to the creative environment This project showcases the functionnalities of creenv and can be used as a good
 * starting point for learning creenv. However, it is still recommended that you take at look at the Learning Table, a central
 * document where all the basic informations and links to more detailed ones about creenv can be found. 
 * 
 * <insert_link_to_learning_table_here>
 * 
 * By reading the code and the readme.md, you should be able to understand how creenv works and how you can work with creenv 
 * to ease the development process and focus only on your creative ideas :)
 */

// the core of creenv
import Creenv from "@creenv/core";

// ui elements
import HUD from "@creenv/hud";
import GUI from "@creenv/gui";
import Stats from "@creenv/stats";

// config + user controls 
import config from "./config";
import controls from "./user-controls";

import AudioManager from "@creenv/audio/manager";

/**
 * For the sake of the example, the rendering logic will take part in the render file
 * You should aways split a bit your code, it will make the process of identifying mistakes and improving your app easier :)
 */
import Renderer from "./renderer";


/**
 * Your main class, then entry point of your application, must inherit the Core of creenv. It will ease the setting up process
 * and also allows the other modules to interract with creenv and your render to enable special features such as exporting 
 * your creations with @creenv/capture 
 */
class MyProject extends Creenv {
  /**
   * The init method will automatically be called by the bootstrap method (see at the end of this file). This is where you can 
   * fetch files, load heavy data... etc. You can either split your application into multiple files or do all your stuff in
   * here. For the sake of the example, set up is performed here whereas the render process takes place in an other file.
   */
  init() {
    // REQUIRED - calls the parent method 
    super.init();  

    // you can specify a custom framerate (frames/sec) here 
    super.framerate(60);

    /**
     * setting up the interface. you can get more informations on how the HUD works within the Learning table, link at the top
     * of the document.
     */
    this.stats = new Stats();
    this.guiControls = new GUI(controls, GUI.POSITION.TOP_RIGHT);
    this.hud = new HUD();
    this.hud.add(this.stats);
    this.hud.add(this.guiControls);

    // we initialize our renderer
    this.renderer = new Renderer();
    this.renderer.init();

    this.audio = new AudioManager(AudioManager.SOURCE_TYPE.FILE, {
      filepath: "owl-vision_warhogz.mp3"
    });

    return new Promise(resolve => {
      this.audio.init().then(resolve);
    });
  }

  /**
   * will be called at each frame 
   */
  render() {
    this.stats.begin();

    let analysed = this.audio.getAnalysedAudioData(this.deltaT, this.elapsedTime);

    this.renderer.render(this.deltaT, this.elapsedTime);

    this.stats.end();
  }
}

let project = new MyProject();
project.bootstrap(); 
