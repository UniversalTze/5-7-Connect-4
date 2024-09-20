#include "Player.h"

Player::Player() : playerScore(0) {};

int Player::getPlayerScore() {
    return playerScore;
}

void Player::addPlayerScore(int score) {
    playerScore += score;
}