var snakeInterval = null;

function initSnake() {
  var container = document.getElementById('snake-grid');
  if (!container) return;

  if (snakeInterval) clearInterval(snakeInterval);

  var COLS   = 12;
  var ROWS   = 8;
  var TOTAL  = COLS * ROWS;
  var LENGTH = 4;

  container.innerHTML = '';
  for (var i = 0; i < TOTAL; i++) {
    var cell = document.createElement('div');
    cell.className = 'sc';
    container.appendChild(cell);
  }

  var cells = Array.from(container.querySelectorAll('.sc'));

  // snake[0] = head
  var snake = [];
  for (var j = 0; j < LENGTH; j++) {
    snake.push({ row: Math.floor(ROWS / 2), col: 2 + j });
  }
  snake.reverse();

  var dir = { dr: 0, dc: 1 };

  var ALL_DIRS = [
    { dr: -1, dc:  0 },
    { dr:  1, dc:  0 },
    { dr:  0, dc: -1 },
    { dr:  0, dc:  1 },
  ];

  function placeApple() {
    var occupied = new Set(snake.map(function (s) { return s.row * COLS + s.col; }));
    var free = [];
    for (var i = 0; i < TOTAL; i++) {
      if (!occupied.has(i)) free.push(i);
    }
    var idx = free[Math.floor(Math.random() * free.length)];
    return { row: Math.floor(idx / COLS), col: idx % COLS };
  }

  var apple = placeApple();

  function dist(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }

  function pickDir() {
    var head = snake[0];

    // Build set of body cells to avoid (exclude tail — it will vacate next tick)
    var body = new Set(
      snake.slice(0, snake.length - 1).map(function (s) { return s.row * COLS + s.col; })
    );

    // All directions except the reverse
    var options = ALL_DIRS.filter(function (d) {
      return !(d.dr === -dir.dr && d.dc === -dir.dc);
    });

    // Split into safe (in bounds + no body collision) and unsafe
    var safe = options.filter(function (d) {
      var nr = head.row + d.dr;
      var nc = head.col + d.dc;
      return nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !body.has(nr * COLS + nc);
    });

    // Prefer safe moves; fall back to any option if fully boxed in
    var candidates = safe.length > 0 ? safe : options;

    // Among candidates, pick the one whose next cell is closest to the apple
    var scored = candidates.map(function (d) {
      return {
        d:    d,
        dist: dist({ row: head.row + d.dr, col: head.col + d.dc }, apple),
      };
    });

    scored.sort(function (a, b) { return a.dist - b.dist; });

    var best = scored[0].dist;
    var tied = scored.filter(function (s) { return s.dist === best; });
    return tied[Math.floor(Math.random() * tied.length)].d;
  }

  function render() {
    cells.forEach(function (c) { c.className = 'sc'; });

    var appleIdx = apple.row * COLS + apple.col;
    cells[appleIdx].classList.add('apple');

    snake.forEach(function (seg, i) {
      var idx = seg.row * COLS + seg.col;
      if (idx >= 0 && idx < TOTAL) {
        cells[idx].classList.add(i === 0 ? 'head' : 'on');
      }
    });
  }

  function tick() {
    dir = pickDir();

    var head = snake[0];
    var next = {
      row: head.row + dir.dr,
      col: head.col + dir.dc,
    };

    snake.unshift(next);
    snake.pop();

    if (next.row === apple.row && next.col === apple.col) {
      apple = placeApple();
    }

    render();
  }

  render();
  snakeInterval = setInterval(tick, 220);
}
