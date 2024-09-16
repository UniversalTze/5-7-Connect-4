#ifndef BOARD_DISPLAY_H
#define BOARD_DISPLAY_H

#include "constants.h" // Make sure this file includes your constants definitions
#include <Adafruit_NeoPixel.h>  // Include the NeoPixel library


class BoardDisplay {
public:
    BoardDisplay();

    void animateBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    void updateScoreDisplay(int playerOneScore, int playerTwoScore);
    void placeholder(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]);

    Adafruit_NeoPixel strip;


private:
    void setPixelColor(int row, int col, int color[3]);

    int LedIds[7][7][2];  // Adjust the dimensions as necessary
};

#endif
