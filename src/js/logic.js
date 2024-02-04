// Copies all elements from one board to another
copyBoard = (board, copyBoard) => {
	for(var i = 0; i < boardSize; i++) {
		for(var j = 0; j < boardSize; j++) {
			board[i][j] = copyBoard[i][j];
		}
	}
}

// clears taken stones. 
// Checks if the linked stones without liberties are of the same colour and not the colour of the current player, and takes them.
clearTaken = (data) => {
    for(var i = 0; i < boardSize; i++) {
		for(var j = 0; j < boardSize; j++) {
			if(data[i][j] !== 0 && data[i][j] == present) {
				if(getLiberties(data, i, j) === 0) {
					//Remove dead pieces in board
					var chain = getChain(i, j);
					for(var k = 0; k < chain.length; k++) {
						var pX = chain[k][0];
						var pY = chain[k][1];

						data[pX][pY] = 0;
					}
				}
				resetCheckBoard();
			}
		}
	}
}

// Checks for Ko-rule
invalidBoard = (data, backup) => {
	for(var i = 0; i < boardSize; i++) {
		for(var j = 0; j < boardSize; j++) {
			if(data[i][j] !== backup[i][j]) {
				return false;
			}
		}
	}
	return true;
}

// Finds stone chains.
getChain = () => {
	var chain = [];
	for(var i = 0; i < boardSize; i++) {
		for(var j = 0; j < boardSize; j++) {
			if(checkBoard[i][j] === 1) {
				chain.push([i, j]);
			}
		}
	}
	return chain;
}

invalidMove = (board, x, y) => {
	if(board[x][y] != 0 && getLiberties(board, x, y) === 0) {
		return 0;
	}
	resetCheckBoard();
	return 1;
}

// Avoid max-call stack size exceesion.
resetCheckBoard = () => {
	for(var i = 0; i < boardSize; i++) {
		for(var j = 0; j < boardSize; j++) {
			checkBoard[i][j] = 0;
		}
	}
}

outOfBounds = (x, y) => {
	return x < 0 || x >= boardSize || y < 0 || y >= boardSize;
}


getLiberties = (board, x, y) => {
	if(checkBoard[x][y] === 1)
		return 0;

    	checkBoard[x][y] = 1

	var count = 0;
	for(var i = 0; i < directs.length; i++) {
		var pX = x + directs[i][0];
		var pY = y + directs[i][1];

		if(!outOfBounds(pX, pY)) { // valid position
			if(board[pX][pY] == 0) { // 1 liberty
				count ++;
			} else if(board[pX][pY] == board[x][y]) { // next chain
                count += getLiberties(board, pX, pY);
                checkBoard[pX][pY] = 1;
			}
		}
	
	}
	return count;
}


newBoard = (row, collumn, data) => {
	
    // need to update this whole function so the row is updated along side it.
    if(triggered == true){ return false}
    
	present = (present == 1) ? 2 : 1
	entities.sort((a, b) => {
		return a.row - b.row
	})
	let sameTime = [];
	for(let i=0; i < entities.length; i++) {
    	if(entities[i].collumn == collumn + 1) {
    		sameTime.push(i)
    	}
    	if(i == entities.length - 1) {
    	    if(sameTime.length > 0) {
    		console.log(sameTime)
    		if(sameTime.length % 2 == 0) {
    			entities.push(new Board(collumn + 1, (sameTime.length) / 2, data));
    		} else {
                entities.push(new Board(collumn + 1, (-1 * (sameTime.length + 1) / 2), data));
    		}
    		triggered = true
    		return false;
    	    } else {
        		entities.push(new Board(collumn + 1, 0, data))
        		triggered = true
        		return false;
    	    }
    	}
	}
}
