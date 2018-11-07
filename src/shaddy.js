/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * Simple shader to apply 2d transformations to the screen, such as mirrors, translations
 */

export default {
  vertex: `
    varying vec2 vUv;

    void main() {
      vUv = position.xy;
      gl_Position = vec4(position.x, position.y, 0.0, 0.5);
    }
  `,

  /*
  fragment: `
    uniform sampler2D texture;
    uniform float time;
    
    varying vec2 vUv;

    void main() {
      vec2 texCoor = vUv;
      
      
      if (vUv.x > 0.0) {
        texCoor.x = -texCoor.x;
      }

      if (vUv.y > 0.0) {
        texCoor.y = -texCoor.y;
      }
      
      if (vUv.x >= vUv.y) {
        texCoor*=-1.0;
      }

      if (vUv.y >= -vUv.x) {
        texCoor*=-1.0;
      }

      if (vUv.y >= 0.5*vUv.x) {
        texCoor*=-1.0;
      }

      if (vUv.y >= -0.5*vUv.x) {
        texCoor*= -1.0;
      }

      if (vUv.y >= 2.0*vUv.x) {
        texCoor*= -1.0;
      }

      if (vUv.y >= -2.0*vUv.x) {
        texCoor*= -1.0;
      }

      // for texture coordinates match
      texCoor = texCoor+0.5;

      float scale = (cos(time/10000.0)+1.)/2.;

      vec4 color = texture2D(texture, texCoor*scale);
      
      gl_FragColor = vec4(color.r, color.r, 0.0, 1.0);
    }
  `*/

  fragment: `
    const float PI = 3.141592658;
    const float TAU = 2.0*PI;
    const float sections = 10.0;

    uniform sampler2D texture;
    uniform float time;

    varying vec2 vUv;

    vec3 HUEtoRGB (float H) {
      float R = abs(H * 6.0 - 3.0) - 1.;
      float G = 2. - abs(H * 6. - 2.);
      float B = 2. - abs(H * 6. - 4.);
      return vec3(R,G,B);
    }

    vec3 HSVtoRGB (vec3 HSV) {
      vec3 RGB = HUEtoRGB(HSV.x);
      return ((RGB - 1.0) * HSV.y + 1.0) * HSV.z;
    }

    void main() {
      float scale = ((cos(time/15000.0)+1.0)/4.0+0.5)*1.2;
      vec2 pos = vUv*scale;

      float rad = length(pos);
      float angle = atan(pos.y, pos.x);

      float ma = mod(angle, TAU/sections);
      ma = abs(ma - PI/sections);

      vec2 p = vec2(cos(ma), sin(ma))*rad +0.5;

      vec4 color = texture2D(texture, mod(p+sin(time/10000.0), 1.0));

      // color effects 
      float hue = mod(length(vUv)*4.0, 1.0);
      //float rgb = HSVtoRGB(vec3(hue, 1.0, 1.0));

      float grey = 1.0; // (color.r+color.g+color.b)/3.0;

      gl_FragColor = vec4(grey*color.r, grey*color.g, grey*color.b, 1.0);
    }
  `
}