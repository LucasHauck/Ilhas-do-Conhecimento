let deltas = []
let delt = Date.now(), dt, justClicked, write, tx, ty, sprite, render, key, keys, clear, axisX, axisY, timers = [], timerStart, timerValue, random, width, height, dirX, dirY, centerX, centerY;
let assets = {}
let UIs = []
let justPressed = 0, pressed = 1, justReleased = 2, released = 3;
let joystick;
let canStart = false, maxImages = 0;
async function assetsLoad(){
	joystick = new Joystick(
    	document.querySelector("#joystick"),
    	{
        	scale: 1,
        	color: "rgb(177, 177, 177)",
        	strokeColor: "rgb(177, 177, 177)"
    	}
	)
	let text = await (await fetch('assets/list.txt')).text()
	let arr = text.split('\n')
	for(let i = 0; i < arr.length; i++){
		let el = arr[i]
		console.log(i)
		if(el.slice(-4) == '.png' || el.slice(-4) == '.jpg'){
			assets[el] = new Image()
			assets[el].src = 'assets/' + el
		}
		if(el.slice(-4) == 	'.txt'){
			let ctt = await (await fetch('assets/'+el)).text()
			assets[el] = ctt
		}
		if(el.slice(-4) == '.tls'){
			let values = {}
			let cells = new Set()
			let ctt = await (await fetch('assets/'+el)).text()
			let lines = ctt.split('\n')
			let height = parseInt(lines[0])
			let map = Array.from({length:height}).map((e, i) => {console.log(i); return lines[i+1].split(',')})
			assets[el] = {walkable: {}, path: {}, cutY:{}, tiles: map, width: map[0].length, height: map.length}
			lines.slice(height+1).forEach((e) => {
				if(e[0] == ':'){
					let part = e.split(':').join('').split('=').map(e => e.split('').filter(e2 => e2 != ' ').join(''))
					if(part[0] == 'tileset'){
						values['path'] = part[1]
					}
				} else {
					let parts = e.split('=')
					let cell = parts[0].slice(0, 4)
					let setting = parts[0].slice(5).split('').filter(o=>o!=' ').join('')
					let value = parts[1].split('').filter(o=>o!=' ').join('')
					console.log(e, setting.length)
					assets[el][setting] = assets[el][setting] || {}
					assets[el][setting][cell] = value
					cells.add(cell)
				}
			})
			for(k in values){
				for(j of cells){
						assets[el][k][j] = values[k]
				}
			}
		}
		if(el.slice(-5) == '.json'){
			assets[el] = await fetch('assets/'+el)
			assets[el] = JSON.parse(await assets[el].text())
		}
		canStart = true
	}
	console.log(assets);
	let canvas = document.getElementById('canvas')
	canvas.style.imageRendering = 'crisp-edges'
	canvas.style.imageRendering = 'pixelated'
	let ctx = canvas.getContext('2d',  {alpha: false})
	ctx.imageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	spritesFromTileset = (path, newNames, tileWidth, tileHeight) => {
		canStart = false
		let canvas2 = document.createElement('canvas')
		canvas2.width = tileWidth
		canvas2.height = tileHeight
		canvas2.style.imageRendering = 'crisp-edges'
		canvas2.style.imageRendering = 'pixelated'
		let ctx2 = canvas2.getContext('2d')
		ctx2.imageSmoothingEnabled = false;
		ctx2.webkitImageSmoothingEnabled = false;
		ctx2.mozImageSmoothingEnabled = false;
		maxImages = 0;
		for(let i = 0; i < width(path)/tileWidth; i++){
			for(let j = 0; j < height(path)/tileHeight; j++){
				ctx2.clearRect(0, 0, tileWidth, tileHeight)
				ctx2.drawImage(assets[path], i*tileWidth, j*tileHeight, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight)
				canvas2.style.imageRendering = 'crisp-edges'
				canvas2.style.imageRendering = 'pixelated'
				ctx2.imageSmoothingEnabled = false;
				ctx2.webkitImageSmoothingEnabled = false;
				ctx2.mozImageSmoothingEnabled = false;
				let name = newNames(i, j)
				assets[name] = new Image();
				assets[name].onload = () => {
					maxImages--
				}
				assets[name].src = canvas2.toDataURL('image/png')
				maxImages++
			}
		}
	}
	let calcSprite = (path, x, y, sx, sy, ix, iy, iw, ih, cx, cy, path2) => {
		if(x ==	undefined || y == undefined){
			x = 0
			y = 0		
		}
		if(sx == undefined  || sy == undefined ){
			sx = 1;
			sy = 1;
		}
		if(cx == undefined || cy == undefined ){
			cx = 0
			cy = 0
		}
		if(ix == undefined || iy == undefined || iw == undefined || ih == undefined){
			ix = 0;
			iy = 0;
			iw = width(path);
			ih = height(path);
		}
		cx = Math.min(Math.max(0, cx), Math.max(width(path2)*32-width(), 0))
        cy = Math.min(Math.max(0, cy), Math.max(height(path2)*32-height(), 0))
        return {sx, sy, ix, iy, iw, ih, x, cx, y, cy}
	}
	sprite = (path, _x, _y, _sx, _sy, _ix, _iy, _iw, _ih, _cx, _cy, path2) => {
		const {sx, sy, ix, iy, iw, ih, x, cx, y, cy} = calcSprite(path, _x, _y, _sx, _sy, _ix, _iy, _iw, _ih, _cx, _cy, path2)
		ctx.save()
		ctx.scale(sx, sy)
		canvas.style.imageRendering = 'crisp-edges'
		canvas.style.imageRendering = 'pixelated'
		ctx.imageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.drawImage(assets[path], ix, iy, iw, ih, (x - cx)/sx, (y-cy)/sy, iw, ih)
		ctx.restore()
	}
	keys = {}
	document.body.onkeydown = (el) => {
		if(!isPressed(el.key))
		keys[el.key.toUpperCase()] = justPressed
	}
	document.body.onkeyup = (el) => {
		keys[el.key.toUpperCase()] = justReleased
	}
	document.body.ontouchstart = (e) => {
		justClicked = true;
		let rect = e.target.getBoundingClientRect();
        var touch = e.touches || e.originalEvent.changedTouches;
        tx = (touch[0].pageX - rect.left) * (width() / rect.width)
        ty = (touch[0].pageY - rect.top) * (height() / rect.height)
	}
	document.body.ontouchmove = (e) => {
		let rect = e.target.getBoundingClientRect();
        var touch = e.touches || e.originalEvent.changedTouches;
        tx = (touch[0].pageX - rect.left) * (width() / rect.width)
        ty = (touch[0].pageY - rect.top) * (height() / rect.height)
	}
	if(!mobileCheck()){
		document.querySelector('canvas').onmousedown = (e) => {
			let rect = e.target.getBoundingClientRect();
			if((e.clientX - rect.left) * (e.target.width / rect.width) != tx)justClicked = true;
			tx = (e.clientX - rect.left) * (e.target.width / rect.width)
			ty = (e.clientY - rect.top) * (e.target.height / rect.height)
		}
	}
	isPressed = (name) => {
		return keys[name.toUpperCase()] == pressed
	}
	isJustPressed = (name) => {
		return keys[name.toUpperCase()] == justPressed
	}
	isReleased = (name) => {
		return keys[name.toUpperCase()] == released
	}
	isJustReleased = (name) => {
		return keys[name.toUpperCase()] == justReleased
	}
	render = (path, x, y, x2, y2, sx, sy) => {
		if(x == undefined)x = 0
		if(y == undefined)y = 0
		if(x2 == undefined)x2 = 0
		if(y2 == undefined)y2 = 0
		if(sx == undefined)sx = 1
		if(sy == undefined)sy = 1
		y = Math.min(Math.max(y, 0), Math.max(height(path)*32-height(), 0))
		x = Math.min(Math.max(x, 0), Math.max(width(path)*32-width(), 0))
		if(y + height()/2 > height(path)*32-height()/2)y = height(path)*32-height()
		if(x + width()/2 > width(path)*32-width()/2)x = width(path)*32-width()
		assets[path].tiles.slice(y/32, (y+height()+32)/32).forEach((e, i) => {
			 e.slice(x/32, (x+width()+32)/32).forEach((e2, i2) => {
			 	sprite(assets[path].path[e2], (x2+i2*32-x%32)*sx, (y2+i*32-y%32)*sy, sx, sy, 0, assets[path].cutY[e2] || 0, 32, 32)
			 })
		})
	}
	generateEntitiesFromTiles = (callback, path) => {
		let entities = [];
		assets[path].tiles.forEach((e, i) => {
			e.forEach((e2, j) => {
				entities.push(callback(e2, j, i))
				if(entities[entities.length-1] == undefined){
					entities.pop()
				}
			})
		})
		return entities
	}
	clickableImage = (path, _x, _y, _sx, _sy, _ix, _iy, _iw, _ih, _cx, _cy, path2) => {
		const {sx, sy, ix, iy, iw, ih, x, cx, y, cy} = calcSprite(path, _x, _y, _sx, _sy, _ix, _iy, _iw, _ih, _cx, _cy, path2)
		sprite(path, _x, _y, _sx, _sy, _ix, _iy, _iw, _ih, _cx, _cy, path2)
		if(overlaps(tx, ty, 10, 10, x - cx, y - cy, iw*sx, ih*sy) && justClicked){
			return true
		}
		return false
	}
	writeMulti = (text, x, y, style, font, maxWidth) => {		  
        let lines = text.split('\n')
        lines.forEach((e, i) => {
	        var words = e.split(' ');
	        var line = '';
	        let lineHeight = fontHeight(font)
	        for(var n = 0; n < words.length; n++) {
	          	var testLine = line + words[n] + ' ';
	          	var testWidth = textWidth(testLine, font);
	          	if (testWidth > maxWidth && n > 0) {
	          		write(line, x, y, style, font)
	            	line = words[n] + ' ';
	            	y += lineHeight + 5;
	          	}
	          	else {
	            	line = testLine;
	 	        }
	        }
	        write(line, x, y, style, font)
	        y += lineHeight*2
	    })
	}
	writeLine = (line, x, y, style, font) => {
		let lines = line.split('\n')
		lines.forEach((e, i) => {
			write(e, x, y + i * (fontHeight(font) + 5), style, font)
		})
		return y + (lines.length - 1) * (fontHeight(font) + 5)
	}
	writeUI = (text, x, y, style, font) => {
		UIs.push(() => {
			write(text, x, y, style, font)
		})
	}
	write = (text, x, y, style, font) => {
		ctx.font = font || "2rem slkscr";
		let before = ctx.fillStyle;
		ctx.fillStyle = style || "white"
		canvas.style.imageRendering = 'crisp-edges'
		canvas.style.imageRendering = 'pixelated'
		ctx.imageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.textRendering = "geometricPrecision";
		ctx.fillText(text, x, y+fontHeight());
		canvas.style.imageRendering = 'crisp-edges'
		canvas.style.imageRendering = 'pixelated'
		ctx.imageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
 		ctx.textRendering = "geometricPrecision";
		ctx.fillStyle = before
	}
	centerX = (path) => {
		if(path != undefined){
			 return width()/2-width(path)/2
		}
		return width()/2
	}
	centerY = (path) => {
		if(path != undefined){
			 return height()/2-height(path)/2
		}
		return height()/2
	}
	centerTextX = (text, font) => {
		return centerX()-textWidth(text, font)/2
	}
	textWidth = (text, font) => {
		ctx.font = font || '2rem slkscr'
		return ctx.measureText(text).width
	}
	fontHeight = () => {
		let metrics = ctx.measureText('M');
		return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
	}
	centerTextY = (text) => {
		return centerY()-fontHeight()/2
	}
	clear = (color) => {
		ctx.fillStyle = 'black'
		if(color != undefined){
			ctx.fillStyle = color
		}
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}
	axisX = () => {
		if(!mobileCheck())
		return (isPressed('arrowleft') || isPressed('a')? -1 : 0) + (isPressed('arrowright') || isPressed('d') ? 1 : 0)
		return joystick.directionVector().x
	}
	axisY = () => {
		if(!mobileCheck())
		return (isPressed('arrowup') || isPressed('w')? -1 : 0) + (isPressed('arrowdown') || isPressed('s') ? 1 : 0)
		return joystick.directionVector().y
	}
	width = (path) => {
		if(path == undefined){
			return canvas.width
		} else {
			if(path.slice(-4) == '.tls'){
				return assets[path].width
			} else {
				return assets[path].naturalWidth
			}
		}
	}
	height = (path) => {
		if(path == undefined){
			return canvas.height
		} else {
			if(path.slice(-4) == '.tls'){
				return assets[path].height
			} else {
				return assets[path].naturalHeight
			}
		}
	}
	random = (first, sec) => {
		if(first == undefined){
			return Math.floor(Math.random()*9999)
		}
	}
	dirX = (ax, ay, bx, by) => {
		return Math.cos(Math.atan2(by - ay, bx - ax))
	}
	dirY = (ax, ay, bx, by) => {
		return Math.sin(Math.atan2(by - ay, bx -  ax))
	}
	if(scale){
		canvas.width *= scale
		canvas.height *= scale
	}
	timerStart = (id) => {
		if(id > timers.length){
			timers.push(Date.now())
		} else {
			timers[id] = Date.now()
		}
	}
	timerValue = (id) => {
		return Date.now() - timers[id]
	}
	overlaps = (ax, ay, aw, ah, bx, by, bw, bh) => {
		if(bx.length != undefined){
			let res = false
			if(bx.slice(-4) == '.tls'){
		        let y = Math.min(Math.max(ay-height()/2, 0), Math.max(height(bx)*32-height(), 0))
        		let x = Math.min(Math.max(ax-width()/2, 0), Math.max(width(bx)*32-width(), 0))
        		assets[bx].tiles.slice(y/32, (y+height()+32)/32).forEach((e, i) => {
            		e.slice(x/32, (x+width()+32)/32).forEach((e2, i2) => {
						if(assets[bx].walkable[e2] == 'false'){
							let old = res
							res = res || overlaps(ax, ay, aw, ah, i2*32+x, i*32+y, 32, 32)
							if(!old && res)console.log(e2)
						}
            		})
            	})
			} else {
				if(bh == undefined){bh = -1}
				bx.forEach((el, j) => res = res || (overlaps(ax, ay, aw, ah, el.x, el.y, by, bw) && bh!=j))
			}
			return res
		}
		return (ax + aw > bx && bx + bw > ax && ay + ah > by && by + bh > ay)
	}
	if(start){
		start()
	}
	if(update){
		(function real_update(){
			delt = Date.now()-delt
			if(deltas.length > 100){
				deltas.shift()
			}
			deltas.push(delt/1000000000000)
			dt = deltas.reduce((e, c) => e+c, 0)/deltas.length
			UIs = []
			clear()
			if(maxImages<=0)update()
			if(justClicked){
				justClicked = false;
			}
			for(i in keys){
				if(isJustPressed(i)){
					keys[i] = pressed
				}
				if(isJustReleased(i)){
					keys[i] = released
				}
			}
			for(i of UIs){
				i()
			}
			window.requestAnimationFrame(real_update)
		})()
	}
}
assetsLoad()