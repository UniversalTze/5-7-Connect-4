// THIS FILE IS MEANT TO EMULATE ARDUINO CODE

import { Board } from "./Board.ts";
import { BoardDisplay } from "./BoardDisplay.ts";
import * as constants from "./constants.ts";
import { Game } from "./Game.ts";

export class Arduino {
  columnInput: number = constants.NO_INPUT;
  setPixelColor: (row: number, col: number, colour: string) => void;
  setDisplayNumber: (display: number, number: number) => void;
  setBorderColor: (color: string) => void;

  // These variables are just for the DEMO
  previousTime: number = 0;
  previousRotationTime: number = 0;
  game: Game = new Game();
  board: Board = new Board();
  display: BoardDisplay = new BoardDisplay();
  endCheck: boolean = false;
  frameCounter: number = 0; 
  drawAnimation: number = 0; 

  state: number = -1;
  previousValidColumnInput: number = -1;

  constructor(
    setPixelColor: (row: number, col: number, colour: string) => void,
    setDisplayNumber: (display: number, number: number) => void,
    setBorderColor: (color: string) => void
  ) {
    this.setPixelColor = setPixelColor;
    this.setDisplayNumber = setDisplayNumber;
    this.setBorderColor = setBorderColor;
  }

  setup() {
    // initialise current state
    this.changeState(constants.WAIT_FOR_TOKEN_STATE, Date.now())
    
  }

  // Resets the game when it's restarted
  reset() {
    // Reset game state variables
    this.changeState(constants.WAIT_FOR_TOKEN_STATE, Date.now())
    this.previousRotationTime = Date.now()
    this.columnInput = constants.NO_INPUT;
    this.previousRotationTime = 0;
    this.endCheck = false;
    this.frameCounter = 0;
    this.drawAnimation = 0;
    this.previousValidColumnInput = -1;
    this.game.reset()

    // Reset the board 
    this.board.clearBoard(); // Clears the board data
    this.display.animateBoard(this.board.getBoard()); // Updates the board visually
    
    // Reset player scores
    this.display.updateScoreDisplay(0, 0); // Reset scores to 0
    this.game.getPlayerOne().resetPlayerScore()
    this.game.getPlayerTwo().resetPlayerScore()
    
    // Reset board colour
    this.setBorderColor(constants.PLAYER_1_COLOR); // Set initial border color for Player 1
  }

  loop() {
    // Code Demo for blinking light, NO using delays
    let currentTime = Date.now();

    let timeTilRotation = Math.max(0, constants.BOARD_ROTATION_INTERVAL - (currentTime - this.previousRotationTime))
    
    this.setDisplayNumber(constants.BOARD_ROTATION_DISPLAY, timeTilRotation / 1000)

    switch (this.state) {
      case constants.WAIT_FOR_TOKEN_STATE:
        let remainingTurnTime = (constants.PLAYER_TURN_INTERVAL - (currentTime - this.previousTime)) 
        this.setDisplayNumber(constants.PLAYER_TURN_DISPLAY, remainingTurnTime / 1000)

        // handle board rotating 
        if (timeTilRotation <= 0) {
          console.log(`uh oh! board is rotatin!`)
          this.board.rotateBoard(90);
          this.display.animateBoard(this.board.getBoard());
          this.changeState(constants.TOKEN_FALLING_STATE, currentTime);
          this.previousRotationTime = currentTime;
        }

        // handle player running out of time
        if (remainingTurnTime <= 0) {
          console.log(`player ${this.game.getCurrentPlayer()} ran out of time`)
          this.previousTime = currentTime;

          this.game.switchTurn();
          if (this.game.getCurrentPlayer() == 1) {
            this.setBorderColor(constants.PLAYER_1_COLOR);
          } else {
            this.setBorderColor(constants.PLAYER_2_COLOR)
          }
          break;
        }

        if (this.columnInput == constants.NO_INPUT) break;

        console.log(`token detected at ${this.columnInput}`)
        
        if (this.board.placeToken(this.columnInput, this.game.getCurrentPlayer())) {
          console.log(`valid column`)
          this.previousValidColumnInput = this.columnInput;
          this.display.animateBoard(this.board.getBoard());
          this.changeState(constants.TOKEN_FALLING_STATE, currentTime);
          this.game.switchTurn();
        } else {
          console.log(`invalid column`)
          // handle error behaviour
        }
        
        this.columnInput = constants.NO_INPUT;

        break;
      case constants.TOKEN_FALLING_STATE:
        if (currentTime - this.previousTime >= constants.TOKEN_FALLING_INTERVAL) {
          let tokenFell: boolean = this.board.tokenFall()
          this.previousTime = currentTime;

          if (tokenFell) {
            this.display.animateBoard(this.board.getBoard())
          } else {
            // done falling, now check for line clears
            let points: number[] = [0, 0];
            let linesCleared = this.board.clearCombos(points, this.previousValidColumnInput, constants.FULL_CLEAR);
            this.previousValidColumnInput = constants.NO_INPUT;
            this.game.getPlayerOne().addPlayerScore(points[0]);
            this.game.getPlayerTwo().addPlayerScore(points[1]);
            this.display.updateScoreDisplay(this.game.getPlayerOne().getPlayerScore(), this.game.getPlayerTwo().getPlayerScore());
            if (linesCleared) {
              // switch
              console.log('linefound')
              this.changeState(constants.ANIMATE_LINE_CLEAR_STATE, currentTime)

              this.display.animateComboClear(this.board.getPrevBoard(), this.board.getBoard())
            } else if (this.board.isBoardFull()) {
              console.log('full board')
              this.changeState(constants.FULL_BOARD_STATE, currentTime)
            } else {
              this.changeState(constants.WAIT_FOR_TOKEN_STATE, currentTime);
              if (this.game.getCurrentPlayer() == 1) {
                this.setBorderColor(constants.PLAYER_1_COLOR);
              } else {
                this.setBorderColor(constants.PLAYER_2_COLOR)
              }
            }
          }
        }
        break;
      case constants.ANIMATE_LINE_CLEAR_STATE:
        if (currentTime - this.previousTime >= 1000) {
          this.display.animateBoard(this.board.getBoard())
          console.log('pretend animation done, go back to tokens falling')
          this.changeState(constants.TOKEN_FALLING_STATE, currentTime)
          if (this.game.checkWin() && !this.game.checkDraw()) {
            this.changeState(constants.WIN_STATE, currentTime);
          }
          if (this.game.checkDraw()) { 
            this.changeState(constants.DRAW_STATE, currentTime);
          }
        }
        break;
      case constants.WIN_STATE:
        let winningPlayer = this.game.checkPlayerWin(this.display);
        let winCons = 0; 
        if (!this.endCheck) { 
          this.board.clearBoard();
          this.display.animateBoard(this.board.getBoard());
          this.endCheck = true;
        } 
        if (winningPlayer === this.game.getPlayerOne()) {
            winCons = constants.PLAYER_1;
        } else {
            winCons = constants.PLAYER_2;
        }
        
        //TODO: restart functions for seperate classes  
        if (currentTime - this.previousTime >= 85) {
            this.board.WinSnakeAround(winCons, this.frameCounter); 
            this.frameCounter += 1;
            this.display.animateBoard(this.board.getBoard()); 
            this.previousTime = currentTime;
        }   
        
        // infinite frame loop
        if (this.frameCounter == 24) {
          this.frameCounter = 0;  
        }
        break;

      case constants.DRAW_STATE:  
        if (!this.endCheck) { 
        this.board.clearBoard();
        this.display.animateBoard(this.board.getBoard());
        this.endCheck = true;
        }
        
        //TODO: restart functions for seperate classes  
        if (currentTime - this.previousTime >= 85) {
          this.board.DrawSnakeAround(this.frameCounter, this.drawAnimation); 
          this.display.animateBoard(this.board.getBoard()); 
          this.frameCounter += 1;
          this.previousTime = currentTime;
        }
        
        
        // infinite frame loop
        if (this.frameCounter == 24) {
          this.drawAnimation += 1; 
          this.frameCounter = 0;  
        }
        if (this.drawAnimation > 3) { // Reset it so it doesn't get to big in memory. (infinite loop for now)
          this.drawAnimation = 0; 
        }

      break; 
      case constants.FULL_BOARD_STATE:
        if (this.board.isBoardEmpty()) {
          this.changeState(constants.WAIT_FOR_TOKEN_STATE, currentTime);
          break;
        }
        
        // Animate rainbow falling pieces and board border
        if (currentTime - this.previousTime >= constants.TOKEN_FALLING_INTERVAL) {
          this.board.clearBottomRow();
          this.previousTime = currentTime;
          this.display.animateFullBoard(this.board.getBoard())
          let color = this.display.getRandomColor(constants.RAINBOW)
          this.setBorderColor(color)
        }
    }

    if (this.columnInput != constants.NO_INPUT) {
      console.log(`ERROR: token detected outside wait for token state`)
      // handle error behaviour here e.g. play sound
    }
    this.columnInput = constants.NO_INPUT;
  } 

  changeState(state: number, currentTime: number): void {
    this.state = state;
    this.previousTime = currentTime;
  }
}
