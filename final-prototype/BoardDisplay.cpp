#include "BoardDisplay.h"
#include <stdlib.h>

BoardDisplay::BoardDisplay()
    : strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800){}

// Method to animate the board
void BoardDisplay::animateBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
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
    strip.show();
}

// Method to update the score display
void BoardDisplay::updateScoreDisplay(int playerOneScore, int playerTwoScore) {
    Serial.print("Player 1 Score: ");
    Serial.println(playerOneScore);
    Serial.print("Player 2 Score: ");
    Serial.println(playerTwoScore);
}

// Method for setting the pixel color
void BoardDisplay::setPixelColor(int row, int col, const int color[3]) {
  strip.setPixelColor(getPixelIndex(row, col), color[0], color[1], color[2]);
}

int BoardDisplay::getPixelIndex(int row, int col) {
    return LED_IDS[col][6-row];
}

void BoardDisplay::animateComboClear(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
    for (int i = 0; i < BOARD_HEIGHT; i++) {
        for (int j = 0; j < BOARD_WIDTH; j++) {
            if (previousBoard[i][j] != clearedBoard[i][j]) {
                setPixelColor(i, j, getRandomColor());
            }
        }
    }
    strip.show(); // Added this from the original code
}

const int* BoardDisplay::getRandomColor() {
    int randomIndex = rand() % (sizeof(RAINBOW) / sizeof(RAINBOW[0]));
    return RAINBOW[randomColorIndex];
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
