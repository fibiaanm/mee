var snakeInterval = null;

function initSnake() {
  var container = document.getElementById('snake-grid');
  if (!container) return;

  // clear previous interval if re-initialized on lang switch
  if (snakeInterval) clearInterval(snakeInterval);

  var COLS = 12, ROWS = 8, TOTAL = COLS * ROWS;
  var PATH = [50, 49, 48, 47, 46, 34, 22, 23, 24, 25, 26, 27];

  container.innerHTML = '';
  for (var i = 0; i < TOTAL; i++) {
    var cell = document.createElement('div');
    cell.className = 'sc';
    container.appendChild(cell);
  }

  var cells = Array.from(container.querySelectorAll('.sc'));
  var offset = 0;

  function render() {
    cells.forEach(function (c) { c.className = 'sc'; });
    PATH.forEach(function (idx) {
      var row = Math.floor(idx / COLS);
      var col = (idx % COLS + offset) % COLS;
      var ni  = row * COLS + col;
      if (ni >= 0 && ni < TOTAL) cells[ni].classList.add('on');
    });
  }

  render();
  snakeInterval = setInterval(function () {
    offset = (offset + 1) % COLS;
    render();
  }, 220);
}
