let fs = require('fs')
const util = require('util')
let ctt = JSON.parse(fs.readFileSync('assets/map/sprite.json').toString())
console.log(ctt['layers'][2])
let tiles = ctt['layers'][2]['cels'][0]['tilemap']
let tileset = ctt['layers'][2]['tileset']
let tilesetnames = ctt['tilesets']
console.log(ctt['layers'][2]['tileset'])
console.log(ctt)
let tilemap = JSON.stringify(tiles['tiles'].map((e,i) => ((i%tiles.height) == 0 ? tiles['tiles'].slice(i, i+tiles.height) : [])).filter(e => e.length != 0)).split('],').join('\n').split('[').join('').split(']').join('').split('\n').map((e) => e.split(',').map(e2 => ('0000' + e2).slice(-4)).join(',')).join('\n')
console.log(tiles)
console.log(tilemap)
console.log(Array.from(new Set(tilemap.split('\n').map(e => e.split(',')).flat(2))).map(e => e + '.path = ' + tilesetnames[tileset]['image'].slice(5, -4) + '_' + e.slice(-3) + '.png').join('\n'))