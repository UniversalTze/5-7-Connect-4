import * as constants from "./constants.ts";

export class BoardDisplay {
  
  animateBoard(currentBoard: number[][]) { 
    // Updates the board
    for (let row = 0; row < currentBoard.length; row++) {
      for (let col = 0; col < currentBoard[row].length; col++) {
        if (currentBoard[row][col] == 1) {
          // Player 1 color 
          this.setPixelColor(row, col, constants.PLAYER_COLOR[0])
        } else if (currentBoard[row][col] == 2) {
          // Player 2 color
          this.setPixelColor(row, col, constants.PLAYER_COLOR[1])
        }
      }
    }
  }

  animateComboClear(currentBoard: number[][], clearedBoard: number[][]) {
    // Animates the flashing pieces
    for (let row = 0; row < currentBoard.length; row++) {
      for (let col = 0; col < currentBoard[row].length; col++) {
        // Compare the differences between currentBoard and clearedBoard
        if (currentBoard[row][col] == clearedBoard[row][col]) {
          // Set's the pixel color
          if (currentBoard[row][col] == 1) {
            // Player 1 color 
            this.setPixelColor(row, col, constants.PLAYER_COLOR[0])
          } else if (currentBoard[row][col] == 2) {
            // Player 2 color
            this.setPixelColor(row, col, constants.PLAYER_COLOR[1])
          }   
        } else {
          // If it's different
          // TODO: flash the pixel colour
          if (currentBoard[row][col] == 1) {
            // Player 1 color 
            this.flashPixel(row, col, constants.PLAYER_COLOR[0])
          } else if (currentBoard[row][col] == 2) {
            // Player 2 color
            this.flashPixel(row, col, constants.PLAYER_COLOR[1])
          }
        }
      }
    }
  }

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

  // Method for setting the pixel color
  private setPixelColor(row: number, col: number, color: string) {
    const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
    if (cellElement) {
      cellElement.style.backgroundColor = color;
    }
  }

  private flashPixel(row: number, col: number, originalColor: string) {
    const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
    if (cellElement) {
      const backGroundColor = cellElement.style.backgroundColor;
      const flashDuration = 500; // Duration of each flash in ms
      this.setPixelColor(row, col, constants.FLASH_COLOR[0]); // Start with white
      setTimeout(() => {
        this.setPixelColor(row, col, originalColor); // Flash back to the original color
      }, flashDuration);

      setTimeout(() => {
        this.setPixelColor(row, col, constants.FLASH_COLOR[0]); // Flash to white again
      }, flashDuration * 2);

      setTimeout(() => {
        this.setPixelColor(row, col, backGroundColor); // Restore the original color
      }, flashDuration * 3);
    }
  }

  private flashPixel2(row: number, col: number, originalColor: string) {
    const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLElement;
    if (cellElement) {
      const backGroundColor = cellElement.style.backgroundColor;
      const flashDuration = 500; // Duration of each flash in ms
      this.setPixelColor(row, col, constants.FLASH_COLOR[0]); // Start with white
      setTimeout(() => {
        this.setPixelColor(row, col, originalColor); // Flash back to the original color
      }, flashDuration);

      setTimeout(() => {
        this.setPixelColor(row, col, constants.FLASH_COLOR[0]); // Flash to white again
      }, flashDuration * 2);

      setTimeout(() => {
        this.setPixelColor(row, col, backGroundColor); // Restore the original color
      }, flashDuration * 3);
    }
  }

  private something(currentTime: number) {
    if (currentTime == 500) {
      
    }
    if (currentTime == 1000) {
      
    }
    if (currentTime == 1500) {
      
      return true
    }
    
    
    return false
  }
}


