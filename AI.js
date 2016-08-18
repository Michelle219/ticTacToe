function insertAIMove (randomCell){
	document.getElementById(numToString(randomCell)).style.backgroundColor=playerTwo.color;
	playerOne.status = true;
	playerTwo.status = false;
}

//-----AI part-----

	//Constructs an action that the ai player could make	
	var AIAction = function(place) {
		this.place = place;
		this.minimaxVal = 0;
		this.applyTo=function(state){
			var next = new State(state);
			next.board[this.place] = state.turn;
			if(state.turn === 2)
				next.compMoveCount++;
			next.advanceTurn();
			return next;    
		}
	}
	
	//סידור המערך בסדר עולה
	AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}

	//סידור המערך בסדר יורד
	AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}
	
//-----AI player-----
	var AI = function(level) {
		var levelOfIntelligence = level;
		var game = {};

//return the minimax value of a state	
	function minimaxValue (state){
		if (checkWin(state.board))
			return gameScore(state);
		else {
			var stateScore;
			if (state.turn===1)
				//כאשר תור השחקן האנושי אחכ, מחפשים לי, הגדול ביותר (כי השחקן האנושי יעשה  את הפעולה )
				//מאפסים את ערך משתנה המינימקס לערך הנמוך מכל תוצאה אפשרית
				stateScore=-1000;
			else
				//להפך
				stateScore=1000;
			
			var availablePositions = state.emptyCells();
			//.map --> applies the function for every element in the array
			var availableNextStates = availablePositions.map(function(place) {
				var action = new AIAction(place);
				var nextState = action.applyTo(state);
				return nextState;
        });
		
		//calculate the minimax value for all available next states and evaluate the current state's value
        availableNextStates.forEach(function(nextState) {
            var nextScore = minimaxValue(nextState);		
            if(state.turn === 1) {
                // player1 (human) wants to maximize --> update stateScore if nextScore is larger
                if(nextScore > stateScore)
                    stateScore = nextScore;
                }
            else {
                // player2 (AI) wants to minimize --> update stateScore if nextScore is smaller
                if(nextScore < stateScore)
                    stateScore = nextScore;
				}
        });
        //backup the final minimax value
        return stateScore;
		}
	}
	
	//a random move [@turn: the player to play- 1/2]
	function blindMove(turn){
		var available = game.currentState.emptyCells();
		var randomCell = available[Math.floor(Math.random() * available.length)];
		var action = new AIAction(randomCell);
		var next = action.applyTo(game.currentState);
		//UI
		insertAIMove(randomCell);
		game.advanceTo(next);
	}
	
	//novice move: mix between choosing the optimal and suboptimal minimax decisions
	function noviceMove(turn){
		if(turn ===2){
		var available = game.currentState.emptyCells();
		var availableActions = available.map(function(place) {
			var action =  new AIAction(place); //create the action object
			var nextState = action.applyTo(game.currentState);
			action.minimaxVal = minimaxValue(nextState);
			return action;
		});}
    //sort the enumerated actions list by score
    if(turn === 1)
        //human maximizes --> decend sort the actions to have the maximum minimax at first
        availableActions.sort(AIAction.DESCENDING);
    else
        //AI minimizes --> ascend sort the actions to have the minimum minimax at first
        availableActions.sort(AIAction.ASCENDING);
	//novice - smart 40%, stupid 60%
    var chosenAction;
    if(Math.random()*100 <= 40) {
        chosenAction = availableActions[0];
    }
    else {
        if(availableActions.length >= 2)
            chosenAction = availableActions[1];
        else
            chosenAction = availableActions[0];
    }
    var next = chosenAction.applyTo(game.currentState);
	//insertAIMove(chosenAction.movePosition);
    game.advanceTo(next);
	}
	
	//master move:
	function masterMove(turn) {
		var available = game.currentState.emptyCells();
    //enumerate and calculate the score for each avaialable actions to the ai player
		var availableActions = available.map(function(place) {
			var action =  new AIAction(place); //create the action object
			var next = action.applyTo(game.currentState);
			action.minimaxVal = minimaxValue(next);
			return action;
    });
    //sort the enumerated actions list by score
    if(turn === 1)
        //X maximizes --> descend sort the actions to have the largest minimax at first
        availableActions.sort(AIAction.DESCENDING);
    else
        //O minimizes --> acend sort the actions to have the smallest minimax at first
        availableActions.sort(AIAction.ASCENDING);
    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);	
    //UI
	//insertAIMove(chosenAction.movePosition);
    // take the game to the next state
    game.advanceTo(next);
	}
	
	this.plays = function(_game){
        game = _game;
    };

     //public function: notify the ai player that it's its turn
    this.notify = function(turn) {
		if(turn===2){
        switch(levelOfIntelligence) {
            case "blind": blindMove(turn); break;
            case "novice": noviceMove(turn); break;
            case "master": masterMove(turn); break;
		}
        }
    };
};