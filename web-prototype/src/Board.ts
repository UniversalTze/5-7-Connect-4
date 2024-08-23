import * as constants from "./constants.ts";

// Handles Board Functionality
export class Board {

  row: number;
  col: number;
  board: number[][];  // top left is (0, 0)
  prevBoard: number[][];
  
  constructor() {
    this.row = constants.BOARD_WIDTH;
    this.col = constants.BOARD_HEIGHT;
    this.board = new Array(constants.BOARD_WIDTH)
        .fill(constants.EMPTY)
        .map(() => new Array(constants.BOARD_HEIGHT)
            .fill(constants.EMPTY));
    this.prevBoard = new Array(constants.BOARD_WIDTH)
        .fill(constants.EMPTY)
        .map(() => new Array(constants.BOARD_HEIGHT)
            .fill(constants.EMPTY));
  }

  /*
   Returns the 2D array representing the board
  */
  getBoard() {
    return this.board;
  }

  /*
    Returns the 2D array representing the previous board state
  */
  getPrevBoard() {
    return this.prevBoard;
  }

  /*
   Returns the width of the board
  */
  getRow() {
    return this.row;
  }

  /*
   Returns the height of the board
  */
  getCol() {
    return this.col;
  }

  /*
   Returns the row of the top token in a given column (col)
  */
  getTopTokenRow(col: number) {
    for (let i = this.row - 1; i >= 0; i--) {
      if (this.board[i][col] === constants.EMPTY) {
        return i;
      }
    }
    return -1;
  }

  /*
   Places a token in the given column (col) for the given player (player)
   WILL NEED TO UPDATE ON player to PLAYER CLASS
  */
  placeToken(col: number, player: number) {
    // Check if the column is full
    if (this.board[0][col] !== constants.EMPTY) {
      return false;
    }
    
    this.board[0][col] = player;
    return true;
  }

  /*
    Checks if a token is above an empty slot and needs to fall. 
  */ 
  checkTokenFall(row: number, col: number) {
    // Check if there is a token above an empty slot
    return (this.board[row][col] !== constants.EMPTY && this.board[row + 1][col]
      === constants.EMPTY)
  }

  /*
    Makes the tokens fall down if there is an empty slot below
  */
  tokenFall() {
    let updatedBoard: number[][] = this.board.map(row=>[...row]);
    let tokenFell = false;

    for (let i = 0; i < this.row - 1; i++) {
      for (let j = 0; j < this.col; j++) {
        if (this.checkTokenFall(i, j)) {
          updatedBoard[i][j] = constants.EMPTY;
          updatedBoard[i + 1][j] = this.board[i][j];
          tokenFell = true;
        }
      }
    }
    
    this.prevBoard = this.board;
    this.board = updatedBoard;

    return tokenFell;
  }

  /*
    Rotates the board by the given angle (angle) in a clockwise direction
  */
  rotateBoard(angle: number) {
    let newBoard = new Array(this.row).fill(constants.EMPTY).map(() =>
      new Array(this.col).fill(constants.EMPTY));
    
    switch (angle) {
      case 90:
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            newBoard[j][this.row - 1 - i] = this.board[i][j];
          }
        }
        break;
      case 180:
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            newBoard[this.row - 1 - i][this.col - 1 - j] = this.board[i][j];
          }
        }
        break;
      case 270:
        for (let i = 0; i < this.row; i++) {
          for (let j = 0; j < this.col; j++) {
            newBoard[this.col - 1 - j][i] = this.board[i][j];
          }
        }
        break;
      default:
        // Bad Angle Input
        break;
    }

    this.prevBoard = this.board;
    this.board = newBoard;
  }
  
  /*
    Copies the combo from the board to the combos array
    startRow: starting row of the combo
    startCol: starting column of the combo
    endRow: ending row of the combo
    endCol: ending column of the combo
    combos: 2D array to store the combo
  */
  copyCombo(startRow: number, startCol: number, endRow: number, 
    endCol: number, combos: number[][]) {
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        combos[i][j] = this.board[i][j];
      }
    }
  }

  /*
    Checks for horizontal combos in the board and stores them in 
      the combos array
    points: a numbers[2] array to store the points for both players from combos
    combos: 2D array to store the combos
  */
  checkHorizontal(points: number[], combos: number[][]) {
    let comboExists = false;
    for (let i = 0; i < this.row; i++) {
      let count = 1;
      for (let j = 0; j < this.col; j++) {
        if (j !== this.col - 1 && this.board[i][j] !== constants.EMPTY
          && this.board[i][j] === this.board[i][j + 1]) {
          count++;
        } else {
          if (count >= constants.MIN_COMBO_LENGTH) {
            this.copyCombo(i, j - count + 1, i, j, combos);
            points[this.board[i][j] - 1] += count; // Add points for the player
            comboExists = true;
          }
          count = 1;
        }
      }
    }

    return comboExists;
  }

  /*
    Checks for vertical combos in the board and stores them in the combos array
    points: a numbers[2] array to store the points for both players from combos
    combos: 2D array to store the combos
  */
  checkVertical(points: number[], combos: number[][]) {
    let comboExists = false;

    for (let j = 0; j < this.col; j++) {
      let count = 1;
      for (let i = 0; i < this.row; i++) {
        if (i !== this.row - 1 && this.board[i][j] !== constants.EMPTY
          && this.board[i][j] === this.board[i + 1][j]) {
          count++;
        } else {
          if (count >= constants.MIN_COMBO_LENGTH) {
            this.copyCombo(i - count + 1, j, i, j, combos);
            points[this.board[i][j] - 1] += count; // Add points for the player
            comboExists = true;
          }
          count = 1;
        }
      }
    }

    return comboExists;
  }

  /*
    Checks for diagonal combos in the board and stores them in the combos array
    points: a numbers[2] array to store the points for both players from combos
    combos: 2D array to store the combos
  */
  checkDiagonal(points: number[], combos: number[][]) {
    let comboExists = false;

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        let count = 1;
        let k = 1;
        while (i + k < this.row && j + k < this.col) {
          if (this.board[i][j] !== constants.EMPTY
            && this.board[i][j] === this.board[i + k][j + k]) {
            count++;
          } else {
            break;
          }
          k++;
        }
        if (count >= constants.MIN_COMBO_LENGTH) {
          this.copyCombo(i, j, i + count - 1, j + count - 1, combos);
          points[this.board[i][j] - 1] += count; // Add points for the player
          comboExists = true;
        }
      }
    }

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        let count = 1;
        let k = 1;
        while (i + k < this.row && j - k >= 0) {
          if (this.board[i][j] !== constants.EMPTY
            && this.board[i][j] === this.board[i + k][j - k]) {
            count++;
          } else {
            break;
          }
          k++;
        }
        if (count >= constants.MIN_COMBO_LENGTH) {
          this.copyCombo(i, j, i + count - 1, j - count + 1, combos);
          points[this.board[i][j] - 1] += count; // Add points for the player
          comboExists = true;
        }
      }
    }

    return comboExists;
  }

  /*
    Checks for combos from a token placed in the board
    points: a numbers[2] array to store the points for both players from combos
    combos: 2D array to store the combos
    col: column of the token
    row: row of the token
    rowDir: direction of the row to check for combo (1: +ve dir, 0: neutral
     or -1: -ve dir)
    colDir: direction of the column to check for combo
  */
  checkComboFromToken(points: number[], combos: number[][], col: number, 
    row: number, rowDir: number, colDir: number) {

    let count = 1;
    let startRow = row;
    let startCol = col;
    let endRow = row;
    let endCol = col;
    let comboExists = false;

    // Check combo in negative direction
    for (let i = 1; i < constants.MAX_COMBO_LENGTH; i++) {
      let newRow = row - i * rowDir;
      let newCol = col - i * colDir;
      if (newRow >= 0 && newRow < this.row && newCol >= 0 && newCol < this.col
        && this.board[newRow][newCol] === this.board[row][col]) {
        count++;
        startCol = newCol;
        startRow = newRow;
      } else {
        break;
      }
    }

    // Check combo in positive direction
    for (let i = 1; i < constants.MAX_COMBO_LENGTH; i++) {
      let newRow = row + i * rowDir;
      let newCol = col + i * colDir;
      if (newRow >= 0 && newRow < this.row && newCol >= 0 && newCol < this.col
        && this.board[newRow][newCol] === this.board[row][col]) {
        count++;
        endCol = newCol;
        endRow = newRow;
      } else {
        break;
      }
    }

    if (count >= constants.MIN_COMBO_LENGTH) {
      this.copyCombo(startRow, startCol, endRow, endCol, combos);
      points[this.board[row][col] - 1] += count; // Add points for the player
      comboExists = true;
    }

    return comboExists;
  }

  /*
    Checks for combos in the board
    points: a numbers[2] array to store the points for both players from combos
    combos: 2D array to store the combos
    type: type of combo to check for (FULL_CLEAR or -1: Combos from dropped 
      token)
    lastCol: column of the last placed token
  */
  checkForCombos(points: number[], combos: number[][], type: number = -1, 
    lastCol: number = -1) {
    let comboExists = false;

    if (type === constants.FULL_CLEAR) {
      comboExists = comboExists || this.checkHorizontal(points, combos);
      comboExists = comboExists || this.checkVertical(points, combos);
      comboExists = comboExists || this.checkDiagonal(points, combos);
    } else { // Check for combos around the last placed token
      let lastTokenRow: number = this.getTopTokenRow(lastCol);
      if (lastTokenRow === -1) {
        return;
      }

      comboExists = comboExists || 
        this.checkComboFromToken(points, combos, lastCol, lastTokenRow, 1, 0);
      comboExists = comboExists || 
        this.checkComboFromToken(points, combos, lastCol, lastTokenRow, 0, 1);
      comboExists = comboExists || 
        this.checkComboFromToken(points, combos, lastCol, lastTokenRow, 1, 1); 
      comboExists = comboExists || 
        this.checkComboFromToken(points, combos, lastCol, lastTokenRow, 1, -1);

      return comboExists;
    }
  }

  /*
    Clears the combos on the board

    totalPoints: a numbers[2] array to store the points for both players from 
      the combo clear. points[0] is for player 1 and points[1] is for player 2
    lastCol: column of the last placed token
    type: type of combo to clear (FULL_CLEAR or -1: Combos from dropped token)
  */
  clearCombos(totalPoints: number[], lastCol: number = -1, type: number = -1) {
    let combos = new Array(this.row).fill(constants.EMPTY).map(() =>
      new Array(this.col).fill(constants.EMPTY));
    let points = [0, 0];
    let clearedBoard: number[][] = this.board.map(row=>[...row]);

    if (type === constants.FULL_CLEAR) {
      if (!this.checkForCombos(points, combos, constants.FULL_CLEAR)) {
        return false;
      }
    } else {
      if (lastCol < 0 || lastCol >= this.col) {
        return;
      }                   
      if (!this.checkForCombos(points, combos, lastCol = lastCol)) {
        return false;
      }
    }
 
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (combos[i][j] !== constants.EMPTY) {
          clearedBoard[i][j]= constants.EMPTY;
        }
      }
    }
    
    this.prevBoard = this.board;
    this.board = clearedBoard;

    totalPoints[0] = points[0]; // Player 1 points from combos
    totalPoints[1] = points[1]; // Player 2 points from combos

    return true;
  }
}