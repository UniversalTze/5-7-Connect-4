import * as constants from "./constants.ts";

export class BoardDisplay {
  
    /**
   * @brief Updates the visual representation of the game board.
   * 
   * @param currentBoard - A 2D array representing the current state of the board, 
   * where 0 represents an empty cell, 1 represents Player 1's piece, and 
   * 2 represents Player 2's piece.
   */
  animateBoard(currentBoard: number[][]) { 
    // Updates the board
    for (let row = 0; row < currentBoard.length; row++) {
      for (let col = 0; col < currentBoard[row].length; col++) {
        if (currentBoard[row][col] == 0) {
          this.setPixelColor(row, col, constants.EMPTY_COLOR)
        }
        if (currentBoard[row][col] == 1) {
          // Player 1 color 
          this.setPixelColor(row, col, constants.PLAYER_1_COLOR)
        } else if (currentBoard[row][col] == 2) {
          // Player 2 color
          this.setPixelColor(row, col, constants.PLAYER_2_COLOR)
        }
      }
    }
  }

  /**
   * @brief Updates the score display for both players.
   * 
   * @param playerOneScore - The current score of Player 1.
   * @param playerTwoScore - The current score of Player 2.
   */
  updateScoreDisplay(playerOneScore: number, playerTwoScore: number) {
    const playerOneScoreElement = document.getElementById("display-0");
    // Update Player 1's score
    if (playerOneScoreElement) {
      playerOneScoreElement.innerText = playerOneScore.toString();
    }

    // Update Player 2's score
    const playerTwoScoreElement = document.getElementById("display-3"); // Assuming player 2's score has id "display-1"
    if (playerTwoScoreElement) {
      playerTwoScoreElement.innerText = playerTwoScore.toString();
    }
  }

  /**
   * @brief Sets the color of a specific pixel on the board.
   * 
   * @param row - The row index of the pixel.
   * @param col - The column index of the pixel.
   * @param color - The color to set, represented as a string.
   */
  private setPixelColor(row: number, col: number, color: string) {
    const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
    if (cellElement) {
      cellElement.style.backgroundColor = color;
    }
  }

  /**
   * @brief Animates a clear combo on the board by setting random colors 
   * for cells that have changed.
   * 
   * @param previousBoard - The state of the board before the combo was cleared.
   * @param clearedBoard - The state of the board after the combo was cleared.
   */
  public animateComboClear(previousBoard: number[][], clearedBoard: number[][]): void {
    for (let i = 0; i < constants.BOARD_HEIGHT; i++) {
      for (let j = 0; j < constants.BOARD_WIDTH; j++) {
        if (previousBoard[i][j] != clearedBoard[i][j]) {
          this.setPixelColor(i, j, this.getRandomColor(constants.RAINBOW))
        }
      }
    }
  }

  /**
   * @brief Returns a random color from a given array of colors.
   * 
   * @param RAINBOW - An array of color strings to choose from.
   * @return A random color as a string.
   */
  getRandomColor(RAINBOW: string[]) {
    const randomIndex = Math.floor(Math.random() * RAINBOW.length);
    return RAINBOW[randomIndex];
  }

  /**
   * @brief Animates the board when it's full by setting random colors for 
   * Player 1 and Player 2 pieces.
   * 
   * @param currentBoard - A 2D array representing the current state of the board.
   */
  animateFullBoard(currentBoard: number[][]) {
    for (let row = 0; row < currentBoard.length; row++) {
      for (let col = 0; col < currentBoard[row].length; col++) {
        if (currentBoard[row][col] == 0) {
          this.setPixelColor(row, col, constants.EMPTY_COLOR)
        }
        if (currentBoard[row][col] == 1) {
          // Player 1 color 
          this.setPixelColor(row, col, this.getRandomColor(constants.RAINBOW))
        } else if (currentBoard[row][col] == 2) {
          // Player 2 color
          this.setPixelColor(row, col, this.getRandomColor(constants.RAINBOW))
        }
      }
    }
  } 
}




