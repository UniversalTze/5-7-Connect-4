export class Player {
    
    private playerScore: number; 
    private playerName: string; 
    
    constructor(score: number, name: string) { 
        this.playerScore = score; 
        this.playerName = name; 
    }

    public getPlayerScore(): number { 
        return this.playerScore; 
    }

    public getPlayerName(): string { 
        return this.playerName; 
    }

    public addPlayerScore(score: number): void {
        this.playerScore = this.playerScore + score;
    }

}