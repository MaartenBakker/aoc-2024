
// import input from './exampleInput';
// import input2 from './exampleInput2'
import input from './input';

// part one
const pattern = /mul\((\d{1,3})\,(\d{1,3})\)/g

let totalResult = 0

for (const match of input.matchAll(pattern)) {
    totalResult += parseInt(match[1]) * parseInt(match[2])
}

console.log(totalResult)

// part two

const removePattern = /don't\(\).*?do\(\)/g

const enabled = input.replaceAll(removePattern, '')

totalResult = 0

for (const match of enabled.matchAll(pattern)) {
    totalResult += parseInt(match[1]) * parseInt(match[2])
}

console.log(totalResult)
