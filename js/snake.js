var snakeInterval = null;

function initSnake() {
  var container = document.getElementById('snake-grid');
  if (!container) return;

  if (snakeInterval) clearInterval(snakeInterval);

  var COLS   = 12;
  var ROWS   = 8;
  var TOTAL  = COLS * ROWS;
  var LENGTH = 8;

  container.innerHTML = '';
  for (var i = 0; i < TOTAL; i++) {
    var cell = document.createElement('div');
    cell.className = 'sc';
    container.appendChild(cell);
  }

  var cells = Array.from(container.querySelectorAll('.sc'));

  // Build initial snake horizontally in the middle row, head on the right
  var snake = [];
  for (var j = 0; j < LENGTH; j++) {
    snake.push({ row: Math.floor(ROWS / 2), col: 2 + j });
  }
  snake.reverse(); // snake[0] = head

  var dir = { dr: 0, dc: 1 }; // start moving right

  var ALL_DIRS = [
    { dr: -1, dc:  0 }, // up
    { dr:  1, dc:  0 }, // down
    { dr:  0, dc: -1 }, // left
    { dr:  0, dc:  1 }, // right
  ];

  function pickNextDir() {
    // Exclude the reverse of the current direction
    var options = ALL_DIRS.filter(function (d) {
      return !(d.dr === -dir.dr && d.dc === -dir.dc);
    });
    return options[Math.floor(Math.random() * options.length)];
  }

  function render() {
    cells.forEach(function (c) { c.className = 'sc'; });
    snake.forEach(function (seg, i) {
      var idx = seg.row * COLS + seg.col;
      if (idx >= 0 && idx < TOTAL) {
        cells[idx].classList.add(i === 0 ? 'head' : 'on');
      }
    });
  }

  function tick() {
    dir = pickNextDir();

    var head = snake[0];
    snake.unshift({
      row: (head.row + dir.dr + ROWS) % ROWS,
      col: (head.col + dir.dc + COLS) % COLS,
    });
    snake.pop();

    render();
  }

  render();
  snakeInterval = setInterval(tick, 220);
}
