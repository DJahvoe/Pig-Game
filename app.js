/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// Event listener using Anonymous Function (Can't use in another context)
document.querySelector('.btn-roll').addEventListener('click', function() {
	// IF GAME IS NOT OVER
	if (gamePlaying) {
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// 3. Update the round score if the rolled number was NOT a 1
		if (dice !== 1) {
			// Add score
			roundScore += dice;
			document.querySelector(
				'#current-' + activePlayer
			).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	// IF GAME IS NOT OVER
	if (gamePlaying) {
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent =
			scores[activePlayer];

		// Check if player won the game
		if (scores[activePlayer] >= 100) {
			gamePlaying = false;
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document
				.querySelector('.player-' + activePlayer + '-panel')
				.classList.add('winner');
			document
				.querySelector('.player-' + activePlayer + '-panel')
				.classList.remove('active');
		} else {
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	// Next player
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

	// Reset roundScore
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	var panel0_class = document.querySelector('.player-0-panel').classList;
	var panel1_class = document.querySelector('.player-1-panel').classList;
	panel0_class.toggle('active');
	panel1_class.toggle('active');
	// document.querySelector('.player-0-panel').classList.remove('active');
	// document.querySelector('.player-1-panel').classList.add('active');

	document.querySelector('.dice').style.display = 'none';
}

function init() {
	// Game is not over
	flag = 0;
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';

	// QuerySelector by ID
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

// SETTER
// Text Content for manipulating Text DOM only
// document.querySelector('#current-' + activePlayer).textContent = dice;

// InnerHTML for manipulating whole block
// document.querySelector('#current-' + activePlayer).innerHTML ='<em>' + dice + '</em>';

// GETTER
// var x = document.querySelector('#score-0').textContent;
// console.log(x);