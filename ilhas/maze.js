function mazeUpdate(){
	render('maze.tls')
	playerUpdate(4)
	var finder = new PF.AStarFinder();
	var matrix = assets['maze.tls'].tiles.map(e => e.map(e2 => (assets['maze.tls'].walkable[e2] == 'true' ? 0 : 1)))
	var grid = new PF.Grid(matrix);
	guepard.path = finder.findPath(Math.floor(guepard.x/32), Math.floor(guepard.y/32), Math.floor(player[4].x/32), Math.floor(player[4].y/32), grid)
	sprite('monkey.png', guepard.x, guepard.y, 1, 1, 0, 0, width('monkey.png'), height('monkey.png'), player[4].camX, player[4].camY, mapName)
	if(overlaps(player[4].x, player[4].y, 32, 32, guepard.x, guepard.y, 32, 32)){
		room = gameMapUpdate
		guepard = {
			active: false,
			x: 32,
			y: 32,
			path: []
		}
		player[4] = {
			y: 100,
			x: 32,
			speed: 2,
			scrX: 32,
			scrY: 100
		}
		return
	}
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