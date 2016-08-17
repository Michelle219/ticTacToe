//a state department that gets the old state
	var State = function(old) {
		this.turn=0; // the player who should play
		this.compMoveCount = 0; //number of moves the AI player did
		this.result = "still running";
		this.board = [];
		//Object Construction
		if(typeof old !== "undefined") { 
			// if the state is constructed using a copy of another state
			var len = old.board.length;
			this.board = new Array(len);
			for(var i = 0 ; i < len ; i++) {
				this.board[i] = old.board[i];
			}
			this.compMoveCount = old.compMoveCount;
			this.result = old.result;
			this.turn = old.turn;
		}	
		
		this.advanceTurn = function() {
			this.turn = this.turn === 1 ? 2 : 1;//if this.turn=1 return 2 else return 1, shortcut
		}
		
		this.emptyCells = function() {  //create an empty cell array
			var indxs = [];
			for(var i = 0; i < 9 ; i++) {
				if(this.board[i] === 0) 
					indxs.push(i);
			}
			return indxs; 
		}

}

function gameScore (state) {
    if(state.result !== "still running") {
        if(state.result === "1-won"){
            // the human player won
            return 10 - state.compMoveCount;
        }
        else if(state.result === "2-won") {
            //the human player lost
            return -10 + state.compMoveCount;
        }
        else {
            //it's a draw
            return 0;
        }
    }
}

var Game = function(autoPlayer) {
    this.ai = autoPlayer;
    this.currentState = new State();
	//this.currentState.board = [];
	this.currentState.board = [0, 0, 0,
                               0, 0, 0,
                               0, 0, 0];
	initArray(this.currentState.board);
    this.currentState.turn = 1;
    this.status = "beginning";
	
    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(checkWin(_state.board)) {
            this.status = "ended";
			modal.style.display = "block";
			document.getElementById("end").innerHTML = "Player number ";
			gameOver = true;
            if(_state.result === "1-won")
				document.getElementById("num").innerHTML = playerOne.number;
            else if(_state.result === "2-won")
                document.getElementById("num").innerHTML = playerTwo.number;
            else {
				document.getElementById("end").innerHTML = "it's here" //draw situation
				document.getElementById("num").innerHTML = "";
			}
        }
		else {
			alert("hey");
			this.ai.notify(2);
		}
    };

     //starts the game
    this.start = function() {
        if(this.status = "beginning") {
            //invoke advanceTo with the intial state
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }
}; 

function onePlayerGame(){
	mode=1;
	document.getElementById("gameBoard").style.display='block';
	var difficulty = "blind";
	var aiPlayer = new AI(difficulty);
    game = new Game(aiPlayer);
    aiPlayer.plays(game);
	game.start();
}