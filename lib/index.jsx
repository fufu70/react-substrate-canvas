
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from './Config';
import drawCanvas from './DrawCanvas';

// A basic key to value object to help setup the config values
// from the given properties.
const propsToConfig = {
	crackCount: 'CRACK_COUNT',
	maxCracks: 'MAX_CRACKS',
	color: 'COLOR',
	initialCracks: 'INITIAL_CRACKS'
}

export default class ConfettiCanvas extends Component {

	static propTypes = {
		crackCount: PropTypes.number,
		maxCracks: PropTypes.number,
		initialCracks: PropTypes.number,
		color: PropTypes.string
	};

	handleCanvas = (el) => {

		if (el === null) {
			window.removeEventListener('resize', window.resizeSubstrate, false);
			if (this.canvasSubstrate) {
				this.canvasSubstrate.stop();
			}
			return;
		}

		this.canvasSubstrate = drawCanvas(el, this.getConfig());
	}

	getConfig = () => {
		let configCopy = Object.assign({}, Config);

		for (var property in propsToConfig) {
			if (this.props[property] !== undefined) {
				configCopy[propsToConfig[property]] = this.props[property];
			}
		}

		return configCopy;
	}

	render() {

		return (
			<canvas id="subtrate" height="1" width="1" ref={ this.handleCanvas } />
		);
	}
}