import { Component } from 'preact';
import { route } from 'preact-router';

const GRID_SIZE = 15;

function initBoard(size) {
	let board = [];
	for (let i = 0; i < size; i++) {
		let _row = [];
		for (let j = 0; j < size; j++) {
			_row.push('');
		}
		board.push(_row);
	}
	return board;
}

function checkBoard(board, point) {
	let count = 1, i = point.i, j = point.j;
	for (j++; j < GRID_SIZE; j++) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}

	j = point.j;
	for (j--; j >= 0; j--) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	if (count < 5) {
		count = 1;
	}

	//Vertical
	i = point.i;
	j = point.j;
	for (i++; i < GRID_SIZE; i++) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	i = point.i;
	for (i--; i >= 0; i--) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	if (count < 5) {
		count = 1;
	}

	//Oblique up
	i = point.i + 1;
	j = point.j + 1;
	for (; i < GRID_SIZE && j < GRID_SIZE; i++ , j++) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	i = point.i - 1;
	j = point.j - 1;
	for (; i >= 0 && j >= 0; i-- , j--) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	if (count < 5) {
		count = 1;
	}

	//Oblique down
	i = point.i + 1;
	j = point.j - 1;
	for (; i < GRID_SIZE && j >= 0; i++ , j--) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	i = point.i - 1;
	j = point.j + 1;
	for (; i >= 0 && j < GRID_SIZE; i-- , j++) {
		if (board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}

	return count >= 5;
}

class Chess extends Component {
	onHandleClick = e => {
		if (e.target.innerHTML === '&nbsp;') {
			let isPlayer1 = this.props.currentPlayer === 'Player1';
			if (this.props.settings.mode === 'mvm') {
				let symbol = isPlayer1 ? this.props.settings.player1 : this.props.settings.player2;
				this.props.board[this.props.rowIndex][this.props.cellIndex] = symbol;
				this.setState({
					content: symbol
				});
				this.props.switchPlayer(isPlayer1 ? 'Player2' : 'Player1', this.props.rowIndex, this.props.cellIndex);
			}

			// else {
			// if (isPlayer1) {
			//     let symbol = this.props.settings.player1;
			//     this.props.board[this.props.rowIndex][this.props.cellIndex] = symbol;
			//     this.setState({
			//         content: symbol
			//     });
			// }
			// this.props.switchPlayer(isPlayer1 ? 'Computer' : 'Player1');
			// }
		}
	}

	render({ }, { content }) {
		const cellStyle = { width: 20, height: 20 };
		return (
			<div class="cell" style={cellStyle} onClick={this.onHandleClick}>{content || '\u00A0'}</div>
		);
	}
}

export default class GameScreen extends Component {
	switchPlayer = (_next, rowIdx, colIdx) => {
		//检查棋盘
		let result = checkBoard(this.board, { i: rowIdx, j: colIdx });
		if (result) {
			//如果发现有一方赢，跳转到首页
			alert(`${this.state.nextPlayer} ${this.board[rowIdx][colIdx]} win!`);
			route('/', true);
		}
		else {
			this.setState({ nextPlayer: _next });
			if (_next === 'Computer') {
				//利用AI来下棋
			}
		}
	}

	constructor() {
		super();
		this.board = initBoard(GRID_SIZE);
		this.state.nextPlayer = 'Player1';
	}

	render({ settings }, { nextPlayer }) {
		let _board = this.board;
		return (
			<div id="gameView">
				<h3>Turn: [{nextPlayer}]</h3>
				<div id="board">
					{_board.map((row, i) => (
						<div>
							{row.map((cell, j) => (
								<Chess settings={settings} board={_board} switchPlayer={this.switchPlayer} currentPlayer={nextPlayer}
									rowIndex={i} cellIndex={j}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		);
	}
}