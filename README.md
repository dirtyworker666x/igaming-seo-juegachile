# JuegaChile · iGaming SEO landing (Chile, es-CL)

Static affiliate SEO site for the Chile market. Multi-page bundle: JSON-LD, hreflang, affiliate tracking, conversion UI — **no backend**.

Informational / affiliate guide (not a casino operator). Brand: Casinityx.

---

## Stack

| Layer | Tech |
|-------|------|
| Markup | Semantic HTML5, `lang="es-CL"` |
| Styles | CSS (`casinityx.css` + layout), mobile-first |
| Scripts | Vanilla JS (IIFE, no bundler) |
| SEO | canonical, hreflang, OG/Twitter, `robots.txt`, `sitemap.xml` |
| Structured data | JSON-LD `@graph`: WebSite, WebPage, Organization, Person, ItemList, VideoGame |
| Deploy | Static + Apache `.htaccess` (HTTPS, www, gzip, cache headers) |

## Implementation

- **Affiliate** — `data-offer`, UTM / `sub1` / `click_id` passthrough ([`js/offer-links.js`](js/offer-links.js))
- **Game catalog** — search & provider filter ([`js/landing-ui.js`](js/landing-ui.js))
- **Bonus calculator** — CLP slider, min deposit ([`js/bonus-calc.js`](js/bonus-calc.js))
- **Navigation** — app-shell sidebar, scroll-spy, sticky CTA ([`js/side-nav.js`](js/side-nav.js))
- **Assets** — WebP/JPG, responsive hero preload

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home: games, guide, calculator, JSON-LD |
| `bono.html` | Welcome bonus |
| `registro.html` | Registration flow |
| `opiniones.html` | Reviews |
| `preguntas-frecuentes.html` | FAQ |
| `404.html` | Custom 404 |

## Live demo

**https://dirtyworker666x.github.io/igaming-seo-juegachile/**

## Preview locally

```bash
git clone https://github.com/dirtyworker666x/igaming-seo-juegachile.git
cd igaming-seo-juegachile
python3 -m http.server 8080
# http://127.0.0.1:8080
```

## JS modules

| File | Role |
|------|------|
| `js/offer-links.js` | Affiliate URLs, `rel=sponsored` |
| `js/landing-ui.js` | Catalog search & provider filters |
| `js/bonus-calc.js` | Deposit → bonus (CLP) |
| `js/side-nav.js` | Active section on scroll |
| `js/sidebar-subpage.js` | Subpage sidebar |

## License

MIT — [LICENSE](LICENSE). Third-party trademarks belong to their owners.

---

**Author’s production app:** [tgplay.fun](https://tgplay.fun) · [source](https://github.com/dirtyworker666x/tgplay-telegram-music-miniapp)
