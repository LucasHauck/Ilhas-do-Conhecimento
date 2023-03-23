let bananas = [{x:21*32, y: 18*32}, {x: 10*32, y: 22*32}, {x: 44*32, y: 23*32}] 
function mazeUpdate(){
	sprite('groundMaze.png')
	playerUpdate(4)
	var finder = new PF.AStarFinder();
	var matrix = assets['mapMaze.tls'].tiles.map(e => e.map(e2 => (assets['mapMaze.tls'].walkable[e2] == 'true' ? 0 : 1)))
	var grid = new PF.Grid(matrix);
	guepard.path = finder.findPath(Math.floor(guepard.x/32), Math.floor(guepard.y/32), Math.floor(player[4].x/32), Math.floor(player[4].y/32), grid)
	render('mapMaze.tls', player[4].camX, player[4].camY-32)
	sprite('monkey.png', guepard.x, guepard.y, 1, 1, 0, 0, width('monkey.png'), height('monkey.png'), player[4].camX, player[4].camY, mapName)
	bananas.forEach((e, i) => {
		if(overlaps(player[4].x, player[4].y, 32, 32, e.x, e.y, 32, 32)){
			bananas.splice(i, 1)
		}
		sprite('banana.png', (player[4].camX <= 0 ? e.x : e.x - player[4].camX), (player[4].camY <= 0 ? e.y : e.y - player[4].camY))
	})
	if(bananas.length == 0){
		room  = gameMapUpdate
		mapName = 'gameMap0.tls'
		if(!played){
			timerStart(0)
			starFrameX+=136
			played = true
			stars++
		}

	}
	if(overlaps(player[4].x, player[4].y, 32, 32, guepard.x, guepard.y, 32, 32)){
		room = gameMapUpdate
		guepard = {
			active: false,
			x: 32,
			y: 96,
			path: []
		}
		player[4] = {
			x: 160,
			y: 96,
			speed: 4,
			scrX: 32,
			scrY: 100
		}
		mapName = 'gameMap0.tls'
		return
	}
	for(let k = 0; k < 2; k++){
	if(guepard.x < guepard.path[1][0]*32){
		guepard.x++
	}
	if(guepard.x > guepard.path[1][0]*32){
		guepard.x--
	}
	if(guepard.y < guepard.path[1][1]*32){
		guepard.y++
	}
	if(guepard.y > guepard.path[1][1]*32){
		guepard.y--
	}
}
}
