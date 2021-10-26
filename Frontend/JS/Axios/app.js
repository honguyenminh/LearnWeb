const bitcoinPriceDisplay = document.querySelector("#bitcoin-price");
const dadJokeDisplay = document.querySelector("#dad-joke");
const errorWarning = document.querySelector("#warning");
const refreshBtn = document.querySelector("button");
errorWarning.hidden = true; // just to be safe

async function getBitcoinPrice() {
    const res = await axios.get("https://api.cryptonator.com/api/ticker/btc-usd");
    return res.data.ticker.price;
}
async function getDadJoke() {
    const options = {
        headers: {
            Accept: "application/json",
        },
    };
    const res = await axios.get("https://icanhazdadjoke.com/", options);
    return res.data.joke;
}

async function showBitcoinPrice() {
    bitcoinPriceDisplay.innerText = await getBitcoinPrice();
}
async function showDadJoke() {
    dadJokeDisplay.innerText = await getDadJoke();
}

function refresh() {
    try {
        showBitcoinPrice();
        showDadJoke();
        errorWarning.hidden = true;
    } catch (e) {
        errorWarning.hidden = false;
    }
}
refreshBtn.addEventListener("click", refresh);
refresh();
