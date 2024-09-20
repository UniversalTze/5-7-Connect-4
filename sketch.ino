#include <Adafruit_NeoPixel.h>

// Define parameters for the LED displayBoardLED
int ledPin = 13;
int ledCount = 300;

// Initialise variables for detecting tokens
long duration; // makes a long variable named duration
int distance; // makes an integer variable named distance

// Variable for identifying LED ids
int LedIds[][7][2] = {{{20, 0}, {26, 0}, {70, 0}, {75, 0}, {119, 0}, {124, 0}, {168, 0}}, // {{bottom -> top}}
  {{17, 0}, {29, 0}, {67, 0}, {78, 0}, {116, 0}, {127, 0}, {165, 0}}, // {id, on/off (0/1)}
  {{13, 0}, {33, 0}, {63, 0}, {82, 0}, {112, 0}, {131, 0}, {161 ,0}},
  {{10, 0}, {36, 0}, {60, 0}, {85, 0}, {109, 0}, {134, 0}, {158 ,0}},
  {{7, 0}, {39, 0}, {57, 0}, {88, 0}, {106, 0}, {137, 0}, {155 ,0}},
  {{4, 0}, {42, 0}, {54, 0}, {92, 0}, {103, 0}, {140, 0}, {152 ,0}},
  {{1, 0}, {45, 0}, {51, 0}, {94, 0}, {100, 0}, {143, 0}, {149 ,0}}};

Adafruit_NeoPixel displayBoardLED(300, 13, NEO_GRB + NEO_KHZ800); // (led count, pin number, ...)
Adafruit_NeoPixel photoresistorLED(22, 12, NEO_GRB + NEO_KHZ800); // (led count, pin number, ...)

int turn = 1; // Keeping track of player turns

const int columnPins[7] = {11, A5, A4, A3, A2, A1, A0}; // {TRIG, ECHO}

void setup() {
  pinMode(11, INPUT); 

  // Initialise LED displayBoardLED
  displayBoardLED.begin();
  displayBoardLED.show();

  // Initialise LED strip for light sensors
  photoresistorLED.begin();
  for (int x = 0; x < 22 ; x++) {
    photoresistorLED.setPixelColor(x, 255, 255, 255);
    photoresistorLED.show();
  }

  Serial.begin(9600); // Starts the serial communication on baud rate 9600
  delay(1000);
}

void loop() {

  // Check digital pin first 
  int digitalValue = digitalRead(columnPins[0]);
    Serial.print("Column 1: ");
    Serial.println(digitalValue);
    if (digitalValue == 1){
      Serial.print("Column 1 detected");
      AddToken(0);
      delay(1000);
      return;
    }

    // Check the analog pins for input
  for (int x = 1; x < 7; x++){ // Column 2: 583, Column 3: 663, Column 4: 606, Column 5: 453, Column 6: 493, Column 7: 621
    int sensorValue = analogRead(columnPins[x]);
    Serial.print("Column ");
    Serial.print(x+1);
    Serial.print(": ");
    Serial.println(sensorValue);

  if (x == 2){ // Column 3
    if (sensorValue > 700){ 
          Serial.print("Column ");
          Serial.print(x+1);
          Serial.println(" detected");
          AddToken(x); // Add token to the corresponding column
          delay(1000);
          return;
        }
  }
  else if (x == 1 || x == 3 || x == 6){
    if (sensorValue > 650){ 
          Serial.print("Column ");
          Serial.print(x+1);
          Serial.println(" detected");
          AddToken(x); // Add token to the corresponding column
          delay(1000);
          return;
        }
  }
  else{
    if (sensorValue > 550){ 
          Serial.print("Column ");
          Serial.print(x+1);
          Serial.println(" detected");
          AddToken(x); // Add token to the corresponding column
          delay(1000);
          return;
        }
  }
  }
  delay(100);
}


// Function for inserting a token into a column
int AddToken(int columnIndex){
  int bottomTokenIndex = 0;
  for (int x = 0; x <= 6; x++) { // Iterate to identify the lowest free slot
    if (LedIds[columnIndex][x][1] == 1){ // If slot is not empty
      bottomTokenIndex += 1; 
    }
  }

  if (bottomTokenIndex < 7){ // If column is not full
    if (turn == 1){
      for (int x = 6; x >= bottomTokenIndex; x--) { // Toggle each empty slot in order to create dropping animation
        displayBoardLED.setPixelColor(LedIds[columnIndex][x][0], 255, 0, 0);
        displayBoardLED.show();
        delay(100);
        displayBoardLED.setPixelColor(LedIds[columnIndex][x][0], 0, 0, 0);
        displayBoardLED.show();
      }
      displayBoardLED.setPixelColor(LedIds[columnIndex][bottomTokenIndex][0], 255, 0, 0);
      displayBoardLED.show();
      LedIds[columnIndex][bottomTokenIndex][1] = 1; // Rewrite array to set slot as filled
    }
    else{
      for (int x = 6; x >= bottomTokenIndex; x--) {
        displayBoardLED.setPixelColor(LedIds[columnIndex][x][0], 255, 255, 0);
        displayBoardLED.show();
        delay(100);
        displayBoardLED.setPixelColor(LedIds[columnIndex][x][0], 0, 0, 0);
        displayBoardLED.show();
      }
      displayBoardLED.setPixelColor(LedIds[columnIndex][bottomTokenIndex][0], 255, 255, 0);
      displayBoardLED.show();
      LedIds[columnIndex][bottomTokenIndex][1] = 1;
    }
  }

  // Switch turns
  if (turn == 1){
    return turn = 2;
  }
  else{
    return turn = 1;
  }
}