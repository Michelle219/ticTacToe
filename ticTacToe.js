//global varriables
var playerOne = {status:true, color:"#ff726a", number:1};
var playerTwo = {status:false, color:"#B7D0DF", number:2};
var gameOver = false;
var gameArray = [];

function initArray(){ 
	for (var i=0; i<9; i++)
		gameArray[i]=0;
}

function pushed (string){
	if (gameOver){
		alert("this game is over..")
		return true; //just to get out of the function
		}
	if (gameArray[stringToNum(string)-1]!=0)
		alert("this place is occupied");
	else {
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
	if (checkWin()){
		modal.style.display = "block";
		document.getElementById("end").innerHTML = "Player number ";
		gameOver = true;
		if (playerOne.status==false)
			document.getElementById("num").innerHTML = playerOne.number;
		else
			document.getElementById("num").innerHTML = playerTwo.number;
	}
	if (isTie()){
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

function stringToNum (string) {
	return numbers[string];
}

function checkWin () {
	var B = gameArray;
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

function isTie ()  {
	var count = 0;
	for (var i=0; i<gameArray.length; i++)
		if (gameArray[i]!=0)
			count++;
	if (count==9&&!checkWin)
		return true;
	return false;
}
initArray();