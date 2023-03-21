let currentQuestion = 0;
let rightOption = 0
let nextY = 0
let answered = false
let stars = 0
function questionsUpdate(){
	sprite('questionsRoomBackground.png', 0, 0, 5, 5)
	sprite('questionsRoomQuestionBackground.png', centerX()-width('questionsRoomQuestionBackground.png')/2*4, -20, 4, 4)
	for(i in questions[subject][currentQuestion].slice(1, -1)){
		if(clickableImage('answerBackground.png', questionsX[i]-60, centerY()+(i*45-30))){
			timerStart(1)
			answered = true
		}
		writeMulti(questions[subject][currentQuestion].slice(1, -1)[i], questionsX[i], centerY()+(i*45-30)+50, 'white', '0.4rem')
	}
	if(clickableImage('next.png', 350, nextY, 2, 2)){
		currentQuestion++
		if(currentQuestion >= questions[subject].length){
			room = gameMapUpdate
			mapName = 'gameMap0.tls'
			played = false
			return
		}
		rightOption = questions[subject][currentQuestion][questions[subject][currentQuestion].length-1].charCodeAt(0)-'a'.charCodeAt(0)
		answered = false
		nextY = height()+height('next.png')+25
		questionsX = questions[subject][currentQuestion].map(() => 30)
	}
	if(timerValue(1) < 5000 && answered){
		questionsX = questionsX.map((e, i) => i!=rightOption ? e-1 : e)
	}
	if(timerValue(1) > 5000 && answered){
		questionsX = questionsX.map((e, i) => i!=rightOption ? -width('answerBackground.png') : e)	
	}
	if(timerValue(1) < 3000 && answered){
		nextY-=1
	}
	if(timerValue(1) > 3000 && answered && nextY > height()-height('next.png')+30){
		nextY=height()-height('next.png')+20
	}
	writeMulti(questions[subject][currentQuestion][0], centerX()-width('questionsRoomQuestionBackground.png')/2*4+150, 55, 'white', '0.6rem', width('questionsRoomQuestionBackground.png')*4-270)
}