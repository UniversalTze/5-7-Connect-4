#include <Adafruit_NeoPixel.h>

// Define parameters for the LED strip
int ledPin = 13;
int ledCount = 300;

// Define trig and echo pins for the ultrasonic sensors
// const int column6_trigPin = 2;
// const int column6_echoPin = 3;
// const int column2_trigPin = 4;
// const int column2_echoPin = 5;
// const int column3_trigPin = 6;
// const int column3_echoPin = 7;
// const int column4_trigPin = 8;
// const int column4_echoPin = 9;
// const int column5_trigPin = 10;
// const int column5_echoPin = 11;
// const int column7_trigPin = A0;
// const int column7_echoPin = A1;
// const int column1_trigPin = A2;
// const int column1_echoPin = A3;

// Initialise variables for detecting tokens
long duration; // makes a long variable named duration
int distance; // makes an integer variable named distance

// Variable for identifying LED ids
int LedIds[][7][2] = {{{19, 0}, {27, 0}, {70, 0}, {75, 0}, {118, 0}, {125, 0}, {168, 0}}, // {{bottom -> top}}
  {{16, 0}, {30, 0}, {67, 0}, {78, 0}, {115, 0}, {128, 0}, {165, 0}}, // {id, on/off (0/1)}
  {{13, 0}, {33, 0}, {64, 0}, {81, 0}, {112, 0}, {131, 0}, {162 ,0}},
  {{10, 0}, {36, 0}, {61, 0}, {84, 0}, {109, 0}, {134, 0}, {159 ,0}},
  {{7, 0}, {39, 0}, {58, 0}, {87, 0}, {106, 0}, {137, 0}, {156 ,0}},
  {{4, 0}, {42, 0}, {55, 0}, {90, 0}, {103, 0}, {140, 0}, {153 ,0}},
  {{1, 0}, {45, 0}, {52, 0}, {93, 0}, {100, 0}, {143, 0}, {150 ,0}}};

Adafruit_NeoPixel strip(ledCount, ledPin, NEO_GRB + NEO_KHZ800);

int turn = 1; // Keeping track of player turns

const int columnPins[][2] = {{2, 3}, {A2, A3}, {A0, A1}, {10, 11}, {8, 9}, {6, 7}, {4, 5}}; // {TRIG, ECHO}

void setup() {
  // Set ultrasonic sensor pins for input/output
  for (int x = 1; x < 7; x++) {
    pinMode(columnPins[x][0], OUTPUT);
    pinMode(columnPins[x][1], INPUT); 
  }

  // Initialise LED strip
  strip.begin();
  strip.show();

  Serial.begin(9600); // Starts the serial communication on baud rate 9600
}

void loop() {

  // Detect tokens through each of the ultrasonic sensors
  for (int x = 1; x <7 ; x++) {
    digitalWrite(columnPins[x][0], LOW); // Resets the trigPin
    delayMicroseconds(2); // Waits 2 microsenconds
    digitalWrite(columnPins[x][0], HIGH); // Sets the trigPin state to HIGH
    delayMicroseconds(10); // Waits 10 microseconds
    digitalWrite(columnPins[x][0], LOW); // Sets the trigPin state to LOW
    duration = pulseIn(columnPins[x][1], HIGH); // Reads the echoPin and assign it to the variable duration
    distance= duration*0.034/2; // Calculation of the distance

    Serial.print("column ");
    Serial.print(x+1);
    Serial.print(" ");
    Serial.println(distance);

    if (distance < 10){ // 3cm
      AddToken(x); // Add token to the corresponding column
      Serial.print("column ");
      Serial.print(x+1);
      Serial.println(" detected");
      delay(1000);
      break;
    }
  }
  delay(100);
}

// Function for inserting a token into a column
int AddToken(int columnIndex){
  int bottomTokenIndex = 0;
  for (int x = 0; x <= 5; x++) { // Iterate to identify the lowest free slot
    if (LedIds[columnIndex][x][1] == 1){ // If slot is not empty
      bottomTokenIndex += 1; 
    }
  }

  if (bottomTokenIndex < 6){ // If column is not full
    if (turn == 1){
      for (int x = 6; x >= bottomTokenIndex; x--) { // Toggle each empty slot in order to create dropping animation
        strip.setPixelColor(LedIds[columnIndex][x][0], 255, 0, 0);
        strip.show();
        delay(100);
        strip.setPixelColor(LedIds[columnIndex][x][0], 0, 0, 0);
        strip.show();
      }
      strip.setPixelColor(LedIds[columnIndex][bottomTokenIndex][0], 255, 0, 0);
      strip.show();
      LedIds[columnIndex][bottomTokenIndex][1] = 1; // Rewrite array to set slot as filled
    }
    else{
      for (int x = 6; x >= bottomTokenIndex; x--) {
        strip.setPixelColor(LedIds[columnIndex][x][0], 255, 255, 0);
        strip.show();
        delay(100);
        strip.setPixelColor(LedIds[columnIndex][x][0], 0, 0, 0);
        strip.show();
      }
      strip.setPixelColor(LedIds[columnIndex][bottomTokenIndex][0], 255, 255, 0);
      strip.show();
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