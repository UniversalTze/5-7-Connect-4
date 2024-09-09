#ifndef BOARD_DISPLAY_H
#define BOARD_DISPLAY_H

// #include <Arduino.h>
#include <stdint.h> // Include for int8_t
#include "constants.h" // Make sure this file includes your constants definitions

class BoardDisplay {
public:
    void animateBoard(int8_t currentBoard[][BOARD_WIDTH], int8_t rows);
    void animateComboClear(int8_t currentBoard[][BOARD_WIDTH], int8_t clearedBoard[][BOARD_WIDTH], int8_t rows);
    void updateScoreDisplay(int8_t playerOneScore, int8_t playerTwoScore);
    void placeholder(int8_t previousBoard[][BOARD_WIDTH], int8_t clearedBoard[][BOARD_WIDTH], int8_t rows);

private:
    void setPixelColor(int8_t row, int8_t col, const char* color);
    void flashPixel(int8_t row, int8_t col, const char* originalColor);
};

#endif
