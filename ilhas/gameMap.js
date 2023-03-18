function gameMapUpdate(){
	let old = JSON.parse(JSON.stringify(player[0]))
	sprite('mapWorking.png', 0, 0, 1, 1, Math.max(0, Math.min(player[0].camX, width('mapWorking.png')-width()+16)), Math.max(0, Math.min(player[0].camY, height('mapWorking.png')-height()+16)), width(), height())
	//sprite('gameMap0.png', -player[0].camX+16, -player[0].camY+16)
	houses.forEach((e, i) => {
		houseUpdate(e, 0)
	})
	if(mapName == 'gameMap'+subject+'.tls'){
		statues.forEach((e, i) => {
			statueUpdate(e, 0)
		})
		questionsTeacherUpdate(0)
		playerUpdate(0)
		//monkeyUpdate()
		//teacherUpdate(0)
		//write(tickets, 640-textWidth(tickets, '2rem slkscr')-32, 8, 'white', '2rem slkscr')
	}
	render('gameMap' + subject +'.tls',Math.max(0, Math.min(old.camX, width('mapWorking.png')-width()+16)), Math.max(0, Math.min(old.camY, height('mapWorking.png')-height()+16)), 0, 0)

}