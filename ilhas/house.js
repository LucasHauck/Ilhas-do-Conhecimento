function houseUpdate(house, i){
	let spr = 'house' + house.type + '.jpg'
	sprite(spr, house.x, house.y, 0.1, 0.1, 0, 0, width(spr), height(spr), player[i].camX, player[i].camY, mapName)
	if(overlaps(player[i].x-8, player[i].y-8, 48, 48, house.x, house.y+height(house.path)/10-16, width(house.path)/10, 16)){
		if(keys[' '] == justPressed){
			console.log('kjhb2fyru v rhflkgfgioçbkj,')
			room = insideHouseUpdate
			insideHouse = house
			mapName = house.inside + 'layer0.tls'
			notepads = allNotepads[subject][house.type]
		}
		writeUI('Aperte espaço para entrar na casa', centerTextX('Aperte espaço para entrar na casa', '0.5rem slkscr'), 300, 'white', '0.5rem slkscr')
	}
}