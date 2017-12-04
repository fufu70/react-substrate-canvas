
import SandPainter from './SandPainter';
import randomColor from 'randomcolor';

export default function Crack(canvas, cgrid, makeCrack, config) {

  let color = randomColor({ hue: config.COLOR });
  let sandPainter = new SandPainter(config);

  return {
    x: 0,
    y: 0,
    angle: 0,
    sandPainter: sandPainter,

    start() {
      // pick random point
      let px=0;
      let py=0;
      
      // shift until crack is found
      let found=false;
      let timeout = 0;
      while ((!found) || (timeout++ > 1000)) {
        px = parseInt(Math.random() * config.width);
        py = parseInt(Math.random() * config.height);
        if (cgrid[py * config.width + px] < 10000) {
          found=true;
        }
      }
      
      if (found) {
        // start crack
        let a = cgrid[py * config.width + px];
        if (Math.random() * 100 < 50) {
          a -= 90+parseInt(-2 + (Math.random() * 2.1));
        } else {
          a += 90+parseInt(-2 + (Math.random() * 2.1));
        }
        this.startCrack(px, py, a);
      }
    },

    startCrack(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.x += 0.61 * Math.cos(this.angle * Math.PI / 180);
      this.y += 0.61 * Math.sin(this.angle * Math.PI / 180);  
    },

    move() {
      // continue cracking
      this.x += 0.42 * Math.cos(this.angle * Math.PI / 180);
      this.y += 0.42 * Math.sin(this.angle * Math.PI / 180); 
      
      // bound check
      let z = 0.00;
      let cx = parseInt(this.x - z + (Math.random() * z));  // add fuzz
      let cy = parseInt(this.y - z + (Math.random() * z));
      
      // draw sand painter
      this.regionColor();
      
      // draw black crack
      canvas.fillStyle = '#000000FF';
      canvas.fillRect(
        this.x - z + (Math.random() * z),
        this.y - z + (Math.random() * z),
        1, 1
      );
      
      
      if ((cx >= 0) && (cx < config.width) && (cy >= 0) && (cy < config.height)) {
        // safe to check
        if ((cgrid[cy * config.width + cx] > 10000) || (Math.abs(cgrid[cy * config.width + cx] - this.angle)<5)) {
          // continue cracking
          cgrid[cy*config.width+cx]=parseInt(this.angle);
        } else if (Math.abs(cgrid[cy * config.width + cx] - this.angle) > 2) {
          // crack encountered (not self), stop cracking
          this.start();
          // makeCrack();
        }
      } else {
        // out of bounds, stop cracking
        this.start();
        makeCrack();
      }
    },

    regionColor() {
      // start checking one step away
      let rx = this.x;
      let ry = this.y;
      let openspace = true;
      
      // find extents of open space
      while (openspace) {
        // move perpendicular to crack
        rx += 0.81 * Math.sin(this.angle * Math.PI / 180);
        ry -= 0.81 * Math.cos(this.angle * Math.PI / 180);
        let cx = parseInt(rx);
        let cy = parseInt(ry);
        if ((cx >= 0) && (cx < config.width) && (cy >= 0) && (cy < config.height)) {
          // safe to check
          if (cgrid[cy * config.width + cx] > 10000) {
            // space is open
          } else {
            openspace = false;
          }
        } else {
          openspace = false;
        }
      }
      // draw sand painter
      sandPainter.draw(canvas, rx, ry, this.x, this.y);
    }
  }
}
