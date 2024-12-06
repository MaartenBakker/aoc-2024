// import input from './exampleInput'
import input from './input'

// part one

type Coordinate = { x: number, y: number, direction: Direction }
type Direction = 'up' | 'right' | 'down' | 'left'

// const visitedCoordinates: coordinate[] = []

let guardStart: Coordinate = { x: 0, y: 0, direction: 'up' }

const rows = input.split('\n')
let gridSize: { x: number, y: number } = { x: rows[0].length, y: rows.length }

for (const [index, row] of input.split('\n').entries()) {
    if (row.includes('^')) {
        guardStart = { x: row.indexOf('^'), y: index, direction: 'up' }
    }
}

function changeDirection(direction: Direction): Direction {
    const directions: Direction[] = ['up', 'right', 'down', 'left'];
    return directions[(directions.indexOf(direction) + 1) % directions.length];
}


function loopDetected(coordinate: Coordinate, visited: Coordinate[]): boolean {
    return visited.some(
        (visitedCoord) =>
            visitedCoord.x === coordinate.x &&
            visitedCoord.y === coordinate.y &&
            visitedCoord.direction === coordinate.direction
    );
}

function addIfNotVisited(coordinate: Coordinate, visitedCoordinates: Coordinate[]) {
    if (visitedCoordinates.find(visitedCoordinate => visitedCoordinate.x === coordinate.x && visitedCoordinate.y === coordinate.y) === undefined) {
        visitedCoordinates.push(coordinate)
    }
}

function move(start: Coordinate, rows: string[], visited: Coordinate[]): Coordinate[] {
    const { x, y, direction } = start;

    // Movement logic for each direction
    const moveActions = {
        up: () => {
            for (let newY = y; newY >= 0; newY--) {
                if (rows[newY][x] === '#') {
                    return move({ x, y: newY + 1, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x, y: newY, direction }, visited)) return visited;
                addIfNotVisited({ x, y: newY, direction }, visited);
            }
            return visited;
        },
        right: () => {
            for (let newX = x; newX < gridSize.x; newX++) {
                if (rows[y][newX] === '#') {
                    return move({ x: newX - 1, y, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x: newX, y, direction }, visited)) return visited;
                addIfNotVisited({ x: newX, y, direction }, visited);
            }
            return visited;
        },
        down: () => {
            for (let newY = y; newY < gridSize.y; newY++) {
                if (rows[newY][x] === '#') {
                    return move({ x, y: newY - 1, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x, y: newY, direction }, visited)) return visited;
                addIfNotVisited({ x, y: newY, direction }, visited);
            }
            return visited;
        },
        left: () => {
            for (let newX = x; newX >= 0; newX--) {
                if (rows[y][newX] === '#') {
                    return move({ x: newX + 1, y, direction: changeDirection(direction) }, rows, visited);
                }
                if (loopDetected({ x: newX, y, direction }, visited)) return visited;
                addIfNotVisited({ x: newX, y, direction }, visited);
            }
            return visited;
        },
    };

    return moveActions[direction]();
}


const visitedCoordinates = move(guardStart, rows, [])
console.log(visitedCoordinates!.length)

// part two

let loopOptionsCount = 0

function setCharAt(str: string, index: number, char: string): string {
    return index >= str.length ? str : str.substring(0, index) + char + str.substring(index + 1);
}



for (const visited of visitedCoordinates!) {
    const updatedRows = [...rows];
    updatedRows[visited.y] = setCharAt(updatedRows[visited.y], visited.x, '#');
    move(guardStart, rows, [])
}

console.log('loopOptionsCount', loopOptionsCount)

