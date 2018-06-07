import React, { Component } from 'react';
import RenderBoard from './RenderBoard';
import './App.css';
import 'tachyons';

class App extends Component {
	constructor() {
		super();
		let previous;
		let turn;

		this.state = {
			values: this.initVals(),
			done: false,
			winner: undefined
		}
	}

	initVals = () => {
		this.turn = 0;
		let vals = [];
		for (let r = 0; r < 8; r++) {
			for (let c = 0; c < 8; c++) {
				if ((r + c) % 2 === 1) {
					if (r < 3) {
						vals.push([r,c,true,false,false]); // [row, column, isCircle, isRed, isKing]
					}
					else if (r > 4) {
						vals.push([r,c,true,true,false]);
					}
				}
			}
		}
		return vals;
	}

	clicked = (event) => {
		let current = event.target;
		if (this.previous !== undefined) {
			if (this.previous.getAttribute('type') === 'c' && current.getAttribute('type') === 'r') {
				if ((this.turn % 2 === 0 && this.previous.getAttribute('fill') === 'red') || (this.turn % 2 === 1 && this.previous.getAttribute('fill') === 'black')) {
					if (this.check(this.previous, current)) {
						this.change(this.previous, current);
						this.turn++;
					}
				}
				else {
					if (this.checkCapture(this.previous, current)) {
						this.change(this.previous, current);
					}
				}
			}
		}
		this.previous = event.target;
	}

	contains = (point) => {
		for (let i = 0; i < this.state.values.length; i++) {
			if (this.state.values[i][0] === point[0] && this.state.values[i][1] === point[1]) {
				return i;
			}
		}
		return -1;
	}

	check = (before, now) => {
		let beforeVals = [parseInt(before.getAttribute('row')), parseInt(before.getAttribute('col'))];
		let nowVals = [parseInt(now.getAttribute('row')), parseInt(now.getAttribute('col'))];
		let index = this.contains(beforeVals);

		if (this.state.values[index][4]) {
			return this.checkCaptureUp(before, now) || this.checkCaptureDown(before, now) || this.checkUp(before, now) || this.checkDown(before, now);
		}
		else if (this.state.values[index][3]) {
			return this.checkCaptureUp(before, now) || this.checkUp(before, now);
		}
		else {
			return this.checkCaptureDown(before, now) || this.checkDown(before, now);
		}
	}

	checkCapture = (before, now) => {
		let beforeVals = [parseInt(before.getAttribute('row')), parseInt(before.getAttribute('col'))];
		let nowVals = [parseInt(now.getAttribute('row')), parseInt(now.getAttribute('col'))];
		let index = this.contains(beforeVals);

		if (this.state.values[index][4]) {
			return this.checkCaptureUp(before, now) || this.checkCaptureDown(before, now)
		}
		else if (this.state.values[index][3]) {
			return this.checkCaptureUp(before, now)
		}
		else {
			return this.checkCaptureDown(before, now)
		}
	}

	checkCaptureUp = (before, now) => {
		let beforeVals = [parseInt(before.getAttribute('row')), parseInt(before.getAttribute('col'))];
		let nowVals = [parseInt(now.getAttribute('row')), parseInt(now.getAttribute('col'))];

		if (nowVals[0] === beforeVals[0] - 2) {
			if (nowVals[1] === beforeVals[1] - 2) {
				let c = this.contains([beforeVals[0]-1,beforeVals[1]-1]);
				if (c !== -1) {
					let same = false;
					if ((this.state.values[c][3] && before.getAttribute('fill') === 'red') || (!this.state.values[c][3] && before.getAttribute('fill') === 'black')) {
						same = true;
					}
					if (!same) {
						this.state.values.splice(c,1);
						return true;
					}
				}
			}
			if (nowVals[1] === beforeVals[1] + 2) {
				let c = this.contains([beforeVals[0]-1,beforeVals[1]+1]);
				if (c !== -1) {
					let same = false;
					if ((this.state.values[c][3] && before.getAttribute('fill') === 'red') || (!this.state.values[c][3] && before.getAttribute('fill') === 'black')) {
						same = true;
					}
					if (!same) {
						this.state.values.splice(c,1);
						return true;
					}
				}
			}
		}
		return false;
	}

	checkCaptureDown = (before, now) => {
		let beforeVals = [parseInt(before.getAttribute('row')), parseInt(before.getAttribute('col'))];
		let nowVals = [parseInt(now.getAttribute('row')), parseInt(now.getAttribute('col'))];

		if (nowVals[0] === beforeVals[0] + 2) {
			if (nowVals[1] === beforeVals[1] - 2) {
				let c = this.contains([beforeVals[0]+1,beforeVals[1]-1])
				if (c !== -1) {
					let same = false;
					if ((this.state.values[c][3] && before.getAttribute('fill') === 'red') || (!this.state.values[c][3] && before.getAttribute('fill') === 'black')) {
						same = true;
					}
					if (!same) {
						this.state.values.splice(c,1);
						return true;
					}
				} 
			}
			if (nowVals[1] === beforeVals[1] + 2) {
				let c = this.contains([beforeVals[0]+1,beforeVals[1]+1])
				if (c !== -1) {
					let same = false;
					if ((this.state.values[c][3] && before.getAttribute('fill') === 'red') || (!this.state.values[c][3] && before.getAttribute('fill') === 'black')) {
						same = true;
					}
					if (!same) {
						this.state.values.splice(c,1);
						return true;
					}
				}
			}
		}
		return false;
	}

	checkUp = (before, now) => {
		let beforeVals = [parseInt(before.getAttribute('row')), parseInt(before.getAttribute('col'))];
		let nowVals = [parseInt(now.getAttribute('row')), parseInt(now.getAttribute('col'))];

		if (nowVals[0] !== beforeVals[0] - 1) {
			return false;
		}
		if (nowVals[1] === beforeVals[1] - 1 || nowVals[1] === beforeVals[1] + 1) {
			return true;
		}
		return false;
	}

	checkDown = (before, now) => {
		let beforeVals = [parseInt(before.getAttribute('row')), parseInt(before.getAttribute('col'))];
		let nowVals = [parseInt(now.getAttribute('row')), parseInt(now.getAttribute('col'))];

		if (nowVals[0] !== beforeVals[0] + 1) {
			return false;
		}
		if (nowVals[1] === beforeVals[1] - 1 || nowVals[1] === beforeVals[1] + 1) {
			return true;
		}
		return false;
	}

	change = (before, now) => {
		let circ = this.state.values;
		let beforeVals = [parseInt(before.getAttribute('row')), parseInt(before.getAttribute('col'))];
		let nowVals = [parseInt(now.getAttribute('row')), parseInt(now.getAttribute('col'))];
		let i = this.contains(beforeVals);

		if (i !== -1) {
			let rob = false;
			if (before.getAttribute('fill') === 'red') {
					rob = true;
			}
			let king = false;
			if (before.getAttribute('stroke') === '#FC4' || (!rob && nowVals[0] === 7) || (rob && nowVals[0] === 0)) {
				king = true;
			}
			circ[i] = [nowVals[0],nowVals[1],true,rob,king];
		}
		this.setState({ values: circ });
	}

	checkWin = () => {
		let reds = false;
		let blacks = false;
		for (var i = 0; i < this.state.values.length; i++) {
			if (this.state.values[i][3]) {
				reds = true;
			}
			if (!this.state.values[i][3]) {
				blacks = true;
			}
		}
		if (!reds || !blacks) {
			if (reds) {
				this.setState({ winner: 'RED WINS' });
			}
			else {
				this.setState({ winner: 'BLACK WINS' });
			}
		}
	}

	render() {
		return (
			<div>
				<h1 className="tc avenir title" >
		      		<span className="r">C</span>
		      		<span className="b">H</span>
		      		<span className="r">E</span>
		      		<span className="b">C</span>
		      		<span className="r">K</span>
		      		<span className="b">E</span>
		      		<span className="r">R</span>
		      		<span className="b">S</span>
		      	</h1>
		      	<RenderBoard values={this.state.values} click={this.clicked} />
			</div>
		);
	}

}

export default App;