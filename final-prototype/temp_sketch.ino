// #include <Board.h>
// #include <BoardDisplay.h>
// #include <Game.h>
#include <constants.h>

Board board;
BoardDisplay display;
Game game;

int columnInput = NO_INPUT;


unsigned long previousTime = 0;
unsigned long previousRotationTime = 0;
bool playerHasWon = false;
int state = -1;
int previousValidColumnInput = -1;

void setup() {
    changeState(WAIT_FOR_TOKEN_STATE, millis());
    previousRotationTime = millis();
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
                display.animateBoard(board.getBoard());
                changeState(TOKEN_FALLING_STATE, currentTime);
                previousRotationTime = currentTime;
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

            if (columnInput == NO_INPUT) break;

            Serial.print("token detected at ");
            Serial.println(columnInput);

            if (board.placeToken(columnInput, game.getCurrentPlayer())) {
                Serial.println("valid column");
                previousValidColumnInput = columnInput;
                display.animateBoard(board.getBoard());
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
                    display.animateBoard(board.getBoard());
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
                        display.placeholder(board.getPrevBoard(), board.getBoard());
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
                display.animateBoard(board.getBoard());
                Serial.println("pretend animation done, go back to tokens falling");
                changeState(TOKEN_FALLING_STATE, currentTime);
                if (game.checkWin()) {
                    changeState(WIN_STATE, currentTime);
                }
            }
            break;
        case WIN_STATE:
            if (!playerHasWon) {
                if (game.checkPlayerWin() == game.getPlayerOne()) {
                    Serial.println("player 1 wins, refresh to restart");
                } else {
                    Serial.println("player 2 wins, refresh to restart");
                }
                playerHasWon = true;
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
                display.animateBoard(board.getBoard());
            }
            break;
    }

    if (columnInput != NO_INPUT) {
        Serial.println("ERROR: token detected outside wait for token state");
        // Handle error behavior here e.g., play sound
    }
    columnInput = NO_INPUT;
}

void changeState(int newState, unsigned long currentTime) {
    state = newState;
    previousTime = currentTime;
}

void setPixelColor (int row, int col, const char* colour) {

}
void setDisplayNumber(int display, int number) {

}

void setBorderColor(const char* color) {

}
