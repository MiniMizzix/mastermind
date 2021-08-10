Mastermind = class {
  constructor () {
    this.AnswerData = new AnswerClass()
    this.DataLists = new ArrayClass()
    this.CurrentInputPeg = null
    //event listeners
    document.getElementById('guessbutton').addEventListener('click', event => this.onButtonClick(event))

    this.InputoptionListener()
    this.ChoiceListener()

    //populate
    this.PastGuessesFill()
  }

  //events 
  onButtonClick (theEvent) {
    if (this.AnswerData.GuessCount == 10) {
      console.log("you lose")
      return
    }
    this.AnswerData.GuessCount = this.AnswerData.GuessCount + 1
    console.log("guesses:" + this.AnswerData.GuessCount)
    const targetPast = document.getElementById('pastpegs' + this.AnswerData.GuessCount)
    const pegsList = targetPast.getElementsByClassName('guesspegs')
    const emptyPegs = pegsList[0].getElementsByClassName('nopeg')
    
    for (var counter = 0; counter < emptyPegs.length; counter++) {
      const inputPegs = document.getElementsByClassName('inputpeg')
      const inputSwap = inputPegs[counter].classList[0]
      
      emptyPegs[counter].classList.add(inputSwap)
      emptyPegs[counter].classList.remove('fullpeg')
    }
    if (this.AnswerData.GuessCount > 1) {
      this.ResultResetter()
      return
    }
    this.ResultCollector()
  }

  onInputClick (theEvent) {
    const choicePegs = document.getElementById('choicepegs')

    this.AnswerData.CurrentInputPeg = event.target.id

    choicePegs.classList.toggle('notshown')
    choicePegs.classList.toggle('extenddroplist')
  }

  onChoiceClick (theEvent) {
    const swapPeg = document.getElementById(this.AnswerData.CurrentInputPeg)
    const choicePegs = document.getElementById('choicepegs')

    swapPeg.classList.replace(swapPeg.classList[0] , event.target.classList[0])

    choicePegs.classList.toggle('notshown')
    choicePegs.classList.toggle('extenddroplist')
  }

  //add events
  InputoptionListener () {
    const inputPegs = document.getElementsByClassName('inputpeg')
    const inputPegsCount = inputPegs.length
    
    for (var counter = 0; counter < inputPegsCount; counter++) {
      const currentPeg = inputPegs[counter]
      
      currentPeg.addEventListener('click', event => this.onInputClick(event))
    }
  }

  ChoiceListener () {
    const choicePegs = document.getElementsByClassName('choicepeg')
    const choicePegsCount = choicePegs.length

    for (var counter = 0; counter < choicePegsCount; counter++) {
      const currentPeg = choicePegs[counter]

      currentPeg.addEventListener('click', event => this.onChoiceClick(event))
    }
  }

  //setting up the board
  PastGuessesFill () {
    const emptyPast = document.getElementById('pastpegstemplate')
    const pastList = document.getElementById('pastpegsarray')

    for (var counter = 1; counter < 11; counter++) {
      const newPast = emptyPast.cloneNode(true)

      newPast.classList.remove('hidden')
      newPast.classList.add('pastpegs')
      newPast.setAttribute('id', 'pastpegs' + counter)
      pastList.insertBefore(newPast, pastList.childNodes[0])
    }
  }

  //functions
  ResultResetter () {
    const guessPegList = this.DataLists.guessPegs
    const guessPegCount = this.DataLists.guessPegs.length
    const answerPegList = this.DataLists.answerPegs
    const answerPegCount = this.DataLists.answerPegs.length

    for (var counter = 0; counter < guessPegCount; counter++) {
      guessPegList.pop()
    }
    for (var looper = 0; looper < answerPegCount; looper++) {
      answerPegList.pop()
    }
    this.AnswerData.BlackCount = 0
    this.AnswerData.WhiteCount = 0
    this.ResultCollector()
  }

  ResultCollector () {
    const answerPegs = document.getElementsByClassName('winpeg')
    const answerPegsCount = answerPegs.length

    for (var counter = 0; counter < answerPegsCount; counter++) {
      const currentAnswer = answerPegs[counter].classList[0]

      this.DataLists.answerPegs.push(currentAnswer)
    }
    
    const guessRow = document.getElementById('pastpegs' + this.AnswerData.GuessCount)
    const guessPegs = guessRow.getElementsByClassName('nopeg')
    const guessPegsCount = guessPegs.length

    for (var counter = 0; counter < guessPegsCount; counter++) {
      const currentGuess = guessPegs[counter].classList[1]

      this.DataLists.guessPegs.push(currentGuess)
    }
    this.ResultProducerBlack()
  }

  ResultProducerBlack () {
    const guessPegs = this.DataLists.guessPegs
    const answerPegs = this.DataLists.answerPegs
    var guessCount = this.DataLists.guessPegs.length

    for (var counter = 0; counter < guessCount; counter++) {
      const currentGuess = this.DataLists.guessPegs[counter]
      const currentAnswer = this.DataLists.answerPegs[counter]

      if (currentGuess === currentAnswer) {
        guessPegs.splice(counter, 1)
        answerPegs.splice(counter, 1)

        counter = counter - 1
        guessCount = guessCount - 1
        this.AnswerData.BlackCount = this.AnswerData.BlackCount + 1
      }
    }
    console.log('black:' + this.AnswerData.BlackCount)
    if (this.AnswerData.BlackCount == 4) {
      console.log("you win")
      return
    }
    this.ResultProducerWhite() 
  }

  ResultProducerWhite () {
    const guessPegs = this.DataLists.guessPegs
    const answerPegs = this.DataLists.answerPegs
    var guessCount = this.DataLists.guessPegs.length
    var answerCount = this.DataLists.answerPegs.length

    for (var counter = 0; counter < guessCount; counter++) {
      const currentGuess = guessPegs[counter]

      for (var looper = 0; looper < answerCount; looper++) {
        const currentAnswer = answerPegs[looper]

        if (currentGuess === currentAnswer) {
          guessPegs.splice(counter, 1)
          answerPegs.splice(looper, 1)

          counter = counter - 1
          guessCount = guessCount - 1
          answerCount = answerCount - 1

          this.AnswerData.WhiteCount = this.AnswerData.WhiteCount + 1
        }
      }
    }
    console.log("white:" + this.AnswerData.WhiteCount)
  }
}
const mastermindGame = new Mastermind()