//global varriables
var playerOne = {status:true, color:"#ff726a"};
var playerTwo = {status:false, color:"#B7D0DF"};
var gameArray = [];

function initArray(){ 
	for (var i=0; i<9; i++)
		gameArray[i]=false;
}

function pushed (string){
	if (gameArray[stringToNum(string)-1]==true)
		alert("this place is occupied");
	else {
		if(playerOne.status==true){
			document.getElementById(string).style.backgroundColor=playerOne.color;
			gameArray[stringToNum(string)-1]=true;
			playerOne.status = false;
			playerTwo.status = true;
		}
		else {
			document.getElementById(string).style.backgroundColor=playerTwo.color;
			gameArray[stringToNum(string)-1]=true;
			playerOne.status = true;
			playerTwo.status = false;
		}
	}
}

var numbers = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
   };

function stringToNum (string) {
	return numbers[string];
}


initArray();