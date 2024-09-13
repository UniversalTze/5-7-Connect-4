/**
 * @class Player
 * @brief Represents a player in the game.
 * 
 * The Player class stores information about a player, including their score.
 */
class Player {
    public:
        Player() : playerScore(0) {};

        int getPlayerScore() {
            return playerScore;
        }

        void addPlayerScore(int score) {
            playerScore += score;
        }

    private:
        int playerScore;

};