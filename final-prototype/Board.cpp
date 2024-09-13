#include "constants.h"
#include "Board.h"

// Handles changes to the board state
/**
 * @class Board
 * @brief Represents a Connect-4 game board.
 *
 * The Board class provides functionality to manipulate and interact with the
 * game board. It includes methods to rotate the board, place tokens, check for
 * combos, clear combos, and more. The board is represented as a 2D array of
 * integers, where each element represents a cell on the board. The class also
 * keeps track of the previous board state and provides methods to check if the
 * board is full or empty.
 */
  
  Board::Board() : m_row(BOARD_HEIGHT), m_col(BOARD_WIDTH) {};

  /**
    * Rotates the board by the specified angle.
    *
    * @param angle The angle by which to rotate the board. Valid values are
    * 90, 180, and 270.
    */
  void Board::rotateBoard(int angle)
  {
      int newBoard[BOARD_HEIGHT][BOARD_WIDTH] = {EMPTY};

      switch (angle) {
          case 90:
              for (int i = 0; i < m_row; i++) {
                  for (int j = 0; j < m_col; j++) {
                      newBoard[j][m_row - 1 - i] = board[i][j];
                  }
              }
              break;
          case 180:
              for (int i = 0; i < m_row; i++) {
                  for (int j = 0; j < m_col; j++) {
                      newBoard[m_row - 1 - i][m_col - 1 - j] = board[i][j];
                  }
              }
              break;
          case 270:
              for (int i = 0; i < m_row; i++) {
                  for (int j = 0; j < m_col; j++) {
                      newBoard[m_col - 1 - j][i] = board[i][j];
                  }
              }
              break;
          default:
              // Bad Angle Input
              break;
      }

      updatePrevBoard();
      // Update the board with the new rotated board
      for (int i = 0; i < m_row; i++) {
          for (int j = 0; j < m_col; j++) {
              board[i][j] = newBoard[i][j];
          }
      }
  }
  
  /**
    * Places a token in the specified column for the given player.
    *
    * @param col The column where the token should be placed.
    * @param player The player who is placing the token.
    * @return True if the token was successfully placed, false otherwise.
    */
  bool Board::placeToken(int col, int player) {
      if (board[0][col] != EMPTY) {
          return false;
      }
      board[0][col] = player;
      return true;
  };

  /**
    * @brief Checks if any token can fall in the board.
    *
    * This function iterates through the board and checks if any token can
    * fall from a higher row to a lower row. If a token can fall, it
    * updates the board accordingly and returns true. Otherwise, it returns
    * false.
    *
    * @return true if a token has fallen, false otherwise.
    */
  bool Board::tokenFall() {
      bool hasFallen = false;
      for (int i = m_row - 2; i >= 0; i--) { // Skip the bottom row
          for (int j = 0; j < m_col; j++) {
              if (checkTokenFall(i, j)) {
                  board[i + 1][j] = board[i][j];
                  board[i][j] = EMPTY;
                  hasFallen = true;
              }
          }
      }

      // Save the previous board state if a token has fallen
      if (hasFallen) {
          updatePrevBoard();
      }

      return hasFallen;
  };

  /**
    * @brief Clears the combos on the board and updates the total points.
    *
    * This function clears the combos on the board and updates the total
    * points based on the cleared combos. It takes an optional lastCol
    * parameter to specify the column where the last move was made. If
    * lastCol is not provided or is invalid, the function returns false. If
    * type is FULL_CLEAR, it checks for combos on the entire board. If no
    * combos are found, the function returns false. The function updates
    * the board by setting the cells with combos to empty. It then updates
    * the previous board and copies the cleared board to the current board.
    * Finally, it updates the total points array with the points earned
    * from the cleared combos.
    *
    * @param totalPoints An array to store the total points earned by each
    * player.
    * @param lastCol (optional) The column where the last move was made.
    * @param type (optional) The type of clear operation to perform.
    * @return true if the combos were cleared and the points were updated
    * successfully, false otherwise.
    */
  bool Board::clearCombos(int totalPoints[2], int lastCol=-1, int type=-1)
  {
      int combos[BOARD_HEIGHT][BOARD_WIDTH] = {EMPTY};
      int points[2] = {0};
      int clearedBoard[BOARD_HEIGHT][BOARD_WIDTH] = {EMPTY};
      for (int i = 0; i < m_row; i++) {
          for (int j = 0; j < m_col; j++) {
              clearedBoard[i][j] = board[i][j];
          }
      }

      if (type == FULL_CLEAR) {
          if (!checkForCombos(points, combos, type)) {
              return false;
          }
      } else {
          if (lastCol < 0 || lastCol >= m_col) {
              // Invalid column
              return false;
          } else if (!checkForCombos(points, combos, lastCol = lastCol)) {
              // No combos found
              return false;
          }
      }

      for (int i = 0; i < m_row; i++) {
          for (int j = 0; j < m_col; j++) {
              if (combos[i][j] != EMPTY) {
                  clearedBoard[i][j] = EMPTY;
              }
          }
      }

      updatePrevBoard();
      for (int i = 0; i < m_row; i++) {
          for (int j = 0; j < m_col; j++) {
              board[i][j] = clearedBoard[i][j];
          }
      }

      totalPoints[0] = points[0];
      totalPoints[1] = points[1];
      return true;
  };

  /**
    * Checks if the game board is full.
    *
    * @return True if the board is full, false otherwise.
    */
  bool Board::isBoardFull()
  {
      for (int i = 0; i < m_col; i++) {
          if (board[0][i] == EMPTY) {
              return false;
          }
      }
      return true;
  };

  /**
    * @brief Checks if the board is empty.
    *
    * @return true if the board is empty, false otherwise.
    */
  bool Board::isBoardEmpty()
  {
      for (int i = 0; i < m_col; i++) {
          if (board[m_row - 1][i] != EMPTY) {
              return false;
          }
      }
      return true;
  }

  /**
    * Clears the bottom row of the board by setting all its elements to
    * EMPTY. Drops all tokens above the cleared row down by one position.
    *
    * @return true if the bottom row was successfully cleared, false if the
    * board is already empty.
    */
  bool Board::clearBottomRow()
  {
      if (isBoardEmpty()) {
          return false;
      }

      updatePrevBoard();
      for (int i = 0; i < m_col; i++) {
          board[m_row - 1][i] = EMPTY;
      }

      // Drop all tokens down one
      for (int i = m_row - 2; i >= 0; i--) {
          for (int j = 0; j < m_col; j++) {
              board[i + 1][j] = board[i][j];
              board[i][j] = EMPTY;
          }
      }
      return true;
  }

  // Helper functions
  /**
    * Returns the topmost row index in the specified column where a token
    * can be placed.
    *
    * @param col The column index.
    * @return The topmost row index where a token can be placed, or -1 if
    * the column is full.
    */
  int Board::getTopTokenRow(int col)
  {
      for (int i = m_row - 1; i >= 0; i--) {
          if (board[i][col] == EMPTY) {
              return i;
          }
      }
      return -1;
  };

  /**
    * Checks if a token can fall into the specified position on the board.
    *
    * @param row The row index of the position.
    * @param col The column index of the position.
    * @return True if the token can fall into the position, false
    * otherwise.
    */
  bool Board::checkTokenFall(int row, int col) {
      return (board[row][col] != EMPTY && board[row + 1][col] == EMPTY);
  };

  /**
    * @brief Updates the previous board state by copying the current board
    * state.
    *
    * This function iterates over each element of the board and copies its
    * value to the corresponding element in the prevBoard array.
    *
    * @note The dimensions of the board and prevBoard arrays must be the
    * same.
    */
  void Board::updatePrevBoard() {
      for (int i = 0; i < m_row; i++) {
          for (int j = 0; j < m_col; j++) {
              prevBoard[i][j] = board[i][j];
          }
      }
  };

  /**
    * Copies a combo of elements from the board to the given combos array.
    * The combo can be a row, a column, or a diagonal.
    *
    * @param startRow The starting row index of the combo.
    * @param startCol The starting column index of the combo.
    * @param endRow The ending row index of the combo.
    * @param endCol The ending column index of the combo.
    * @param combos The 2D array to store the copied combo elements.
    */
  void Board::copyCombo(int startRow, int startCol, int endRow, int endCol, 
                  int combos[BOARD_HEIGHT][BOARD_WIDTH])
  {
      if (startRow == endRow) {
          for (int i = startCol; i <= endCol; i++) {
              combos[startRow][i] = board[startRow][i];
          }
      } else if (startCol == endCol) {
          for (int i = startRow; i <= endRow; i++) {
              combos[i][startCol] = board[i][startCol];
          }
      } else {
          // Diagonal combo
          int xd = -1;
          int yd = -1;
          if (startRow < endRow) {
              xd = 1;
          }
          if (startCol < endCol) {
              yd = 1;
          }

          int i = startRow;
          int j = startCol;
          while (i != endRow && j != endCol) {
              combos[i][j] = board[i][j];
              i += xd;
              j += yd;
          }
          combos[endRow][endCol] = board[endRow][endCol];
      }
  };

  /**
    * Checks for horizontal combos on the game board.
    *
    * @param points An array to store the points of each player.
    * @param combos A 2D array to store the combo positions on the game
    * board.
    * @return True if a combo exists, false otherwise.
    */
  bool Board::checkHorizontal(int points[2], 
                        int combos[BOARD_HEIGHT][BOARD_WIDTH])
  {
      bool comboExists = false;
      for (int i = 0; i < m_row; i++) {
          int count = 1;
          for (int j = 0; j < m_col; j++) {
              if (j != m_col - 1 && board[i][j] != EMPTY && board[i][j] == 
                  board[i][j + 1]) {
                  count++;
              } else {
                  if (count >= MIN_COMBO_LENGTH) {
                      copyCombo(i, j - count + 1, i, j, combos);
                      points[board[i][j] - 1] += count; // Update points
                      comboExists = true;
                  }
                  count = 1;
              }
          }
      }
      return comboExists;
  };

  /**
    * Checks for vertical combinations in the game board.
    *
    * @param points An array to store the points of each player.
    * @param combos A 2D array to store the combinations found.
    * @return True if a vertical combination exists, false otherwise.
    */
  bool Board::checkVertical(int points[2],
                      int combos[BOARD_HEIGHT][BOARD_WIDTH])
  {
      bool comboExists = false;
      for (int j = 0; j < m_col; j++) {
          int count = 1;
          for (int i = 0; i < m_row; i++) {
              if (i != m_row - 1 && board[i][j] != EMPTY && board[i][j] ==
                  board[i + 1][j]) {
                  count++;
              } else {
                  if (count >= MIN_COMBO_LENGTH) {
                      copyCombo(i - count + 1, j, i, j, combos);
                      points[board[i][j] - 1] += count; // Update points
                      comboExists = true;
                  }
                  count = 1;
              }
          }
      }
      return comboExists;
  };

  /**
    * Checks for diagonal combinations in the game board.
    *
    * @param points An array to store the points of each player.
    * @param combos A 2D array to store the combinations of the game board.
    * @return True if there is at least one diagonal combination, false
    * otherwise.
    */
  bool Board::checkDiagonal(int points[2],
                      int combos[BOARD_HEIGHT][BOARD_WIDTH])
  {
      bool comboExists = false;
      for (int i = 0; i < m_row; i++) {
          for (int j = 0; j < m_col; j++) {
              int count = 1;
              int k = 1;
              while (i + k < m_row && j + k < m_col) {
                  if (board[i][j] != EMPTY && board[i][j] == 
                      board[i + k][j + k]) {
                      count++;
                  } else {
                      break;
                  }
                  k++;
              }

              if (count >= MIN_COMBO_LENGTH) {
                  copyCombo(i, j, i + count - 1, j + count - 1, combos);
                  points[board[i][j] - 1] += count; // Update points
                  comboExists = true;
              }
          }
      }

      //Other diagonal
      for (int i = 0; i < m_row; i++) {
          for (int j = 0; j < m_col; j++) {
              int count = 1;
              int k = 1;
              while (i + k < m_row && j - k >= 0) {
                  if (board[i][j] != EMPTY && board[i][j] == 
                      board[i + k][j - k]) {
                      count++;
                  } else {
                      break;
                  }
                  k++;
              }

              if (count >= MIN_COMBO_LENGTH) {
                  copyCombo(i, j, i + count - 1, j - count + 1, combos);
                  points[board[i][j] - 1] += count; //Update points
                  comboExists = true;
              }
          }
      }

      return comboExists;
  };

  /**
    * @brief Checks for a combo of tokens in a given direction from a
    * specified position on the board.
    *
    * This function checks for a combo of tokens in a specified direction
    * from a given position on the board. It iterates in both the negative
    * and positive directions along the specified row and column
    * directions. If a combo of tokens is found, the function updates the
    * player points and copies the combo into the combos array.
    *
    * @param points An array containing the points of each player.
    * @param combos The 2D array to store the combos found on the board.
    * @param col The column index of the starting position.
    * @param row The row index of the starting position.
    * @param rowDir The direction of movement along the row (negative or
    * positive).
    * @param colDir The direction of movement along the column (negative or
    * positive).
    * @return True if a combo of tokens is found, false otherwise.
    */
  bool Board::checkComboFromToken(int points[2], 
                            int combos[BOARD_HEIGHT][BOARD_WIDTH],
                            int col, int row, int rowDir, int colDir)
  {
      int count = 1;
      int startRow = row;
      int startCol = col;
      int endRow = row;
      int endCol = col;
      bool comboExists = false;

      // Check in the negative direction
      for (int i = 1; i < MAX_COMBO_LENGTH; i++) {
          int newRow = row - i * rowDir;
          int newCol = col - i * colDir;
          if (newRow >= 0 && newRow < m_row && newCol >= 0 && newCol < 
              m_col && board[newRow][newCol] == board[row][col]) {
              count++;
              startRow = newRow;
              startCol = newCol;
          } else {
              break;
          }
      }

      // Check in the positive direction
      for (int i = 1; i < MAX_COMBO_LENGTH; i++) {
          int newRow = row + i * rowDir;
          int newCol = col + i * colDir;
          if (newRow >= 0 && newRow < m_row && newCol >= 0 && newCol < 
              m_col && board[newRow][newCol] == board[row][col]) {
              count++;
              endRow = newRow;
              endCol = newCol;
          } else {
              break;
          }
      }

      if (count >= MIN_COMBO_LENGTH) {
          copyCombo(startRow, startCol, endRow, endCol, combos);
          points[board[row][col] - 1] += count; // Update player points
      }

      return comboExists;
  };

  /**
    * @brief Checks for combinations of tokens on the game board.
    *
    * This function checks for combinations of tokens on the game board and
    * returns whether a combo exists or not. It takes in the following
    * parameters:
    * - points: An array of size 2 that stores the points for each player.
    * - combos: A 2D array of size BOARD_HEIGHT x BOARD_WIDTH that
    *   represents the game board.
    * - type: An optional parameter that specifies the type of combo to
    *   check. If not provided, all types of combos are checked.
    * - lastCol: An optional parameter that specifies the column of the
    *   last token placed. It is used to optimize the combo checking
    *   process.
    *
    * @param points An array of size 2 that stores the points for each
    * player.
    * @param combos A 2D array of size BOARD_HEIGHT x BOARD_WIDTH that
    * represents the game board.
    * @param type An optional parameter that specifies the type of combo to
    * check. If not provided, all types of combos are checked.
    * @param lastCol An optional parameter that specifies the column of the
    * last token placed. It is used to optimize the combo checking process.
    * @return true if a combo exists, false otherwise.
    */
  bool Board::checkForCombos(int points[2], 
                      int combos[BOARD_HEIGHT][BOARD_WIDTH], 
                      int type=-1, int lastCol=-1)
  {
      bool comboExists = false;
      
      if (type == FULL_CLEAR) {
          comboExists = comboExists || checkHorizontal(points, combos);
          comboExists = comboExists || checkVertical(points, combos);
          comboExists = comboExists || checkDiagonal(points, combos);
      } else {
          int lastTokenRow = getTopTokenRow(lastCol);
          if (lastTokenRow == -1) {
              // Invalid column
              return false;
          }

          comboExists = comboExists || checkComboFromToken(points, 
              combos, lastCol, lastTokenRow, 1, 0);
          comboExists = comboExists || checkComboFromToken(points,
              combos, lastCol, lastTokenRow, 0, 1);
          comboExists = comboExists || checkComboFromToken(points,
              combos, lastCol, lastTokenRow, 1, 1);
          comboExists = comboExists || checkComboFromToken(points,
              combos, lastCol, lastTokenRow, 1, -1);
      }

      return comboExists;
  };