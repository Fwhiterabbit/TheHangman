const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// fully resets the game
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `assets/images/hangman_${wrongGuessCount}.png`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}


// Selecting random word with hint from word-list.js
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

// 2 seconds after game is completed it shoes modal with relevant details
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You guessed the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `assets/images/${isVictory ? 'W' : 'L'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Well Done !' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 200);
}

// checking if current letter exist in the word, also 
// shows all correct clicked letter on the board
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        // wrong answer updates image of a hangman
        wrongGuessCount++;
        hangmanImage.src = `assets/images/hangman_${wrongGuessCount}.png`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // function is being called when either both of these conditions meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// keyboard buttons and event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

// selecting random word with hint and display play again btn
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);