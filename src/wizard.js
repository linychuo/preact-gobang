import { Component } from 'preact';
import * as Constants from './constants';

class WelcomeScreen extends Component {
	onSelectMode = e => {
		let mode = e.target.text === 'Man VS Computer' ? Constants.MODE_MVC : Constants.MODE_MVM;
		this.props.setGameMode(mode);
	}

	render() {
		return (
			<div id="view1">
				<h3>Which do you prefer?</h3>
				<a href="/select" class="btn" onClick={this.onSelectMode}>Man VS Computer</a>
				&nbsp;&nbsp;
				<a href="/select" class="btn" onClick={this.onSelectMode}>Man VS Man</a>
			</div>
		);
	}
}

class SecondScreen extends Component {
	onSelectSymbol = e => {
		this.props.setSymbolOfPlayer(e.target.text);
	}

	render({ settings }) {
		let showTips = settings.mode === Constants.MODE_MVM ? `${Constants.PLAYER1},` : '';
		return (
			<div id="view2">
				<h3>{showTips} Which symbols would you like to use?</h3>
				<a href="/game" class="btn" onClick={this.onSelectSymbol}>{Constants.X}</a>
				&nbsp;&nbsp;
				<a href="/game" class="btn" onClick={this.onSelectSymbol}>{Constants.O}</a>
			</div>
		);
	}
}

export { WelcomeScreen, SecondScreen };