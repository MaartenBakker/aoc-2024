// import input from "./exampleInput";
import input from "./input";


// part one

function reportIsSafe(report: string, skipLevelIndex?: number) {
    let levels = report.split(' ').map(str => parseInt(str))
    if (skipLevelIndex != undefined) {
        levels.splice(skipLevelIndex, 1)
    }

    let safe = true
    let direction: number | undefined

    for (let i = 0; i < levels.length - 1 && safe; i++) {
        const diff = levels[i] - levels[i + 1];

        if (diff === 0) safe = false;
        if (Math.abs(diff) > 3) safe = false;

        if (!direction) {
            direction = Math.sign(diff);
        } else if (Math.sign(diff) !== direction) {
            safe = false;
        }
    }
    return safe
}

let safeCounter = 0

for (let report of input.split('\n')) {
    if (reportIsSafe(report)) {
        safeCounter++
    }
}

console.log(safeCounter)

// part two

safeCounter = 0

for (let report of input.split('\n')) {
    if (reportIsSafe(report)) {
        safeCounter++
        continue
    }

    for (let i = 0; i < report.length; i++) {
        if (reportIsSafe(report, i)) {
            safeCounter++
            break
        }
    }
}

console.log(safeCounter)