class Player {
    public:
        Player(int score) : playerScore(score) {};

        int getPlayerScore() {
            return playerScore;
        }

        void addPlayerScore(int score) {
            playerScore += score;
        }

    private:
        int playerScore;

};