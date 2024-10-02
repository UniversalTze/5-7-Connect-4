#ifndef BOARD_DISPLAY_H
#define BOARD_DISPLAY_H

#include "constants.h" // Make sure this file includes your constants definitions
#include <Adafruit_NeoPixel.h>  // Include the NeoPixel library
#include <Arduino.h>


class BoardDisplay {
public:
    BoardDisplay();

    void animateBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    void updateScoreDisplay(int playerOneScore, int playerTwoScore);
    void animateComboClear(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    int* getRandomColor();
    void animateFullBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    // void placeholder(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]);

    Adafruit_NeoPixel strip;


private:
    void setPixelColor(int row, int col, const int color[3]);
    int getPixelIndex(int row, int col);
};

#endif
