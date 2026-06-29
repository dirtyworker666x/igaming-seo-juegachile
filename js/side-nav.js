(function () {
  var links = [].slice.call(document.querySelectorAll('.side-nav a[data-nav]'));
  if (!links.length) return;

  var sections = links.map(function (a) {
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) !== '#') return null;
    return document.getElementById(href.slice(1));
  }).filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var on = href.charAt(0) === '#' && a.getAttribute('data-nav') === id;
      a.classList.toggle('active', on);
    });
  }

  function scrollToSection(el, id) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
    history.replaceState(null, '', '#' + id);
  }

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      var id = href.slice(1);
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      scrollToSection(el, id);
    });
  });

  document.querySelectorAll('.mobile-nav-link[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      var id = href.slice(1);
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      scrollToSection(el, id);
    });
  });

  function onScroll() {
    if (!sections.length) return;
    var offset = 88;
    var y = window.scrollY + offset;
    var nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
    var current = sections[0];

    if (nearBottom) {
      current = sections[sections.length - 1];
    } else {
      sections.forEach(function (sec) {
        if (sec.offsetTop <= y) current = sec;
      });
    }

    if (current) setActive(current.id);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  if (location.hash) {
    var t = document.getElementById(location.hash.slice(1));
    if (t) {
      setTimeout(function () {
        scrollToSection(t, t.id);
      }, 80);
    }
  }
})();
