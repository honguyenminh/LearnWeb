const resetBtn = document.querySelector("#reset-btn");
const winScoreInput = document.querySelector("#winning-score");
const winnerLabel = document.querySelector("#winner-label");

const left = {
    score: document.querySelector("#left-score"),
    button: document.querySelector("#add-left-btn"),
    label: "1"
};
const right = {
    score: document.querySelector("#right-score"),
    button: document.querySelector("#add-right-btn"),
    label: "2"
};

let winnerFound = false;
let winningScore = 6;
winScoreInput.value = winningScore;

function updateScore(player, otherPlayer) {
    if (winnerFound) return;
    let currentScore = parseInt(player.score.innerText);
    player.score.innerText = ++currentScore;
    if (currentScore >= winningScore) {
        winnerFound = true;
        player.score.classList.add("has-text-success");
        otherPlayer.score.classList.add("has-text-danger");
        player.button.disabled = true;
        otherPlayer.button.disabled = true;
        winnerLabel.innerText = `Player/team ${player.label} won!`;
        winnerLabel.hidden = false;
        winnerLabel.ariaHidden = false;
    }
}

left.button.addEventListener("click", () => updateScore(left, right));
right.button.addEventListener("click", () => updateScore(right, left));

function reset() {
    winnerFound = false;
    left.score.innerText = 0;
    right.score.innerText = 0;
    left.score.classList.remove("has-text-success", "has-text-danger");
    right.score.classList.remove("has-text-success", "has-text-danger");
    left.button.disabled = false;
    right.button.disabled = false;
    winnerLabel.hidden = true;
    winnerLabel.ariaHidden = true;
}
resetBtn.addEventListener("click", reset);

function winningScoreChangeEvent(element) {
    winningScore = parseInt(element.value);
    if (winningScore === 0) {
        winningScore = 1;
        element.value = 1;
    }
}

winScoreInput.addEventListener("change", reset);
// Restrict input to win score only
setInputFilterAndEvent(winScoreInput, (value) => /^\d+$/.test(value), winningScoreChangeEvent);

// Restricts input for the given textbox to the given inputFilter function.
// C# do this with a tag in markup and a 6lines class file, learn from it JS
// And it doesn't block other events too :(
function setInputFilterAndEvent(textbox, inputFilter, inputEvent, defaultValue = 6) {
    // Set preview event for all input method
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            // If value is valid
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
                // Run input event
                inputEvent(this);
            }
            // Else, reset to old value
            else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Set to default value if no old value found
                this.value = defaultValue;
            }
        });
    });
}
