--------------------------------------------------------------------
README FILE

DECO3801 Connect 4 Project Repo 

Authors: 
- UniversalTze 
- pchsa
- ThePyromancer1
- haozhi-ryan

# 5-7 Connect 4 Web Prototype

## Description
This web app is a new take on the classic Connect 4 game, designed to be dynamic and engaging while preserving the essence of the original game. Two players compete to score points by forming combos of four or more pieces in a row—horizontally, vertically, or diagonally—within a set time. Unique mechanics like disappearing rows and a rotating board will be an addition to the traditional gameplay.

We are using **JavaScript**, **HTML**, and **CSS** for this web prototype to enable quicker development and easier debugging. Later, it will be converted into C++ and integrated with the hardware using Arduino. The final product is a technology-enhanced tabletop game that enriches connect 4's traditional gameplay by making it more interactive and immersive. 

### Features
- Two-player game with a timed piece placement.
- Points are scored by connecting four or more pieces in a row.
- The game ends when time runs out, and the player with the highest score wins.
- Scored rows disappear, and pieces above fall down like gravity.
- The board randomly rotates at intervals, shifting pieces and creating new opportunities.
- Incorporates visual elements like flashing lights and sound effects to enhance the game’s interactivity.

## Purpose of the Prototype
This prototype helps test and fine-tune game mechanics and visuals before transitioning to hardware with Arduino. It allows us to:
- Test game mechanics early and ensure the project stays on track.
- Refine gameplay elements and visual displays.
- Conduct user surveys and gather feedback to iterate the design.
- Facilitate seamless integration between the software and hardware components.

## Why Connect 4?
We chose Connect 4 because it’s simple, appeals to a wide audience, and offers great potential for enhancement. 
- Board games foster communication, collaboration, and a sense of community.
- They offer fun and challenge, helping players build problem-solving skills and empathy.
- Our twist on the game—adding rotating boards and disappearing rows—creates a dynamic, fun experience that balances strategy and skill.
- By integrating with hardware, we aim to make the game more engaging and visually immersive.


## Installation and Setup 
### Web Prototype
To run the project locally:

#### Requirements:
- Built using **JavaScript**, **HTML**, **CSS**, and **TypeScript**.

#### Steps:
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

### Physical Prototype
To upload the code to the physical prototyle:

#### Requirements:
- Ensure Arduino IDE and libraries 'Adafruit_NeoPixel' and 'TM1637_display' are installed

#### Steps:
1. Clone the repository and open final-prototype/final-prototype.ino in Arduino IDE.
   ```bash
   git clone https://github.com/haozhi-ryan/5-7-connect-4.git
3. Press upload.
--------------------------------------------------------------------
