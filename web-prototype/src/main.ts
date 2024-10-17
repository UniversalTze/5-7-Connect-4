import "./style.css";

import { Arduino } from "./arduino.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants.ts";

// Get the HTML element for the game board
const board: HTMLElement = document.getElementById("board")!;
const rows = BOARD_HEIGHT;
const cols = BOARD_WIDTH;

// Initialize the game board HTML structure
board.style.gridTemplateColumns = `repeat(${cols}, 80px)`;
board.style.gridTemplateRows = `repeat(${rows}, 80px)`;

// Create the grid cells for the game board
for (let i = 0; i < rows * cols; i++) {
  const cell: HTMLDivElement = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.col = (i % cols).toString();
  cell.dataset.row = Math.floor(i / cols).toString();
  cell.addEventListener("click", placeToken);
  board.appendChild(cell);
}

/**
 * @brief Handles the placement of a token in the specified column when a cell is clicked.
 * 
 * @param event - The click event triggered on the board cells.
 */
function placeToken(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const col = parseInt(target!.dataset!.col!);

  arduino.columnInput = col;
}

/**
 * @brief Updates the display number with a given value.
 * 
 * @param display - The display index to update (1 or 2).
 * @param number - The number to set in the display.
 */
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

/**
 * @brief Sets the color of a specified cell in the game board.
 * 
 * @param row - The row index of the cell.
 * @param col - The column index of the cell.
 * @param colour - The color to apply to the cell.
 */
function setPixelColor(row: number, col: number, colour: string) {
  const tokenCell = document.querySelector(
    `[data-col="${col}"][data-row="${row}"]`
  ) as HTMLElement;
  if (tokenCell != null) {
    tokenCell.style.backgroundColor = colour;
  }
}

/**
 * @brief Sets the border color of the game board.
 * 
 * @param color - The color to apply to the board's border.
 */
function setBorderColor(color: string) {
  board.style.borderColor = color;
}

// Initialize a pretend Arduino object with callback functions for pixel color, display number, and border color
const arduino = new Arduino(setPixelColor, setDisplayNumber, setBorderColor);

// Expose the Arduino instance to the global window object for debugging
(window as any).arduino = arduino;

// Set up the Arduino instance
arduino.setup();

/**
 * @brief Main game loop to continuously call the Arduino's loop method.
 */
function loop() {
  arduino.loop();
  requestAnimationFrame(loop);
}

// Add an event listener to reset the Arduino when the 'r' key is pressed
document.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    arduino.reset();
  }
});

// Start the game loop
requestAnimationFrame(loop);
