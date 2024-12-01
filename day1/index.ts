import input from './input';
// import input from './exampleInput';

// Part one

const list1 = []
const list2 = []
let totalDistance = 0

for (let inputLine of input.split('\n')) {
    list1.push(parseInt(inputLine.split('   ')[0]))
    list2.push(parseInt(inputLine.split('   ')[1]))
}

list1.sort()
list2.sort()

for (let i = 0; i < list1.length; i++) {
    totalDistance += Math.abs(list1[i] - list2[i]);
}

console.log(totalDistance)

// Part two
let totalSimilarityScore = 0

for (let list1Number of list1) {
    const frequency = list2.filter(list2Number => list2Number === list1Number).length
    totalSimilarityScore += list1Number * frequency
}


console.log(totalSimilarityScore)
