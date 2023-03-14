function gameMapUpdate(){
	render('gameMap' + subject +'.tls', player[0].camX, player[0].camY, 0, 0)
	houses.forEach((e, i) => {
		houseUpdate(e, 0)
	})
	if(mapName == 'gameMap'+subject+'.tls'){
		statues.forEach((e, i) => {
			statueUpdate(e, 0)
		})
		playerUpdate(0)
		monkeyUpdate()
		teacherUpdate(0)
		questionsTeacherUpdate(0)
		write(tickets, 640-textWidth(tickets, '2rem slkscr')-32, 8, 'white', '2rem slkscr')
	}
}