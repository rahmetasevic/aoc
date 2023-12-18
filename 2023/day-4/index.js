const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let total = 0;

function partOne() {
    lines.map((line) => {
        let cardSum = 0;
        const card = line.split(': ')[1].split('| ');
        const winningNums = card[0].split(' ').filter(Boolean);
        const givenWinningNums = card[1].split(' ').filter(Boolean).forEach((val) => {
            if(winningNums.includes(val)) {
                cardSum === 0 ? cardSum += 1 : cardSum *= 2;
            }
        });

        total += cardSum;
    });
    
    console.log(total);
}

function partTwo() {
    const copiesArray = Array(lines.length).fill(1);

    for (let i = 0; i < lines.length; i++) {
        const [winningNumbers, numbers] = lines[i].split(": ")[1].split(" | ").map(x => x.trim().split(" ").filter(x => x != "").map(y => parseInt(y)));
        let winningAmount = 0;
        for (const winningNumber of winningNumbers) {
            if (numbers.includes(winningNumber)){
                winningAmount++;
            }    
        }

        for (let j = i + 1; j <= i + winningAmount; j++) {
            copiesArray[j] += copiesArray[i];
        }
    }


    console.log(copiesArray.reduce((a, x) => a + x, 0));
}

partOne();
partTwo();