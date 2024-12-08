// import input from './exampleInput'
import input from './input'

const equations = input.split('\n')

function operate(value: number, index: number, numbers: number[], testValue: number) {
    const addResult = value + numbers[index + 1]
    if (index === numbers.length - 2 && addResult === testValue) return true
    else if (index < numbers.length - 2 && operate(addResult, index + 1, numbers, testValue)) return true

    const multiplyResult = value * numbers[index + 1]
    if (index === numbers.length - 2 && multiplyResult === testValue) return true
    else if (index < numbers.length - 2 && operate(multiplyResult, index + 1, numbers, testValue)) return true

    const concatResult = parseInt(`${value}${numbers[index + 1]}`)
    if (index === numbers.length - 2 && concatResult === testValue) return true
    else if (index < numbers.length - 2 && operate(concatResult, index + 1, numbers, testValue)) return true

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
