/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/**
 * FINISHING CHALLENGE
 * 1) Triggered next player if two 6 in a row and lose score
 * 2) User input winning score
 * 3) 2 dices, if one of them is 1, then next player (V)
 */
var scores, roundScore, activePlayer, gamePlaying, prevSix, scoreLimit;

init();

// Event listener using Anonymous Function (Can't use in another context)
document.querySelector('.btn-roll').addEventListener('click', function() {
	// IF GAME IS NOT OVER
	if (gamePlaying) {
		var oneDetected = false;
		// 1. Random number & Check for next roll availability
		var dice_1 = Math.floor(Math.random() * 6) + 1;
		var dice_2 = Math.floor(Math.random() * 6) + 1;
		// console.log('');
		// console.log(dice_1);
		// console.log(dice_2);

		if (
			(prevSix && (dice_1 === 6 || dice_2 === 6)) ||
			(dice_1 === 6 && dice_2 === 6)
		) {
			scores[activePlayer] = 0;
		}

		if (dice_1 === 1 || dice_2 === 1) {
			oneDetected = true;
		}

		// 2. Display the result
		var dice_1_DOM = document.querySelector('.dice-1');
		var dice_2_DOM = document.querySelector('.dice-2');

		dice_1_DOM.style.display = 'block';
		dice_1_DOM.src = 'dice-' + dice_1 + '.png';

		dice_2_DOM.style.display = 'block';
		dice_2_DOM.src = 'dice-' + dice_2 + '.png';

		// 3. Update the round score if the rolled number was NOT a 1
		// or two 6 in a row
		if (!oneDetected) {
			dice_1 === 6 || dice_2 === 6 ? (prevSix = true) : (prevSix = false);
			// Add score
			roundScore += dice_1 + dice_2;
			document.querySelector(
				'#current-' + activePlayer
			).textContent = roundScore;
		} else {
			// console.log('Six Twice : ' + sixTwice);
			// console.log('One Detected : ' + oneDetected);
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

		var winningScore;
		scoreLimit === '' ? (winningScore = 100) : (winningScore = scoreLimit);
		// Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			gamePlaying = false;
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';

			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.dice-2').style.display = 'none';

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

document.querySelector('.btn-submit').addEventListener('click', function() {
	scoreLimit = document.querySelector('#scoreLimit').value;
	if (scoreLimit > 0 || scoreLimit === '') {
		document.querySelector('.btn-roll').style.display = 'block';
		document.querySelector('.btn-hold').style.display = 'block';

		document.querySelector('.btn-submit').style.display = 'none';
		document.getElementById('scoreLimit').style.display = 'none';
	} else {
		alert('Please input a number above 0');
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	prevSix = false;
	sixTwice = false;
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

	// Hide dice for next turn
	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

	// Dice position according to active player
	document.querySelector('.dice-1').classList.toggle('dice-right');
	document.querySelector('.dice-2').classList.toggle('dice-right');
}

function init() {
	// Game is not over
	flag = 0;
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	prevSix = false;
	sixTwice = false;
	scoreLimit = 100;

	document.querySelector('.btn-submit').style.display = 'block';
	document.getElementById('scoreLimit').style.display = 'block';

	document.querySelector('.btn-roll').style.display = 'none';
	document.querySelector('.btn-hold').style.display = 'none';

	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

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
