function notepadUpdate(notepad, i){
	if(overlaps(notepad.x, notepad.y, width('notepad.png')/2, height('notepad.png')/2, player[i].x/2, player[i].y/2, 16, 16)){
		if(keys[' '] == justPressed){
			notepad.openned = !notepad.openned
			if(!notepad.readed){
				notepad.indexInHouse = biggestBookReaded
				biggestBookReaded++
			}
			currentPage = 0
			notepad.readed = true
		}
		write('Aperte espaço para ler o bloco de notas', centerTextX('Aperte espaço para ler o bloco de notas', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	} else {
		notepad.openned = false
	}
	if(notepad.openned){
		sprite('notepadOpenned.png', centerX('notepadOpenned.png'), centerY('notepadOpenned.png'))
		if(currentPage < lines[subject][insideHouse.indexInMap][notepad.indexInHouse].length - 1)if(clickableImage('arrow.png', 470, 240, 0.5, 0.5) || isJustPressed('ArrowRight')){
			currentPage++
		}
		if(currentPage > 0)if(clickableImage('arrowInversed.png', 150, 240, 0.5, 0.5) || isJustPressed('ArrowLeft')){
			currentPage--
		}
		if(currentPage >= lines[subject][insideHouse.indexInMap][notepad.indexInHouse].length) currentPage = lines[subject][insideHouse.indexInMap][notepad.indexInHouse].length - 1
		writeMulti(lines[subject][insideHouse.indexInMap][notepad.indexInHouse][currentPage].split('\n')[0].split('\\n').join('\n'), centerX('notepadOpenned.png')+50, centerY('notepadOpenned.png')+40, 'black', '0.5rem slkscr', 150)
		writeMulti(lines[subject][insideHouse.indexInMap][notepad.indexInHouse][currentPage].split('\n')[1].split('\\n').join('\n'), centerX('notepadOpenned.png')+270, centerY('notepadOpenned.png')+40, 'black', '0.5rem slkscr', 150)
	}
	return notepad
}