#include "BoardDisplay.h"


BoardDisplay::BoardDisplay()
    : strip(ledCount, ledPin, NEO_GRB + NEO_KHZ800)
{
  int temp[7][7][2] = {{{19, 0}, {27, 0}, {70, 0}, {75, 0}, {118, 0}, {125, 0}, {168, 0}}, // {{bottom -> top}}
  {{16, 0}, {30, 0}, {67, 0}, {78, 0}, {115, 0}, {128, 0}, {165, 0}}, // {id, on/off (0/1)}
  {{13, 0}, {33, 0}, {64, 0}, {81, 0}, {112, 0}, {131, 0}, {162 ,0}},
  {{10, 0}, {36, 0}, {61, 0}, {84, 0}, {109, 0}, {134, 0}, {159 ,0}},
  {{7, 0}, {39, 0}, {58, 0}, {87, 0}, {106, 0}, {137, 0}, {156 ,0}},
  {{4, 0}, {42, 0}, {55, 0}, {90, 0}, {103, 0}, {140, 0}, {153 ,0}},
  {{1, 0}, {45, 0}, {52, 0}, {93, 0}, {100, 0}, {143, 0}, {150 ,0}}};

  for (int i = 0; i < 7; i++) {
      for (int j = 0; j < 7; j++) {
          LedIds[i][j][0] = temp[i][j][0];
          LedIds[i][j][1] = temp[i][j][1];
      }
  }
}

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
void BoardDisplay::setPixelColor(int row, int col, int color[3]) {
  strip.setPixelColor(LedIds[col][row], color[0], color[1], color[2]);
}

// Method for placeholder animation
void BoardDisplay::placeholder(int previousBoard[BOARD_HEIGHT][BOARD_WIDTH], int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH]) {
    for (int i = 0; i < BOARD_HEIGHT; i++) {
        for (int j = 0; j < BOARD_WIDTH; j++) {
            if (previousBoard[i][j] != clearedBoard[i][j]) {
                setPixelColor(i, j, WHITE); // Assuming "white" is a color you can use
            }
        }
    }
}
