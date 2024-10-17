#include "Player.h"

/**
 * @brief Constructs a Player object, initializing the player's score to zero.
 */
Player::Player() : playerScore(0) {};

/**
 * @brief Gets the current score of the player.
 * 
 * @return The player's score as an integer.
 */
int Player::getPlayerScore() {
    return playerScore;
}

/**
 * @brief Adds the specified score to the player's current score.
 * 
 * @param score The score to be added to the player's current score.
 */
void Player::addPlayerScore(int score) {
    playerScore += score;
}

/**
 * @brief Resets the player's score to zero.
 */
void Player::reset() {
    playerScore = 0;
}
