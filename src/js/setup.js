let directs = [
	[0, 1], [0, -1], [1, 0], [-1, 0] // checking directions
];
let checkBoard = []
let backup = [];
let entities = [];
let present = 2; // white
let boardSize = 5; // 5x5 grid
let triggered = false