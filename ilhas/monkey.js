function monkeyUpdate(){
	if(monkey.active || monkey.talking){
		sprite('monkey.png', monkey.x, monkey.y, 1, 1, 0, 0, 32, 32, player[0].camX, player[0].camY, mapName)
	}
	if(monkey.active){
		if(monkey.path.length <= 0){
			monkey.active = false
			monkey.talking = true
			monkey.message = 'Escolha uma estatua, interaja com ela e se divirta!'
		} else if(monkey.x == monkey.path[0][0]*32 && monkey.y == monkey.path[0][1]*32){
			monkey.path.shift()
		} else {
			if(monkey.x < monkey.path[0][0]*32){
				monkey.x++
			}
			if(overlaps(player[0].x, player[0].y, 32, 32, monkey.x, monkey.y, 32, 32)){
				monkey.x--
			}
			if(monkey.x > monkey.path[0][0]*32){
				monkey.x--
			}
			if(overlaps(player[0].x, player[0].y, 32, 32, monkey.x, monkey.y, 32, 32)){
				monkey.x++
			}
			if(monkey.y < monkey.path[0][1]*32){
				monkey.y++
			}
			if(overlaps(player[0].x, player[0].y, 32, 32, monkey.x, monkey.y, 32, 32)){
				monkey.y--
			}
			if(monkey.y > monkey.path[0][1]*32){
				monkey.y--
			}
			if(overlaps(player[0].x, player[0].y, 32, 32, monkey.x, monkey.y, 32, 32)){
				monkey.y++
			}
		}
	}
	if(monkey.talking){
		sprite('black.png', 0, 250, 100, 100)
		write(monkey.message, 5, 255, 'white', '0.5rem slkscr')
		if(isJustPressed(' ')){
			if(monkey.path.length > 0)
			monkey.active = true
			monkey.talking = false
		}
	}
}