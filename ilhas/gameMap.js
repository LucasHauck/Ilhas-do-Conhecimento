let starFrameX = 136
function gameMapUpdate(){
	let old = JSON.parse(JSON.stringify(player[0]))
	render('gameMap' + subject +'Layer1.tls',player[0].camX, player[0].camY)

	sprite('gameTrees.png',Math.min(0, -player[0].camX-48), Math.min(0, -player[0].camY+72))
	houses.forEach((e, i) => {
		houseUpdate(e, 0)
	})
	if(mapName == 'gameMap'+subject+'.tls'){
		statues.forEach((e, i) => {
			statueUpdate(e, 0)
		})
		if(played)questionsTeacherUpdate(0)
		playerUpdate(0)
		//teacherUpdate(0)
		//write(tickets, 640-textWidth(tickets, '2rem slkscr')-32, 8, 'white', '2rem slkscr')
	}
	render('gameMap' + subject +'.tls', Math.min(old.camX, width('gameMap0.tls')*32-width()), old.camY)
	sprite('houses.png', Math.min(200, -(player[0].camX - 200)), Math.min(200, -(player[0].camY - 350)))
	monkeyUpdate()
	sprite('stars.png', 0, 0, 1, 1, starFrameX, 0, 136, 84)
	if(timerValue(0) > 100 && (starFrameX/136-1)%12!=0){
		starFrameX+=136
		timerStart(0)
	}
}