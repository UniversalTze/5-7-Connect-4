#ifndef PLAYER_H
#define PLAYER_H

class Player {
    private:
        int playerScore;

    public:
        Player();
        int getPlayerScore(); 
        void addPlayerScore(int score);
};

#endif // PLAYER_H
