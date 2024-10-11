#include "Player.h"
#include "constants.h"
#include "Game.h"

Game::Game() {
    player1 = Player();
    player2 = Player();
    player1turn = true;
    p1haswon = false;
    p2haswon = false;
}

int Game::getCurrentPlayer() {
    if (player1turn) {
        return PLAYER_1;
    } else {
        return PLAYER_2;
    }
}

Player& Game::getPlayerOne() {
    return player1;
}

Player& Game::getPlayerTwo() {
    return player2;
}

void Game::switchTurn() {
    player1turn = !player1turn;
}

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

void Game::reset() {
    player1turn = true;  
    p1haswon = false; 
    p2haswon = false; 
}
