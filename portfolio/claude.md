# Sahil Kamble — Portfolio Project Guide

> **Last updated:** May 9, 2026  
> **Project path:** `/Users/sahilkamble/Desktop/SahilBuilds/portfolio/`  
> **Stack:** HTML + CSS + Vanilla JS (no framework)  
> **Dependencies:** GSAP 3.12.5 (CDN), ScrollTrigger, ScrollToPlugin, Google Fonts

---

## 1. Project Overview

A **Warhol / Pop Art / Vintage-inspired** personal portfolio for Sahil Kamble — a BBA graduate, digital marketer, and product builder. The site is a single-page HTML application with heavy animation (GSAP + ScrollTrigger), film-grain overlays, draggable stickers, and an interactive hero section.

### Design Inspiration

The primary inspiration is the **[WarholArts](https://warhol-arts.webflow.io)** website:

````carousel
![Warhol hero — letters spanning full viewport, dark background, cream text](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/warhol-hero-default.png)
<!-- slide -->
![Warhol hero — hover reveals art through letter shapes](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/warhol-hero-hover.png)
````

#### Key Warhol Design Traits to Match
- **Giant typography** that spans the **full viewport width** — letters go edge-to-edge
- **Letters touch/nearly touch the edges** of the screen — no centering in a small area
- **Dark background** (#0a0a0a) with **cream/beige text** (#E8E0D4)
- On hover/click, **art images are revealed through the letter shapes** (CSS `background-clip: text`)
- Film grain, halftone dots, and scanline overlays add vintage texture
- Pop art stickers (lips, cameras, bananas) are **draggable**
- Minimal meta/badge details scattered around corners

### Aesthetic Direction (Not Just Warhol)
The user has explicitly requested a **mix of vintage aesthetics**, not only Warhol:
- **Playboy-era vintage glamour** (60s/70s)
- **Retro disco / psychedelic** poster art
- **Pin-up / mod fashion** illustrations
- **Cocktail lounge / neon bar** vibes
- **Pop art halftone** and screen print textures

---

## 2. File Structure

```
portfolio/
├── index.html          # Single-page HTML (all sections)
├── style.css           # All styles (~2540 lines)
├── script.js           # All JS/GSAP animations (~1070 lines)
├── claude.md           # This file — project context
└── assets/
    ├── hero-portrait.png       # Pop art portrait (behind hero text)
    ├── letter-art-s.png        # Vintage art for letter S (hover reveal)
    ├── letter-art-a.png        # Vintage art for letter A (hover reveal)
    ├── letter-art-h.png        # Vintage art for letter H (hover reveal)
    ├── letter-art-i.png        # Vintage art for letter I (hover reveal)
    ├── letter-art-l.png        # Vintage art for letter L (hover reveal)
    ├── letter-art-1.png        # (Legacy — old Warhol art, unused now)
    ├── letter-art-2.png        # (Legacy — old Warhol art, unused now)
    ├── letter-art-3.png        # (Legacy — old Warhol art, unused now)
    ├── letter-art-4.png        # (Legacy — old Warhol art, unused now)
    ├── letter-art-5.png        # (Legacy — old Warhol art, unused now)
    ├── sticker-banana.png      # Draggable pop art sticker
    ├── sticker-camera.png      # Draggable pop art sticker
    ├── sticker-lips.png        # Draggable pop art sticker
    └── sticker-wow.png         # Draggable pop art sticker
```

---

## 3. Page Sections (in order)

| # | Section | ID | Description |
|---|---------|------|-------------|
| 1 | **Navigation** | `#nav` | Fixed top nav with section links, S/K logo, Year/Dept meta. Mobile hamburger. |
| 2 | **Hero** | `#hero` | Giant "SAHIL" text with hover-to-reveal art. Portrait image behind. Badges, scroll indicator. |
| 3 | **Profile** | `#profile` | Short bio paragraph. "Certified Creative" stamp badge. |
| 4 | **Quote** | `#quote` | Inspirational quote blockquote with pop art styling. |
| 5 | **Skills** | `#skills` | 4 skill cards (Business, Tech, AI, Content) with color-coded borders. |
| 6 | **Experience** | `#experience` | Single experience card (BrandMatterz internship). |
| 7 | **Projects** | `#projects` | 3 project cards (NirogOS, Social Media Research, Organic Farming). |
| 8 | **Education** | `#education` | Timeline (BBA, HSC, SSC) + certifications. |
| 9 | **Marquee** | `.marquee-section` | Scrolling ticker of keywords. |
| 10 | **Contact** | `#contact` | Email, phone, location, social links, footer. |

---

## 4. Current State of the Hero Section

### What Was Done
1. ✅ Changed from two-line "SAHIL KAMBLE" to single-line **"SAHIL"**
2. ✅ Changed interaction from **click-to-toggle** to **hover-to-reveal** (mouseenter shows art, mouseleave reverts)
3. ✅ Generated 5 unique vintage/Playboy-inspired art images (one per letter)
4. ✅ Added letter spacing (`space-between`) so letters spread across viewport
5. ✅ Added text-shadow and drop-shadow for depth/texture
6. ✅ Reduced hero portrait opacity from 0.45 → 0.25 so letters are the star

### Current Hero Screenshot
````carousel
![Current hero — letters spaced across viewport with vintage art on H](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/current-hero-default.png)
<!-- slide -->
![Current hero — hovering S reveals vintage pop art through letter](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/current-hero-hover-s.png)
````

### Generated Vintage Art Images (for letter reveals)
````carousel
![S — 60s pop art woman in retro sunglasses, hot pink/gold](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/letter-art-s.png)
<!-- slide -->
![A — 70s muscle car at sunset, palm trees, warm amber](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/letter-art-a.png)
<!-- slide -->
![H — Mod fashion, vinyl records, electric blue/pink](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/letter-art-h.png)
<!-- slide -->
![I — Cocktail lounge, neon signs, leopard print](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/letter-art-i.png)
<!-- slide -->
![L — Psychedelic disco poster, groovy roller party](/Users/sahilkamble/.gemini/antigravity/brain/2ddef46d-dfa3-49ce-8d73-95a9d26e6ef2/artifacts/ref-images/letter-art-l.png)
````

---

## 5. Known Issues & Pending Work

> [!WARNING]
> These items still need attention:

### Hero Section Issues
1. **Letter spacing needs refinement** — The user wants the letters more attractively spaced. Currently `justify-content: space-between` may spread too aggressively with the portrait overlapping on the right. Consider whether the Warhol approach (letters butting up against each other with negative letter-spacing, filling the entire width) might be better than separated letters.
2. **Portrait image overlap** — The pop-art portrait (`hero-portrait.png`) occupies the right side and visually competes with the "I" and "L" letters. The letters should be the dominant visual element.
3. **Texture/grain depth** — The user wants more textures. Currently there are grain, halftone, and scanline overlays but they may need more intensity or additional effects specifically on the hero letters.
4. **Mobile responsiveness** — The hero title font size drops to `22vw` on mobile. The hover effect won't work on touch devices — consider a touch-based fallback (e.g., tap to toggle, or auto-cycle animation).

### Potential Improvements
- Consider making the letters **fill the entire width like the Warhol site** (tight negative letter-spacing, `font-size` cranked up so letters bleed edge-to-edge) rather than using `space-between` gaps
- Add a subtle **noise/grain texture** overlay specifically inside the hero letters
- Consider a **color-cycling animation** on non-hovered letters (subtle, slow shifts in text color or opacity)
- The hover art reveal could use a **CSS `mix-blend-mode`** effect for extra vintage feel

---

## 6. CSS Architecture

### Design Tokens (CSS Variables)
```css
--bg: #0a0a0a;
--bg-card: #111111;
--text: #E8E0D4;           /* Cream/beige — main text */
--text-muted: #B8AFA4;
--text-dim: #5A544D;
--red: #FF3B3B;
--yellow: #F5D547;
--cyan: #3BDBFF;
--pink: #FF69B4;
--gold: #D4A843;
--border: rgba(232,224,212,0.06);
--border-light: rgba(232,224,212,0.12);
--font-display: 'Bebas Neue', sans-serif;
--font-body: 'Inter', sans-serif;
--font-serif: 'Playfair Display', serif;
--font-mono: 'Space Mono', monospace;
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

### Key CSS Classes for the Hero
| Class | Purpose |
|-------|---------|
| `.hero` | Full-viewport section, dark bg, flex column centered |
| `.hero__title-container` | Relative wrapper for title + portrait, `width: 100%` |
| `.hero__title` | Giant display font (`28vw`), flex row, `letter-spacing: 0.04em` |
| `.hero__title-line--1` | Flex row holding the 5 letters, `justify-content: space-between`, `width: 100%` |
| `.hero-letter` | Each letter span — `background-clip: text` for art reveal, text-shadow for depth |
| `.hero-letter.is-revealed` | Active hover state — transparent text fill, background image shows through |
| `.hero-letter.is-unrevealing` | Exit animation state (reverts to solid) |
| `.hero__portrait` | Absolute-positioned pop art portrait behind text, `opacity: 0.25`, `mix-blend-mode: screen` |
| `.hero__meta` | Bottom bar with location, role, year |

---

## 7. JavaScript Architecture

### Animation Modules (IIFEs in `script.js`)
1. **Custom Cursor** — Large dot + follower, `requestAnimationFrame` loop
2. **Hero Title Entrance** — Letters stagger in from bottom with rotation
3. **Profile Text Reveal** — Word-by-word scroll reveal
4. **Parallax Decorators** — `+` and `→` symbols float on scroll
5. **Quote Parallax** — Quote section parallax + entrance
6. **Skill Cards** — Staggered entrance + 3D hover tilt
7. **Project Cards** — Alternating slide-in from left/right
8. **Education Timeline** — Sequential reveal + year counter animation
9. **Marquee Velocity** — Scroll speed affects ticker speed + direction
10. **Navigation** — Scroll opacity, smooth scroll, mobile nav, active link highlight
11. **Sticker Parallax** — Floating stickers move on scroll
12. **Interests Badge** — Fades in at 50% page scroll
13. **Section Numbers** — Clip-reveal animation on scroll
14. **Section Titles** — Letter-by-letter stagger
15. **Certifications** — Stagger entrance
16. **Contact Social Links** — Stagger entrance
17. **Experience Decorators** — Stagger entrance
18. **Tech Pills** — Scale-in entrance
19. **Hover Hero Letters** — mouseenter reveals vintage art, mouseleave reverts ← **RECENTLY CHANGED**
20. **Draggable Stickers** — mousedown/move/up drag handlers
21. **Color Block Dividers** — Scale-in animation
22. **Pop Stamp Rotation** — Scroll-linked rotation
23. **Hero Portrait Parallax** — Scroll-linked y-offset + opacity fade

### Hero Letter Hover Logic (Current Implementation)
```javascript
// On mouseenter: show art through letter shape
letter.addEventListener('mouseenter', () => {
    letter.style.backgroundImage = `url(${artSrc})`;
    letter.classList.add('is-revealed');
    gsap.fromTo(letter,
        { scale: 1.25, rotation: -3 },
        { scale: 1.06, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
    );
});

// On mouseleave: revert to solid text
letter.addEventListener('mouseleave', () => {
    letter.classList.remove('is-revealed');
    letter.classList.add('is-unrevealing');
    gsap.to(letter, {
        scale: 1, rotation: 0, duration: 0.4, ease: 'power3.out',
        onComplete: () => {
            letter.style.backgroundImage = '';
            letter.classList.remove('is-unrevealing');
        },
    });
});
```

---

## 8. How to Run Locally

```bash
cd /Users/sahilkamble/Desktop/SahilBuilds/portfolio
python3 -m http.server 8080
# Open http://localhost:8080
```

No build step needed — it's pure HTML/CSS/JS with CDN dependencies.

---

## 9. Comparing Warhol vs. Current State

| Aspect | Warhol Reference | Current Portfolio | Status |
|--------|-----------------|-------------------|--------|
| Letters span full width | ✅ Edge-to-edge, letters touching | ⚠️ `space-between` gaps | Needs refinement |
| Dark bg + cream text | ✅ | ✅ | Done |
| Hover reveals art through letters | ✅ Click-based | ✅ Hover-based | Done (improved) |
| Art images | Warhol pop art specific | Vintage/Playboy/retro mix | Done |
| Film grain overlay | ✅ | ✅ | Done |
| Halftone dots | ✅ | ✅ | Done |
| Draggable stickers | ✅ | ✅ | Done |
| Scanlines | ✅ | ✅ | Done |
| Font size / dominance | ~50% of viewport height | Similar | Good |
| Texture depth on letters | Subtle | Added text-shadow + drop-shadow | May need more |

---

## 10. User Preferences / Requests

> [!IMPORTANT]
> Keep these in mind for all future changes:

1. **"Just SAHIL"** — Only first name in hero, no last name
2. **Hover-based art reveal** — NOT click-based. Hover = show art, leave = revert
3. **Per-letter isolation** — Only the hovered letter changes; all others stay normal
4. **Vintage mix** — Images should be Playboy-era, psychedelic, retro, disco, pin-up — NOT just Warhol pop art
5. **Attractive spacing** — Letters should not cluster in the center. Need visual breathing room.
6. **Textures everywhere** — Grain, halftone, shadows, depth effects are desired
7. **Responsive** — Must look good on mobile too (though hover won't work there)

---

## 11. Tech Notes for Agents

> [!TIP]
> Quick reference for working on this project:

- **CSS custom properties** are defined in `:root` at the top of `style.css`
- **GSAP** is loaded from CDN (lines 19-21 in `index.html`) — available globally
- **No bundler** — all files are loaded directly. No npm/node needed.
- **Hero letter art uses `background-clip: text`** — the art image is set as `background-image`, then text fill is made transparent so the image shows through the letter shape only
- **Stickers are draggable** via vanilla JS mousedown/move/up handlers
- **All animations use GSAP** — ScrollTrigger for scroll-based, gsap.to/fromTo for one-shot
- **Mobile breakpoint is 768px** — most decorative elements are hidden on mobile
- The `--ease-out-expo` variable maps to `cubic-bezier(0.16, 1, 0.3, 1)` — used extensively
- **Hero portrait** is positioned absolute behind the text with `mix-blend-mode: screen`
