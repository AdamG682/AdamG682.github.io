

var playerName = document.getElementById("player-name");
var janelaInicial = document.getElementById('game-begin');
var apostaButton = document.getElementById('fazerAposta');
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

	    playerName.innerHTML = "<strong>You: </strong>"+document.getElementById('getPlayer-name').value;        
	    saldoPlayerDIV.innerHTML = "<strong>Credit Balance:</strong> $"+ saldoPlayer;
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
		return "https://static.wikia.nocookie.net/starwars/images/9/90/Sylop.png/revision/latest?cb=20180530101050";
	}
	else if(suit =="hearts"){
		return "https://static.wikia.nocookie.net/starwars/images/9/90/Sylop.png/revision/latest?cb=20180530101050";
	}
	else if(suit =="diamonds"){
		return "https://static.wikia.nocookie.net/starwars/images/9/90/Sylop.png/revision/latest?cb=20180530101050";
	}
	else if(suit =="spades"){
		return "https://static.wikia.nocookie.net/starwars/images/9/90/Sylop.png/revision/latest?cb=20180530101050";
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
		playerResult.innerHTML = '<strong>You:</strong>' +playerSoma;//preSoma + " + " + cartaTemp.valor +" = " + playerSoma;

	}
	else{
		var preCartas = cartasComp.innerHTML;
		cartasComp.innerHTML = preCartas + '<div class="carta"><h4 class="carta-tipo">'+cartaTemp.tipo+'</h4><img class="carta-imagem" src="'+nipeTemp+'"></div>';			

		var preSoma = compSoma.innerHTML;
		compSoma = compSoma + cartaTemp.valor;
		compResult.innerHTML = '<strong>Max Rebo:</strong>' + compSoma;
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
		saldoPlayerDIV.innerHTML = "<strong>Credit Balance:</strong> "+ saldoPlayer;
		resultText.innerHTML = "YOU WON";	
	}else if(estado == "blackjack"){
		saldoPlayer += valorAposta*2;
		saldoPlayerDIV.innerHTML = "<strong>Credit Balance:</strong> $"+ saldoPlayer;
		resultText.innerHTML = "SABACC!";	
	}
	else{
		saldoPlayer -= valorAposta;		
		saldoPlayerDIV.innerHTML = "<strong>Credit Balance:</strong> $"+ saldoPlayer;	
		resultText.innerHTML = "YOU LOSE";
	}

	   continueButton.addEventListener('click', function (event) {
	   		hitButton.disabled = false;
    		stayButton.disabled = false;
		   	finalResult.style.display = "none";
		   	aposta.style.display = 'inherit';
	    	continuaAposta.style.display = 'none';
		   	playerSoma = 0;
		   	compSoma = 0;
		   	playerResult.innerHTML = '<strong>You:</strong>';
		   	compResult.innerHTML = '<strong>Max Rebo:</strong>';
		   	statsDiv.style.display = "none";
		   	cartasPlayer.innerHTML = '<h4>You</h4>';
		   	cartasComp.innerHTML = '<h4>Max Rebo</h4>';

    });
	
}