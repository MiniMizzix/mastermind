
Mastermind = class {
  constructor () {
    this.AnswerData = new AnswerClass()
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
      return
    }
    this.AnswerData.GuessCount = this.AnswerData.GuessCount + 1
    console.log(this.AnswerData.GuessCount)
    const targetPast = document.getElementById('pastpegs' + this.AnswerData.GuessCount)
    const pegsList = targetPast.getElementsByClassName('guesspegs')
    const emptyPegs = pegsList[0].getElementsByClassName('nopeg')
    
    for (var counter = 0; counter < emptyPegs.length; counter++) {
      const inputPegs = document.getElementsByClassName('inputpeg')
      const inputSwap = inputPegs[counter].classList[0]
      
      emptyPegs[counter].classList.add(inputSwap)
      emptyPegs[counter].classList.remove('fullpeg')
    }

    //

    const winCheck = document.getElementById('pastpegs' + this.AnswerData.GuessCount)
    const checkPegs = winCheck.getElementsByClassName('guesspegs')
    const fullPegs = checkPegs[0].getElementsByClassName('nopeg')
    
    for (var counter = 0; counter < fullPegs.length; counter++) {
      const winPegs = document.getElementsByClassName('winpeg')
      const winPegsCount = winPegs.length
      const currentFullPeg = fullPegs[counter].classList[1]
      
      for (var looper = 0; looper < winPegsCount; looper++) {
        const currentWin = winPegs[looper].classList[0]
        if (currentWin == currentFullPeg) {
          if (counter == looper) {
            console.log('this.BlackPegResult()')
            looper = 5
          } else {
            console.log('this.WhitePegResult()')
            looper = 5
          }
        } else {
          console.log('.')
          looper = 5
        }
        //multiples of the same colour in either set of pegs doesnt work at all right now
      }
    }
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
}
const mastermindGame = new Mastermind()