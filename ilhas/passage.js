function passageUpdate(){
	render('passageMap.tls', player[5].camX, player[5].camY, 0, 0)
	playerUpdate(5)
	if(player[5].y < 0){
		room = gameMapUpdate
		mapName = 'gameMap'+subject+'.tls'
	}
}