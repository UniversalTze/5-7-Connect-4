#include "BoardDisplay.h"
#include <Arduino.h>

// Method to animate the board
void BoardDisplay::animateBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
    // for (int8_t row = 0; row < rows; row++) {
    //     for (int8_t col = 0; col < BOARD_WIDTH; col++) {
    //         if (currentBoard[row][col] == 0) {
    //             setPixelColor(row, col, EMPTY_COLOR);
    //         } else if (currentBoard[row][col] == 1) {
    //             setPixelColor(row, col, PLAYER_1_COLOR);
    //         } else if (currentBoard[row][col] == 2) {
    //             setPixelColor(row, col, PLAYER_2_COLOR);
    //         }
    //     }
    // }
}

// Method to animate clearing combos
void BoardDisplay::animateComboClear(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
    // for (int8_t row = 0; row < rows; row++) {
    //     for (int8_t col = 0; col < BOARD_WIDTH; col++) {
    //         if (currentBoard[row][col] == clearedBoard[row][col]) {
    //             if (currentBoard[row][col] == 1) {
    //                 setPixelColor(row, col, PLAYER_1_COLOR);
    //             } else if (currentBoard[row][col] == 2) {
    //                 setPixelColor(row, col, PLAYER_2_COLOR);
    //             }
    //         } else {
    //             if (currentBoard[row][col] == 1) {
    //                 flashPixel(row, col, PLAYER_1_COLOR);
    //             } else if (currentBoard[row][col] == 2) {
    //                 flashPixel(row, col, PLAYER_2_COLOR);
    //             }
    //         }
    //     }
    // }
}

// Method to update the score display
void BoardDisplay::updateScoreDisplay(int playerOneScore, int playerTwoScore) {
    Serial.print("Player 1 Score: ");
    Serial.println(playerOneScore);
    Serial.print("Player 2 Score: ");
    Serial.println(playerTwoScore);
}

// Method for setting the pixel color
void BoardDisplay::setPixelColor(int8_t row, int8_t col, const char* color) {
    Serial.print("Setting pixel at (");
    Serial.print(row);
    Serial.print(", ");
    Serial.print(col);
    Serial.print(") to color ");
    Serial.println(color);
}

// Method to flash a pixel
void BoardDisplay::flashPixel(int8_t row, int8_t col, const char* originalColor) {
    Serial.print("Flashing pixel at (");
    Serial.print(row);
    Serial.print(", ");
    Serial.print(col);
    Serial.print(") between ");
    Serial.print(FLASH_COLOR[0]);
    Serial.print(" and ");
    Serial.println(originalColor);
    // Use delay() or millis() for actual timing in practice
}

// Method for placeholder animation
void BoardDisplay::placeholder(int previousBoard[][BOARD_WIDTH], int clearedBoard[][BOARD_WIDTH]) {
    // for (int8_t i = 0; i < rows; i++) {
    //     for (int8_t j = 0; j < BOARD_WIDTH; j++) {
    //         if (previousBoard[i][j] != clearedBoard[i][j]) {
    //             setPixelColor(i, j, "white"); // Assuming "white" is a color you can use
    //         }
    //     }
    // }
}
