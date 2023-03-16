function islandSelectUpdate(){
	for(let i = 0; i < 640/32; i++){
		for(let j = 0; j < 360/32+1; j++){
			sprite('water.png', i*32, j*32)
		}	
	}	
	for(let i = 0; i < 3; i++){
		let x = centerX()-(3*64+2*64)/2+i*128, y = 64
		if(clickableImage('island.png', x-36, y-6)){
			room = islandStartUpdate
			subject = i
			//mapName = 'gameMap' + subject + '.tls'
			mapName = 'islandStartLayer0.tls'
			houses = allHouses[i]
			statues = allStatues[i]
			teacher = {
				x: statues[0].x-32,	
				y: statues[0].y-32,
				talking: false
			}
		}
		sprite('statues.png', x, y, 2, 2, i*32, 0, 32, 32)
		write(subjectNames[i], x+6, y+100, 'white', '0.5rem slkscr')
	}
	for(let i = 0; i < 2; i++){
	let x = centerX()-(2*64+64)/2+i*128, y = 196;
		if(clickableImage('island.png', x-36, y-6)){
			room = islandStartUpdate
			subject = i+3
			mapName = 'mapIslandStart.tls'
			houses = allHouses[i+3]
			statues = allStatues[i+3]
			teacher = {
				x: statues[0].x-32,	
				y: statues[0].y-32,
				talking: false
			}
		}
		sprite('statues.png', x, y, 2, 2, (i+3)*32, 0, 32, 32)
		write(subjectNames[i+3], x+6, y+100, 'white', '0.5rem slkscr')		
	}
}