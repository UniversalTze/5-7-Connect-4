--------------------------------------------------------------------
README FILE

DECO3801 Connect 4 Project Repo 

Authors: 
- UniversalTze 
- pchsa
- ThePyromancer1
- haozhi-ryan

# 5-7 Connect 4

## Description
This game is a new take on the classic Connect 4, designed to be dynamic and engaging while preserving the essence of the original game. Two players compete to score points by forming combos of four or more pieces in a row—horizontally, vertically, or diagonally—within a set time. Unique mechanics like disappearing rows and a rotating board will be an addition to the traditional gameplay.

We are using **JavaScript**, **HTML**, and **CSS** for this web prototype to enable quicker development and easier debugging. We later converted the web prototype into C++ and integrated with the hardware using Arduino. The final product is a technology-enhanced tabletop game that enriches connect 4's traditional gameplay by making it more interactive and immersive. 

### Features
- Two-player game with a timed piece placement.
- Points are scored by connecting four or more pieces in a row.
- The game ends when time runs out, and the player with the highest score wins.
- Scored rows disappear, and pieces above fall down like gravity.
- The board randomly rotates at intervals, shifting pieces and creating new opportunities.
- Incorporates visual elements like flashing lights to enhance the game’s interactivity.

## Purpose of the Web Prototype
This Web prototype helps test and fine-tune game mechanics and visuals before transitioning to hardware with Arduino. It allows us to:
- Test game mechanics early and ensure the project stays on track.
- Refine gameplay elements and visual displays.
- Conduct user surveys and gather feedback to iterate the design.
- Facilitate seamless integration between the software and hardware components.

## Why Connect 4?
We chose Connect 4 because it’s simple, appeals to a wide audience, and offers great potential for enhancement. 
- Board games foster communication, collaboration, and a sense of community.
- They offer fun and different challenges, helping players build problem-solving skills and empathy.
- Our twist on the different dynamic features like rotating boards and disappearing rows creates a sprited, fun experience that balances strategy and skill.
- By integrating with hardware, we aim to make the game more engaging and visually immersive.


## Installation and Setup 
### Web Prototype
To run the project locally:

#### Requirements:
- Built using **JavaScript**, **HTML**, **CSS**, and **TypeScript**.

#### Steps to start the game:
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/haozhi-ryan/5-7-connect-4.git
   cd 5-7-connect-4/web-prototype
2. Install dependencies
   ```bash
   npm install
4. Run the development server
   ```bash
   npm run dev
6. A local web link should appear in the terminal. Open the link in your browser to view and play the game.
7. Controls: Click at column to place token, press 'r' to restart game.

### Gameplay
<img width="1440" alt="Screen Shot 2024-10-18 at 10 40 14 am" src="https://github.com/user-attachments/assets/e2018b93-7721-4eb8-8987-a18bc1d24e42">

#### Pregame context
- Click on any circles in the valid columns to place a token
- Scores, turn timer and rotation timer can be seen at the bottom of the board. 
- The current colour around the border of the board represents current player's turn. (Player 1 - Red, Player 2 - Yellow). 
- When the turn timer runs out, the colour of the border changes, indicating that it is the other player's turn. 
- When the rotation timer descends to zero, the board will rotate causing the pieces to fall and the turn timer is reset after this action. 

#### In Game Loop 
- When a player forms a streak of four or more tokens, an animation will trigger, causing the connected tokens to disappear. This action will then allow the tokens above the cleared streak to shift down by one row, filling the empty spaces.
- When tokens fill this empty space, the current players runs the risk of also creating streaks for the other player.
- The tokens that dissapear from the board are added to respective player's score.

#### End Game
- When a player reaches 21 points or more, they will have won the game. This will trigger a win animation
- If both players reach 21 points or more at the same time, this is considered a draw. This triggers a different animation.
- Players can choose to restart the game by pressing 'r'.

### Physical Prototype
To upload the code to the physical prototype:

#### Requirements:
- Ensure Arduino IDE and libraries 'Adafruit_NeoPixel' and 'TM1637_display' are installed.

#### Steps:
1. Clone the repository and open final-prototype/final-prototype.ino in Arduino IDE.
   ```bash
   git clone https://github.com/haozhi-ryan/5-7-connect-4.git
3. Press upload.
4. Enjoy the Game!!!

#### Note:
- The physical prototype's gameplay is identical to web-prototype, with the only difference being the use of hardware components in place of html.
- The labels can be found on the physical board. 
--------------------------------------------------------------------
