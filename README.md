# VIP Transport — Cinematic Petroleum Logistics Website
## Latest update (content + theme)

- Copy now comes from *VIP Transports — New Website SEO Content* (Home, About Us, Services, Contact, FAQ), all editable in `src/data/company.ts`.
- Per-page SEO titles and meta descriptions are set by `useSeo` from `SEO` in `company.ts`.
- Routes: `/`, `/about-us`, `/services`, `/contact`. Old `/about` and `/capabilities` redirect.
- Theme: black + neon green (`#39FF14`). Colour tokens live in `tailwind.config.js` and `src/index.css`.
- The petrol-nozzle animation (`FuelNozzle`, `FuelSection`) was removed.
- Home hero: 10 s intro film (`src/assets/hero/hero-intro-*.mp4`, end frame `hero-intro-end.webp`). Plays once per session with page + navbar dark; scroll/keys/“Skip intro” jump to the end; then the film settles right and the copy animates in. Logic in `Hero.tsx`; first-paint navbar hiding in the inline script in `index.html`.
- Content animations: masked heading rises, blur-in copy, 3D card pop-ins, slide-in lists, route-drawing map, cursor-following card glow, FAQ accordion, scroll progress bar. All respect `prefers-reduced-motion`.


A production-quality, art-directed marketing site for **VIP Transport**
(petroleum tanker transportation & bulk HSD fuel logistics).

---

## ⭐ Latest revision — what changed

- **New colour system: white & yellow.** The site is now white/cream-first with
  a golden-yellow brand colour (`#FFB400`) and a deep-gold accent (`#9A6B00`)
  reserved for small text so it stays readable on white. Tokens live in
  `tailwind.config.js` + `src/index.css`. The **3D hero and the footer stay
  dark** on purpose (a dark hero over a light body is a deliberate, high-impact
  pattern); the hero's rim-light and tank stripe pick up the yellow
  automatically from `BRAND.colors.orange`.
- **Real content, rewritten for SEO.** Copy, services, the "10 years / connecting
  businesses" story and **verified contact details** (both phone numbers,
  `Office@viptransports.in`, the Bengaluru BG Road address) were taken from
  viptransports.in, rewritten to be human and keyword-aware, and wired into
  `src/data/company.ts`. `index.html` now carries richer meta + a valid
  `LocalBusiness` JSON-LD with the real address/phone/email.
- **Animated count-up stats.** `src/hooks/useCountUp.ts` + `StatsBand` show the
  four headline figures ticking up on scroll — **18,000+** deliveries,
  **500,000+** km/month, **600,000+** litres/month, **300+** clients. Fleet
  capacities count up too. Edit the numbers in `STATS` / `FLEET`.
- **Client-logo marquee.** `src/components/ui/ClientsMarquee.tsx` loops the nine
  supplied logos (in `src/assets/clients/`) horizontally and seamlessly, on
  small white tiles, pausing on hover and falling back to a static wrap under
  reduced motion. Shown on Home and in the About trust section.

### Two asset notes
1. **Reliance logo** — the file supplied is a *white/reversed* version, so it's
   placed on a dark chip (`dark: true` in `CLIENTS`) to stay visible. Drop in the
   normal colour version at `src/assets/clients/reliance.png` and remove that
   flag for full uniformity.
2. **VIP logo** — still a typographic wordmark. Add the real logo at
   `src/assets/logo.svg|png` and set `BRAND.logoSrc` in `company.ts` to use it in
   the navbar/footer; also export it as `public/og-image.jpg` (1200×630) and a
   favicon for complete branding.

> No new dependencies were added in this revision — `npm install` then
> `npm run dev` as usual.

---

Built with **React 18 + TypeScript + Vite**, **React Router** (4 pages), a
**React Three Fiber** 3D tanker hero, **GSAP ScrollTrigger** scroll storytelling,
**Lenis** smooth scroll, **Tailwind CSS**, and a **Canvas petrol-nozzle fuel
animation**.

## Pages

A real multi-page site (client-side routed):

| Route           | Page         | Contains                                                        |
| --------------- | ------------ | -------------------------------------------------------------- |
| `/`             | Home         | 3D tanker hero · scroll journey · fuel nozzle (fills a tank) · about teaser · CTA |
| `/about`        | About        | Company intro · fuel nozzle (feeds the route) · process timeline · trust |
| `/capabilities` | Capabilities | Services · fuel nozzle (fills the tanker) · fleet showcase       |
| `/contact`      | Contact      | Validated inquiry form · contact details                        |

> **Deep links & hosting:** this is a single-page app, so `/about` etc. are
> resolved in the browser. Vite's dev server and `npm run preview` fall back to
> `index.html` automatically. On a static host add the same fallback:
> Netlify uses the included `public/_redirects`; Vercel a rewrite; nginx a
> `try_files $uri /index.html` rule.

## The fuel-nozzle animation

`src/components/ui/FuelNozzle.tsx` draws a petrol dispenser "gun" (SVG) and
shoots an amber fuel jet from the spout using a **Canvas 2D particle system**
(real velocity + gravity). Droplets are absorbed by a target that depends on the
`variant`:

- `variant="tank"` — fills a tank; the amber level rises and glows (Home).
- `variant="tanker"` — fills the side-view petroleum tanker (Capabilities).
- `variant="route"` — the jet charges a glowing route line to a destination (About).

It runs its animation loop **only while on screen** (IntersectionObserver),
is DPR-aware, resizes cleanly, and shows a static filled frame under
`prefers-reduced-motion`. Tune emit rate, gravity, and fill speed via the
constants near the top of the effect.

---

## Quick start

```bash
# 1. Install dependencies (needs network access to the npm registry)
npm install

# 2. Start the dev server
npm run dev

# 3. Production build + preview
npm run build
npm run preview
```

Requires **Node 18+** (Node 20 LTS recommended).

> Note: this project was authored in an offline environment, so dependencies
> were not pre-installed. Run `npm install` once on your machine — that pulls
> React, three.js, @react-three/fiber, @react-three/drei, gsap, lenis and
> lucide-react at the versions pinned in `package.json`.

---

## Finishing the site with real brand + business facts

Everything factual lives in **one file**: [`src/data/company.ts`](src/data/company.ts).
No component hard-codes a phone number, client, fleet count, or address. This is
deliberate — the design brief forbids inventing business facts, so unverified
values render as tasteful placeholders (or stay hidden) until you confirm them.

### 1. Drop in the logo

Add the supplied logo to `src/assets/` and point `BRAND.logoSrc` at it:

```ts
// src/data/company.ts
import logoUrl from '../assets/logo.svg'; // or .png
// ...
logoSrc: logoUrl,
```

Until then, a clean typographic **VIP TRANSPORT** wordmark stands in (see
`src/components/ui/Logo.tsx`). Also replace `public/favicon.svg` with a real mark.

Keep the navbar logo ~100–140px wide (already handled in `Logo.tsx`).

### 2. Confirm business facts, then flip the switches

In `company.ts`, fill every value tagged `// TODO:VERIFY` and set the matching
flag in the `VERIFIED` object to `true`:

| Flag                 | Unlocks                                                            |
| -------------------- | ----------------------------------------------------------------- |
| `VERIFIED.contact`   | Phone / email / address in navbar, contact section, footer        |
| `VERIFIED.fleet`     | Fleet unit counts shown as “in service” instead of “indicative”   |
| `VERIFIED.clients`   | The named/reference strip in the Trust section (needs permission) |
| `VERIFIED.serviceArea` | (reserved) any geographic claims                                |

**Fleet:** capacities `20 / 24 / 28 / 25 KL` and counts `4 / 3 / 6 / 2` come
from the brief and are treated as *provisional* until `VERIFIED.fleet` is true —
they’re never summed into a headline “X tankers” claim.

**Clients:** `CLIENTS` is empty by design. Only add entries (with authentic
supplied logos) once you have written permission, then set `VERIFIED.clients`.

### 3. Update SEO specifics

- `index.html`: title, meta description, canonical URL, OG image, and the
  `Organization` JSON-LD. Promote it to `LocalBusiness` **only** once a public
  address + phone are confirmed.
- `public/sitemap.xml` and `public/robots.txt`: update the domain if it differs
  from `https://www.viptransports.in/`.

---

## Contact form integration

The form (`src/components/sections/Contact.tsx`) does **real** client-side
validation and will **not** fake a successful send.

- **No endpoint configured** → on submit it validates, then clearly tells the
  user delivery isn’t connected yet. Nothing is silently dropped.
- **Endpoint configured** → it `POST`s the form as JSON and shows real
  success / error states.

Wire it up with environment variables (copy `.env.example` → `.env`):

```bash
# Easiest no-backend options:
VITE_CONTACT_ENDPOINT=https://formspree.io/f/XXXXXXXX
# or Web3Forms (also set the access key):
# VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
# VITE_CONTACT_ACCESS_KEY=your-web3forms-access-key
```

The POST body contains: `name, company, phone, email, requirement, volume,
location, message` (plus `access_key` if set). Point `VITE_CONTACT_ENDPOINT` at
any service or your own API route that accepts that JSON. `.env` is gitignored;
never commit real keys.

---

## Fonts & offline note

`src/index.css` imports **Archivo** (display) and **Inter** (body) from Google
Fonts for convenience. For a fully self-hosted build, download the WOFF2 files
into `src/assets/fonts/` and swap the `@import` for local `@font-face` rules.

The 3D hero and the in-scene environment map use **no external assets** — the
tanker is built from three.js primitives and lighting is assembled from
`Lightformer`s, so the WebGL scene works offline.

---

## Accessibility & performance

- **`prefers-reduced-motion`** is respected everywhere: the 3D camera intro,
  Lenis smooth scroll, particle field, and all scroll animations switch to
  static/instant. A static SVG tanker **poster** also replaces the canvas.
- **WebGL fallback:** if WebGL is unavailable the same poster renders — no blank
  hero.
- The heavy 3D chunk (`three` / R3F) is **lazy-loaded** and code-split, so the
  hero copy and CTAs paint immediately.
- Semantic landmarks, a skip link, keyboard-visible focus rings, labelled form
  fields, and descriptive `alt` text throughout.

---

## Project structure

```
src/
├── App.tsx                 # Router: routes + <ScrollManager/>
├── main.tsx                # <BrowserRouter> root
├── index.css               # Tailwind layers + base styles
├── data/company.ts         # ← SINGLE SOURCE OF TRUTH for all business facts
├── pages/                  # Home, About, Capabilities, ContactPage, NotFound
├── lib/
│   ├── gsap.ts             # registers ScrollTrigger once
│   └── webgl.ts            # WebGL capability check
├── hooks/
│   ├── useLenis.ts         # Lenis ↔ GSAP ticker sync
│   ├── useReducedMotion.ts
│   └── useScrollReveal.ts  # reusable scroll reveals
└── components/
    ├── Layout.tsx          # Navbar + <Outlet/> + Footer chrome
    ├── Navbar.tsx          # router links, solid on inner pages
    ├── Footer.tsx
    ├── three/              # TankerModel, HeroScene, Atmosphere
    ├── sections/           # Hero, ScrollJourney, FuelSection, About,
    │                       # Services, FleetShowcase, ProcessTimeline,
    │                       # Clients, Contact
    └── ui/                 # Logo, FuelNozzle, PageHeader, SplitHeading,
                            # ScrollIndicator, HeroPoster
```

---

## What is original vs. provided

- **Original:** all website copy, the visual identity, the 3D tanker, every
  animation, and the component architecture.
- **Provided / to confirm:** the logo artwork and the business facts in
  `company.ts`. Nothing beyond the confirmed scope (bulk HSD + petroleum
  transport, the four capacity classes) is asserted as fact until you verify it.
```
