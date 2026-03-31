var cubeAnimFrame = null;

function initCube() {
  var svg = document.getElementById('cube-svg');
  if (!svg) return;
  if (cubeAnimFrame) cancelAnimationFrame(cubeAnimFrame);

  var V = [
    [-1,-1,-1],[ 1,-1,-1],[ 1, 1,-1],[-1, 1,-1],
    [-1,-1, 1],[ 1,-1, 1],[ 1, 1, 1],[-1, 1, 1],
  ];

  var E = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7],
  ];

  var CX    = 50;
  var CY    = 52;
  var SCALE = 30;
  var FOV   = 4.5;
  var TILT  = Math.PI * 0.18;
  var SPEED = 0.00055;

  svg.innerHTML = '';
  var lines = E.map(function () {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke',        'currentColor');
    line.setAttribute('stroke-width',  '1');
    line.setAttribute('stroke-linecap','round');
    svg.appendChild(line);
    return line;
  });

  var angleY = 0;
  var lastTs = null;

  function project(v, ay) {
    var x = v[0], y = v[1], z = v[2];
    var x1 =  x * Math.cos(ay) + z * Math.sin(ay);
    var z1 = -x * Math.sin(ay) + z * Math.cos(ay);
    var y1 = y * Math.cos(TILT) - z1 * Math.sin(TILT);
    var z2 = y * Math.sin(TILT) + z1 * Math.cos(TILT);
    var s  = FOV / (FOV + z2 * 0.6);
    return [CX + x1 * SCALE * s, CY + y1 * SCALE * s];
  }

  function tick(ts) {
    if (lastTs === null) lastTs = ts;
    angleY += (ts - lastTs) * SPEED;
    lastTs = ts;

    var pts = V.map(function (v) { return project(v, angleY); });

    E.forEach(function (e, i) {
      lines[i].setAttribute('x1', pts[e[0]][0].toFixed(2));
      lines[i].setAttribute('y1', pts[e[0]][1].toFixed(2));
      lines[i].setAttribute('x2', pts[e[1]][0].toFixed(2));
      lines[i].setAttribute('y2', pts[e[1]][1].toFixed(2));
    });

    cubeAnimFrame = requestAnimationFrame(tick);
  }

  cubeAnimFrame = requestAnimationFrame(tick);
}
