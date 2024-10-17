#include "Player.h"
#include "constants.h"
#include "Game.h"

/**
 * @brief Constructs a Game object, initializing players and setting the starting conditions.
 */
Game::Game() {
    player1 = Player();
    player2 = Player();
    player1turn = true;
    p1haswon = false;
    p2haswon = false;
}

/**
 * @brief Gets the identifier of the current player.
 * 
 * @return PLAYER_1 if it's Player 1's turn, otherwise PLAYER_2.
 */
int Game::getCurrentPlayer() {
    if (player1turn) {
        return PLAYER_1;
    } else {
        return PLAYER_2;
    }
}

/**
 * @brief Returns a reference to Player 1.
 * 
 * @return Reference to the Player 1 object.
 */
Player& Game::getPlayerOne() {
    return player1;
}

/**
 * @brief Returns a reference to Player 2.
 * 
 * @return Reference to the Player 2 object.
 */
Player& Game::getPlayerTwo() {
    return player2;
}

/**
 * @brief Switches the turn to the other player.
 */
void Game::switchTurn() {
    player1turn = !player1turn;
}

/**
 * @brief Checks if there is a winner in the game.
 * 
 * @return PLAYER_1 if Player 1 has won, PLAYER_2 if Player 2 has won, DRAW if both players have reached the winning score, or NO_WIN if no player has won yet.
 */
int Game::checkWin() {
    if (player1.getPlayerScore() >= WINNING_SCORE && player2.getPlayerScore() >= WINNING_SCORE) {
        return DRAW;
    } else if (player1.getPlayerScore() >= WINNING_SCORE) {
        return PLAYER_1;
    } else if (player2.getPlayerScore() >= WINNING_SCORE) {
        return PLAYER_2;
    } else {
        return NO_WIN;
    }
}

/**
 * @brief Resets the game state to its initial conditions.
 */
void Game::reset() {
    player1turn = true;  
    p1haswon = false; 
    p2haswon = false; 
}
