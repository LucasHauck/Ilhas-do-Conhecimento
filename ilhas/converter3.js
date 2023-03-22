let fs = require('fs')
let ctt = fs.readFileSync('conteudo.txt')
let out = []
eval(ctt + ';out.push(...[notepad1.split(\'\\n\').join(\'\\\\n\'), notepad3.split(\'\\n\').join(\'\\\\n\'), notepad3.split(\'\\n\').join(\'\\\\n\'), notepad4.split(\'\\n\').join(\'\\\\n\'), notepad5.split(\'\\n\').join(\'\\\\n\'), notepad6.split(\'\\n\').join(\'\\\\n\')])')
let end = []
console.log(out.map((e, i) => {end += e + (i % 2 == 0 ? '\n\n' : '\n\n\n')}))
console.log(end)