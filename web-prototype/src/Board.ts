import * as constants from "./constants.ts";

export class Board {

  row: number;
  col: number;
  board: number[][];  // top left is (0, 0)
  
  constructor() {
    this.row = constants.BOARD_WIDTH;
    this.col = constants.BOARD_HEIGHT;
    this.board = new Array(constants.BOARD_WIDTH)
        .fill(constants.EMPTY)
        .map(() => new Array(constants.BOARD_HEIGHT)
            .fill(constants.EMPTY));
  }

  getBoard() {
    return this.board;
  }

  getRow() {
    return this.row;
  }

  getCol() {
    return this.col;
  }

  getTopTokenRow(col: number) {
    for (let i = this.row - 1; i >= 0; i--) {
      if (this.board[i][col] === constants.EMPTY) {
        return i;
      }
    }
    return -1;
  }

  placeToken(col: number, player: number) {
    // Check if the column is full
    if (this.board[0][col] !== constants.EMPTY) {
      return false;
    }
    
    this.board[0][col] = player;
    return true;
  }

  checkTokenFall(tokensToDrop: number[][]) {
    // Check if there is a token above an empty slot
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (this.board[i][j] !== constants.EMPTY && this.board[i + 1][j]
          === constants.EMPTY) {
          tokensToDrop[i][j] = this.board[i][j];
        }
      }
    }
  }

  tokenFall() {
    let tokensToDrop = new Array(this.row).fill(constants.EMPTY).map(() =>
      new Array(this.col).fill(constants.EMPTY));
    this.checkTokenFall(tokensToDrop);

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (tokensToDrop[i][j] !== constants.EMPTY) {
          this.board[i + 1][j] = tokensToDrop[i][j];
          this.board[i][j] = constants.EMPTY;
        }
      }
    }
  }

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

    // Copy the new board to the current board
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.board[i][j] = newBoard[i][j];
      }
    }
  }
  
  copySequence(startRow: number, startCol: number, endRow: number, 
    endCol: number, combos: number[][]) {
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        combos[i][j] = this.board[i][j];
      }
    }
  }

  checkHorizontal(combos: number[][]) {
    for (let i = 0; i < this.row; i++) {
      let count = 1;
      for (let j = 0; j < this.col; j++) {
        if (j !== this.col - 1 && this.board[i][j] !== constants.EMPTY
          && this.board[i][j] === this.board[i][j + 1]) {
          count++;
        } else {
          if (count >= constants.MIN_COMBO_LENGTH) {
            this.copySequence(i, j - count + 1, i, j, combos);
          }
          count = 1;
        }
      }
    }
  }

  checkVertical(combos: number[][]) {
    for (let j = 0; j < this.col; j++) {
      let count = 1;
      for (let i = 0; i < this.row; i++) {
        if (i !== this.row - 1 && this.board[i][j] !== constants.EMPTY
          && this.board[i][j] === this.board[i + 1][j]) {
          count++;
        } else {
          if (count >= constants.MIN_COMBO_LENGTH) {
            this.copySequence(i - count + 1, j, i, j, combos);
          }
          count = 1;
        }
      }
    }
  }

  checkDiagonal(combos: number[][]) {
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
          this.copySequence(i, j, i + count - 1, j + count - 1, combos);
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
          this.copySequence(i, j, i + count - 1, j - count + 1, combos);
        }
      }
    }
  }

  checkComboFromToken(combos: number[][], col: number, row: number, 
    rowDir: number, colDir: number) {

    let count = 1;
    let startRow = row;
    let startCol = col;
    let endRow = row;
    let endCol = col;

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
      this.copySequence(startRow, startCol, endRow, endCol, combos);
    }
  }


  checkForCombos(combos: number[][], type: number = -1, lastCol: number = -1) {

    if (type === constants.FULL_CLEAR) {
      this.checkHorizontal(combos);
      this.checkVertical(combos);
      this.checkDiagonal(combos);
    } else { // Check for combos around the last placed token
      let lastTokenRow: number = this.getTopTokenRow(lastCol);
      if (lastTokenRow === -1) {
        return;
      }

      this.checkComboFromToken(combos, lastCol, lastTokenRow, 1, 0); // Check Horizontal
      this.checkComboFromToken(combos, lastCol, lastTokenRow, 0, 1); // Check Vertical
      this.checkComboFromToken(combos, lastCol, lastTokenRow, 1, 1); // Check Diagonal
      this.checkComboFromToken(combos, lastCol, lastTokenRow, 1, -1); // Check Diagonal
    }
  }

  clearCombos(lastCol: number = -1, type: number = -1) {
    let combos = new Array(this.row).fill(constants.EMPTY).map(() =>
      new Array(this.col).fill(constants.EMPTY));

    if (type === constants.FULL_CLEAR) {
      this.checkForCombos(combos, constants.FULL_CLEAR);
    } else {
      // check that the lastCol is within the board
      if (lastCol < 0 || lastCol >= this.col) {
        return;
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      this.checkForCombos(combos, lastCol = lastCol);
    }

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (combos[i][j] !== constants.EMPTY) {
          this.board[i][j] = constants.EMPTY;
        }
      }
    }
  }
}