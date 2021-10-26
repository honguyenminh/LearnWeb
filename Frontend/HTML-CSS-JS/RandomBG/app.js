let button = document.querySelector("button");
let hexDisplay = document.querySelector("#hexDisplay");
let body = document.querySelector("body");

function randInt(first, last) {
    return Math.floor(Math.random() * (last - first + 1)) + first;
}

function randomHexComponent() {
    var hex = randInt(0, 255).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function randomHexColor() {
    return `#${randomHexComponent()}${randomHexComponent()}${randomHexComponent()}`;
}

button.addEventListener("click", () => {
    let color = randomHexColor();
    body.style.background = color;
    hexDisplay.innerText = color;
})