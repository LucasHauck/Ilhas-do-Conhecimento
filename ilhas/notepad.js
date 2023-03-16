function notepadUpdate(notepad, i){
	if(overlaps(notepad.x-8, notepad.y-8, width('notepad.png')+16, height('notepad.png')+16, player[i].x, player[i].y, 32, 32)){
		if(keys[' '] == justPressed){
			notepad.openned = !notepad.openned
			if(!notepad.readed){
				notepad.indexInHouse = biggestBookReaded
				biggestBookReaded++
			}
			notepad.readed = true
		}
		write('Aperte espaço para ler o bloco de notas', centerTextX('Aperte espaço para ler o bloco de notas', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	} else {
		notepad.openned = false
	}
	if(notepad.openned){
		sprite('notepadOpenned.png', centerX('notepadOpenned.png'), centerY('notepadOpenned.png'))
		writeMulti(lines[subject][insideHouse.indexInMap][notepad.indexInHouse].split('\n')[0].split('\\n').join('\n'), centerX('notepadOpenned.png')+50, centerY('notepadOpenned.png')+40, 'black', '0.5rem slkscr', 150)
		writeMulti(lines[subject][insideHouse.indexInMap][notepad.indexInHouse].split('\n')[1].split('\\n').join('\n'), centerX('notepadOpenned.png')+270, centerY('notepadOpenned.png')+40, 'black', '0.5rem slkscr', 150)
	}
	return notepad
}