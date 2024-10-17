export class Player {
    
    private playerScore: number; 
    private playerName: string; 
    
    /**
     * @brief Constructs a Player instance with an initial score and name.
     * 
     * @param score - The initial score of the player.
     * @param name - The name of the player.
     */
    constructor(score: number, name: string) { 
        this.playerScore = score; 
        this.playerName = name; 
    }

    /**
     * @brief Gets the current score of the player.
     * 
     * @returns The player's score as a number.
     */
    public getPlayerScore(): number { 
        return this.playerScore; 
    }

    /**
     * @brief Gets the name of the player.
     * 
     * @returns The player's name as a string.
     */
    public getPlayerName(): string { 
        return this.playerName; 
    }

    /**
     * @brief Adds a specified score to the player's current score.
     * 
     * @param score - The score to be added to the player's current score.
     */
    public addPlayerScore(score: number): void {
        this.playerScore = this.playerScore + score;
    }

}