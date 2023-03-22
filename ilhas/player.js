function playerUpdate(i){
	let mx = axisX()*player[i].speed*dt
	let my = axisY()*player[i].speed*dt
	player[i].x += mx
	if(mx > 0.5) {
		player.frameBase = 52
	} else if(mx < -0.5) {
		player.frameBase = 44
	} else if(my == 0) {
		player.frameBase = 0
	}
	player.frame += (mx != 0 ? 0.2 : 0)
	player.frame = (player.frame > 7 ? 0 : player.frame)

/*	if(i == 0 && (
		overlaps(player[i].x, player[i].y, 32, 32, houses, width('house0.jpg')/10, height('house0.jpg')/10) ||
		overlaps(player[i].x, player[i].y, 32, 32, monkey.x, monkey.y, width('monkey.png'), height('monkey.png'))
		)
	){
		player[i].x -= axisX()*player[i].speed
	}
	if(i == 1 && 
		(
			overlaps(player[i].x, player[i].y, 32, 32, notepads, width('notepad.png'), height('notepad.png'))
		)
	)
	{

		player[i].x -= mx
	}*/
	if((i == 1 && (overlaps((player[i].x+64)/2, (player[i].y+64)/2, 16, 16 	, mapName, 32, 32) || player[i].x < 72 || player[i].x > width()-72)) || (i != 1 && i != 0 && overlaps(player[i].x, player[i].y, 32, 32, mapName, 32, 32)) || (i == 0 && player[0].x < 370 && overlaps(player[i].x+8, player[i].y+8,16, 16, mapName, 32, 32)) || (i == 0 && player[0].x > 370 && player[0].x < 550 && overlaps(player[i].x+8, player[i].y+8,16, 16, mapName, 32, 32)) || (i == 0 && player[0].x > 550 && overlaps(player[i].x+8, player[i].y+8,16, 16, mapName, 32, 32))){
		player[i].x -= mx
	}
	player[i].y += my
	if(my > 0.5) {
		player.frameBase = 35
	} else if(my < -0.5) {
		player.frameBase = 59
	} else if(mx == 0) {
		player.frameBase = 0
	}
	player.frame += (my != 0 ? 0.2 : 0)
	player.frame = (player.frame > 7 ? 0 : player.frame)
	/*if(i == 0 && (
		overlaps(player[i].x, player[i].y, 32, 32, houses, width('house0.jpg')/10, height('house0.jpg')/10) ||
		overlaps(player[i].x, player[i].y, 32, 32, monkey.x, monkey.y, width('monkey.png'), height('monkey.png'))
		)
	){
		player[i].y -= axisY()*player[i].speed
	}
	if(i == 1 &&
		(
			overlaps(player[i].x, player[i].y, 32, 32, notepads, width('notepad.png'), height('notepad.png'))
		)
	)
	{
		player[i].y -= my
	}*/
	if((i == 1 && (overlaps((player[i].x+64)/2, (player[i].y+64)/2, 16, 16, mapName, 32, 32) || player[i].x < 72 || player[i].x > width()-72)) || (i != 1 && i != 0 && overlaps(player[i].x, player[i].y, 32, 32, mapName, 32, 32)) || (i == 0 && player[0].x < 370 && overlaps(player[i].x+8, player[i].y+8,16, 16, mapName, 32, 32)) || (i == 0 && player[0].x > 370 && player[0].x < 550 && overlaps(player[i].x+8, player[i].y+8,16, 16, mapName, 32, 32)) || (i == 0 && player[0].x > 550 && overlaps(player[i].x+8, player[i].y+8,16, 16, mapName, 32, 32))){
		player[i].y -= my
	}
	player[i].camX = player[i].x-width()/2-16
	player[i].camY = player[i].y-height()/2-16
	player[i].camX = Math.min(player[i].camX, width('gameMap0.tls')*32-width())
	player[i].camY = Math.min(player[i].camY, height('gameMap0.tls')*32-height()-32)
	sprite('player' + Math.floor(player.frameBase + player.frame) + '.png', player[i].x, player[i].y, 1, 1, 0, 0, 32, 32, player[i].camX, player[i].camY, mapName)
}