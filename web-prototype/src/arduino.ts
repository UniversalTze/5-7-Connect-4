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
  

  constructor(
    setPixelColor: (row: number, col: number, colour: string) => void,
    setDisplayNumber: (display: number, number: number) => void
  ) {
    this.setPixelColor = setPixelColor;
    this.setDisplayNumber = setDisplayNumber;
  }

  setup() {
    // initialise current state
    this.state = constants.WAIT_FOR_TOKEN_STATE;
    this.previousTime = Date.now();
  }

  loop() {
    // Code Demo for blinking light, NO using delays
    let currentTime = Date.now();

    switch (this.state) {
      case constants.WAIT_FOR_TOKEN_STATE:
        if (currentTime - this.previousTime >= constants.PLAYER_TURN_INTERVAL) {
          console.log(`player ${this.game.getCurrentPlayer()} ran out of time`)
          this.previousTime = currentTime;
          this.game.switchTurn();
          break;
        } 

        if (this.columnInput == constants.NO_INPUT) break;

        console.log(`token detected at ${this.columnInput}`)
        
        if (this.board.placeToken(this.columnInput, this.game.getCurrentPlayer())) {
          console.log(`valid column`)
          this.display.animateBoard(this.board.getBoard())
          this.previousTime = currentTime;
          this.state = constants.TOKEN_FALLING_STATE;
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
            this.state = constants.WAIT_FOR_TOKEN_STATE;
          }
        }
        break;
      case constants.ANIMATE_LINE_CLEAR_STATE:
        
        break;
    }

    if (this.columnInput != constants.NO_INPUT) {
      console.log(`ERROR: token detected outside wait for token state`)
      // handle error behaviour here e.g. play sound
    }
    this.columnInput = constants.NO_INPUT;
  } 
}
