let fs = require('fs')
let ctt = fs.readFileSync('questions.txt')
let jsoned = JSON.parse(ctt)
jsoned.forEach( e => console.log(e.map((e2,i) => {console.log(); return i == e.length-2 ? (e2 + 9).toString(36).toLowerCase() : e2.toString().split('\n').join('\\n')}).slice(0, -1).join('\n')))