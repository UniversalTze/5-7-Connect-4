#include "Player.h"
#include "constants.h"

class Game
{
    private:
        Player player1;
        Player player2;
        bool p1haswon;
        bool p2haswon;
        bool player1turn;

    public:

        Game() {
            player1 = Player();
            player2 = Player();
            player1turn = true;
            p1haswon = false;
            p2haswon = false;
        }

        int getCurrentPlayer() {
            if (player1turn) {
                return PLAYER_1;
            } else {
                return PLAYER_2;
            }
        }

        Player getPlayerOne() {
            return player1;
        }

        Player getPlayerTwo() {
            return player2;
        }

        void switchTurn() {
            player1turn = !player1turn;
        }

        int checkWin() {
            if (p1haswon && p2haswon) {
                return DRAW;
            } else if (p1haswon) {
                return PLAYER_1;
            } else if (p2haswon) {
                return PLAYER_2;
            } else {
                return NO_WIN;
            }
        }
};
