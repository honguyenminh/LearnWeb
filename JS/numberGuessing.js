// Number guessing game

let maximum = parseInt(prompt("Enter the max number:"));
while (isNaN(maximum)) {
    maximum = parseInt(
        prompt(
            "That does not contain a number. Enter the max number again pls:"
        )
    );
}
const correctNum = Math.floor(Math.random() * maximum) + 1;
// console.log("You need to guess " + correctNum);

let guess = parseInt(prompt("Enter your guess!"));
while (guess !== correctNum) {
    // console.log("You guessed " + guess);
    let message;
    if (isNaN(guess) || guess === null) {
        message = "That's weird, to my eyes no number there is";
    }
    else if (guess > correctNum) {
        message = "That is higher than what we're looking for. Try again?"
    }
    else {
        message = "Too low, make it higher.";
    }

    guess = parseInt(prompt(message + "\nEnter your guess!"));
}
alert("Great job! That is indeed the number!");