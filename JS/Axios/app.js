const bitcoinPriceDisplay = document.querySelector("#bitcoin-price");
const dadJokeDisplay = document.querySelector("#dad-joke");
const errorWarning = document.querySelector("#warning");
const refreshBtn = document.querySelector("button");
errorWarning.hidden = true; // just to be safe

async function getBitcoinPrice() {
    console.log("1");
    const res = await axios.get("https://api.cryptonator.com/api/ticker/btc-usd");
    bitcoinPriceDisplay.innerText = res.data.ticker.price;
    console.log("1 end");
}
async function getDadJoke() {
    console.log("2");
    const options = {
        headers: {
            Accept: "application/json",
        },
    };
    const res = await axios.get("https://icanhazdadjoke.com/", options);
    dadJokeDisplay.innerText = res.data.joke;
    console.log("2 end");
}

function refresh() {
    try {
        getBitcoinPrice();
        getDadJoke();
        errorWarning.hidden = true;
    } catch (e) {
        errorWarning.hidden = false;
    }
}

refreshBtn.addEventListener("click", refresh);
refresh();