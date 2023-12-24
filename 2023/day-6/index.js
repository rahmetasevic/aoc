const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');

function partOne() {
    const times = lines[0].split(':')[1].split(' ').map((x) => x.trim()).filter(Boolean).map(y => parseInt(y));
    const distance = lines[1].split(':')[1].split(' ').map((x) => x.trim()).filter(Boolean).map(y => parseInt(y));

    const totalWins = times.map((time, i) => {
        let wins = 0;
        for (let x = 0; x < time; x++) {
            if(((time-x) * x) > distance[i]) {
                wins++;
            }
        }
        return wins;
    }).reduce((acc, cur) => acc * cur, 1);

    return totalWins;
}

function partTwo() {
    const times = parseInt(lines[0].split(':')[1].split(' ').join(''));
    const distance = parseInt(lines[1].split(':')[1].split(' ').join(''));

    let wins = 0;

    for (let x = 0; x < times; x++) {
        if(((times-x) * x) > distance) {
            wins++;
        }
    }

    return wins;
}

console.log(partOne());
console.log(partTwo());