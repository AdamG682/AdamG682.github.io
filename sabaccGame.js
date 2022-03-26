//Javascript Sabacc (Blackjack) Card Game JS (Adam)

//variables used for the game

	//game and card variables
	var gameStart = document.getElementById('game-begin');
	var betButton = document.getElementById('bettings');
	var buttonOptions = document.getElementById('buttonSelection');
	var hitButton = document.getElementById("hit-button");
	var stayButton = document.getElementById("stay-button");
	var finalResult = document.getElementById("final-result");
	var resultText = document.getElementById("result-text");
	var playAgainButton = document.getElementById("againButton");
	var cardCount = document.getElementById("numberCounter");
	var cardTypes = ['-8', '+7', '-9', '+10'];
	var cardNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	var game = [];
	var count = 0;

	//player variables
	var playerName = document.getElementById("player-name");
	var betAmount = 0;
	var playerResult = document.getElementById("playerTally");
	var playerCards = document.getElementById("player-cards");
	var playerCount = 0;
	var playerBalance = document.getElementById("player-balance");
	var playerEarnings = 1000;

	//rebo (computer player) variables
	var reboEarnings = document.getElementById("reboTally");
	var reboCards = document.getElementById("rebo-cards");
	var reboResult = document.getElementById("reboTally");
	var reboEarnings = 0;



//custom function that is able to track the cards that are drawn by value	
function cardFun(cardTypes, cardNumbers, value) {
	this.cardTypes = cardTypes;
	this.cardNumbers = cardNumbers;
	this.value = value;
}


//begins the game with two set of cards
function startgame() {
	game = [];
	var temp;
	for (var i = 0; i < cardTypes.length; i++) {
		for (var j = 0; j < cardNumbers.length; j++) {
			if (j > 9) {
				temp = new cardFun(cardTypes[i], cardNumbers[j], 10);

			} else {
				temp = new cardFun(cardTypes[i], cardNumbers[j], j + 1);
			}
			game.push(temp);
		}
	}
}


//collects the name that the user enters in the top textbox, will provide an error if the user enters nothing
nameButton.addEventListener('click', function (event) {
	if (document.getElementById('getPlayer-name').value != "") {

		var playerName = document.getElementById("player-name");
		startgame();

		playerName.innerHTML = "You:" + document.getElementById('getPlayer-name').value;
		playerBalance.innerHTML = "<strong>Credit Balance:</strong>" + playerEarnings;
		gameStart.style.visibility = "hidden";
	} else {
		alert("Please enter a name if you want to play traveler.");
	}
});


//tracks the amount that the user is betting from the dropdown menu, will provide an error if the user has 0 or negative amount when starting a new game
betButton.addEventListener('click', function (event) {
	if (playerEarnings > 0) {
		betAmount = document.getElementById('betAmount').value;
		startGame(betAmount);
	} else {
		alert("Come back when you have enough credits.");
	}
});


//function draws two cards when the set bet is made
function startGame(betAmount) {
	cardCount.style.display = "inherit";
	var x1 = drawFun("player");
	var x2 = drawFun("player");

	checkBlackjack(x1, x2);
	betDropDown.style.display = 'none';
	buttonOptions.style.display = 'inherit';
}


//function checks to see if the card total reaches 21 on first draw which means that the player automatically wins
function checkBlackjack(x1, x2) {
	if (x1 == "A") {
		if (x2 == "10" || x2 == "J" || x2 == "Q" || x2 == "K") {
			balance(betAmount, "blackjack");
		}
	}
	else if (x2 == "A") {
		if (x1 == "10" || x1 == "J" || x1 == "Q" || x1 == "K") {
			balance(betAmount, "blackjack");
		}
	}
}


//the four different types of cards that are randomly selected for the game
function setIcon(typecard) {
	if (typecard == "-8") {
		return 'Images/SabaccCard3.png';
	}
	else if (typecard == "+7") {
		return 'Images/SabaccCard4.png';
	}
	else if (typecard == "-9") {
		return 'Images/SabaccCard5.png';
	}
	else if (typecard == "+10") {
		return 'Images/SabaccCard6.png';
	}
}


//function that randomly draws a new card for the player and also randomly draws cards for the computer
function drawFun(user) {

	var x = Math.floor(Math.random() * 52);
	var sabaccCard = game[x];
	var cardTypesTemp = setIcon(sabaccCard.cardTypes);

	if (user == "player") {
		var userCardTable = playerCards.innerHTML;

		playerCards.innerHTML = userCardTable + '<div class="carta"><h4 class="carta-cardNumbers">' + sabaccCard.cardNumbers + '</h4><img class="carta-imagem" src="' + cardTypesTemp + '"></div>';

		var userStartingTotal = playerResult.innerHTML;
		playerCount = playerCount + sabaccCard.value;
		playerResult.innerHTML = 'You:' + playerCount;
	}
	else {
		var reboCardTable = reboCards.innerHTML;
		reboCards.innerHTML = reboCardTable + '<div class="carta"><h4 class="carta-cardNumbers">' + sabaccCard.cardNumbers + '</h4><img class="carta-imagem" src="' + cardTypesTemp + '"></div>';

		var reboStartingTotal = reboEarnings.innerHTML;
		reboEarnings = reboEarnings + sabaccCard.value;
		reboResult.innerHTML = 'Max Rebo:' + reboEarnings;
	}

	return sabaccCard.cardNumbers;
}


//when the hit button is clicked by the player it will check to see if they go over 21, if they do then they automatically lose
hitButton.addEventListener('click', function (event) {
	drawFun("player");
	if (playerCount > 21) {
		balance(betAmount, "loser");
	}
});


//once stay button is clicked, rebo(computer) has their cards revealed to see if the player has won or not
stayButton.addEventListener('click', function (event) {
	reboPlayerActions();
});


//function that randomly draws cards for rebo and also checks to see if there cards went over 21 and also compares against the player's cards on who has the highest value below 21
function reboPlayerActions() {
	drawFun("rebo");
	drawFun("rebo");

	while (reboEarnings < playerCount) {
		drawFun("rebo");

		if (reboEarnings > 21) {
			balance(betAmount, "winner");
		}
	}
	if (reboEarnings >= playerCount && reboEarnings <= 21) {
		balance(betAmount, "loser");
	}
}


//function that will either double the winnings or take away the bet amount from the player's balance based on card state
function balance(betAmount, cardState) {
	hitButton.disabled = true;
	stayButton.disabled = true;
	finalResult.style.display = "inherit";

	if (cardState == "winner") {
		playerEarnings += betAmount * 2;
		playerBalance.innerHTML = "<strong>Credit Balance:</strong>" + playerEarnings;
		resultText.innerHTML = "YOU WON";
	} else if (cardState == "blackjack") {
		playerEarnings += betAmount * 2;
		playerBalance.innerHTML = "<strong>Credit Balance:</strong>" + playerEarnings;
		resultText.innerHTML = "SABACC!";
	}
	else {
		playerEarnings -= betAmount;
		playerBalance.innerHTML = "<strong>Credit Balance:</strong>" + playerEarnings;
		resultText.innerHTML = "YOU LOSE";
	}

	playAgainButton.addEventListener('click', function (event) {
		hitButton.disabled = false;
		stayButton.disabled = false;
		finalResult.style.display = "none";
		betDropDown.style.display = 'inherit';
		buttonOptions.style.display = 'none';
		playerCount = 0;
		reboEarnings = 0;
		playerResult.innerHTML = 'You:';
		reboResult.innerHTML = 'Max Rebo:';
		cardCount.style.display = "none";
		playerCards.innerHTML = '<h4>You</h4>';
		reboCards.innerHTML = '<h4>Max Rebo</h4>';
	});
}