// import input from './exampleInput'
import input from './input'

// part one

type Coordinate = { x: number, y: number, direction: Direction }
type Direction = 'up' | 'right' | 'down' | 'left'

let guardStart: Coordinate = { x: 0, y: 0, direction: 'up' }

const rows = input.split('\n')
let gridSize: { x: number, y: number } = { x: rows[0].length, y: rows.length }

for (const [index, row] of input.split('\n').entries()) {
    if (row.includes('^')) {
        guardStart = { x: row.indexOf('^'), y: index, direction: 'up' }
    }
}

function serialize(coordinate: Coordinate) {
    return `${coordinate.x}-${coordinate.y}`
}

function changeDirection(direction: Direction): Direction {
    const directions: Direction[] = ['up', 'right', 'down', 'left'];
    return directions[(directions.indexOf(direction) + 1) % directions.length];
}


function loopDetected(coordinate: Coordinate, visited: Map<string, Coordinate[]>): boolean {
    const loopDetected = visited.get(serialize(coordinate))?.some(visitedCoordinate => visitedCoordinate.direction === coordinate.direction)
    return loopDetected!!
}

function addIfNotVisited(coordinate: Coordinate, visitedCoordinates: Map<string, Coordinate[]>) {
    const serialized = serialize(coordinate)
    if (visitedCoordinates.get(serialized)) {
        visitedCoordinates.get(serialized)!.push(coordinate)
    } else {
        visitedCoordinates.set(serialize(coordinate), [coordinate])
    }
}

function move(start: Coordinate, rows: string[], visited: Map<string, Coordinate[]>): Map<string, Coordinate[]> {
    const { x, y, direction } = start;

    const moveActions = {
        up: () => {
            for (let newY = y - 1; newY >= 0; newY--) {
                if (rows[newY][x] === '#') {
                    return move({ x, y: newY + 1, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x, y: newY, direction }, visited)) {
                    loopOptionsCount++
                    return visited;
                }
                addIfNotVisited({ x, y: newY, direction }, visited);
            }
            return visited;
        },
        right: () => {
            for (let newX = x + 1; newX < gridSize.x; newX++) {
                if (rows[y][newX] === '#') {
                    return move({ x: newX - 1, y, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x: newX, y, direction }, visited)) {
                    loopOptionsCount++
                    return visited;
                }
                addIfNotVisited({ x: newX, y, direction }, visited);
            }
            return visited;
        },
        down: () => {
            for (let newY = y + 1; newY < gridSize.y; newY++) {
                if (rows[newY][x] === '#') {
                    return move({ x, y: newY - 1, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x, y: newY, direction }, visited)) {
                    loopOptionsCount++
                    return visited;
                }
                addIfNotVisited({ x, y: newY, direction }, visited);
            }
            return visited;
        },
        left: () => {
            for (let newX = x - 1; newX >= 0; newX--) {
                if (rows[y][newX] === '#') {
                    return move({ x: newX + 1, y, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x: newX, y, direction }, visited)) {
                    loopOptionsCount++
                    return visited;
                }
                addIfNotVisited({ x: newX, y, direction }, visited);
            }
            return visited;
        },
    };

    return moveActions[direction]();
}


const visitedCoordinates = move(guardStart, rows, new Map())
console.log(visitedCoordinates.size)


// part two

let loopOptionsCount = 0
visitedCoordinates.delete(serialize(guardStart))

function setCharAt(str: string, index: number, char: string): string {
    return index >= str.length ? str : str.substring(0, index) + char + str.substring(index + 1);
}

for (const visited of visitedCoordinates.values()) {
    const updatedRows = [...rows];

    updatedRows[visited[0].y] = setCharAt(updatedRows[visited[0].y], visited[0].x, '#');
    move(guardStart, updatedRows, new Map())
}

console.log('loopOptionsCount', loopOptionsCount)

