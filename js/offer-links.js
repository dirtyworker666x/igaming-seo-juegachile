/**
 * JuegaChile — affiliate / tracker URLs.
 */
(function (global) {
  var SITE = 'https://www.juegachile.com';

  var OFFER = {
    register: 'https://casinityx.com/register',
    login: 'https://casinityx.com/login',
    casino: 'https://casinityx.com/',
    live: 'https://casinityx.com/',
    crash: 'https://casinityx.com/',
    home: 'https://casinityx.com/'
  };

  var TRACKING = {
    appendSubId: true,
    subParam: 'sub1',
    clickParam: 'click_id',
    gameParam: 'game',
    passUrlParams: ['sub1', 'sub2', 'sub3', 'click_id', 'utm_source', 'utm_campaign']
  };

  function affiliateRel(existing) {
    var parts = (existing || '').split(/\s+/).filter(Boolean);
    ['noopener', 'noreferrer', 'sponsored'].forEach(function (token) {
      if (parts.indexOf(token) === -1) parts.push(token);
    });
    return parts.join(' ');
  }

  function getIncomingParams() {
    var out = {};
    try {
      var sp = new URLSearchParams(global.location.search);
      TRACKING.passUrlParams.forEach(function (key) {
        var val = sp.get(key);
        if (val) out[key] = val;
      });
    } catch (e) {}
    return out;
  }

  function appendParams(url, extra) {
    try {
      var u = new URL(url, global.location.href);
      Object.keys(extra).forEach(function (k) {
        if (extra[k] != null && extra[k] !== '') u.searchParams.set(k, extra[k]);
      });
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  function applyOfferLinks() {
    var incoming = getIncomingParams();
    var subId = incoming[TRACKING.subParam] || incoming[TRACKING.clickParam] || '';

    document.querySelectorAll('a[data-offer]').forEach(function (a) {
      var key = a.getAttribute('data-offer');
      var base = OFFER[key];
      if (!base) return;

      var params = {};
      if (TRACKING.appendSubId && subId) {
        params[TRACKING.subParam] = subId;
        params[TRACKING.clickParam] = subId;
      }
      Object.keys(incoming).forEach(function (k) {
        params[k] = incoming[k];
      });

      var game = a.getAttribute('data-game');
      if (game) params[TRACKING.gameParam] = game;

      a.href = appendParams(base, params);
      a.target = '_blank';
      a.rel = affiliateRel(a.getAttribute('rel'));
    });

    document.querySelectorAll('a[href="#afiliado"]').forEach(function (a) {
      a.href = appendParams(OFFER.register, incoming);
      a.target = '_blank';
      a.rel = affiliateRel(a.getAttribute('rel'));
    });
  }

  global.JUEGACHILE_SITE = SITE;
  global.CASINITYX_OFFER = OFFER;
  global.CASINITYX_TRACKING = TRACKING;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyOfferLinks);
  } else {
    applyOfferLinks();
  }
})(window);
