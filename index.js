var numSquares = 6;
var colors = [];
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var p = document.querySelector("p");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");

reset();

for (var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected")
		modeButtons[1].classList.remove("selected")
		modeButtons[2].classList.remove("selected")
		this.classList.add("selected");
		this.textContent === "Easy" ? numSquares = 3 : (this.textContent === "Hard" ? numSquares = 9 : numSquares = 6);
		reset();
		});
	}

function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display="none";
		}
	}
	h1.style.backgroundColor = "steelblue";
	p.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}

colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", function() {
	reset();
})

for(var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Congratulations!"
			messageDisplay.style.fontWeight = 800;
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			p.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play Again?";
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again!"
		}
	});
};

function changeColors (color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr = []
	for(var i = 0; i < num; i++) {
		arr.push(randomColor())
	}
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256)
	var g = Math.floor(Math.random() * 256)
	var b = Math.floor(Math.random() * 256)

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname));
app.use("/images", express.static(__dirname + '/images'));
app.use("/scripts", express.static(__dirname + '/scripts'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/index.html'));
});

app.listen(process.env.PORT || 8080);