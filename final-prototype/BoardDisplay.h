#ifndef BOARD_DISPLAY_H
#define BOARD_DISPLAY_H

#include "constants.h" // Make sure this file includes your constants definitions
#include <Adafruit_NeoPixel.h>  // Include the NeoPixel library
#include <TM1637Display.h>
#include <Arduino.h>



class BoardDisplay {
public:
    int colourNum;
    BoardDisplay();

    void animateBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    void updateScoreDisplay(int playerOneScore, int playerTwoScore);
    void updateRotationTimer(unsigned long time);
    void updateTurnTimer(unsigned long time);
    void animateComboClear(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    int getRandomColor();
    void animateFullBoard(int currentBoard[BOARD_HEIGHT][BOARD_WIDTH]);
    // void placeholder(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]);

    Adafruit_NeoPixel strip;
    // TM1637Display player1Score;
    // TM1637Display player2Score;
    // TM1637Display rotationTimer;
    // TM1637Display turnTimer;

private:
    void setPixelColor(int row, int col, int *color);
    int getPixelIndex(int row, int col);
};

#endif
