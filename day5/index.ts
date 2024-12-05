// import input from './exampleInput'
import input from './input'

// part one
const pageOrderRulingsMap: { [key: string]: string[] } = {}

// parse input
input.split('\n\n')[0].split('\n').forEach(rule => {
    const splitRule: string[] = rule.split('|')
    if (pageOrderRulingsMap[splitRule[1]]) {
        pageOrderRulingsMap[splitRule[1]].push(splitRule[0])
    } else {
        pageOrderRulingsMap[splitRule[1]] = [splitRule[0]]
    }

})

const pagesToProduce = input.split('\n\n')[1]

// array for part one
const updatesInRightOrder = []
// array for part 2
const updatesInWrongOrder = []

// For each row of updates detect if they're in the right or wrong order.
for (let update of pagesToProduce.split('\n')) {
    let rightOrder = true

    const pageNumbers = update.split(',')
    for (let i = 0; i < pageNumbers.length && rightOrder; i++) {

        const pageToVerify = pageNumbers[i]
        // Check if all the numbers that should come before do so. If true, update is in the right order.
        const requiredPages = pageOrderRulingsMap[pageToVerify]
        if (requiredPages) {
            for (let requiredPage of requiredPages) {
                // If the required page is not in the update at all it is valid.
                // Else, it should come before pageToVerify
                if (update.includes(requiredPage) && !update.split(pageToVerify)[0].includes(requiredPage)) {
                    rightOrder = false
                    break
                }
            }
        }
    }

    if (rightOrder) {
        updatesInRightOrder.push(update)
    } else {
        updatesInWrongOrder.push(update)
    }
}


let total = 0

for (let update of updatesInRightOrder) {
    // Get middle number of each update
    const pageNumbers = update.split(',')
    const middlePage = pageNumbers[(pageNumbers.length - 1) / 2]
    total += parseInt(middlePage);
}
console.log(total)

// part two
total = 0

// Sort with algorithm. If b is in required precedences of a, a comes after b.
let sortedUpdates = updatesInWrongOrder.map(update => update.split(',').sort((a, b) => {
    return pageOrderRulingsMap[a]?.includes(b) ? 1 : -1
}))

for (let pageNumbers of sortedUpdates) {
    // Get middle number of each update
    const middlePage = pageNumbers[(pageNumbers.length - 1) / 2]
    total += parseInt(middlePage);
}
console.log(total)