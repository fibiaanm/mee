function getLangFromQuery() {
  var params = new URLSearchParams(window.location.search);
  var lang = params.get('lang');
  return (lang === 'en' || lang === 'es') ? lang : null;
}

function setLangInQuery(lang) {
  var url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState(null, '', url.toString());
}

var currentLang = getLangFromQuery() || 'en';

var ARROW_SVG = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 10L10 1M10 1H4.5M10 1V6.5"/></svg>';

function getKey(obj, path) {
  return path.split('.').reduce(function (o, k) { return o && o[k]; }, obj);
}

function applyText(t) {
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var val = getKey(t, el.dataset.i18n);
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var val = getKey(t, el.dataset.i18nHtml);
    if (val != null) el.innerHTML = val.replace(/\n/g, '<br>');
  });
}

function renderMetrics(metrics) {
  var grid = document.getElementById('metrics-grid');
  if (!grid) return;
  grid.innerHTML = metrics.map(function (m) {
    return '<div class="metric-item reveal">'
      + '<div class="metric-value"><span>' + m.value + '</span></div>'
      + '<div class="metric-desc">' + m.desc.replace('\n', '<br>') + '</div>'
      + '</div>';
  }).join('');
  grid.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
}

function renderSkills(skills) {
  var grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = Object.values(skills).map(function (group) {
    return '<div class="skill-group reveal">'
      + '<h4>' + group.title + '</h4>'
      + '<ul>' + group.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') + '</ul>'
      + '</div>';
  }).join('');
  grid.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
}

function renderExperience(experience) {
  var timeline = document.getElementById('experience-timeline');
  if (!timeline) return;
  timeline.innerHTML = experience.map(function (job) {
    return '<div class="timeline-item reveal">'
      + '<div class="t-date">' + job.date.replace(' — ', '<br>') + '</div>'
      + '<div class="t-body">'
      + '<h3>' + job.role + '</h3>'
      + '<p class="company">' + job.company + '</p>'
      + '<ul>' + job.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') + '</ul>'
      + '</div></div>';
  }).join('');
  timeline.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
}

function renderProjects(projects) {
  var grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = projects.map(function (p) {
    var preview = p.type === 'cube'
      ? '<div class="cube-scene"><div class="cube">'
          + '<div class="cube-face front"></div><div class="cube-face back"></div>'
          + '<div class="cube-face left"></div><div class="cube-face right"></div>'
          + '<div class="cube-face top"></div><div class="cube-face bottom"></div>'
          + '</div></div>'
      : '<div class="snake-grid" id="snake-grid"></div>';

    var tags = p.tags.map(function (tag) { return '<span class="tag">' + tag + '</span>'; }).join('');

    return '<a class="project-card reveal" href="' + p.href + '" target="_blank" rel="noopener">'
      + '<div class="project-preview">' + preview + '</div>'
      + '<div class="project-body">'
      + '<h3>' + p.title + '</h3>'
      + '<p>' + p.desc + '</p>'
      + '<div class="project-tags">' + tags + '</div>'
      + '<div class="project-link">' + ARROW_SVG + p.url + '</div>'
      + '</div></a>';
  }).join('');
  grid.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
}

function setLang(lang) {
  currentLang = lang;
  setLangInQuery(lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
    btn.textContent = lang === 'en' ? 'ES' : 'EN';
  });

  var t = translations[lang];
  applyText(t);
  renderMetrics(t.metrics);
  renderSkills(t.skills);
  renderExperience(t.experience);
  renderProjects(t.projects);

  // re-init snake after DOM update
  setTimeout(initSnake, 0);
}

function initI18n() {
  document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(currentLang === 'en' ? 'es' : 'en');
    });
  });
  setLang(currentLang);
}
