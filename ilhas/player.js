function playerUpdate(i){
	let mx = axisX()*player[i].speed*dt
	let my = axisY()*player[i].speed*dt
	player[i].x += mx
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
	if((i == 1 && (overlaps((player[i].x+64)/2, (player[i].y+64)/2, 16, 16, mapName, 32, 32) || player[i].x < 72 || player[i].x > width()-72)) || (i != 1 && overlaps(player[i].x, player[i].y, 32, 32, mapName, 32, 32))){
		player[i].x -= mx
	}
	player[i].y += my
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
	if((i == 1 && overlaps((player[i].x+64)/2, (player[i].y+64)/2, 16, 16, mapName, 32, 32)) || (i != 1 && overlaps(player[i].x, player[i].y, 32, 32, mapName, 32, 32))){
		player[i].y -= my
	}
	player[i].camX = player[i].x-width()/2-16
	player[i].camY = player[i].y-height()/2-16
	sprite('player.png', player[i].x, player[i].y, 1, 1, 0, 0, 32, 32, player[i].camX, player[i].camY, mapName)
}