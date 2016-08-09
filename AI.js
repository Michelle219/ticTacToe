//a state department that gets the old state
var state = function(old) {
	this.turn=""; // the player who should play
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
	