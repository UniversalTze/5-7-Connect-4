#include "BoardDisplay.h"

// Method to animate the board
void BoardDisplay::animateBoard(int8_t currentBoard[][BOARD_WIDTH], int8_t rows) {
    for (int8_t row = 0; row < rows; row++) {
        for (int8_t col = 0; col < BOARD_WIDTH; col++) {
            if (currentBoard[row][col] == 0) {
                setPixelColor(row, col, EMPTY_COLOR);
            } else if (currentBoard[row][col] == 1) {
                setPixelColor(row, col, PLAYER_1_COLOR);
            } else if (currentBoard[row][col] == 2) {
                setPixelColor(row, col, PLAYER_2_COLOR);
            }
        }
    }
}

// Method to animate clearing combos
void BoardDisplay::animateComboClear(int8_t currentBoard[][BOARD_WIDTH], int8_t clearedBoard[][BOARD_WIDTH], int8_t rows) {
    for (int8_t row = 0; row < rows; row++) {
        for (int8_t col = 0; col < BOARD_WIDTH; col++) {
            if (currentBoard[row][col] == clearedBoard[row][col]) {
                if (currentBoard[row][col] == 1) {
                    setPixelColor(row, col, PLAYER_1_COLOR);
                } else if (currentBoard[row][col] == 2) {
                    setPixelColor(row, col, PLAYER_2_COLOR);
                }
            } else {
                if (currentBoard[row][col] == 1) {
                    flashPixel(row, col, PLAYER_1_COLOR);
                } else if (currentBoard[row][col] == 2) {
                    flashPixel(row, col, PLAYER_2_COLOR);
                }
            }
        }
    }
}

// Method to update the score display
void BoardDisplay::updateScoreDisplay(int8_t playerOneScore, int8_t playerTwoScore) {
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
void BoardDisplay::placeholder(int8_t previousBoard[][BOARD_WIDTH], int8_t clearedBoard[][BOARD_WIDTH], int8_t rows) {
    for (int8_t i = 0; i < rows; i++) {
        for (int8_t j = 0; j < BOARD_WIDTH; j++) {
            if (previousBoard[i][j] != clearedBoard[i][j]) {
                setPixelColor(i, j, "white"); // Assuming "white" is a color you can use
            }
        }
    }
}
