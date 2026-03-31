function initNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}
