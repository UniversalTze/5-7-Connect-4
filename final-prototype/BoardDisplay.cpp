#include "BoardDisplay.h"
#include <stdlib.h>

BoardDisplay::BoardDisplay()
    : strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800){}//, 
      // player1Score(p1ScoreClkPin, p1ScoreDioPin),
      // player2Score(p2ScoreClkPin, p2ScoreDioPin),
      // rotationTimer(rotationClkPin, rotationDioPin),
      // turnTimer(turnClkPin, turnDioPin) 
      

// Method to animate the board
void BoardDisplay::animateBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
    for (int row = 0; row < BOARD_HEIGHT; row++) {
        for (int col = 0; col < BOARD_WIDTH; col++) {
            if (currentBoard[row][col] == EMPTY) {
                setPixelColor(row, col, EMPTY_COLOR);
            } else if (currentBoard[row][col] == PLAYER_1) {
                setPixelColor(row, col, PLAYER_1_COLOR);
            } else if (currentBoard[row][col] == PLAYER_2) {
                setPixelColor(row, col, PLAYER_2_COLOR);
            }
        }
    }
    strip.show();
}

// Method to update the score display
void BoardDisplay::updateScoreDisplay(int playerOneScore, int playerTwoScore) {
    Serial.print("Player 1 Score: ");
    Serial.println(playerOneScore);
    Serial.print("Player 2 Score: ");
    Serial.println(playerTwoScore);
    // player1Score.showNumberDec(0);  // Show the player one's score
    // player2Score.showNumberDec(0);  // Show the player two's score
}

void BoardDisplay::updateRotationTimer(unsigned long time) {
    int seconds = time / 1000;            // Get the whole number of seconds
    int hundredths = (time % 1000) / 10;  // Get the hundredths of a second
    
    // Display the time on the rotation timer (as XX.XX format)
    // rotationTimer.showNumberDecEx(seconds * 100 + hundredths, 0b01000000, true);  // "0b01000000" adds the decimal point
}

void BoardDisplay::updateTurnTimer(unsigned long time) {
    int seconds = time / 1000;            // Get the whole number of seconds
    int hundredths = (time % 1000) / 10;  // Get the hundredths of a second
    
    // Display the time on the turn timer (as XX.XX format)
    // turnTimer.showNumberDecEx(seconds * 100 + hundredths, 0b01000000, true);  // "0b01000000" adds the decimal point
}

// Method for setting the pixel color
void BoardDisplay::setPixelColor(int row, int col, int *color) {
  strip.setPixelColor(getPixelIndex(row, col), color[0], color[1], color[2]);
}

int BoardDisplay::getPixelIndex(int row, int col) {
    return LED_IDS[col][6-row];
}

void BoardDisplay::animateComboClear(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]) {


    int randomNumber = rand() % 4;
    int randomColor[3] = {0, 0, 0};

    switch(randomNumber) {
      case 0:
        randomColor[1] = 255;
        break;
      case 1:
        randomColor[2] = 255;
        break;
      case 2:
        randomColor[0] = 255;
        randomColor[2] = 255;
        break;
      case 3:
        randomColor[1] = 255;
        randomColor[2] = 255;
        break;
    }

    for (int i = 0; i < BOARD_HEIGHT; i++) {
        for (int j = 0; j < BOARD_WIDTH; j++) {
            if (previousBoard[i][j] != clearedBoard[i][j]) {
                setPixelColor(i, j, randomColor);
            }
        }
    }
    strip.show(); // Added this from the original code
}

int BoardDisplay::getRandomColor() {
    return rand() % 5;
}

void BoardDisplay::animateFullBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
    for (int row = 0; row < BOARD_HEIGHT; row++) {
        for (int col = 0; col < BOARD_WIDTH; col++) {
            if (currentBoard[row][col] == 0) {
                setPixelColor(row, col, EMPTY_COLOR);
            } else if (currentBoard[row][col] == 1) {
                setPixelColor(row, col, PLAYER_1_COLOR);
            } else if (currentBoard[row][col] == 2) {
                setPixelColor(row, col, PLAYER_2_COLOR);
            }
        }
    }
    strip.show(); // Added this from the original code
}

// // Method for placeholder animation
// void BoardDisplay::placeholder(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
    
//     for (int i = 0; i < BOARD_HEIGHT; i++) {
//         for (int j = 0; j < BOARD_WIDTH; j++) {
//             if (previousBoard[i][j] != clearedBoard[i][j]) {
//                 setPixelColor(i, j, WHITE);
//             }
//         }
//     }
//     strip.show();
// }
