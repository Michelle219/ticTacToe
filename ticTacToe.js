//global varriables
var playerOne = {status:true, color:"#ff726a", number:1};
var playerTwo = {status:false, color:"#B7D0DF", number:2};
var gameOver = false;
var mode = 0;
var gameArray = [];

function initArray(B){ 
	for (var i=0; i<9; i++)
		B[i]=0;
}

function pushed (string){
	if (gameOver){
		alert("this game is over..")
		return true; //just to get out of the function
		}
	if (gameArray[stringToNum(string)-1]!=0)
		alert("this place is occupied");
	else {
		if (mode===2){
			if(playerOne.status==true){
				document.getElementById(string).style.backgroundColor=playerOne.color;
				gameArray[stringToNum(string)-1]=1;
				playerOne.status = false;
				playerTwo.status = true;
			}
		else {
				document.getElementById(string).style.backgroundColor=playerTwo.color;
				gameArray[stringToNum(string)-1]=2;
				playerOne.status = true;
				playerTwo.status = false;
			}
	  }
	  if(mode===1&&game.currentState.turn ===1){
		document.getElementById(string).style.backgroundColor=playerOne.color;
		var next = new State(game.currentState);
        next.board[stringToNum(string)-1] = 1;
		next.advanceTurn();
        game.advanceTo(next);
	  }
	}
	if (checkWin(gameArray)){
		modal.style.display = "block";
		document.getElementById("end").innerHTML = "Player number ";
		gameOver = true;
		if (playerOne.status==false)
			document.getElementById("num").innerHTML = playerOne.number;
		else
			document.getElementById("num").innerHTML = playerTwo.number;
	}
	if (isTie(gameArray)){
		modal.style.display = "block";
		gameOver = "true";
		document.getElementById("end").innerHTML = "Haha! you both lose.. It's a draw"
		document.getElementById("num").innerHTML = "";
	}
	
}

var numbers = { //used to translate words to numbers
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
   
var words = {
    1:'one',
    2:'two',
    3:'three',
    4:'four',
    5:'five',
    6:'six',
    7:'seven',
    8:'eight',
    9:'nine'
   };

function stringToNum (string) {
	return numbers[string];
}

function numToString (num){
	return words[num];
}


function checkWin (B) {
	//checks rows
		for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== 0 && B[i] === B[i + 1] && B[i + 1] === B[i + 2]) {
             //   state.result ="over"; //update the state result
                return true;
            }
        }
	//check columns
		for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== 0 && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
              //  state.result ="over"; //update the state result
                return true;
            }
        }
	//check diagonals
		for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== 0 && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
               // state.result = "over"; //update the state result
                return true;
            }
        }
}

function isTie (B)  {
	var count = 0;
	for (var i=0; i<B.length; i++)
		if (B[i]!=0)
			count++;
	if (count==9&&!checkWin(B)) 
		return true;
	return false;
}


function twoPlayersGame(){
	document.getElementById("gameBoard").style.display='block';
	initArray(gameArray);
	mode = 2;
}
