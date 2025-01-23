const cards = ["piggy-bank", "shoe", "plane", "suitcase", "robot", "ring", "palm-tree", "mp3"]
const gameContainer = document.querySelector(".game")
const timer = document.querySelector(".timer")
const startButton = document.getElementById("start-button")
let flippedCards = []
let matchedPairs = 0
let timeLeft = 30
let gameStarted = false
let timerInterval

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function flipCard() {
  if (!gameStarted || flippedCards.length >= 2 || this.classList.contains("flip")) return

  this.classList.add("flip")
  flippedCards.push(this)

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000)
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards
  const type1 = card1.querySelector(".back").id
  const type2 = card2.querySelector(".back").id

  if (type1 === type2) {
    matchedPairs++
    if (matchedPairs === cards.length) {
      endGame(true)
    }
  } else {
    card1.classList.remove("flip")
    card2.classList.remove("flip")
  }
  flippedCards = []
}

function startGame() {
  if (gameStarted) return // Prevent starting the game multiple times
  gameStarted = true
  startButton.style.display = "none" // Hide the start button

  // Flip all cards
  document.querySelectorAll(".flip-container").forEach((card) => {
    card.classList.add("flip")
  })

  // After 2 seconds, flip them back and start the timer
  setTimeout(() => {
    document.querySelectorAll(".flip-container").forEach((card) => {
      card.classList.remove("flip")
    })

    // Show the SweetAlert after cards are flipped back
    Swal.fire({
      title: "Game Started!",
      text: "Match all the pairs before time runs out!",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    })

    timerInterval = setInterval(() => {
      timeLeft--
      timer.textContent = timeLeft
      if (timeLeft === 0) {
        endGame(false)
      }
    }, 1000)
  }, 2000)
}

function endGame(isWin) {
  clearInterval(timerInterval)
  gameStarted = false
  startButton.style.display = "block" // Show the start button again
  if (isWin) {
    Swal.fire({
      title: "Congratulations!",
      text: "You won the game!",
      icon: "success",
      confirmButtonText: "Play Again",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload()
      }
    })
  } else {
    Swal.fire({
      title: "Game Over",
      text: "Time's up!",
      icon: "error",
      confirmButtonText: "Try Again",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload()
      }
    })
  }
}

function initGame() {
  const cardPairs = shuffleArray([...cards, ...cards])
  const flipContainers = document.querySelectorAll(".flip-container")
  flipContainers.forEach((container, index) => {
    const backElement = container.querySelector(".back")
    backElement.id = cardPairs[index]
    container.addEventListener("click", flipCard)
  })
  startButton.addEventListener("click", startGame)
}

// Splash screen and starting animation
const splashScreen = document.getElementById("splash-screen")
const splashImg = document.getElementById("splash-img")

// Function to start the game after splash screen
function startGameAfterSplash() {
  splashScreen.style.opacity = "0"
  setTimeout(() => {
    splashScreen.style.display = "none"
    startButton.style.display = "block" // Show the start button
  }, 500)
}

// Start the splash screen animation
window.addEventListener("load", () => {
  setTimeout(() => {
    splashImg.classList.add("animate")
  }, 100)

  // End the splash screen animation and show the start button
  setTimeout(startGameAfterSplash, 5000)
})

initGame()

