#include "BoardDisplay.h"
#include <stdlib.h>

/**
 * @brief Constructs a BoardDisplay object and initializes the LED strip with the specified configuration.
 */
BoardDisplay::BoardDisplay()
    : strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800){}//, 

/**
 * @brief Animates the board by setting the colors of each pixel based on the current board state.
 * 
 * @param currentBoard The current state of the board represented as a 2D array.
 */
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

/**
 * @brief Sets the color of a specific pixel on the board.
 * 
 * @param row The row index of the pixel.
 * @param col The column index of the pixel.
 * @param color An array representing the RGB values of the color.
 */
void BoardDisplay::setPixelColor(int row, int col, int *color) {
  strip.setPixelColor(getPixelIndex(row, col), color[0], color[1], color[2]);
}

/**
 * @brief Retrieves the LED strip index corresponding to a specific board position.
 * 
 * @param row The row index of the board.
 * @param col The column index of the board.
 * @return The pixel index in the LED strip.
 */
int BoardDisplay::getPixelIndex(int row, int col) {
    return LED_IDS[col][6-row];
}

/**
 * @brief Animates the clearing of a combo on the board with a random color effect.
 * 
 * @param previousBoard The previous state of the board before the combo clear.
 * @param clearedBoard The board state after the combo has been cleared.
 */
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

/**
 * @brief Generates a random color for board animations.
 * 
 * @return A random color index.
 */
int BoardDisplay::getRandomColor() {
    return rand() % 5;
}

/**
 * @brief Animates the board by displaying its current state, updating pixel colors based on the board configuration.
 * 
 * @param currentBoard The current state of the board represented as a 2D array.
 */
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