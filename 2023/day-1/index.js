const fs = require('fs');

const data = fs.readFileSync('./aoc-input.txt', 'utf-8');
const lines = data.split('\r\n');
const digits = new Map([['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5'], ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9']]);

const finalValues = lines.map((line) => checkDigit(line));

function checkDigit(str) {
    let inputValues = [];
    for (let i = 0; i < str.length; i++) {
        let wordDigits = '';
        if(Number(str[i])) {
            inputValues.push(str[i]);
            continue;
        }
        for (let j = i+1; j <= str.length; j++) {           
            wordDigits = str.substring(i, j);
            
            if(digits.has(wordDigits)) {
                const digit = digits.get(wordDigits);
                inputValues.push(digit);
            }
        }
    }

    return [inputValues[0], inputValues[inputValues.length-1]];
}

function calculateTotal() {
    return finalValues.map((val) => Number(val.join(''))).reduce((acc, current) => acc + current);
}

console.log('Sum of the calibration values is: ', calculateTotal());