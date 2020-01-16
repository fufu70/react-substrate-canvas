
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
        completed: false,

        /**
         * Starts to find a starting point for the crack to be built on.
         */
        start() {

            this.completed = true;

            if (config.currentCracks <= config.MAX_CRACKS)
                config.currentCracks ++;
            else if (this.completed && config.currentCracks > config.MAX_CRACKS)
                return;

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

        /**
         * Sets up the x y and angle of the crack to give it position and direction.
         * 
         * @param   {number} x       The x position on the canvas
         * @param   {number} y       The y position on the canvas
         * @param   {number} angle The angle at which the crack will be drawn
         */
        startCrack(x, y, angle) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.x += 0.61 * Math.cos(this.angle * Math.PI / 180);
            this.y += 0.61 * Math.sin(this.angle * Math.PI / 180);    
            this.completed = false;
        },

        /**
         * Moves the crack to its new position based off of its current angle. It then draws
         * the crack and checks to see if it can continue to move. If it can't it tries to start
         * over again and create a new crack.
         */
        move() {

            if (config.currentCracks > config.MAX_CRACKS && this.completed)
                return;

            // continue cracking
            this.x += 0.42 * Math.cos(this.angle * Math.PI / 180);
            this.y += 0.42 * Math.sin(this.angle * Math.PI / 180); 
            
            // bound check
            let z = 0.00;
            let cx = parseInt(this.x - z + (Math.random() * z));    // add fuzz
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
                    makeCrack();
                }
            } else {
                // out of bounds, stop cracking
                this.start();
                makeCrack();
            }
        },

        /**
         * Attempts to fill in the region of open space of the crack relative
         * to its position on the canvas and all of the other cracks.
         */
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
            sandPainter.draw(canvas, this.x, this.y, rx, ry);
        }
    }
}
