import React from 'react';
import { Rectangle, Circle } from 'react-shapes';
import BoardConstructor from './BoardConstructor';
import './Render.css';

const RenderBoard = ({ values, click }) => {
	let boardVals = BoardConstructor(values);
	let board = [];
	const size = 50;

	for (let r = 0; r < 8; r++) {
		let row = [];
		for (var c = 0; c < 8; c++) {
			let index = (r * 8) + c;

			if (boardVals[index][2]) {
				let rob = 'black';
				if (boardVals[index][3]) {
					rob = 'red';
				}
				let strc = rob;
				if (boardVals[index][4]) {
					strc = '#FC4';
				}
				row.push(
					<Circle 
					type='c'
					r={size/2}
					fill={{color: rob}} 
					strokeWidth={10}
					stroke={{color: strc}}
					row={r}
					col={c}
					onClick={click}
					/>
				);
			}
			else {
				let color = boardVals[index][3];
				row.push(
					<Rectangle
					type='r'
					width={size} 
					height={size} 
					fill={{color: color}} 
					stroke={{color: color}}
					strokeWidth={10} 
					row={r}
					col={c}
					onClick={click}
					/>
				);
			}
		}
		board.push(<div>{ row }</div>);
	}

	return(board);
}

export default RenderBoard;