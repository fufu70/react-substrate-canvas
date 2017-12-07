
import Crack from './Crack';

// Local WindowAnimationTiming interface
window.cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;

/**
 * Utilizes the given canvas to draw a config.CRACK_COUNT amount of cracks with a config.PAINTER_COUNT
 * amount of SandPainters on the the canvas..
 *
 * NOTE:
 * Applies a onresize function to the window called "window.resizeSubstrate." Once finished
 * with the DrawCanvas function remove the "window.resizeSubstrate" from the resize listener.
 *
 * @param  {CanvasRenderingContext2D} canvas What to draw on.
 * @param  {object}                   config Basic configuration information to setup the happy 
 *                                           place cracks.
 */
export default function (canvas, config) {

	let cracks = [];
	let cgrid = [];
	let context = canvas.getContext('2d');

	let canvasSubstrate = {

		canvasParent: canvas.parentNode,
		canvasWidth: canvas.parentNode.offsetWidth,
		canvasHeight: canvas.parentNode.offsetHeight,
		context: context,
		interval: null,
		cracks: cracks,
		cgrid: cgrid,

		/**
		 * Resizes the canvas according to the current width and height of the usable window.
		 */
		resize() {

			this.canvasWidth = this.canvasParent.offsetWidth;
			this.canvasHeight = this.canvasParent.offsetHeight;
			canvas.width = this.canvasWidth;
			canvas.height = this.canvasHeight;
			config.width = this.canvasWidth;
			config.height = this.canvasHeight;

			config.currentCracks = 0;
		},

		/**
		 * Sets up the size of the canvas, creates the cracks and their circular positions
		 * to each other and makes sure that they have some initial crackships.
		 */
		start() {

			this.resize();

			// setup crack grid
			for (let y=0; y<config.height; y++) {
				for (let x=0; x<config.width; x++) {
					cgrid[y * config.width + x] = 10001;
				}
			}
			// make random crack seeds
			for (let k=0; k<16; k++) {
				let index = parseInt(Math.random() * config.width * config.height - 1);
				cgrid[index] = parseInt(Math.random() * 360);
			}

			function makeCrack() {
				if (cracks.length < config.CRACK_COUNT) {
					let crack = new Crack(context, cgrid, makeCrack, config);
					crack.start();
					cracks.push(crack);	
				}
			}

			for (let j=0; j < config.INITIAL_CRACKS; j++) {
				makeCrack();
			}

			this.stop();
			this.update();
		},

		/**
		 * Updates the position of the current cracks and draws their new position and
		 * newly desired happy place.
		 */
		update() {

			this.cracks.map((crack) => {
				crack.move();
			});

			this.interval = window.requestAnimationFrame(() => canvasSubstrate.update());
		},

		stop() {

			window.cancelAnimationFrame(this.interval);
		}
	};

	canvasSubstrate.start();
	window.resizeSubstrate = () => canvasSubstrate.resize();
	window.addEventListener('resize', window.resizeSubstrate);
}
