var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function () { entry.target.classList.add('visible'); }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

function observeAll() {
  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
}

function initReveal() {
  observeAll();
}
