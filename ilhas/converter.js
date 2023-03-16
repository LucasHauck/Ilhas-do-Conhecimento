let fs = require('fs')
const util = require('util')
let ctt = JSON.parse(fs.readFileSync('assets/gameMap0.json').toString())
let tiles = ctt['layers'][0]['cels'][0]['tilemap']
let tileset = ctt['layers'][0]['tileset']
let tilesetnames = ctt['tilesets']
let tilemap = JSON.stringify(tiles['tiles'].map((e,i) => ((i%tiles.width) == 0 ? tiles['tiles'].slice(i, i+tiles.width) : [])).filter(e => e.length != 0)).split('],').join('\n').split('[').join('').split(']').join('').split('\n').map((e) => e.split(',').map(e2 => ('0000' + e2).slice(-4)).join(',')).join('\n')
console.log(23)
console.log(tilemap)
console.log(':tileset = islandStartTileset.png')
console.log(Array.from(new Set(tilemap.split('\n').map(e => e.split(',')).flat(2))).map((e, i) => e + '.walkable = ' + 'false\n' + e + '.cutY = ' + (parseInt(e))*32).join('\n'))