function questionsTeacherUpdate(i){
	sprite('teacher.png', questionTeachers[subject].x, questionTeachers[subject].y, 1, 1, 0, 0, width('teacher.png'), height('teacher.png'), player[0].camX, player[0].camY, mapName)
	if(overlaps(player[i].x-8, player[i].y-8, 48, 48, questionTeachers[subject].x, questionTeachers[subject].y+height('teacher.png')/10-16, width('teacher.png')/10, 16)){
		if(keys[' '] == justPressed){
			room = questionsUpdate
		}
		writeUI('Aperte espaço para interagir com o professor', centerTextX('Aperte espaço para interagir com o professor', '0.5rem slskscr'), 300, 'white', '0.5rem slkscr')
	}

}