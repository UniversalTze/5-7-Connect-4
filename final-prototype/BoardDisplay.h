#ifndef BOARD_DISPLAY_H
#define BOARD_DISPLAY_H

// #include <Arduino.h>
#include <stdint.h> // Include for int8_t
#include "constants.h" // Make sure this file includes your constants definitions

class BoardDisplay {
public:
    void animateBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    void animateComboClear(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    void updateScoreDisplay(int playerOneScore, int playerTwoScore);
    void placeholder(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]);

private:
    void setPixelColor(int8_t row, int8_t col, const char* color);
    void flashPixel(int8_t row, int8_t col, const char* originalColor);
};

#endif
