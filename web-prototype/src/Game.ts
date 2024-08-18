// Any import statements come above this. 

const WINNING_SCORE = 21;  
const TURN_TIME = 10; // represent time in seconds
const ROTATE = 120; // constatn for now (2 minutes)
export class Game {
  
  private p1Score: Number; // instead of number variable it will be player entities. 
  private p2Score: Number; 
  private player1turn: Boolean; 

  constructor() {
    //leave constructor as empty for now
    // for future reference, Reference to board will be needed to start game. 

    // current logic for determining win, it will be the negation of player turn. 
    // Their turn will have been set to false, unless we want to check score first before 
    // changin turn. (that switch turn will be down at the last one)

    
    this.p1Score = 0;
    this.p2Score = 0; // these will be changes. 
    this.player1turn = true;  
  }

  public getPlayer1turn(): Boolean { 
    return this.player1turn;  
    
  }

  public switchTurn(p1Turn: Boolean): void { 
    this.player1turn = !p1Turn;
  }

  public checkWin(checkScore: Number): Boolean {
    if (checkScore = WINNING_SCORE) { 
      return true
    }
    return false; 
  }

  public checkWinner(playerTurn: Boolean, playerScore: Number) { 
    if (this.getPlayer1turn() == true && this.checkWin(this.p1Score)) { 
      //return Player 1 entity for win 
    }
  }

}
