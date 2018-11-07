/**
 * This file defines the user controls, and their constraints
 * If you want to learn more about this, 
 * [https://github.com/bcrespy/creenv-gui]
 */

import config from './config';

/**
 * The controls object needs to follow specific rules in order to work
 * Those rules are explained here 
 * [https://github.com/bcrespy/creenv-gui#structure-of-the-controls-object]
 */
let userControls = {

  object: config,

  // the controls property is an array of items
  controls: [

    // a folder is an array whose 1st item is a string, it's name
    [
      "i am a folder",

      {
        property: "translation", // name of the property in the config object
        min: -150, max: 150, step: 20
      },

      {
        property: "backgroundColor"
      }
    ],

    // an object is considered as a controller, it doesn't need to be within a folder 
    {
      property: "drawText"
    },

    {
      property: "text"
    }
    
  ]

};


export default userControls;