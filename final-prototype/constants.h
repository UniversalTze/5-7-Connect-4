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
constexpr const int WHITE[3] = {0, 0, 255};


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
constexpr int WINNING_SCORE = 21;

// Win States
constexpr int NO_WIN = 0;
constexpr int DRAW = 3;

// LED
constexpr int LED_PIN = 13;
constexpr int LED_COUNT = 300;
constexpr int LED_IDS[7][7] = {
  {42, 43, 44, 45, 46, 47, 48},  // Column 0 (bottom -> top)
  {41, 40, 39, 38, 37, 36, 35},  // Column 1
  {28, 29, 30, 31, 32, 33, 34},  // Column 2
  {27, 26, 25, 24, 23, 22, 21},  // Column 3
  {14, 15, 16, 17, 18, 19, 20},  // Column 4
  {13, 12, 11, 10,  9,  8,  7},  // Column 5
  { 0,  1,  2,  3,  4,  5,  6}   // Column 6
};


// Inputs
constexpr int COLUMN_PINS[7] = {11, A5, A4, A3, A2, A1, A0};
constexpr int SENSOR_THRESHOLDS[7] = {-1, 650, 700, 650, 550, 550, 650};
constexpr int DEBOUNCE_DELAY = 1000;

#endif // CONSTANTS_H


