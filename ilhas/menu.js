function menuUpdate(){
	sprite('menuBackground.jpg')
	write('PLAY', centerTextX('PLAY'), centerTextY('PLAY'), "black")
	if(overlaps(tx, ty, 10, 10, centerTextX('PLAY'), centerTextY('PLAY'), textWidth('PLAY'), fontHeight('PLAY'))){
		room = islandSelectUpdate
	}
}