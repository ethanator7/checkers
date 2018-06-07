const BoardConstructor = (values) => {
	const board = [];

	const contains = (point) => {
		for (let i = 0; i < values.length; i++) {
			if (values[i][0] === point[0] && values[i][1] === point[1]) {
				return i;
			}
		}
		return -1;
	}
	const construct = () => {
		for (let r = 0; r < 8; r++) {
			for (let c = 0; c < 8; c++) {
				let color = '#A62';
				let index = contains([r,c]);
				if (index === -1) {
					if ((r + c) % 2 === 1) {
						color = '#621';
					}
					board.push([r,c,false,color]);
				}
				else {
					board.push(values[index]);
				}
			}
		}
	}
	construct();

	return(board);
}

export default BoardConstructor;



