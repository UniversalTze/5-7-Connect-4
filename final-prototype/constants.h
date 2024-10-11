#ifndef CONSTANTS_H
#define CONSTANTS_H

#include <Arduino.h>

// Board dimensions
constexpr int BOARD_HEIGHT = 7;
constexpr int BOARD_WIDTH = 7;

// Board tile types
constexpr int NO_INPUT = -1;
constexpr int EMPTY = 0;
constexpr int PLAYER_1 = 1;
constexpr int PLAYER_2 = 2;

// Colours 
constexpr const int EMPTY_COLOR[3] = {0, 0, 0};
constexpr const int PLAYER_1_COLOR[3] = {255, 0, 0};
constexpr const int PLAYER_2_COLOR[3] = {255, 255, 0};

constexpr const int GREEN[3] = {0, 255, 0};
constexpr const int BLUE[3] = {0, 0, 255};
constexpr const int MAGENTA[3] = {255, 0, 255};
constexpr const int CYAN[3] = {0, 255, 255};
constexpr const int OLIVE[3] = {128, 128, 0};

constexpr const int RAINBOW[8][3] = {
  {0, 255, 0}, // Green
  {0, 0, 255}, // Blue
  {255, 0, 255}, // Magenta
  {0, 255, 255}, // Cyan
  {128, 0, 0}, // Maroon
  {128, 128, 0}, // Olive
  {0, 128, 128}, // Teal
  {128, 0, 128} // Purple
};


// Clear states
constexpr int FULL_CLEAR = 1;

// Combo length limits
constexpr int MAX_COMBO_LENGTH = 6;
constexpr int MIN_COMBO_LENGTH = 4;

// Game states
constexpr int WAIT_FOR_TOKEN_STATE = 0;
constexpr int TOKEN_FALLING_STATE = 1;
constexpr int ANIMATE_LINE_CLEAR_STATE = 2;
constexpr int WIN_STATE = 3;
constexpr int FULL_BOARD_STATE = 4;

// Intervals (in milliseconds)
constexpr int PLAYER_TURN_INTERVAL = 10000;
constexpr int TOKEN_FALLING_INTERVAL = 100;
constexpr int BOARD_ROTATION_INTERVAL = 30000;

// Display types
constexpr int PLAYER_TURN_DISPLAY = 2;
constexpr int BOARD_ROTATION_DISPLAY = 1;

// Scoring
constexpr int WINNING_SCORE = 4;

// Win States
constexpr int NO_WIN = 0;
constexpr int DRAW = 3;

// LED
constexpr int LED_PIN = 13;
constexpr int LED_COUNT = 300;
constexpr int LED_IDS[7][7] = {
  {20, 26, 70, 75, 119, 124, 168}, // Column 0 (bottom -> top)
  {17, 29, 67, 78, 116, 127, 165}, // Column 1
  {13, 33, 63, 82, 112, 131, 161}, // Column 2
  {10, 36, 60, 85, 109, 134, 158}, // Column 3
  {7,  39, 57, 88, 106, 137, 155}, // Column 4
  {4,  42, 54, 92, 103, 140, 152}, // Column 5
  {1,  45, 51, 94, 100, 143, 149}  // Column 6
};


// Inputs
constexpr int COLUMN_PINS[7] = {11, A5, A4, A3, A2, A1, A0};
constexpr int SENSOR_THRESHOLDS[7] = {-1, 650, 750, 650, 550, 550, 700};
constexpr int DEBOUNCE_DELAY = 1000;
constexpr int buttonPin = 10;


// SSD Display
constexpr int p1ScoreDioPin = 3;
constexpr int p1ScoreClkPin = 2;
constexpr int p2ScoreDioPin = 5;
constexpr int p2ScoreClkPin = 4;
constexpr int rotationDioPin = 7;
constexpr int rotationClkPin = 6;
constexpr int turnDioPin = 9;
constexpr int turnClkPin = 8;

#endif // CONSTANTS_H


