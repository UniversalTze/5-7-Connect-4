#include "Board.h"
#include "BoardDisplay.h"
#include "Game.h"
#include "constants.h"

Board board;
BoardDisplay display;
Game game;

int columnInput = NO_INPUT;

unsigned long previousTime = 0;
unsigned long previousRotationTime = 0;
int win_state = NO_WIN;
int state = -1;
int previousValidColumnInput = -1;
unsigned long previousInputTime = 0;
int frameCounter = 0;
int drawAnimation = 0;

Adafruit_NeoPixel photoresistorLED(22, 12, NEO_GRB + NEO_KHZ800);

void setup() {
    pinMode(11, INPUT); 

    // Initialise LED displayBoardLED
    display.strip.begin();
    display.strip.show();

    // Initialise LED strip for light sensors
    photoresistorLED.begin();
    for (int x = 0; x < 22 ; x++) {
      photoresistorLED.setPixelColor(x, 255, 255, 255);
    }
    photoresistorLED.show();


    Serial.begin(9600); // Starts the serial communication on baud rate 9600

    delay(1000);
    unsigned long currentTime = millis();

    changeState(WAIT_FOR_TOKEN_STATE, currentTime);
    previousRotationTime = currentTime;
}

void loop() {
    unsigned long currentTime = millis();
    unsigned long timeTilRotation = max(0, BOARD_ROTATION_INTERVAL - (currentTime - previousRotationTime));
    setDisplayNumber(BOARD_ROTATION_DISPLAY, timeTilRotation / 1000.0);

    switch (state) {
        case WAIT_FOR_TOKEN_STATE: {
            unsigned long remainingTurnTime = (PLAYER_TURN_INTERVAL - (currentTime - previousTime));
            setDisplayNumber(PLAYER_TURN_DISPLAY, remainingTurnTime / 1000.0);

            if (timeTilRotation <= 0) {
                Serial.println("uh oh! board is rotatin!");
                board.rotateBoard(90);
                display.animateBoard(board.board);
                changeState(TOKEN_FALLING_STATE, currentTime);
                previousRotationTime = currentTime;
                break;
            }

            if (remainingTurnTime <= 0) {
                Serial.print("player ");
                Serial.print(game.getCurrentPlayer());
                Serial.println(" ran out of time");
                previousTime = currentTime;
                game.switchTurn();
                if (game.getCurrentPlayer() == 1) {
                    setBorderColor(PLAYER_1_COLOR);
                } else {
                    setBorderColor(PLAYER_2_COLOR);
                }
                break;
            }

            columnInput = getColumnInput(currentTime);

            if (columnInput == NO_INPUT) break;

            Serial.print("token detected at ");
            Serial.println(columnInput);

            if (board.placeToken(columnInput, game.getCurrentPlayer())) {
                Serial.println("valid column");
                previousValidColumnInput = columnInput;
                display.animateBoard(board.board);
                changeState(TOKEN_FALLING_STATE, currentTime);
                game.switchTurn();
            } else {
                Serial.println("invalid column");
                // Handle error behavior
            }

            columnInput = NO_INPUT;
            break;
        }
        case TOKEN_FALLING_STATE:
            if (currentTime - previousTime >= TOKEN_FALLING_INTERVAL) {
                bool tokenFell = board.tokenFall();
                previousTime = currentTime;

                if (tokenFell) {
                    display.animateBoard(board.board);
                } else {
                    // Done falling, now check for line clears
                    int points[2] = {0, 0};
                    int linesCleared = board.clearCombos(points, previousValidColumnInput, FULL_CLEAR);
                    previousValidColumnInput = NO_INPUT;
                    game.getPlayerOne().addPlayerScore(points[0]);
                    game.getPlayerTwo().addPlayerScore(points[1]);
                    display.updateScoreDisplay(game.getPlayerOne().getPlayerScore(), game.getPlayerTwo().getPlayerScore());
                    if (linesCleared) {
                        Serial.println("linefound");
                        changeState(ANIMATE_LINE_CLEAR_STATE, currentTime);
                        setBorderColor(display.getRandomColor());
                        display.animateComboClear(board.prevBoard, board.board);
                    } else if (board.isBoardFull()) {
                        Serial.println("full board");
                        changeState(FULL_BOARD_STATE, currentTime);
                    } else {
                        changeState(WAIT_FOR_TOKEN_STATE, currentTime);
                        if (game.getCurrentPlayer() == 1) {
                            setBorderColor(PLAYER_1_COLOR);
                        } else {
                            setBorderColor(PLAYER_2_COLOR);
                        }
                    }
                }
            }
            break;
        case ANIMATE_LINE_CLEAR_STATE:
            if (currentTime - previousTime >= 1000) {
                display.animateBoard(board.board);
                Serial.println("pretend animation done, go back to tokens falling");
                changeState(TOKEN_FALLING_STATE, currentTime);
                win_state = game.checkWin();
                if (win_state) {
                    changeState(WIN_STATE, currentTime);
                }
            }
            break;
        case WIN_STATE:
            int winner = win_state;
            board.clearBoard();
            display.animateBoard(board.board);

            if (win_state == PLAYER_1 || win_state == PLAYER_2) {
                if (currentTime - previousTime >= 85) {
                    board.WinSnakeAround(winner, frameCounter);
                    frameCounter++;
                    display.animateBoard(board.board);
                    previousTime = currentTime;
                }

                // Infinte Frame Loop
                if (frameCounter == 24) {
                    frameCounter = 0;
                }

            } else { // DRAW
                if (currentTime - previousTime >= 85) {
                    board.DrawSnakeAround(frameCounter, drawAnimation);
                    display.animateBoard(board.board);
                    frameCounter++;
                    previousTime = currentTime;
                }

                // Infinte Frame Loop
                if (frameCounter == 24) {
                    drawAnimation++;
                    frameCounter = 0;
                }

                if (drawAnimation > 3) {
                    drawAnimation = 0;
                }
            }
            
            break;

        case FULL_BOARD_STATE:
            if (board.isBoardEmpty()) {
                changeState(WAIT_FOR_TOKEN_STATE, currentTime);
                break;
            }

            if (currentTime - previousTime >= TOKEN_FALLING_INTERVAL) {
                board.clearBottomRow();
                previousTime = currentTime;
                display.animateBoard(board.board);
                setBorderColor(display.getRandomColor());
            }
            break;
    }

    // if (columnInput != NO_INPUT) {
    //     Serial.println("ERROR: token detected outside wait for token state");
    //     // Handle error behavior here e.g., play sound
    // }
    // columnInput = NO_INPUT;
}

void changeState(int newState, unsigned long currentTime) {
    state = newState;
    previousTime = currentTime;
}

void setDisplayNumber(int display, int number) {

}

void setBorderColor(const int color[3]) {

}

int getColumnInput(unsigned long currentTime) {
  if (currentTime - previousInputTime < DEBOUNCE_DELAY) {
    return NO_INPUT;
  }
  
  if (digitalRead(COLUMN_PINS[0]) == 1) { // check digital pin
    previousInputTime = currentTime;
    return 0;
  } 

  for (int x=1; x < 7; x++) {
    if (analogRead(COLUMN_PINS[x]) > SENSOR_THRESHOLDS[x]) {
      previousInputTime = currentTime;
      return x;
    }
  }

  return NO_INPUT;
}

void reset() {
    delay(1000);

    unsigned long currentTime = millis();
    changeState(WAIT_FOR_TOKEN_STATE, currentTime);
    previousRotationTime = currentTime;
    columnInput = NO_INPUT;
    win_state = NO_WIN;
    previousValidColumnInput = NO_INPUT;
    previousInputTime = currentTime;
    frameCounter = 0;
    drawAnimation = 0;
    game.reset();

    // Reset board
    board.clearBoard();
    display.animateBoard(board.board);

    // Reset players scores
    game.getPlayerOne().reset();
    game.getPlayerTwo().reset();
    // TODO: reset the score board

    // Reset board colour
    setBorderColor(PLAYER_1_COLOR)
}
