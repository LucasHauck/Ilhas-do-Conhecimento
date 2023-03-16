function islandStartUpdate(){
	render('islandStartLayer1.tls', player[2].camX, player[2].camY, 0, 0)
	render('islandStartLayer0.tls', player[2].camX, player[2].camY, 0, 0)
	playerUpdate(2)
	if(player[2].y < 0){
		room = passageUpdate
		mapName = 'passageCollider.tls'
		player[5].camX = 0
		player[5].camY = 0
	}
}