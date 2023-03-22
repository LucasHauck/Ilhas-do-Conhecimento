function teacherUpdate(i){
	sprite('teacher.png', teacher.x, teacher.y, 1,1, 0, 0, width('teacher.png'), height('teacher.png'), player[i].camX, player[i].camY, mapName)
	if(teacher.talking){
		sprite('black.png', 0, 250, 100, 100)
		write(teacher.message, 5, 255, 'white', '0.5rem slkscr')
		if(isJustPressed(' ')){
			if(teacher.selected == -1){
				room = minigameUpdates[teacher.choice]
			}
			teacher.talking = false
		}
		teacher.selected = axisX() != 0 ? Math.round(axisX()) : teacher.selected 
		writeUI((teacher.selected == -1 ? '>' :  '') + 'Sim', centerX()-50, 300, 'white', '0.5rem slkscr')
		writeUI((teacher.selected == 1 ? '>' :  '') + 'Não', centerX()+50, 300, 'white', '0.5rem slkscr')
	} else if(overlaps(player[i].x-8, player[i].y-8, 48, 48, teacher.x, teacher.y, width('teacher.png'), height('teacher.png'))){
		if(keys[' '] == justPressed){
			teacher.talking = true
			teacher.selected = -1
			teacher.choice = Math.floor(Math.random()*99999)%minigameUpdates.length
			teacher.message = ['Eu precisava de alguém para catar alguns cocos na floresta para mim, você con segue fazer isso?', 'Eu precisava de alguem para levar uma encomenda ao outro lado do rio, você consegue fazer isso para mim?'][teacher.choice]
		}
		writeUI('Aperte espaço para dialogar', centerTextX('Aperte espaço para dialogar', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	}
}