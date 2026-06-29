(function () {
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';

  document.querySelectorAll('.side-nav a.side-link[href]').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('#')[0];
    if (!href || href.indexOf('#') === 0) return;
    var target = href.split('/').pop().toLowerCase();
    if (target === page) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });
})();
