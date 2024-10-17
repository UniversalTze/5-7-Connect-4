#include "Board.h"
#include "BoardDisplay.h"
#include "Game.h"
#include "constants.h"

Board board;
BoardDisplay display;
Game game;

// Declare variables for input, time tracking, and game state
int columnInput = NO_INPUT;
unsigned long previousTime = 0;
unsigned long previousRotationTime = 0;
int win_state = NO_WIN;
int state = -1;
int previousValidColumnInput = -1;
unsigned long previousInputTime = 0;
int frameCounter = 0;
int drawAnimation = 0;

// Initialize the photoresistor LED strip
Adafruit_NeoPixel photoresistorLED(22, 12, NEO_GRB + NEO_KHZ800);

TM1637Display player1Score = TM1637Display(p1ScoreClkPin, p1ScoreDioPin);
TM1637Display player2Score = TM1637Display(p2ScoreClkPin, p2ScoreDioPin);
TM1637Display rotationTimer = TM1637Display(rotationClkPin, rotationDioPin);
TM1637Display turnTimer = TM1637Display(turnClkPin, turnDioPin);

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

    player1Score.clear();
    player1Score.setBrightness(7); // set the brightness to 7 (0:dimmest, 7:brightest)
    player2Score.clear();
    player2Score.setBrightness(7);
    rotationTimer.clear();
    rotationTimer.setBrightness(7);
    turnTimer.clear();
    turnTimer.setBrightness(7);

    pinMode(buttonPin, INPUT_PULLUP);

    delay(1000);

    // Set initial game state
    unsigned long currentTime = millis();

    changeState(WAIT_FOR_TOKEN_STATE, currentTime);
    previousRotationTime = currentTime;
    player1Score.showNumberDec(0);  // Show the player one's score
    player2Score.showNumberDec(0);  
}

void loop() {
    // Check if reset button pressed
    if (checkReset()) {
        reset();
        return;
    }

    unsigned long currentTime = millis();
    unsigned long timeTilRotation = BOARD_ROTATION_INTERVAL - (currentTime - previousRotationTime);

    if (game.checkWin() == 0) {
      updateRotationTimer(timeTilRotation);
    }

    switch (state) {
        case WAIT_FOR_TOKEN_STATE: {
            unsigned long remainingTurnTime = (PLAYER_TURN_INTERVAL - (currentTime - previousTime));
            updateTurnTimer(remainingTurnTime);
            
            unsigned long flashTime = remainingTurnTime % FLASH_CYCLE;
            
            // Flash the current player's score display
            if (game.getCurrentPlayer() == PLAYER_1) {
              if (flashTime >= FLASH_ON) {
                player1Score.clear();
              } else {
                player1Score.showNumberDec(game.getPlayerOne().getPlayerScore());  // Show the player one's score
              }
            } else {
              if (flashTime >= FLASH_ON) {
                player2Score.clear();
              } else {
                player2Score.showNumberDec(game.getPlayerTwo().getPlayerScore());  // Show the player one's score
              }
            }

            // Check for board rotation condition
            if (timeTilRotation >= TIMER_LIMIT) {
                Serial.println("uh oh! board is rotatin!");
                board.rotateBoard(90);
                display.animateBoard(board.board);
                changeState(TOKEN_FALLING_STATE, currentTime);
                previousRotationTime = currentTime;
                break;
            }

            // Check if the current player has run out of time
            if (remainingTurnTime >= TIMER_LIMIT) {
                Serial.print("player ");
                Serial.print(game.getCurrentPlayer());
                Serial.println(" ran out of time");
                previousTime = currentTime;
                game.switchTurn();
                player1Score.showNumberDec(game.getPlayerOne().getPlayerScore());  // Show the player one's score
                player2Score.showNumberDec(game.getPlayerTwo().getPlayerScore());
                break;
            }

            columnInput = getColumnInput(currentTime);

            if (columnInput == NO_INPUT) break;

            Serial.print("token detected at ");
            Serial.println(columnInput);
            
            // Attempt to place the token and handle error
            if (board.placeToken(columnInput, game.getCurrentPlayer())) {
                player1Score.showNumberDec(game.getPlayerOne().getPlayerScore());  // Show the player one's score
                player2Score.showNumberDec(game.getPlayerTwo().getPlayerScore());
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
                    player1Score.showNumberDec(game.getPlayerOne().getPlayerScore());  // Show the player one's score
                    player2Score.showNumberDec(game.getPlayerTwo().getPlayerScore());  
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
            // Handle the animation state for clearing lines
            if (currentTime - previousTime >= 1000) {
                display.animateBoard(board.board);
                Serial.println("pretend animation done, go back to tokens falling");
                changeState(TOKEN_FALLING_STATE, currentTime);
                win_state = game.checkWin();
                Serial.println(win_state);
                if (win_state != 0) {
                    changeState(WIN_STATE, currentTime);
                    board.clearBoard();
                    display.animateBoard(board.board);

                }
            }
            break;
        case WIN_STATE:
            int winner = win_state;

            if (win_state == PLAYER_1 || win_state == PLAYER_2) {
                // Animate the winning sequence for the current player
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
}

/**
 * @brief Changes the current state of the game and updates the timestamp of when the state change occurred.
 * 
 * @param newState The new state to change to.
 * @param currentTime The current time in milliseconds, used to track when the state change occurred.
 */
void changeState(int newState, unsigned long currentTime) {
    state = newState;
    previousTime = currentTime;
}

/**
 * @brief Checks for column input from the player and debounces the input to avoid multiple detections.
 * 
 * @param currentTime The current time in milliseconds, used for debouncing logic.
 * @return The index of the column where a token was detected or NO_INPUT if no valid input was detected.
 */
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

/**
 * @brief Resets the game state, board, player scores, and other variables to their initial values.
 */
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
    rotationTimer.clear();
    player1Score.showNumberDec(0);  // Show the player one's score
    player2Score.showNumberDec(0);
}

/**
 * @brief Checks if the reset button is pressed.
 * 
 * @return True if the reset button is pressed, otherwise false.
 */
bool checkReset() {
    return digitalRead(buttonPin) == LOW;
}

/**
 * @brief Updates the rotation timer display with the remaining time until the next board rotation.
 * 
 * @param time The time in milliseconds until the next board rotation.
 */
void updateRotationTimer(unsigned long time) {
    if (time > TIMER_LIMIT) {
      time = 0;
    }
    int seconds = time / 1000;            // Get the whole number of seconds
    int hundredths = (time % 1000) / 10;  // Get the hundredths of a second
    
    // Display the time on the rotation timer
    rotationTimer.showNumberDecEx(seconds * 100 + hundredths, 0b01000000, true);  // "0b01000000" adds the decimal point
}

/**
 * @brief Updates the turn timer display with the remaining time for the player's turn.
 * 
 * @param time The time in milliseconds remaining for the player's turn.
 */
void updateTurnTimer(unsigned long time) {
    int seconds = time / 1000;            // Get the whole number of seconds
    int hundredths = (time % 1000) / 10;  // Get the hundredths of a second
    
    // Display the time on the turn timer
    turnTimer.showNumberDecEx(seconds * 100 + hundredths, 0b01000000, true);  // "0b01000000" adds the decimal point
}