import { Component } from 'preact';
import * as Constants from './constants';

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
	for (j++; j < Constants.GRID_SIZE; j++) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}

	j = point.j;
	for (j--; j >= 0; j--) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
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
	for (i++; i < Constants.GRID_SIZE; i++) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	i = point.i;
	for (i--; i >= 0; i--) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
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
	for (; i < Constants.GRID_SIZE && j < Constants.GRID_SIZE; i++ , j++) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	i = point.i - 1;
	j = point.j - 1;
	for (; i >= 0 && j >= 0; i-- , j--) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
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
	for (; i < Constants.GRID_SIZE && j >= 0; i++ , j--) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}
	i = point.i - 1;
	j = point.j + 1;
	for (; i >= 0 && j < Constants.GRID_SIZE; i-- , j++) {
		if (board[i][j] && board[i][j] === board[point.i][point.j]) {
			count++;
		}
		else {
			break;
		}
	}

	return count >= 5;
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function randomPosition(board) {
	let x, y, v;
	do {
		x = getRandomIntInclusive(0, Constants.GRID_SIZE - 1), y = getRandomIntInclusive(0, Constants.GRID_SIZE - 1);
		v = board[x][y];
	} while (v);
	return [x, y];
}

class Chess extends Component {
	onHandleClick = e => {
		if (this.props.currentPlayer === Constants.PLAYER1 || this.props.currentPlayer === Constants.PLAYER2) {
			if (e.target.innerHTML === '&nbsp;') {
				let symbol = this.props.settings.players[this.props.currentPlayer];
				this.props.board[this.props.rowIndex][this.props.cellIndex] = symbol;
				this.props.switchPlayer(this.props.rowIndex, this.props.cellIndex);
			}
		}
		return false;
	}

	render({ content }, { }) {
		const cellStyle = { width: 20, height: 20 };
		return (
			<div class="cell" style={cellStyle} onClick={this.onHandleClick}>{content || '\u00A0'}</div>
		);
	}
}

export default class GameScreen extends Component {
	switchPlayer = (rowIdx, colIdx) => {
		let settings = this.props.settings;
		//检查棋盘
		let result = checkBoard(this.state.board, { i: rowIdx, j: colIdx });
		if (result) {
			//如果发现有一方赢，清空棋盘数据
			alert(`${this.state.nextPlayer} ${this.state.board[rowIdx][colIdx]} win!`);
			this.setState({
				board: initBoard(Constants.GRID_SIZE),
				nextPlayer: Constants.PLAYER1
			});
		}
		else {
			let mode = settings.mode;
			let _next = '';
			if (mode === Constants.MODE_MVM) {
				if (this.state.nextPlayer === Constants.PLAYER1) {
					_next = Constants.PLAYER2;
				}
				else {
					_next = Constants.PLAYER1;
				}
			}
			else if (mode === Constants.MODE_MVC) {
				if (this.state.nextPlayer === Constants.PLAYER1) {
					_next = Constants.COMPUTER;
					//模拟AI来下棋
					setTimeout(() => {
						let [x, y] = randomPosition(this.state.board);
						this.state.board[x][y] = settings.players[_next];
						this.switchPlayer(x, y);
					}, 2000);
				}
				else {
					_next = Constants.PLAYER1;
				}
			}
			this.setState({ nextPlayer: _next });
		}
	}

	constructor() {
		super();
		this.state.board = initBoard(Constants.GRID_SIZE);
		this.state.nextPlayer = Constants.PLAYER1;
	}

	render({ settings }, { nextPlayer, board }) {
		return (
			<div id="gameView">
				<h3>Turn: [{nextPlayer}]</h3>
				<div id="board">
					{board.map((row, i) => (
						<div>
							{row.map((cell, j) => (
								<Chess settings={settings} board={board} switchPlayer={this.switchPlayer}
									rowIndex={i} cellIndex={j} content={cell} currentPlayer={nextPlayer}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		);
	}
}