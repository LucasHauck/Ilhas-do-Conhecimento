function questionsTeacherUpdate(i){
	sprite('teacher.png', questionTeachers[subject].x, questionTeachers[subject].y, 0.1, 0.1, 0, 0, width('teacher.png'), height('teacher.png'), player[i].camX, player[i].camY, mapName)
	if(overlaps(player[i].x-8, player[i].y-8, 48, 48, questionTeachers[subject].x, questionTeachers[subject].y+height('teacher.png')/10-16, width('teacher.png')/10, 16)){
		if(keys[' '] == justPressed){
			console.log('kjhb2fyru v rhflkgfgioçbkj,')
			room = questionsUpdate
		}
		writeUI('Aperte espaço para interagir com o professor', centerTextX('Aperte espaço para interagir com o professor', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	}

}