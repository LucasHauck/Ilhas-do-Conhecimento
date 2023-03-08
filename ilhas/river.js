function riverUpdate(){
	render('riverMap.tls', 0, trunks[riverPlayer].y-height()/2, 0, 0, 2, 2)
	trunks.map((e, i) => {
		sprite('trunk.png', e.x, e.y, 2, 2, 0, 0, 64, 32, 0, trunks[riverPlayer].y-height()/2)
		if(i == riverPlayer){
			sprite('riverPlayer.png', e.x+40, e.y-20, 2, 2, 0, 0, 32, 32, 0, trunks[riverPlayer].y-height()/2)
		}
		if(i == riverPlayer && isJustPressed('W') || isJustPressed('arrowup')){
			riverPlayer--
			if(!overlaps(e.x, 0, 64, 32, trunks[riverPlayer].x, 0, 64, 32)){
				room = gameMapUpdate
				riverPlayer = trunks.length
				mapName = 'gameMap0.tls'
			}
			if(riverPlayer == 0){
				riverPlayer = trunks.length
				room = gameMapUpdate
				mapName = 'gameMap0.tls'				
			}
		}
		e.x += e.speed
		if(e.x > 640 && e.speed > 0)e.x = -width('trunk.png')
		if(e.x < -64 && -e.speed > 0)e.x = 640+width('trunk.png')
		return e
	})
}