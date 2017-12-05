import './style';
import { Component } from 'preact';
import { Router } from 'preact-router';
import { WelcomeScreen, SecondScreen } from './wizard';
import GameScreen from './board';
import * as Constants from './constants';

export default class App extends Component {
	setSymbolOfPlayer = (symbol) => {
		this.props.players = {};
		if (this.props.mode === Constants.MODE_MVC) {
			this.props.players[Constants.PLAYER1] = symbol;
			this.props.players[Constants.COMPUTER] = symbol === Constants.X ? Constants.O : Constants.X;
		}

		if (this.props.mode === Constants.MODE_MVM) {
			this.props.players[Constants.PLAYER1] = symbol;
			this.props.players[Constants.PLAYER2] = symbol === Constants.X ? Constants.O : Constants.X;
		}
	}

	setGameMode = mode => {
		this.props.mode = mode;
	}

	render() {
		return (
			<div id="root">
				<Router>
					<WelcomeScreen path="/" setGameMode={this.setGameMode} />
					<SecondScreen path="/select" setSymbolOfPlayer={this.setSymbolOfPlayer} settings={this.props} />
					<GameScreen path="/game" settings={this.props} />
				</Router>
			</div>
		);
	}
}
