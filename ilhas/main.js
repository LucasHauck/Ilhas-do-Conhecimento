let scale = 1;
let played = false
let questionsX;
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
	let j = 0;
//	spritesFromTileset('tileset1.png', (i, j) => { console.log('tileset1_' + ('00' + j.toString(10)).slice(-2) + '.png'); return 'tileset1_' + ('00' + j.toString(10)).slice(-2) + '.png'}, 32, 32)
//	spritesFromTileset('tileset3.png', (i, j) => { console.log('tileset1_' + ('000' + j.toString(10)).slice(-3) + '.png'); return 'tileset3_' + ('000' + j.toString(10)).slice(-3) + '.png'}, 32, 32)
	spritesFromTileset('player.png', (i, j) => { return 'player' + i + '.png'}, 32, 32)
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
			x: width('gameMap0.tls')*32/2-50,
			y: height('gameMap0.tls')*32-150,
			speed: 4
		},
		{
			x: centerX()-80,
			y: 160,
			speed: 4
		},
		{
			x: 550,
			y: 500,
			speed: 4,
			scrX: 32,
			scrY: 100
		},
		{
			x: 32,
			y: 100,
			speed: 4,
			scrX: 32,
			scrY: 100
		},
		{
			x: 160,
			y: 96,
			speed: 4,
			scrX: 32,
			scrY: 100
		},
		{
			x: width()/2-16,
			y: height('passageMap.tls')*32-128,
			speed: 4
		}
	]
	player.frame = 0
	player.frameBase = 0
	guepard = {
		active: false,
		x: 32,
		y: 96,
		path: []
	}
	subjectNames = ['Matematica', 'Portugues', 'Geografia', 'Historia', 'Ciencias']
	allHouses = []
	j = 0
 	allHouses = [0, 1, 2, 3, 4].map((e, i) => {
 		j = 0;
 		return [{x: 17, y: 40}, {x: 7, y: 40}, {x: 11, y: 30}].map((e, i) => {
			return (( x, y) => {
					j++
					return  {
						type: (j-1)%4,
						x: x*32,
						y: y*32,
						path: 'house'+(j-1)%4+'.jpg',
						indexInMap: j-1,
						inside: 'map'+0+'houseMap' + (j-1)%4
					}
			})( e.x, e.y)	
		})
	})
	allStatues = []
	for(let i = 0; i < 5; i++){ 
		let map = 'gameMap' + 0 + 'Layer1.tls'
		let j = 0;
		allStatues.push(generateEntitiesFromTiles((v, x, y) => {
			if(v == '0065'){
				j++
				return  {
					x: x*32,
					y: y*32,
					path: 'statues.png'	,
					updateMinigame: minigameUpdates[(j-1)%3]
				}
			}
		}, map))	
	}
	allNotepads = []
	lines = [
		assets['math.txt'].split('\n\n\n\n').map(e => e.split('\n\n\n').map(e => e.split('\n\n'))),
		assets['portuguese.txt'].split('\n\n\n\n').map(e => e.split('\n\n\n').map(e => e.split('\n\n'))),
		assets['geografy.txt'].split('\r\n\r\n\r\n').map(e => e.split('\r\n\r\n')),
		assets['science.txt'].split('\n\n\n\n').map(e => e.split('\n\n\n').map(e => e.split('\n\n'))),
		assets['science.txt'].split('\n\n\n\n').map(e => e.split('\n\n\n').map(e => e.split('\n\n'))),
	]
	for(let j = 0; j < allHouses.length; j++){
		let buff = []
		for(let i = 0; i < allHouses[0].length; i++){
			let map = 'insideHomeLayer1.tls'
			buff.push(generateEntitiesFromTiles((v, x, y) => {
				if(v == '0013' || v == '0014'){
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
	}
	j = 0
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
		let map ='gameMap' + 0 + 'Layer1.tls'
		questionTeachers.push(generateEntitiesFromTiles((v, x, y) => {
			if(v == 'teac'){
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
		assets['mathQuestions.txt'].split('\n\n').map(e => e.split('\n')),
		assets['portugueseQuestions.txt'].split('\n\n').map(e => e.split('\n')),
		assets['geografyQuestions.txt'].split('\n\n').map(e => e.split('\n')),
		assets['scienceQuestions.txt'].split('\n\n').map(e => e.split('\n')),
	]
}

function update(){
	room()
}	