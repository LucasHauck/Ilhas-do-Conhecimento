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
let questionTeachers;
let minigameUpdates = [
	coconutUpdate,
	riverUpdate,
	mazeUpdate
]
let teacher;
function start(){
//	spritesFromTileset('tileset1.png', (i, j) => { console.log('tileset1_' + ('00' + j.toString(10)).slice(-2) + '.png'); return 'tileset1_' + ('00' + j.toString(10)).slice(-2) + '.png'}, 32, 32)
//	spritesFromTileset('tileset3.png', (i, j) => { console.log('tileset1_' + ('000' + j.toString(10)).slice(-3) + '.png'); return 'tileset3_' + ('000' + j.toString(10)).slice(-3) + '.png'}, 32, 32)
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
			x: width('gameMap0.tls')*32/2-230,
			y: height('gameMap0.tls')*32-150,
			speed: 2,
		},
		{
			x: centerX(),
			y: 290,
			speed: 2
		},
		{
			x: 32,
			y: 100,
			speed: 2,
			scrX: 32,
			scrY: 100
		},
		{
			x: 32,
			y: 100,
			speed: 2,
			scrX: 32,
			scrY: 100
		},
		{
			x: 32,
			y: 100,
			speed: 2,
			scrX: 32,
			scrY: 100
		},
		{
			x: width()/2-width('player.png')/2-32,
			y: height('passageMap.tls')*32-64,
			speed: 2,
		}
	]
	guepard = {
		active: false,
		x: 32,
		y: 32,
		path: []
	}
	subjectNames = ['Matematica', 'Portugues', 'Geografia', 'Historia', 'Ciencias']
	allHouses = []
	for(let i of [0]){
		let map = 'gameMap' + i + '.tls'
		let j = 0;
	/*	allHouses.push(generateEntitiesFromTiles((v, x, y) => {
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
		}, map))*/
	}
	/*allStatues = []
	for(let i = 0; i < 1; i++){
		let map = 'gameMap' + i + '.tls'
		let j = 0;
		allStatues.push(generateEntitiesFromTiles((v, x, y) => {
			if(v == '0004' || v == '0005' || v == '0007'){
				j++
				return  {
					x: x*32,
					y: y*32,
					path: 'statues.png'	,
					updateMinigame: minigameUpdates[(j-1)%3]
				}
			}
		}, map))	
	}*/
	allNotepads = []
	lines = [
		assets['math.txt'].split('\r\n\r\n\r\n').map(e => e.split('\r\n\r\n')),
		assets['portuguese.txt'].split('\r\n\r\n\r\n').map(e => e.split('\r\n\r\n')),
		assets['geografy.txt'].split('\r\n\r\n\r\n').map(e => e.split('\r\n\r\n'))
	]
/*	for(let j = 0; j < allHouses.length; j++){
		let buff = []
		for(let i = 0; i < allHouses[0].length; i++){
			let map ='map' + j + 'houseMap' + i + 'layer1.tls'
			buff.push(generateEntitiesFromTiles((v, x, y) => {
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
		allNotepads.push(buff)
	}*/
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
	questionTeachers = []
	for(let j = 0; j < allHouses.length; j++){
		let map ='gameMap' + j + '.tls'
		questionTeachers.push(generateEntitiesFromTiles((v, x, y) => {
			if(v == '0006'){
				return {
					x: x*32,
					y: y*32
				}
			}
		}, map)[0])
	}
	console.log(allHouses)
	riverPlayer = trunks.length-1
	questions = [
		assets['mathQuestions.txt'].split('\n\n').map(e => e.split('\n'))
	]
}

function update(){
	room()
}	