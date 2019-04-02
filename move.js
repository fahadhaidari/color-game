/* eslint-disable no-unused-vars */
const move = {
  up: function(grid) {
    for (let i = 0; i < NUM_ROWS; i ++) {
      for (let j = 0; j < NUM_COLS; j ++)  {
        const cell = grid[i][j];

        if (grid[i][j]) {
          if (i > 0) {
            if (grid[i - 1][j] === 0) {
              cell.target.y -= CELL_SIZE + PADDING;
              cell.row --;
              grid[i][j] = 0;
              grid[i - 1][j] = cell;
            }
          }
        }
      }
    }
  },
  down: function(grid) {
    for (let i = NUM_ROWS - 1; i >= 0; i --) {
      for (let j = 0; j < NUM_COLS; j ++) {
        if (grid[i][j]) {
          const cell = grid[i][j];
          if (i < grid.length - 1) {
            if (grid[i + 1][j] === 0) {
              cell.target.y += CELL_SIZE + PADDING;
              cell.row ++;
              grid[i][j] = 0;
              grid[i + 1][j] = cell;
            }
          }
        }
      }
    }
  },
  left: function(grid) {
    for (let i = 0; i < NUM_ROWS; i ++) {
      for (let j = 0; j < NUM_COLS; j ++) {
        if (grid[i][j]) {
          const cell = grid[i][j];
          if (j > 0) {
            if (grid[i][j - 1] === 0) {
              cell.target.x -= CELL_SIZE + PADDING;
              cell.col --;
              grid[i][j] = 0;
              grid[i][j - 1] = cell;
            }
          }

        }
      }
    }
  },
  right: function(grid) {
    for (let i = 0; i < NUM_ROWS; i ++) {
      for (let j = NUM_COLS - 1; j >= 0; j --) {
        if (grid[i][j]) {
          const cell = grid[i][j];
          if (j < grid[0].length - 1) {
            if (!grid[i][j + 1]) {
              cell.target.x += CELL_SIZE + PADDING;
              cell.col ++;
              grid[i][j] = 0;
              grid[i][j + 1] = cell;
            }
          }
        }
      }
    }
  }
};