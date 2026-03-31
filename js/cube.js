var cubeAnimFrame = null;

function initCube() {
  var svg = document.getElementById('cube-svg');
  if (!svg) return;
  if (cubeAnimFrame) cancelAnimationFrame(cubeAnimFrame);

  // 8 vertices of a unit cube centered at origin
  var V = [
    [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
    [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1],
  ];

  // 12 edges: pairs of vertex indices
  var E = [
    [0,1],[1,2],[2,3],[3,0],   // back face
    [4,5],[5,6],[6,7],[7,4],   // front face
    [0,4],[1,5],[2,6],[3,7],   // connecting edges
  ];

  var CX    = 50;              // center x in viewBox
  var CY    = 52;              // center y (slightly below center looks better)
  var SCALE = 30;              // cube size
  var FOV   = 4.5;             // perspective strength (higher = flatter)
  var TILT  = Math.PI * 0.18; // fixed X-axis tilt
  var SPEED = 0.00055;        // radians per millisecond

  svg.innerHTML = '';

  // Pre-create SVG line elements
  var lines = E.map(function () {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
    return line;
  });

  function project(v, angleY) {
    var x = v[0], y = v[1], z = v[2];

    // Rotate around Y axis
    var x1 =  x * Math.cos(angleY) + z * Math.sin(angleY);
    var z1 = -x * Math.sin(angleY) + z * Math.cos(angleY);

    // Rotate around X axis (fixed tilt)
    var y1 = y * Math.cos(TILT) - z1 * Math.sin(TILT);
    var z2 = y * Math.sin(TILT) + z1 * Math.cos(TILT);

    // Perspective divide
    var scale = FOV / (FOV + z2 * 0.6);

    return [
      CX + x1 * SCALE * scale,
      CY + y1 * SCALE * scale,
    ];
  }

  var angleY = 0;
  var lastTs = null;

  function tick(ts) {
    if (lastTs === null) lastTs = ts;
    angleY += (ts - lastTs) * SPEED;
    lastTs = ts;

    var projected = V.map(function (v) { return project(v, angleY); });

    E.forEach(function (edge, i) {
      var p1 = projected[edge[0]];
      var p2 = projected[edge[1]];
      lines[i].setAttribute('x1', p1[0].toFixed(2));
      lines[i].setAttribute('y1', p1[1].toFixed(2));
      lines[i].setAttribute('x2', p2[0].toFixed(2));
      lines[i].setAttribute('y2', p2[1].toFixed(2));
    });

    cubeAnimFrame = requestAnimationFrame(tick);
  }

  cubeAnimFrame = requestAnimationFrame(tick);
}
