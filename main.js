const readlineSync = require('readline-sync');

let HORSES = 3;
let SPEED = 0.4;
let DISTANCE = 50;

class Horse {
    constructor(name) {
        this.name = name;
        this.position = 0;
    }

    move() {
        this.position += Math.floor(Math.random() * 3) + 1;
    }
}

function clearScreen() {
    console.clear();
}

function config() {
    HORSES = parseInt(readlineSync.question("Enter number of horses: "));
    SPEED = parseFloat(readlineSync.question("Enter speed (1-100): "));
    SPEED = Math.max(1, Math.min(SPEED, 100));
    SPEED = (100 - SPEED) / 99 * 0.99 + 0.01;
    DISTANCE = parseInt(readlineSync.question("Enter distance (10-100): "));
    DISTANCE = Math.max(10, Math.min(DISTANCE, 100));
}

async function main() {
    let horses = [];
    for (let i = 1; i <= HORSES; i++) {
        horses.push(new Horse(`Horse ${i}`));
    }

    while (true) {
        clearScreen();
        for (let horse of horses) {
            horse.move();
            // EMOJIS: 🐎 ♞ 🐴 ♘ 𓃗 🏇 🏇 𐂃
            console.log(`🐴 ${horse.name}: ${'-'.repeat(horse.position)}`);
        }

        await new Promise(resolve => setTimeout(resolve, SPEED * 1000));

        if (horses.some(horse => horse.position >= DISTANCE)) {
            break;
        }
    }

    // Find the winner
    let winner = horses.reduce((prev, current) => (prev.position > current.position) ? prev : current);
    console.log(`\nWinner is ${winner.name}`);
}

let configGame = readlineSync.question("Do you want to configure the game? (y/n): ");
if (configGame.toLowerCase() === "y") {
    config();
}
main();
