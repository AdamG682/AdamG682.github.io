

var playerName = document.getElementById("player-name");
//var botaoInicia = document.querySelector('#iniciar-jogo');
var janelaInicial = document.getElementById('game-begin');
var apostaButton = document.getElementById('fazerAposta');
//var apostaDIV = document.getElementById('aposta');
var continuaAposta = document.getElementById('continua-aposta');
var statsDiv = document.getElementById("stats");

var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");
var finalResult = document.getElementById("final-result");
var resultText = document.getElementById("result-text");
var continueButton = document.getElementById("continue-button");

var valorAposta = 0;
var playerResult = document.getElementById("player-resultado");
var cartasPlayer = document.getElementById("cartas-player");
var playerSoma = 0;
var saldoPlayerDIV = document.getElementById("enteredName");
var saldoPlayer = 1000;

var compSoma = document.getElementById("comp-resultado");
var cartasComp = document.getElementById("cartas-comp");
var compResult = document.getElementById("comp-resultado");
var compSoma = 0;

var nipe = ['hearts','clubs','diamonds','spades'];
var tipo = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
var baralho = [];
var count=0;


function carta(nipe, tipo, valor){
	this.nipe = nipe;
	this.tipo = tipo;
	this.valor = valor;
}


function startBaralho(){
	baralho = [];	
	var temp;
	for(var i = 0; i < nipe.length; i++){
		for(var j = 0; j < tipo.length; j++){
			
			if(j > 9 ){
				temp = new carta(nipe[i], tipo[j], 10);
			
			} else{
				temp = new carta(nipe[i], tipo[j], j + 1);
			}

			baralho.push(temp);
		}
	}
}


nameButton.addEventListener('click', function (event) {

	if(document.getElementById('getPlayer-name').value != ""){

		var playerName = document.getElementById("player-name");
		startBaralho();

	    playerName.innerHTML = "<strong>Player: </strong>"+document.getElementById('getPlayer-name').value;        
	    saldoPlayerDIV.innerHTML = "<strong>Balance:</strong> $"+ saldoPlayer;
	    janelaInicial.style.visibility = "hidden";
    }else{
    	alert("Insert a valid name!");
    }

});



apostaButton.addEventListener('click',function(event){

    if(saldoPlayer > 0){
    	valorAposta = document.getElementById('valorAposta').value;
    	iniciaJogada(valorAposta);	
    }else{
    	alert("Not enought money");
    }
    

    
});


function iniciaJogada (valorAposta) {
	statsDiv.style.display = "inherit";	
	var x1 = puxaCarta("player");
	var x2 = puxaCarta("player");
	
	checkBlackjack(x1,x2);
	aposta.style.display = 'none';
    continuaAposta.style.display = 'inherit';

}
	

function checkBlackjack(x1,x2){

	if(x1 =="A"){
		if(x2 == "10" || x2 == "J" || x2 == "Q" || x2 == "K"){			
			setSaldo(valorAposta,"blackjack");
		}
	}
	else if(x2 =="A"){
		if(x1 == "10" || x1 == "J" || x1 == "Q" || x1 == "K"){
			setSaldo(valorAposta,"blackjack");
		}
	}
}

function setIcon(suit){

	if(suit =="clubs"){
		return "http://www.i2symbol.com/images/symbols/cards/black_club_suit_u2663_icon_256x256.png";
	}
	else if(suit =="hearts"){
		return "http://www.i2symbol.com/images/symbols/cards/black_heart_suit_u2665_icon_256x256.png";
	}
	else if(suit =="diamonds"){
		return "http://www.i2symbol.com/images/symbols/cards/black_diamond_suit_u2666_icon_256x256.png";
	}
	else if(suit =="spades"){
		return "http://www.i2symbol.com/images/symbols/cards/black_spade_suit_u2660_icon_256x256.png";
	}

}

function puxaCarta(jogador){
	
	var x = Math.floor(Math.random() * 52);
	var cartaTemp = baralho[x];
	//saldoPlayer.innerHTML = "nipe:"+cartaTemp.nipe+"<br>tipo"+cartaTemp.tipo+"<br>valor"+cartaTemp.valor;
	

	var nipeTemp = setIcon(cartaTemp.nipe);

	if(jogador == "player"){
		//alert(cartasPlayer.innerHTML);	
		var preCartas = cartasPlayer.innerHTML;

		cartasPlayer.innerHTML = preCartas + '<div class="carta"><h4 class="carta-tipo">'+cartaTemp.tipo+'</h4><img class="carta-imagem" src="'+nipeTemp+'"></div>';			
		
		var preSoma = playerResult.innerHTML;
		playerSoma = playerSoma + cartaTemp.valor;
		playerResult.innerHTML = '<strong>Player:</strong>' +playerSoma;//preSoma + " + " + cartaTemp.valor +" = " + playerSoma;

	}
	else{
		var preCartas = cartasComp.innerHTML;
		cartasComp.innerHTML = preCartas + '<div class="carta"><h4 class="carta-tipo">'+cartaTemp.tipo+'</h4><img class="carta-imagem" src="'+nipeTemp+'"></div>';			

		var preSoma = compSoma.innerHTML;
		compSoma = compSoma + cartaTemp.valor;
		compResult.innerHTML = '<strong>Computer:</strong>' + compSoma;
	}

	return cartaTemp.tipo;
}



hitButton.addEventListener('click', function (event) {

    	puxaCarta("player");    	
    	if(playerSoma > 21){
    
    		setSaldo(valorAposta,"perdeu");
    		
    	}
    });


stayButton.addEventListener('click', function (event) {
	ComputerPlay();

});	

function ComputerPlay () {	
	puxaCarta("comp");
	puxaCarta("comp");
	
	while(compSoma < playerSoma){
		puxaCarta("comp");

		if(compSoma >21){
		
			setSaldo(valorAposta,"ganhou");
		}
	}
	if(compSoma >= playerSoma && compSoma <= 21){
		
		setSaldo(valorAposta,"perdeu");
	}
}

function setSaldo(valorAposta,estado){
		hitButton.disabled = true;
    stayButton.disabled = true;
	finalResult.style.display = "inherit";
	
	if(estado == "ganhou"){
		saldoPlayer += valorAposta*2;
		saldoPlayerDIV.innerHTML = "<strong>Balance:</strong> "+ saldoPlayer;
		resultText.innerHTML = "You Won";	
	}else if(estado == "blackjack"){
		saldoPlayer += valorAposta*2;
		saldoPlayerDIV.innerHTML = "<strong>Balance:</strong> $"+ saldoPlayer;
		resultText.innerHTML = "BLACKJACK";	
	}
	else{
		saldoPlayer -= valorAposta;		
		saldoPlayerDIV.innerHTML = "<strong>Balance:</strong> $"+ saldoPlayer;	
		resultText.innerHTML = "You Lose";
	}

	   continueButton.addEventListener('click', function (event) {
	   		hitButton.disabled = false;
    		stayButton.disabled = false;
		   	finalResult.style.display = "none";
		   	aposta.style.display = 'inherit';
	    	continuaAposta.style.display = 'none';
		   	playerSoma = 0;
		   	compSoma = 0;
		   	playerResult.innerHTML = '<strong>Player:</strong>';
		   	compResult.innerHTML = '<strong>Computer:</strong>';
		   	statsDiv.style.display = "none";
		   	cartasPlayer.innerHTML = '<h4>Player</h4>';
		   	cartasComp.innerHTML = '<h4>Computer</h4>';

    });
	
}