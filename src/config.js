/**
 * This config object will have its properties controlled by the user
 * interface 
 */
import Color from '@creenv/color';

let config = {
  
  // the x translation of the cube 
  translation: 15,

  // the background color 
  backgroundColor: new Color(122, 251, 199),

  // weither or not we draw the text 
  drawText: true,

  // the text to be draw
  text: "creative environment"
};


/**
 * this allows the config object to be imported by:
 * import config from "./config.js
 */
export default config;