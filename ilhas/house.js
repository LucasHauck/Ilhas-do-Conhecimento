function houseUpdate(house, i){
	if(overlaps(player[i].x-16, player[i].y-16, 64, 64, house.x-50, house.y-50, 200, 200)){
		if(keys[' '] == justPressed){
			console.log('kjhb2fyru v rhflkgfgioçbkj,')
			room = insideHouseUpdate;
			insideHouse = house
			mapName = 'insideHomeLayer1.tls'
			notepads = allNotepads[subject][house.type]
		}
		writeUI('Aperte espaço para entrar na casa', centerTextX('Aperte espaço para entrar na casa', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	}
}