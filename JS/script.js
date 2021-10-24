function randInt(first, second) {
    return Math.floor(Math.random() * (second - first + 1)) + first;
}

let prices = [12, 15, 6, 19, 13, 23];

// Find min
let min = prices.reduce((min, prices) => (prices < min ? prices : min));

let movies = [
    {
        name: "hello",
        year: "1233",
        rate: "10",
    },
    {
        name: "hi",
        year: "123123",
        rate: "5",
    },
];

movies.map(({rate}) => rate > 6);
