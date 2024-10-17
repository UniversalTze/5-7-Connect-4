// Any import statements come above this. 
import { NO_INPUT } from "./constants";
import { Player } from "./Player";
import { BoardDisplay } from "./BoardDisplay.ts";
import { Arduino } from "./arduino.ts";

const WINNING_SCORE = 21;

export class Game {
  private player1turn: boolean; 
  private p1haswon: boolean;
  private p2haswon: boolean; 
  private player1: Player;
  private player2: Player;

  constructor() {
    //leave constructor as empty for now
    // for future reference, Reference to board will be needed to start game. 

    // Their turn will have been set to false, unless we want to check score first before 
    // changin turn. (that switch turn will be down at the last one)
    this.player1 = new Player(0, "Player1"); 
    this.player2 = new Player(0, "Player2"); 
    this.player1turn = true;  
    this.p1haswon = false; 
    this.p2haswon = false; 
  }

  /**
   * @brief Switches the turn to the next player.
   */
  public switchTurn(): void { 
    this.player1turn = !this.player1turn; 
  }

  /**
   * @brief Gets the current player's turn status.
   * 
   * @returns A boolean indicating if it is Player 1's turn.
   */
  public getPlayer1turn(): boolean { 
    return this.player1turn;  
  }

  /**
   * @brief Checks if the game has ended in a draw.
   * 
   * @returns A boolean indicating whether the game is a draw.
   */
  public checkDraw(): boolean { 
    if (this.p1haswon && this.p2haswon) { 
      return true; 
    }
    return false; 
  }

  /**
   * @brief Checks if a player has won the game.
   * 
   * @returns A boolean indicating whether there is a winner.
   */
  public checkWin(): boolean {
    if (this.player1.getPlayerScore() >= WINNING_SCORE) { 
      this.p1haswon = true; 
    }
    if (this.player2.getPlayerScore() >= WINNING_SCORE) { 
      this.p2haswon = true; 
    } 
    if (this.p1haswon || this.p2haswon) { 
        return true; 
    }
    return false; 
  }

  /**
   * Should only be called after checkWin() return true. 
   * This is used to determine which player has won. 
   * @returns 
   */
  public checkPlayerWin(display: BoardDisplay): Player { 
    if (this.p1haswon && this.p2haswon) { 
      console.log("Draw has occured"); 
    }
    else if (this.p1haswon) { 
      console.log("Player 1 has won");      
      return this.player1; 
    }
    console.log("Player 2 has won")

    return this.player2; 
  }

  /**
   * @brief Gets the current player number.
   * 
   * @returns The number of the current player (1 or 2).
   */
  public getCurrentPlayer(): number {
    return this.player1turn ? 1 : 2
  }

  /**
   * @brief Gets the first player.
   * 
   * @returns The Player object for Player 1.
   */
  public getPlayerOne(): Player {
    return this.player1;
  }

  /**
   * @brief Gets the second player.
   * 
   * @returns The Player object for Player 2.
   */
  public getPlayerTwo(): Player {
    return this.player2;
  }

  /**
   * @brief Resets the game state for a new game.
   */
  public reset() {
    this.player1turn = true;  
    this.p1haswon = false; 
    this.p2haswon = false; 
  }
}
