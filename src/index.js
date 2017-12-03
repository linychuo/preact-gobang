import './style';
import { Component } from 'preact';
import { Router } from 'preact-router';
import { WelcomeScreen, SecondScreen } from './wizard';
import GameScreen from './board';

export default class App extends Component {
	setSymbolOfPlayer = (symbol) => {
		this.props.player1 = symbol;
		this.props.player2 = symbol === 'X' ? 'O' : 'X';
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
