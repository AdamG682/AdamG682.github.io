
const numBtn = document.getElementById('btn');
numBtn.addEventListener('click', number);

/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random, https://stackoverflow.com/questions/5451445/how-to-display-image-with-javascript, */
function number() {
  const min = parseInt(document.getElementById('min').value);
  const max = parseInt(document.getElementById('max').value);
  if (min && max) {
    const num = Math.floor(Math.random() * (max - min) + min);
    document.getElementById('result').innerHTML = "<h2>" + num.toString() + " Space Jesus</h2>";
    let obi = '<img class= width="200" height="300" src="https://media.vanityfair.com/photos/5d56eac902bf930008778de7/3:2/w_1998,h_1332,c_limit/obi-wan-ewan-series.jpg" />';

    /*https://stackoverflow.com/questions/35366555/how-to-display-same-image-multiple-times-using-same-image-in-javascript */
    for (let i = 0; i < num; i++) {
      document.getElementById('result').innerHTML += obi;
    }
  }

}

//Change an HTML element with a button press
function createHTML() {
  const element = document.getElementById("maxRebo");
  element.innerHTML = "WOW, wasn't expecting Max Rebo" + "<img src= 'CloserRebo.jpg' style= 'width: 400px; height: 350px;'>"
}

function randomCSS() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.getElementById("Mandolorian").style.color = "#" + randomColor;
  color.innerHTML = "#" + randomColor;
}

var answers = ["It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again"];

window.onload = function () {
  var eight = document.getElementById("eight");
  var answer = document.getElementById("answer");
  var ball = document.getElementById("eightball");
  var question = document.getElementById("question");

  ball.addEventListener("click", function () {
    if (question.value.length < 1) {
      alert('Enter a question!!!');
    } else {
      eight.innerText = "";
      var num = Math.floor(Math.random() * Math.floor(answers.length));
      answer.innerText = answers[num];
    }
  });
};