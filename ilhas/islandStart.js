function islandStartUpdate(){
	let old = JSON.parse(JSON.stringify(player[2]))
	render('islandStartLayer1.tls', player[2].camX, player[2].camY, 0, 0)
	playerUpdate(2)
	render('islandStartLayer0.tls', old.camX, old.camY, 0, 0)
	if(player[2].y < 12){
		room = passageUpdate
		mapName = 'passageCollider.tls'
		player[5].camX = 0
		player[5].camY = 0
	}
}