#ifndef GAME_H
#define GAME_H

#include "Player.h"
#include "constants.h"

class Game {
    private:
        Player player1;
        Player player2;
        bool p1haswon;
        bool p2haswon;
        bool player1turn;

    public:
        Game();

        // Get the current player number (PLAYER_1 or PLAYER_2)
        int getCurrentPlayer();

        // Return Player 1 object
        Player getPlayerOne();

        // Return Player 2 object
        Player getPlayerTwo();

        // Switch the player's turn
        void switchTurn();

        // Check who has won: PLAYER_1, PLAYER_2, DRAW, or NO_WIN
        int checkWin();
};

#endif // GAME_H
