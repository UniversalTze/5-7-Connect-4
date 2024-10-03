import * as constants from "./constants.ts";

export class BoardDisplay {
  
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

  // Update's the score and score display for the players
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

  public animateComboClear(previousBoard: number[][], clearedBoard: number[][]): void {
    for (let i = 0; i < constants.BOARD_HEIGHT; i++) {
      for (let j = 0; j < constants.BOARD_WIDTH; j++) {
        if (previousBoard[i][j] != clearedBoard[i][j]) {
          this.setPixelColor(i, j, this.getRandomColor(constants.RAINBOW))
        }
      }
    }
  }

  // Returns a random colour
  getRandomColor(RAINBOW: string[]) {
    const randomIndex = Math.floor(Math.random() * RAINBOW.length);
    return RAINBOW[randomIndex];
  }

  // Animates the board when it's full
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

  // Show a pop up message for restarting the game
  // showPopup(message: string, resetCallback: () => void) {
  //   const popup = document.getElementById("popup");
  //   const popupContent = document.querySelector("#popup .popup-content") as HTMLElement;
  
  //   if (popup && popupContent) {
  //     // Set the message
  //     const messageElement = popupContent.querySelector("p");
  //     if (messageElement) {
  //       messageElement.innerText = message;
  //     }
  
  //     // Add a button to the popup
  //     const actionButton = document.createElement("button");
  //     actionButton.innerText = "Play again";
  //     actionButton.addEventListener("click", () => {
  //       console.log("Restarting the game...");
  //       popup.style.display = "none";
  //       resetCallback(); // Call the reset function passed as a parameter
  //     });
  
  //     // Remove any existing action buttons to avoid duplication
  //     const existingButton = popupContent.querySelector("button");
  //     if (existingButton) {
  //       existingButton.remove();
  //     }
  
  //     // Append the new button
  //     popupContent.appendChild(actionButton);
  
  //     // Show the popup
  //     popup.style.display = "flex";
  
  //     // Close button to hide the popup
  //     const closePopupButton = document.getElementById("closePopup");
  //     if (closePopupButton) {
  //       closePopupButton.addEventListener("click", () => {
  //         popup.style.display = "none";
  //       });
  //     }
  //   }
  // }
  

}




