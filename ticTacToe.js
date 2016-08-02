

//global varriables
var playerOne = {status:true, color:"#ff726a", number:1};
var playerTwo = {status:false, color:"#B7D0DF", number:2};
var gameArray = [];

function initArray(){ 
	for (var i=0; i<9; i++)
		gameArray[i]=0;
}

function pushed (string){
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
		document.getElementById("end").innerHTML = "Player number "
		if (playerOne.status==false)
			document.getElementById("num").innerHTML = playerOne.number;
		else
			document.getElementById("num").innerHTML = playerTwo.number;
	}
	if (isTie()){
		modal.style.display = "block";
		document.getElementById("end").innerHTML = "Haha! you both lose.. It's a tie"
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
	//checks horizontal lines
		if (gameArray[0]==gameArray[1]&&gameArray[1]==gameArray[2]&&gameArray[0]!=0)
			return true;
		if (gameArray[3]==gameArray[4]&&gameArray[4]==gameArray[5]&&gameArray[3]!=0)
			return true;
		if (gameArray[6]==gameArray[7]&&gameArray[7]==gameArray[8]&&gameArray[6]!=0)
			return true;
	//check vertical lines
		if (gameArray[0]==gameArray[3]&&gameArray[3]==gameArray[6]&&gameArray[0]!=0)
			return true;
		if (gameArray[1]==gameArray[4]&&gameArray[4]==gameArray[7]&&gameArray[1]!=0)
			return true;
		if (gameArray[2]==gameArray[5]&&gameArray[5]==gameArray[8]&&gameArray[2]!=0)
			return true;
	//check diagonal lines
		if (gameArray[0]==gameArray[4]&&gameArray[4]==gameArray[8]&&gameArray[4]!=0)
			return true;
		if (gameArray[2]==gameArray[4]&&gameArray[4]==gameArray[6]&&gameArray[4]!=0)
			return true;
		return false;
}

function isTie ()  {
	var count = 0;
	for (var i=0; i<gameArray.length; i++)
		if (gameArray[i]!=0)
			count++;
	if (count==9)
		return true;
	return false;
}
initArray();