// import input from './exampleInput'
import input from './input'

// part one

const rows = input.split('\n')

type Coordinate = { x: number, y: number }

function serialize(coordinate: Coordinate) {
    return `${coordinate.x}-${coordinate.y}`
}

function onGrid(coordinate: Coordinate, gridSize: { x: number, y: number }) {
    return coordinate.x >= 0 && coordinate.y >= 0 && coordinate.x < gridSize.x && coordinate.y < gridSize.y
}

const gridSize = { x: rows[0].length, y: rows.length }

const antennaMap: { [key: string]: Coordinate[] } = {}

const antennaPattern = /[A-z]|\d/

for (let y = 0; y < gridSize.y; y++) {
    for (let x = 0; x < gridSize.x; x++) {
        const char = rows[y].charAt(x)
        if (char.match(antennaPattern)) {
            antennaMap[char] ? antennaMap[char].push({ x, y }) : antennaMap[char] = [{ x, y }]
        }
    }
}

function getAntinodes(a: Coordinate, b: Coordinate) {
    const xDiff = Math.abs(a.x - b.x)
    const yDiff = Math.abs(a.y - b.y)

    let antinodeA = { x: 0, y: 0 }
    let antinodeB = { x: 0, y: 0 }

    if (a.x < b.x) {
        antinodeA.x = a.x - xDiff
        antinodeB.x = b.x + xDiff
    } else {
        antinodeA.x = a.x + xDiff
        antinodeB.x = b.x - xDiff
    }

    if (a.y < b.y) {
        antinodeA.y = a.y - yDiff
        antinodeB.y = b.y + yDiff
    } else {
        antinodeA.y = a.y + yDiff
        antinodeB.y = b.y - yDiff
    }

    return [antinodeA, antinodeB]
}

function getAntinodesWithResonances(a: Coordinate, b: Coordinate) {
    const antinodes = [];

    const dx = b.x - a.x;
    const dy = b.y - a.y;

    // Handle vertical line separately (dx = 0)
    if (dx === 0) {
        for (let y = 0; y < gridSize.y; y++) {
            antinodes.push({ x: a.x, y });
        }
    } else {

        // Move to left from 'a' until out of the grid
        {
            let curX = a.x;
            let curY = a.y;
            while (curX >= 0 && curY >= 0 && curY < gridSize.y) {
                antinodes.push({ x: curX, y: curY });
                curX -= dx;
                curY -= dy;
            }
        }

        // Move to right from 'a' until out of the grid
        {
            let curX = a.x;
            let curY = a.y;
            while (curY >= 0 && curX < gridSize.x && curY < gridSize.y) {
                antinodes.push({ x: curX, y: curY });
                curX += dx;
                curY += dy;
            }
        }
    }

    return antinodes;
}

// compare each coordinate per charmap key to all the coordinates that follow
// check if result is within bounds

const uniqueAntinodes = new Set()

for (let antennas of Object.values(antennaMap)) {
    for (let i = 0; i < antennas.length - 1; i++) {
        const antenna = antennas[i]
        for (let j = i + 1; j < antennas.length; j++) {
            const otherAntenna = antennas[j]
            // Part one
            // for (let antinode of getAntinodes(antenna, otherAntenna)) {
            // Part two
            for (let antinode of getAntinodesWithResonances(antenna, otherAntenna)) {
                if (onGrid(antinode, gridSize)) {
                    uniqueAntinodes.add(serialize(antinode))
                }
            }
        }
    }
}
console.log(uniqueAntinodes.size)


