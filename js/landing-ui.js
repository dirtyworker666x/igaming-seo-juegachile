(function () {
  var searchInput = document.getElementById('game-search');
  var searchEmpty = document.getElementById('search-empty');
  var tiles = [].slice.call(document.querySelectorAll('.g-tile-item'));
  var activeProv = '';

  function applyFilters() {
    var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visible = 0;
    tiles.forEach(function (li) {
      var name = (li.querySelector('.g-name') || {}).textContent || '';
      var prov = (li.querySelector('.g-prov') || {}).textContent || '';
      var matchSearch = !q || (name + ' ' + prov).toLowerCase().indexOf(q) !== -1;
      var matchProv = !activeProv || prov === activeProv;
      var match = matchSearch && matchProv;
      li.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (searchEmpty) {
      var showEmpty = (q || activeProv) && visible === 0;
      searchEmpty.hidden = !showEmpty;
      if (showEmpty) searchEmpty.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  var provBtn = document.getElementById('prov-toggle');
  var provPanel = document.getElementById('prov-panel');

  function closeProvPanel() {
    if (provPanel) provPanel.hidden = true;
    if (provBtn) provBtn.setAttribute('aria-expanded', 'false');
  }

  function openProvPanel() {
    if (provPanel) provPanel.hidden = false;
    if (provBtn) provBtn.setAttribute('aria-expanded', 'true');
  }

  if (provBtn && provPanel) {
    provBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (provPanel.hidden) openProvPanel();
      else closeProvPanel();
    });

    provPanel.querySelectorAll('.prov-filter').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        activeProv = btn.getAttribute('data-prov') || '';
        provPanel.querySelectorAll('.prov-filter').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        applyFilters();
        closeProvPanel();
        var juegos = document.getElementById('juegos');
        if (juegos) juegos.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.addEventListener('click', function (e) {
      if (provPanel.hidden) return;
      if (provPanel.contains(e.target) || provBtn.contains(e.target)) return;
      closeProvPanel();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeProvPanel();
    });
  }

  var randomBtn = document.getElementById('random-game');
  if (randomBtn) {
    randomBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var links = [].slice.call(document.querySelectorAll('.g-tile[data-game]'));
      if (!links.length) return;
      var pick = links[Math.floor(Math.random() * links.length)];
      window.open(pick.href, '_blank', 'noopener,noreferrer');
    });
  }

  var root = document.querySelector('.promo-carousel');
  if (!root) return;
  var track = root.querySelector('.promo-track');
  if (!track) return;
  var slides = [].slice.call(track.querySelectorAll('.promo-slide'));
  var dots = [].slice.call(root.querySelectorAll('.carousel-dot'));
  var i = 0;
  var timer;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, j) { s.classList.toggle('is-active', j === i); });
    dots.forEach(function (d, j) {
      d.classList.toggle('is-active', j === i);
      d.setAttribute('aria-selected', j === i ? 'true' : 'false');
    });
  }

  function next() { show(i + 1); }
  function prev() { show(i - 1); }
  function start() { timer = setInterval(next, 9000); }
  function stop() { clearInterval(timer); }

  var prevBtn = root.querySelector('.carousel-prev');
  var nextBtn = root.querySelector('.carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', function () { stop(); prev(); start(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stop(); next(); start(); });
  dots.forEach(function (d, j) {
    d.addEventListener('click', function () { stop(); show(j); start(); });
  });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  show(0);
  start();
})();
