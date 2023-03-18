function insideHouseUpdate(){
	render('insideHome.tls', 0, 0, 0, 0, 2, 2)
	playerUpdate(1)
	render('insideHomeLayer1.tls', 0, 0, 0, 0, 2, 2)
	notepads.map((e, i) => {
		return notepadUpdate(e, 1)
	})
	if(player[1].y > 360-150){
		player[0].y = insideHouse.y+160
		player[0].x = insideHouse.x+40

		if(notepads.filter(e=>!e.readed).length == 0){
			monkey.active = false
			monkey.x = player[0].x
			monkey.y = player[0].y+60
			monkey.talking = true
			var finder = new PF.AStarFinder();
			var matrix = assets['gameMap0.tls'].tiles.map(e => e.map(e2 => (assets['gameMap0.tls'].walkable[e2] == 'true' ? 0 : 1)))
			console.log(matrix)
			houses.forEach((e) => {
				matrix = matrix.map((e2, y) => {
					return e2.map((e3, x) => {
						if(x*32 - e.x < 4*32 && x*32-e.x >= 0 && y*32 - e.y < 4*32 && y*32 - e.y >= 0){
							return 1
						}
						return e3
					})
				})
			})
			console.log(matrix)
			var grid = new PF.Grid(matrix);
			monkey.message = 'Me siga até o parque!'
			monkey.path = finder.findPath(Math.floor(monkey.x/32), Math.floor(monkey.y/32), Math.floor(statues[0].x/32-2), Math.floor(statues[0].y/32-2), grid)
			console.log(monkey.path)
			tickets++
		}
		
		player[1] = {
			x: centerX()-80,
			y: 160,
			speed: 4
		}
		room = gameMapUpdate
		mapName = 'gameMap' + subject + '.tls'
	}
}