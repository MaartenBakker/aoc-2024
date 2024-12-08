// import input from './exampleInput'
import input from './input'

const equations = input.split('\n')

function operate(value: number, index: number, numbers: number[], testValue: number) {
    const addResult = value + numbers[index + 1]
    const lastIndexReached = index === numbers.length - 2
    if (lastIndexReached && addResult === testValue) return true
    else if (!lastIndexReached && operate(addResult, index + 1, numbers, testValue)) return true

    const multiplyResult = value * numbers[index + 1]
    if (lastIndexReached && multiplyResult === testValue) return true
    else if (!lastIndexReached && operate(multiplyResult, index + 1, numbers, testValue)) return true

    const concatResult = parseInt(`${value}${numbers[index + 1]}`)
    if (lastIndexReached && concatResult === testValue) return true
    else if (!lastIndexReached && operate(concatResult, index + 1, numbers, testValue)) return true

    return false
}

// part one and two

let totalCalibrationResult = 0

for (let equation of equations) {
    const testValue = parseInt(equation.split(': ')[0])
    const numbers = equation.split(': ')[1].split(' ').map(str => parseInt(str))

    if (operate(numbers[0], 0, numbers, testValue)) {
        totalCalibrationResult += testValue
    }
}

console.log(totalCalibrationResult)
