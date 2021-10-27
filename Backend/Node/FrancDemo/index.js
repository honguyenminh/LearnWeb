import { franc } from "franc";
// const langs = require("langs");
import langs from "langs";

let input = "";

// Combine all input
for (let i = 2; i < process.argv.length; i++) {
    input += process.argv[i] + ' ';
}

if (input === "") {
    console.log("Please provide input as argument");
    process.exit(-1);
}

input = input.trim();
const langCode = franc(input, {minLength: 25});

// If language cant be determined (is UNDtermined)
if (langCode === "und") {
    console.log("What's language is that? Maybe add more sample?");
    process.exit(1);
}

console.log(input);
console.log(`Language code: ${langCode}`);
console.log("Language name: " + langs.where("3", langCode)?.name);