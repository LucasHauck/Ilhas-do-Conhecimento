let scale = 1;
let room = menuUpdate
let subject;
let subjectNames;
let player;
let houses;
let allHouses;
let allStatues;
let statues;
let insideHouse;
let allNotepads;
let notepads;
let monkey;
let basket;
let coconut;
let coconutPoints;
let trunks;
let tickets;
let lines;
let biggestBookReaded;
let mapName;
let riverPlayer
let minigameUpdates = [
	coconutUpdate,
	riverUpdate
]
let teacher;
function start(){
	
	biggestBookReaded = 0
	tickets = 0
	coconutPoints = 0
	basket = {
		x: centerX('coconutBasket.png'),
		y: 300
	}
	coconut = {
		x: random()%300-150+basket.x,
		y: -32,
	}	
	monkey = {
		active: false,
		x: -32,
		y: -32,
		talking: false
	}
	player = [
		{
			x: 32,
			y: 100,
			speed: 2,
			scrX: 32,
			scrY: 100
		},
		{
			x: centerX(),
			y: 290,
			speed: 2
		}
	]
	subjectNames = ['Matematica', 'Portugues', 'Historia', 'Ciencias', 'Geografia']	
	allHouses = []
	for(let i = 0; i < 2; i++){
		let map = 'gameMap' + i + '.tls'
		let j = 0;
		allHouses.push(generateEntitiesFromTiles((v, x, y) => {
			if(v == '0001'){
				j++
				return  {
					type: (j-1)%4,
					x: x*32,
					y: y*32,
					path: 'house'+(j-1)%4+'.jpg',
					indexInMap: j-1,
					inside: 'map'+i+'houseMap' + (j-1)%4
				}
			}
		}, map))
	}
	allStatues = []
	for(let i = 0; i < 2; i++){
		let map = 'gameMap' + i + '.tls'
		let j = 0;
		allStatues.push(generateEntitiesFromTiles((v, x, y) => {
			if(v == '0004' || v == '0005'){
				j++
				return  {
					x: x*32,
					y: y*32,
					path: 'statues.png'	,
					updateMinigame: minigameUpdates[(j-1)%2]
				}
			}
		}, map))	
	}
	allNotepads = []
	lines = [
		assets['math.txt'].split('\r\n\r\n\r\n').map(e => e.split('\r\n\r\n')),
		assets['portuguese.txt'].split('\r\n\r\n\r\n').map(e => e.split('\r\n\r\n'))
	]
	for(let j = 0; j < allHouses.length; j++){
		for(let i = 0; i < allHouses[0].length; i++){
			let map ='map' + j + 'houseMap' + i + 'layer1.tls'
			allNotepads.push(generateEntitiesFromTiles((v, x, y) => {
				if(v == '0001'){
					return  {
						x: x*32,
						y: y*32,
						openned: false,
						readed: false,
					}
				}
			}, map))
		}
	}
	let j = 0;
	trunks = generateEntitiesFromTiles((v, x, y) => {
		if(['0001', '0002', '0003', '0004'].indexOf(v) != -1){
			j++
			return {
				x: x*32,
				y: y*48,
				speed: Math.floor(Math.sqrt((j%2+1)* j))%5+(Math.sin(j%3+j))*Math.sqrt(j)*2
			}
		}
	}, 'riverMap.tls')
	console.log(allHouses)
	riverPlayer = trunks.length-1
}

function update(){
	room()
}