/* eslint-disable no-undef */
window.onload = function() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const grid = [];

  CELL_SIZE = parseInt((CANVAS_SIZE / NUM_ROWS) - (PADDING) + 1);
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  const logger = document.getElementById("logger");

  const buildGrid = function() {
    for (let i = 0; i < NUM_ROWS; i ++) {
      const size = CELL_SIZE;
      const padding = PADDING;

      grid[i] = [];

      for (let j = 0; j < NUM_COLS; j ++) {
        const _x = j * (size + padding);
        const _y = i * (size + padding);
        const rndm = parseInt(Math.random() * 2);
        
        if (rndm === 1) {
          const cell = {
            row: i,
            col: j,
            x: _x,
            y: _y,
            speed: 5,
            target: {
              x: _x,
              y: _y
            },
            width: size,
            height: size,
            id: `${i}-${j}`,
            color: "#"+((1<<24)*Math.random()|0).toString(16),
          };
          grid[i][j] = cell;
        } else {
          grid[i][j] = 0;
        }
      }
    }
  };

  const tweenCell = function(cell) {
    if (cell.x < cell.target.x) {
      cell.x += cell.speed;
    } else
    if (cell.x > cell.target.x) {
      cell.x -= cell.speed;
    } else
    if (cell.y < cell.target.y) {
      cell.y += cell.speed;
    } else
    if (cell.y > cell.target.y) {
      cell.y -= cell.speed;
    }

    if (Math.abs(cell.x - cell.target.x) < cell.speed) {
      cell.x = cell.target.x;
    }
    if (Math.abs(cell.y - cell.target.y) < cell.speed) {
      cell.y = cell.target.y;
    }
  };

  const drawGrid = function() {
    for (let i = 0; i < NUM_ROWS; i ++) {
      for (let j = 0; j < NUM_COLS; j ++) {
        // context.strokeStyle = "gray";
        // context.strokeRect(j * (CELL_SIZE + PADDING), i * (CELL_SIZE + PADDING), CELL_SIZE, CELL_SIZE);
        // context.closePath();

        if (grid[i][j]) {
          const cell = grid[i][j];
          context.beginPath();
          context.fillStyle = cell.color;
          tweenCell(cell);
          context.fillRect(cell.x, cell.y, cell.width, cell.height);
        }
      }
    }
  };

  const checkKey = function(e) {
    e = e || window.event;

    if (e.keyCode == "38") {
        move.up(grid);
        logger.innerHTML = "UP";
    }
    else if (e.keyCode == "40") {
        move.down(grid);
        logger.innerHTML = "DOWN";
    }
    else if (e.keyCode == "37") {
      move.left(grid);
      logger.innerHTML = "LEFT";
    }
    else if (e.keyCode == "39") {
      move.right(grid);
      logger.innerHTML = "RIGHT";
    }
  };

  const draw = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
  };

  const frame = function() {
    draw();
    requestAnimationFrame(frame);
  };
  buildGrid();

  document.onkeydown = checkKey;
  // document.onkeyup = checkKey;
  frame();
};