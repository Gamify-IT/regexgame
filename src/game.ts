
/**
 * Generates an answer button.
 * @param answer the answer
 * @returns the button element of this answer to be inserted into div#answers
 */
function generateAnswerButton(answer: string): HTMLButtonElement {
  let button = document.createElement("button") as HTMLButtonElement
  button.classList.add("answer", "button", "box-glow-light")
  //replace empty string with non-breakable space to ensure correct button sizing with empty answers
  const buttonText = answer.length == 0 ? "&nbsp;" : answer
  button.innerHTML = `<p>${buttonText}</p>`
  button.addEventListener("click", () => onAnswerSelected(button, answer))
  return button
}

const riddleRegexElement = document.querySelector("#riddle > p")! as HTMLParagraphElement
const answersContainer = document.querySelector("#answers")! as HTMLDivElement

/**
 * The current Riddle displayed to the user.
 */
let currentRiddle: Riddle | undefined

/**
 * the current round
 */
let round: number

/**
 * when the game has started
 * used for calculating timeout
 */
var gameStartTimestamp: Date

/**
 * the handle of the setTimeout call for handling when the countdown runs out
 */
var countdownTimer: number

let noTimer: boolean = false

/**
 * reward from playing the game (coins)
 */
let reward: number;

const gameProgressBar = (document.querySelector("#gameprogress") as HTMLDivElement)!
const timeoutProgressBar = (document.querySelector("#timeoutbar") as HTMLDivElement)!

/**
 * Display a riddle to the user
 * @param riddle the riddle to display
 */
async function displayRiddle(riddle: Riddle) {
  await gameBoxHeightTransitionBegin()
  setHidden(startPageContainer, true)
  setHidden(gameContainer, false)
  setHidden(timeoutProgressBar, (gameConfigurationBySearchQuery ?? defaultConfiguration).riddleTimeoutSeconds === 0)
  timeoutProgressBar.classList.remove("countdown")
  removeCurrentRiddle()
  currentRiddle = riddle
  riddleRegexElement.innerText = riddle.regex.generate()
  riddle.answers.forEach(answer =>
    answersContainer.appendChild(generateAnswerButton(answer))
  )
  const progress = Math.trunc(calculateCompletionPercentage() * 100)
  gameProgressBar.style.setProperty("--progress", progress + "%")
  if (progress === 100) {
    gameProgressBar.innerText = "Completed (free play)"
  } else {
    gameProgressBar.innerHTML = progress + "%"
  }
  await gameBoxHeightTransitionEnd()

  if(getRemainingTime() == Number.POSITIVE_INFINITY) {
    noTimer = true
    // FIXME make bar be full green when infinity, and display Infinity instead of infinitys
  } else {
    noTimer = false
    timeoutProgressBar.style.setProperty("--countdown", getRemainingTime() + "s")
    timeoutProgressBar.classList.add("countdown")
  }
}

function getRemainingTime() {
  const remainingTime: number = (new Date().getTime() - gameStartTimestamp.getTime()) / 1000
  return (gameConfigurationBySearchQuery ?? defaultConfiguration).riddleTimeoutSeconds * (round + 1) - remainingTime
}

function calculateCompletionPercentage() {
  return clamp(round / (gameConfigurationBySearchQuery ?? defaultConfiguration).minimumCompletedRounds, 0, 1)
}

async function nextRiddle() {
  round++
  try {
    await displayRiddle(generateRiddle(round, gameConfigurationBySearchQuery))
    if(!noTimer) {
      if (countdownTimer > 0) clearTimeout(countdownTimer)
      countdownTimer = setTimeout(gameEnd, getRemainingTime() * 1000)
    }
  } catch (e) {
    console.error("error creating next riddle", e)
    //TODO: notify user?
    gameEnd()
  }
}

function gameEnd() {
  sendResult().then(() => {
    displayScore()
    switchToStartPage()
  })
}

async function sendResult() {
  if (gameConfigurationBySearchQuery!.id.length === 0) {
    return
  }
  return saveGameResult(gameConfigurationBySearchQuery!.id, calculateCompletionPercentage() * 100, round).then((text) => {
    let jsonString = JSON.parse(text);
    reward = jsonString.rewards;
    console.log("reward: ",reward)
  })
}

function removeCurrentRiddle() {
  riddleRegexElement.innerText = ""
  answersContainer.innerHTML = ""
  currentRiddle = undefined
}

let nextAnswerTimeout: number | undefined
function onAnswerSelected(button: HTMLButtonElement, answer: string) {
  let correctAnswer: boolean

  if (!currentRiddle) throw new Error("current riddle undefined")
  if (countdownTimer > 0 && !noTimer) clearTimeout(countdownTimer)
  if (answersContainer.querySelector("button.selected")) {
    correctAnswer = answersContainer.querySelector("button.selected.correct") != undefined
    if (correctAnswer && nextAnswerTimeout !== undefined) {
      clearTimeout(nextAnswerTimeout)
      nextAnswerTimeout = undefined
    }
    if (correctAnswer)
      nextRiddle()
    return
  }
  const riddleRegex: RegExp = currentRiddle.regex.generateRegExp()
  console.log("selected answer", riddleRegex, answer)
  const answerMatchesRiddle: boolean = riddleRegex.test(answer)
  correctAnswer = isRiddleSolved(answerMatchesRiddle, currentRiddle.riddleType)
  button.classList.add(correctAnswer ? "correct" : "incorrect")
  button.classList.add("selected")
  nextAnswerTimeout = setTimeout(() => {
    if (correctAnswer)
      nextRiddle()
    else
      gameEnd()
  }, correctAnswer ? 1000 : 5000)
}

setInterval(() => {
  if (!currentRiddle) return
  if (answersContainer.querySelector("button.selected")) return
  timeoutProgressBar.innerText = Math.max(getRemainingTime(), 0).toFixed(1) + "s"
}, 100)
