const keyboardDiv = document.querySelector(".keyboard");

const getRandomWord = () => {
    
}

// keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}