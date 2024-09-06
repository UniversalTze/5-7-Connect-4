#ifndef CONSTANTS_H
#define CONSTANTS_H

// Board dimensions
constexpr int BOARD_HEIGHT = 7;
constexpr int BOARD_WIDTH = 7;


constexpr int NO_INPUT = -1;
constexpr int EMPTY = 0;
constexpr int PLAYER_1 = 1;
constexpr int PLAYER_2 = 2;

// Colours 
constexpr const char* EMPTY_COLOR = "#504f4f";
constexpr const char* PLAYER_1_COLOR = "#cf4242";
constexpr const char* PLAYER_2_COLOR = "#ddaf24";

constexpr const char* FLASH_COLOR[] = {"white"};

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

#endif // CONSTANTS_H
