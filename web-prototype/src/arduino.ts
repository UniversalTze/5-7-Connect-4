// THIS FILE IS MEANT TO EMULATE ARDUINO CODE

import { BoardDisplay } from "./BoardDisplay.ts";
import * as constants from "./constants.ts";
import { Game } from "./Game.ts";

export class Arduino {
  // TODO: input should probably be handled elsewhere, like inputhandler
  columnInput: number = constants.NO_INPUT;
  setPixelColor: (row: number, col: number, colour: string) => void;
  setDisplayNumber: (display: number, number: number) => void;

  // These variables are just for the DEMO
  previousTime: number = 0;
  interval: number = 1000;
  ledState: number = 0;
  numberState: number = 0;
  game: Game = new Game();
  interval1 = 500
  interval2 = 1000
  interval3 = 1500
  display = new BoardDisplay();

  constructor(
    setPixelColor: (row: number, col: number, colour: string) => void,
    setDisplayNumber: (display: number, number: number) => void
  ) {
    this.setPixelColor = setPixelColor;
    this.setDisplayNumber = setDisplayNumber;
  }

  setup() {
    // probably not needed for prototype
    // this.setDisplayNumber(0, 5);
  }

  loop() {
    // Code Demo for blinking light, NO using delays
    let currentTime = Date.now();
    if (currentTime - this.previousTime >= this.interval) {
      this.previousTime = currentTime;
      this.ledState = 1 - this.ledState;
      this.setPixelColor(0, 0, constants.PLAYER_COLOR[this.ledState]);
      this.setDisplayNumber(constants.PLAYER_1, this.numberState++);
    }

    if (this.columnInput != constants.NO_INPUT) {
      console.log(`token detected at ${this.columnInput}`);
      this.columnInput = constants.NO_INPUT;
    }

    // if (true) { //animation state
    //   something = this.display.something(currentTime)

    // }
  }
}
