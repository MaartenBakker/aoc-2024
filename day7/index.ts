// import input from './exampleInput'
import input from './input'

const equations = input.split('\n')

function operate(value: number, index: number, numbers: number[], testValue: number): boolean {
    const lastIndexReached = index === numbers.length - 2
    const attempt = (result: number) =>
        lastIndexReached ? result === testValue : operate(result, index + 1, numbers, testValue)

    return attempt(value + numbers[index + 1])
        || attempt(value * numbers[index + 1])
        || attempt(parseInt(`${value}${numbers[index + 1]}`))
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
