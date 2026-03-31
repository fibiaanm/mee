var cubeAnimFrame = null;

function initCube() {
  var svg = document.getElementById('cube-svg');
  if (!svg) return;
  if (cubeAnimFrame) cancelAnimationFrame(cubeAnimFrame);

  // ── Shared edge topology (16 edges) ───────────────────────────
  // v[0..3] = bottom ring, v[4..7] = top ring
  var E = [
    [0,1],[1,2],[2,3],[3,0],   // 0-3:  bottom face
    [4,5],[5,6],[6,7],[7,4],   // 4-7:  top face
    [0,4],[1,5],[2,6],[3,7],   // 8-11: straight verticals
    [0,7],[1,4],[2,5],[3,6],   // 12-15: diagonal laterals
  ];

  var R2 = Math.SQRT2; // ≈ 1.414

  // ── Shape definitions ─────────────────────────────────────────

  // Standard unit cube — diagonals hidden (they share positions conceptually)
  var CUBE = {
    v: [
      [-1,-1,-1],[ 1,-1,-1],[ 1,-1, 1],[-1,-1, 1],
      [-1, 1,-1],[ 1, 1,-1],[ 1, 1, 1],[-1, 1, 1],
    ],
    o: [1,1,1,1, 1,1,1,1, 1,1,1,1, 0,0,0,0],
  };

  // Top 4 vertices collapse to apex — top ring + diagonals hidden
  var PYRAMID = {
    v: [
      [-1,-1,-1],[ 1,-1,-1],[ 1,-1, 1],[-1,-1, 1],
      [ 0, 1.5, 0],[ 0, 1.5, 0],[ 0, 1.5, 0],[ 0, 1.5, 0],
    ],
    o: [1,1,1,1, 0,0,0,0, 1,1,1,1, 0,0,0,0],
  };

  // Square antiprism — top ring rotated 45°, all 16 edges open
  var GEM = {
    v: [
      [-1,-1,-1],[ 1,-1,-1],[ 1,-1, 1],[-1,-1, 1],
      [ 0, 1,-R2],[ R2, 1, 0],[ 0, 1, R2],[-R2, 1, 0],
    ],
    o: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
  };

  // Crown — antiprism with smaller top ring (55% radius), still all 16 edges
  var CROWN = {
    v: [
      [-1,-1,-1],[ 1,-1,-1],[ 1,-1, 1],[-1,-1, 1],
      [ 0, 1,-R2*0.55],[ R2*0.55, 1, 0],[ 0, 1, R2*0.55],[-R2*0.55, 1, 0],
    ],
    o: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
  };

  // Obelisk — wide base tapering to a small top, like a needle or column
  var OBELISK = {
    v: [
      [-1,-1,-1],[ 1,-1,-1],[ 1,-1, 1],[-1,-1, 1],
      [-0.15, 1.5,-0.15],[ 0.15, 1.5,-0.15],[ 0.15, 1.5, 0.15],[-0.15, 1.5, 0.15],
    ],
    o: [1,1,1,1, 1,1,1,1, 1,1,1,1, 0,0,0,0],
  };

  // Slab — flat wide disc, like a tile or lens
  var SLAB = {
    v: [
      [-1.3,-0.35,-1.3],[ 1.3,-0.35,-1.3],[ 1.3,-0.35, 1.3],[-1.3,-0.35, 1.3],
      [-1.3, 0.35,-1.3],[ 1.3, 0.35,-1.3],[ 1.3, 0.35, 1.3],[-1.3, 0.35, 1.3],
    ],
    o: [1,1,1,1, 1,1,1,1, 1,1,1,1, 0,0,0,0],
  };

  var SHAPES = [CUBE, PYRAMID, GEM, CROWN, OBELISK, SLAB];

  // ── Projection ────────────────────────────────────────────────
  var CX    = 50;
  var CY    = 50;
  var SCALE = 28;
  var FOV   = 4.5;
  var TILT  = Math.PI * 0.18;
  var SPEED = 0.00052;

  var T_HOLD  = 2500;
  var T_MORPH = 1200;

  function ease(t) { return t < 0.5 ? 2*t*t : -1 + (4-2*t)*t; }

  function lerpV(a, b, t) {
    return [
      a[0] + (b[0]-a[0])*t,
      a[1] + (b[1]-a[1])*t,
      a[2] + (b[2]-a[2])*t,
    ];
  }

  function project(v, ay) {
    var x = v[0], y = v[1], z = v[2];
    var x1 =  x*Math.cos(ay) + z*Math.sin(ay);
    var z1 = -x*Math.sin(ay) + z*Math.cos(ay);
    var y1 = y*Math.cos(TILT) - z1*Math.sin(TILT);
    var z2 = y*Math.sin(TILT) + z1*Math.cos(TILT);
    var s  = FOV / (FOV + z2*0.6);
    return [CX + x1*SCALE*s, CY + y1*SCALE*s];
  }

  // Create SVG lines
  svg.innerHTML = '';
  var lines = E.map(function () {
    var l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('stroke',         'currentColor');
    l.setAttribute('stroke-width',   '1');
    l.setAttribute('stroke-linecap', 'round');
    svg.appendChild(l);
    return l;
  });

  // ── Animation state ───────────────────────────────────────────
  var angleY   = 0;
  var lastTs   = null;
  var elapsed  = 0;
  var shapeIdx = 0;
  var phase    = 'hold';

  function tick(ts) {
    if (lastTs === null) lastTs = ts;
    var dt = ts - lastTs;
    lastTs   = ts;
    elapsed += dt;
    angleY  += dt * SPEED;

    var from, to, t;

    if (phase === 'hold') {
      from = to = SHAPES[shapeIdx];
      t = 0;
      if (elapsed >= T_HOLD) { elapsed = 0; phase = 'morph'; }
    } else {
      var next = (shapeIdx + 1) % SHAPES.length;
      from = SHAPES[shapeIdx];
      to   = SHAPES[next];
      t    = ease(Math.min(elapsed / T_MORPH, 1));
      if (elapsed >= T_MORPH) { elapsed = 0; shapeIdx = next; phase = 'hold'; }
    }

    // Interpolate vertices and edge opacities
    var verts = from.v.map(function (v, i) { return lerpV(v, to.v[i], t); });
    var pts   = verts.map(function (v) { return project(v, angleY); });

    E.forEach(function (e, i) {
      var op = from.o[i] + (to.o[i] - from.o[i]) * t;
      lines[i].setAttribute('stroke-opacity', op.toFixed(3));
      lines[i].setAttribute('x1', pts[e[0]][0].toFixed(2));
      lines[i].setAttribute('y1', pts[e[0]][1].toFixed(2));
      lines[i].setAttribute('x2', pts[e[1]][0].toFixed(2));
      lines[i].setAttribute('y2', pts[e[1]][1].toFixed(2));
    });

    cubeAnimFrame = requestAnimationFrame(tick);
  }

  cubeAnimFrame = requestAnimationFrame(tick);
}
