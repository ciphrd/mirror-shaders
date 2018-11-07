/**
 * Pay attention to how the config object is used dynamically for the render
 * This shows how easy it can be to add and use controlled parameters :)
 */

import Canvas from "@creenv/canvas";
import Vector2 from "@creenv/vector/vector2";
import Color from "@creenv/color";

// the values of the config object will be modifier by user controls 
import config from "./config";


const BOUNCING_HEIGHT = 150,
      CUBE_SIZE = new Vector2(250, 250);

class Renderer {
  init () {
    this.canvas = new Canvas();
    this.cubeColor = new Color(255,0,255);
  }

  /**
   * The render method uses the time variable to "create" movement.
   * 
   * @param {number} deltaT the time elapsed since last frame call
   * @param {number} time the total elapsed time since the beginning of the app
   */
  render (deltaT, time) {
    this.canvas.fillStyle(this.cubeColor.string);

    /**
     * The background color comes from the config object. However, in the user-controls.js file, you will find that the property
     * backgroundColor from the config object can be controlled. If you try to update the color with the color picker while the 
     * application is running, it will update the property and therefore its value will be different on each frame render.
     */
    this.canvas.background(config.backgroundColor.string);

    let translationY = Math.abs(Math.cos(time/1000)) * BOUNCING_HEIGHT;
    this.canvas.rect(this.canvas.width/2-CUBE_SIZE.x/2 + config.translation, this.canvas.height/2-CUBE_SIZE.y/2-translationY, CUBE_SIZE.x, CUBE_SIZE.y);

    // if the checkbox controlling the drawText property is checked, we draw the text
    if (config.drawText) {
      this.canvas.context.font = "27px Arial";
      this.canvas.context.fillText(config.text, this.canvas.width/2-CUBE_SIZE.x/2 + config.translation, this.canvas.height/2-CUBE_SIZE.y/2-translationY)
    }
  }
}

export default Renderer;