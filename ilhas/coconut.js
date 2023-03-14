function coconutUpdate(){
	sprite('coconutBackground.png', 0, 0, 5, 5)
	sprite('coconutBasket.png', basket.x, basket.y, 2, 2)
	sprite('coconut.png', coconut.x, coconut.y)
	for(let i = 0; i < 10; i++){
		if(i < coconutPoints){
			sprite('coconut.png', i*32+15, 5, 0.75, 0.75)
		} else {
			sprite('emptyCoconut.png', i*32+15, 5, 0.75, 0.75)
		}
	}
	if(coconutPoints >= 10){
		room = gameMapUpdate
	}
	basket.x += axisX() * (mobileCheck() ? 5 : 3.4)
	coconut.y += 5
	if(coconut.y > 420){
		coconut = {
			x: random()%350-150+basket.x,
			y: -32,
		}
		coconutPoints = 0
		basket = {
			x: centerX('coconutBasket.png'),
			y: 300
		}
		room = gameMapUpdate
	}
	if(overlaps(coconut.x, coconut.y, 32, 32, basket.x, basket.y, 32, 32)){
		coconutPoints++
		coconut = {
			x: random()%300-150+basket.x,
			y: -32,
		}	
	}
}