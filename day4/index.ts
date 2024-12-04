// import input from './exampleInput'
import input from './input'

// part one
const wordSearch = input.split('\n')

let xmasCount = 0

function checkXmas(row: number, column: number) {
    for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {

            let str = ''

            for (let k of [1, 2, 3]) {
                str += wordSearch[row - k * i]?.charAt(column - k * j)
            }
            if (str === 'MAS') xmasCount++
        }
    }
}

for (let i = 0; i < wordSearch.length; i++) {
    const row = wordSearch[i]

    for (let j = 0; j < row.length; j++) {
        const char = row.charAt(j)
        if (char === 'X') checkXmas(i, j)
    }
}

console.log(xmasCount)

// part two

let x_masCount = 0

function checkX_mas(row: number, column: number) {
    let flag = true
    for (let i of [-1, 1]) {

        let str = ''

        for (let k of [-1, 0, 1]) {
            str += wordSearch[row - k * i]?.charAt(column - k * -1)
        }
        if (str !== 'MAS' && str !== 'SAM') {
            flag = false
            break
        }
    }
    if (flag) x_masCount++
}

for (let i = 0; i < wordSearch.length; i++) {
    const row = wordSearch[i]

    for (let j = 0; j < row.length; j++) {
        const char = row.charAt(j)
        if (char === 'A') checkX_mas(i, j)
    }
}

console.log(x_masCount)