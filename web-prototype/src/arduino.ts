// THIS FILE IS MEANT TO EMULATE ARDUINO CODE

import { Board } from "./Board.ts";
import { BoardDisplay } from "./BoardDisplay.ts";
import * as constants from "./constants.ts";
import { Game } from "./Game.ts";

export class Arduino {
  columnInput: number = constants.NO_INPUT;
  setPixelColor: (row: number, col: number, colour: string) => void;
  setDisplayNumber: (display: number, number: number) => void;

  // These variables are just for the DEMO
  previousTime: number = 0;
  previousRotationTime: number = 0;
  interval: number = 1000;
  ledState: number = 0;
  numberState: number = 0;
  interval1 = 500
  interval2 = 1000
  interval3 = 1500
  
  game: Game = new Game();
  board: Board = new Board();
  display: BoardDisplay = new BoardDisplay();

  state: number = -1;
  previousValidColumnInput: number = -1;

  constructor(
    setPixelColor: (row: number, col: number, colour: string) => void,
    setDisplayNumber: (display: number, number: number) => void
  ) {
    this.setPixelColor = setPixelColor;
    this.setDisplayNumber = setDisplayNumber;
  }

  setup() {
    // initialise current state
    this.changeState(constants.WAIT_FOR_TOKEN_STATE, Date.now())
    this.previousRotationTime = Date.now()
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

            if (linesCleared) {
              // switch
              console.log('linefound')
              this.changeState(constants.ANIMATE_LINE_CLEAR_STATE, currentTime)
            } else {
              if (this.previousValidColumnInput != constants.NO_INPUT) {
                // this.board.rotateBoard(90);
                // reset previous valid column input
                this.previousValidColumnInput = constants.NO_INPUT;
              } else {
                console.log('hello')
                this.changeState(constants.WAIT_FOR_TOKEN_STATE, currentTime);
              }
              
            }
          }
        }
        break;
      case constants.ANIMATE_LINE_CLEAR_STATE:
        if (currentTime - this.previousTime >= 1000) {
          console.log('pretend animation done, go back to tokens falling')
          this.changeState(constants.TOKEN_FALLING_STATE, currentTime)
        }
        break;
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
