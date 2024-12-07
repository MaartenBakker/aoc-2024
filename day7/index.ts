// import input from './exampleInput'
import input from './input'

const equations = input.split('\n')

function operateOnNumberPair(a: number, b: number, testValue: number) {
    const results = []

    results.push(a + b)
    results.push(a * b)
    results.push(parseInt(`${a}${b}`))

    // If the result are larger than the testValue, we don't need to handle them further
    return results.filter(result => result <= testValue)

}

// part one and two

let totalCalibrationResult = 0

for (let equation of equations) {
    const testValue = parseInt(equation.split(': ')[0])
    const numbers = equation.split(': ')[1].split(' ').map(str => parseInt(str))
    let values = new Set<number>()
    values.add(numbers[0])

    for (let number of numbers.toSpliced(0, 1)) {

        let newValues = new Set<number>()
        for (let value of values) {
            const results = operateOnNumberPair(value, number, testValue)
            for (let number of results) {
                newValues.add(number)
            }
        }
        values = newValues
    }

    if (values.has(testValue)) {
        totalCalibrationResult += testValue
    }
}

console.log(totalCalibrationResult)
