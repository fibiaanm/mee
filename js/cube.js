var cubeAnimFrame = null;

function initCube() {
  var svg = document.getElementById('cube-svg');
  if (!svg) return;
  if (cubeAnimFrame) cancelAnimationFrame(cubeAnimFrame);

  // ── Face vertex ordering ──────────────────────────────────────
  // Each face: 4 vertices [x,y,z] ordered so that vertex i in 3D
  // maps to vertex i in the unfolded net for smooth interpolation.
  var FACES_3D = [
    // Front (z=+1)
    [[-1,-1, 1],[ 1,-1, 1],[ 1, 1, 1],[-1, 1, 1]],
    // Top (y=-1): back-L, back-R, front-R, front-L
    [[-1,-1,-1],[ 1,-1,-1],[ 1,-1, 1],[-1,-1, 1]],
    // Bottom (y=+1): front-L, front-R, back-R, back-L
    [[-1, 1, 1],[ 1, 1, 1],[ 1, 1,-1],[-1, 1,-1]],
    // Left (x=-1): front-top, back-top, back-bot, front-bot
    [[-1,-1, 1],[-1,-1,-1],[-1, 1,-1],[-1, 1, 1]],
    // Right (x=+1): front-top, front-bot, back-bot, back-top
    [[ 1,-1, 1],[ 1, 1, 1],[ 1, 1,-1],[ 1,-1,-1]],
    // Back (z=-1): right-top, right-bot, left-bot, left-top
    [[ 1,-1,-1],[ 1, 1,-1],[-1, 1,-1],[-1,-1,-1]],
  ];

  // ── Unfolded cross net (S=1 unit = half-face-size) ────────────
  //        [Top]
  // [Left][Front][Right][Back]
  //       [Bottom]
  var FACES_2D = [
    // Front — center (0, 0)
    [[-1,-1],[ 1,-1],[ 1, 1],[-1, 1]],
    // Top — center (0,-2): hinge at y=-1 (shared with Front top edge)
    [[-1,-3],[ 1,-3],[ 1,-1],[-1,-1]],
    // Bottom — center (0,+2): hinge at y=+1
    [[-1, 1],[ 1, 1],[ 1, 3],[-1, 3]],
    // Left — center (-2, 0): hinge at x=-1
    [[-1,-1],[-3,-1],[-3, 1],[-1, 1]],
    // Right — center (+2, 0): hinge at x=+1
    [[ 1,-1],[ 1, 1],[ 3, 1],[ 3,-1]],
    // Back — center (+4, 0): hinge at x=+3 (shared with Right)
    [[ 3,-1],[ 3, 1],[ 5, 1],[ 5,-1]],
  ];

  var S3 = 26;   // 3D projection scale
  var S2 = 11;   // net scale (net spans 8×6 units → 88×66 px)
  var CX = 50, CY = 53;

  var TILT  = Math.PI * 0.18;
  var FOV   = 4.5;
  var SPEED = 0.00052; // rad/ms

  // ── Phase durations (ms) ──────────────────────────────────────
  var DUR = { spin: 4200, opening: 1400, flat: 900, closing: 1400 };

  function ease(t) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function project(v, ay) {
    var x = v[0], y = v[1], z = v[2];
    var x1 =  x * Math.cos(ay) + z * Math.sin(ay);
    var z1 = -x * Math.sin(ay) + z * Math.cos(ay);
    var y1 = y * Math.cos(TILT) - z1 * Math.sin(TILT);
    var z2 = y * Math.sin(TILT) + z1 * Math.cos(TILT);
    var s  = FOV / (FOV + z2 * 0.6);
    return [x1 * S3 * s, y1 * S3 * s];
  }

  // Create one <polygon> per face
  svg.innerHTML = '';
  var polys = FACES_3D.map(function () {
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    p.setAttribute('fill',           'none');
    p.setAttribute('stroke',         'currentColor');
    p.setAttribute('stroke-width',   '1');
    p.setAttribute('stroke-linejoin','round');
    svg.appendChild(p);
    return p;
  });

  // ── Animation state ───────────────────────────────────────────
  var phase   = 'spin';
  var elapsed = 0;
  var angleY  = 0;
  var frozenY = 0;
  var openT   = 0;
  var lastTs  = null;

  function tick(ts) {
    if (lastTs === null) lastTs = ts;
    var dt  = ts - lastTs;
    lastTs  = ts;
    elapsed += dt;

    switch (phase) {
      case 'spin':
        angleY += dt * SPEED;
        openT   = 0;
        if (elapsed >= DUR.spin) { elapsed = 0; phase = 'opening'; frozenY = angleY; }
        break;

      case 'opening':
        openT = ease(Math.min(elapsed / DUR.opening, 1));
        if (elapsed >= DUR.opening) { elapsed = 0; phase = 'flat'; openT = 1; }
        break;

      case 'flat':
        openT = 1;
        if (elapsed >= DUR.flat) { elapsed = 0; phase = 'closing'; }
        break;

      case 'closing':
        openT = 1 - ease(Math.min(elapsed / DUR.closing, 1));
        if (elapsed >= DUR.closing) { elapsed = 0; phase = 'spin'; openT = 0; }
        break;
    }

    var ay = (phase === 'spin') ? angleY : frozenY;

    FACES_3D.forEach(function (face3d, i) {
      var face2d = FACES_2D[i];
      var pts = face3d.map(function (v, j) {
        var p3 = project(v, ay);
        var px = lerp(p3[0], face2d[j][0] * S2, openT);
        var py = lerp(p3[1], face2d[j][1] * S2, openT);
        return (CX + px).toFixed(1) + ',' + (CY + py).toFixed(1);
      });
      polys[i].setAttribute('points', pts.join(' '));
    });

    cubeAnimFrame = requestAnimationFrame(tick);
  }

  cubeAnimFrame = requestAnimationFrame(tick);
}
