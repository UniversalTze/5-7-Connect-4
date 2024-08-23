import "./style.css";

import { Arduino } from "./arduino.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants.ts";
import { BoardDisplay } from './BoardDisplay';

const board: HTMLElement = document.getElementById("board")!;
const rows = BOARD_HEIGHT;
const cols = BOARD_WIDTH;

// Initialise game HTML
board.style.gridTemplateColumns = `repeat(${cols}, 80px)`;
board.style.gridTemplateRows = `repeat(${rows}, 80px)`;

for (let i = 0; i < rows * cols; i++) {
  const cell: HTMLDivElement = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.col = (i % cols).toString();
  cell.dataset.row = Math.floor(i / cols).toString();
  cell.addEventListener("click", placeToken);
  board.appendChild(cell);
}

function placeToken(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const col = parseInt(target!.dataset!.col!);

  arduino.columnInput = col;
}

function setDisplayNumber(display: number, number: number) {
  const displayElement = document.querySelector(
    `#display-${display}`
  ) as HTMLElement;
  if (display != null) {
    displayElement.innerHTML = number.toString();
  }
}

function setPixelColor(row: number, col: number, colour: string) {
  const tokenCell = document.querySelector(
    `[data-col="${col}"][data-row="${row}"]`
  ) as HTMLElement;
  if (tokenCell != null) {
    tokenCell.style.backgroundColor = colour;
  }
}

// Initialise pretend Arduino
const arduino = new Arduino(setPixelColor, setDisplayNumber);

// Expose arduino to the global window object
(window as any).arduino = arduino;

arduino.setup();

function loop() {
  arduino.loop();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// Used for testing BoardDisplay class
let currentBoard: number[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0], // Initial combo setup
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 2, 2, 2, 0, 0],
];

let clearedBoard: number[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0], // After clearing the combo
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const boardDisplay = new BoardDisplay();

// Tests the board is displaying the pieces correctly
// boardDisplay.animateBoard(currentBoard);

// Tests flashing pieces 
boardDisplay.animateComboClear(currentBoard, clearedBoard);

boardDisplay.updateScoreDisplay(1, 2)
