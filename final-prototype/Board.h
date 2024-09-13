#ifndef BOARD_H
#define BOARD_H

#include "constants.h"

class Board {
    public:
        // Public variables
        int board[BOARD_HEIGHT][BOARD_WIDTH] = {EMPTY};    // The game board
        int prevBoard[BOARD_HEIGHT][BOARD_WIDTH] = {EMPTY}; // Previous board state


        // Public functions
        Board();
        void rotateBoard(int angle);
        bool placeToken(int col, int player);
        bool tokenFall();
        bool clearCombos(int totalPoints[2], int lastCol=-1, int type=-1);
        bool isBoardFull();
        bool isBoardEmpty();
        bool clearBottomRow();

    private:
        // Private variables
        int m_row;
        int m_col;

        // Private helper functions
        int getTopTokenRow(int col);
        bool checkTokenFall(int row, int col);
        void updatePrevBoard();
        void copyCombo(int startRow, int startCol, int endRow, int endCol,
            int combos[BOARD_HEIGHT][BOARD_WIDTH]);
        bool checkHorizontal(int points[2],
            int combos[BOARD_HEIGHT][BOARD_WIDTH]);
        bool checkVertical(int points[2],
            int combos[BOARD_HEIGHT][BOARD_WIDTH]);
        bool checkDiagonal(int points[2],
            int combos[BOARD_HEIGHT][BOARD_WIDTH]);
        bool checkComboFromToken(int points[2],
            int combos[BOARD_HEIGHT][BOARD_WIDTH], int row, int col,
            int rowDir, int colDir);
        bool checkForCombos(int points[2],
            int combos[BOARD_HEIGHT][BOARD_WIDTH], int type=-1,
            int lastCol=-1);
       
};

#endif // BOARD_H
