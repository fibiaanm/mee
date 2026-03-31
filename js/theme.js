function initTheme() {
  var html = document.documentElement;
  var btn  = document.getElementById('theme-btn');
  var saved = localStorage.getItem('theme');
  if (saved) html.dataset.theme = saved;

  if (btn) {
    btn.addEventListener('click', function () {
      var next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      html.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }
}
