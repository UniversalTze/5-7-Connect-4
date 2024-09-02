import "./style.css";

import { Arduino } from "./arduino.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants.ts";

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
    if (display == 1 || display == 2) {
      displayElement.innerHTML = number.toFixed(1);
    } else {
      displayElement.innerHTML = number.toString();
    }
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

function setBorderColor(color: string) {
  board.style.borderColor = color;
}

// Initialise pretend Arduino
const arduino = new Arduino(setPixelColor, setDisplayNumber, setBorderColor);

// Expose arduino to the global window object
(window as any).arduino = arduino;

arduino.setup();

function loop() {
  arduino.loop();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
