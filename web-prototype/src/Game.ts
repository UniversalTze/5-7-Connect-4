// Any import statements come above this. 
import { NO_INPUT } from "./constants";
import { Player } from "./Player";

const WINNING_SCORE = 21;  
const TURN_TIME = 30000; //30 secodns in milliseconds
const ROTATE_BOARD = 120000; // 2 minutes in milliseconds 
// Still need to set interval for this board, and need reference to board variable 
// to complete this function. 

export class Game {
  // Asynchornous function to keep track of if player has moved or not. 
  // In C++ we can use a thread to detect if something has been entered. 
  private moveTimeoutId: ReturnType<typeof setTimeout> | null = null;  
  private rotateIntervalId: ReturnType<typeof setTimeout> | null = null; 
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

  public startGame(): void { 
    this.startRotationCountdown(); 
    this.startTurn(this.player1turn); 
  }

  //Tested and works for skip turn.
  public switchTurn(): void { 
    this.player1turn = !this.player1turn; 
    // this.startTurn(this.player1turn); 
  }

  private rotateBoard(): void { 
    // Rotate board should stall the timer (player turn time should not be counting down)
    // used to rotate board and calculate player points .
    console.log("Board is rotating!!!!!!"); 
  }

  public startRotationCountdown(): void { 
    this.rotateIntervalId = setInterval(() => { 
      this.rotateBoard();
    }, ROTATE_BOARD);
  }

  public getPlayer1turn(): boolean { 
    return this.player1turn;  
  }

  public skipTurn(playerTurn: boolean): void { 
    console.log("Player's turn has been skipped"); 
    this.switchTurn(); 
  }

  public startTurn(playerTurn: boolean): void{ 
      console.log("Countdown for player's turn begins now");
      this.moveTimeoutId = setTimeout(() => {
        this.skipTurn(playerTurn);
      }, TURN_TIME);
  }

  public processPlayerMove(playerTurn: boolean): void { 
      if (this.moveTimeoutId != null) { 
        clearTimeout(this.moveTimeoutId); 
        // cancel timeout limit
      }
      // Need reference to board to update board and player score after moves
      this.switchTurn(); // this function should start the next player's turn....


      // At the end of move. 
      this.switchTurn(); 

  }

  public checkDraw(): boolean { 
    if (this.p1haswon && this.p2haswon) { 
      return true; 
    }
    return false; 

  }
  /**
   * Should return true when someone has won the game
   *  */ 
  public checkWin(): boolean {
    if (this.player1.getPlayerScore() >= WINNING_SCORE) { 
      this.p1haswon = true; 
    }
    else if (this.player2.getPlayerScore() >= WINNING_SCORE) { 
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
  public checkPlayerWin(): Player { 
    if (this.p1haswon && this.p2haswon) { 
      console.log("Draw has occured"); 
      // TODO: what should we do in this scenario.....
      // Need to discuss with Team
    }
    else if (this.p1haswon) { 
      console.log("Player 1 has won");
      return this.player1; 
    }
    console.log("Player 2 has won")
    return this.player2; 
  }

  public getCurrentPlayer(): number {
    return this.player1turn ? 1 : 2
  }

  public getPlayerOne(): Player {
    return this.player1;
  }

  public getPlayerTwo(): Player {
    return this.player2;
  }
}
