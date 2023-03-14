function statueUpdate(statue){
	sprite(statue.path, statue.x, statue.y, 1, 1, 0, 0, 32, 32, player[0].camX, player[0].camY, mapName)
	if(overlaps(player[0].x, player[0].y, 32, 32, statue.x-8, statue.y-8, 48, 48)){
		if(isJustPressed(' ')) room = statue.updateMinigame
		write('Aperte espaço para começar o minigame', centerTextX('Aperte espaço para começar o minigame', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	}
}