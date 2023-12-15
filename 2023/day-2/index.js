const fs = require('fs');

const data = fs.readFileSync('./aoc-input.txt', 'utf-8');
const lines = data.split('\r\n');

const defaultGameMap = new Map([['red', 12], ['green', 13], ['blue', 14]]);

function calculateSets(lines) {
    let sum = 0;
    let sumPower = 0;

    for(let i = 0; i < lines.length; i++) {
        const game = lines[i].split(':'); 
        const gameId = Number(game[0].split(' ')[1]);
        const gameSet= game[1];
        const gameSubset = gameSet.split(';').map((val) => val.split(','));
    
        if(checkSubset(gameSubset)) {
            sum += gameId;
        }

        sumPower += calculateGameSet(gameSet);
    }

    console.log('Sum of the IDs is:', sum);
    console.log('Sum of the power of these sets is:', sumPower);
}

function checkSubset(gameSubset) {
    let gameMap = new Map([['red', 0], ['green', 0], ['blue', 0]]);

    for (let i = 0; i < gameSubset.length; i++) {
        const subset = gameSubset[i].map((val) => val.trim().split(' '));
        for (let j = 0; j < subset.length; j++) {
            const subsetValue = subset[j];

            if(gameMap.has(subsetValue[1])) {
                gameMap.set(subsetValue[1], gameMap.get(subsetValue[1]) + Number(subsetValue[0]));
            }
        }

        if(validateSubset(gameMap)) {
            return false;
        }

        gameMap = new Map([['red', 0], ['green', 0], ['blue', 0]]);
    }

    return true;
}

function calculateGameSet(gameSet) {
    let gameMap = new Map([['red', 0], ['green', 0], ['blue', 0]]);

    const set = gameSet.split(/[;,]/).map((val) => val.trim());
    
    for (let i = 0; i < set.length; i++) {
        const setValue = set[i].split(' ');

        if(gameMap.has(setValue[1]) && gameMap.get(setValue[1]) < Number(setValue[0])) {
            gameMap.set(setValue[1], Number(setValue[0]));
        }
    }

    return [...gameMap.values()].reduce((acc, current) => acc * current);
}

function validateSubset(map) {
    if((map.get('red') > defaultGameMap.get('red')) || (map.get('green') > defaultGameMap.get('green')) || (map.get('blue') > defaultGameMap.get('blue'))) {
        return true;
    }

    return false;
}

calculateSets(lines);