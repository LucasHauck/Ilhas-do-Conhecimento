function statueUpdate(statue){
	if(overlaps(player[0].x, player[0].y, 32, 32, statue.x-8, statue.y-8, 48, 48)){
		if(isJustPressed(' ')){
			room = statue.updateMinigame
			if(statue.updateMinigame == mazeUpdate){
				mapName = 'mapMaze.tls'
			}
		}
		write('Aperte espaço para começar o minigame', centerTextX('Aperte espaço para começar o minigame', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	}
}