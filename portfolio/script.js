/* ═══════════════════════════════════════════════════════════════
   SAHIL KAMBLE — PORTFOLIO
   GSAP 3.12.5 Animation Script
   ScrollTrigger · ScrollToPlugin · Custom Interactions
═══════════════════════════════════════════════════════════════ */

/* ─── PLUGIN REGISTRATION ───────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── GLOBAL STATE ──────────────────────────────────────────── */
const state = {
    scrollVelocity: 0,
    lastScrollY: 0,
    mobileNavOpen: false,
    isMobile: window.matchMedia('(max-width: 768px)').matches,
};

/* ═══════════════════════════════════════════════════════════════
   1. CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
(function initCursor() {
    if (state.isMobile) return;

    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (!cursor || !follower) return;

    /* Raw mouse position */
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    /* Dot snaps directly to mouse */
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.08,
            ease: 'none',
        });
    });

    /* Follower lerps behind */
    gsap.ticker.add(() => {
        gsap.to(follower, {
            x: mouseX,
            y: mouseY,
            duration: 0.5,
            ease: 'power2.out',
        });
    });

    /* Hover states — all interactive elements */
    const hoverTargets = document.querySelectorAll(
        'a, button, .skill-card, .project-card, .nav__toggle, .quote-marker'
    );

    hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.3,
                ease: 'power3.out',
            });
            gsap.to(follower, {
                scale: 1.6,
                borderColor: 'rgba(245, 213, 71, 0.8)',
                duration: 0.4,
                ease: 'power3.out',
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power3.out',
            });
            gsap.to(follower, {
                scale: 1,
                borderColor: 'rgba(232, 224, 212, 0.6)',
                duration: 0.4,
                ease: 'power3.out',
            });
        });
    });

    /* Hide cursor when leaving window */
    document.addEventListener('mouseleave', () => {
        gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
    });
    document.addEventListener('mouseenter', () => {
        gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   2. HERO ANIMATIONS (page load)
═══════════════════════════════════════════════════════════════ */
(function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    /* Initial state — set before animating */
    gsap.set('.hero__title-line', { y: 120, opacity: 0 });
    gsap.set('.hero__meta > *', { y: 24, opacity: 0 });
    gsap.set('.hero__badge', { opacity: 0, scale: 0.92 });
    gsap.set('.hero__scroll-indicator', { opacity: 0, y: 16 });
    gsap.set('.nav', { y: -60, opacity: 0 });

    tl
        /* Nav slides down first */
        .to('.nav', {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
        })
        /* Title lines cascade up */
        .to('.hero__title-line', {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: 'power4.out',
        }, '-=0.4')
        /* Meta row fades up */
        .to('.hero__meta > *', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
        }, '-=0.5')
        /* Badges fade from corners */
        .to('.hero__badge', {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
        }, '-=0.6')
        /* Scroll indicator */
        .to('.hero__scroll-indicator', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
        }, '-=0.3');
})();

/* ═══════════════════════════════════════════════════════════════
   3. SCROLL-TRIGGERED SECTION REVEALS
═══════════════════════════════════════════════════════════════ */
(function initSectionReveals() {
    const sections = [
        { el: '.profile', children: '.profile__container > *' },
        { el: '.skills', children: '.skills__header > *, .skill-card' },
        { el: '.experience', children: '.experience__header > *, .experience__card' },
        { el: '.projects', children: '.projects__header, .project-card' },
        { el: '.education', children: '.education__header > *, .education__item, .certifications' },
        { el: '.contact', children: '.contact__header, .contact__grid > *, .contact__languages, .contact__bottom > *' },
    ];

    sections.forEach(({ el, children }) => {
        const section = document.querySelector(el);
        if (!section) return;

        const childEls = section.querySelectorAll(children);
        if (!childEls.length) return;

        gsap.set(childEls, { y: 60, opacity: 0 });

        ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(childEls, {
                    y: 0,
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.1,
                    ease: 'power3.out',
                });
            },
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   4. PROFILE TEXT — WORD-BY-WORD REVEAL
═══════════════════════════════════════════════════════════════ */
(function initProfileTextReveal() {
    const profileText = document.getElementById('profile-text');
    if (!profileText) return;

    /* Split into word spans */
    const rawText = profileText.textContent.trim();
    const words = rawText.split(/\s+/);
    profileText.innerHTML = words
        .map((w) => `<span class="profile-word">${w}</span>`)
        .join(' ');

    const wordEls = profileText.querySelectorAll('.profile-word');

    gsap.set(wordEls, { opacity: 0.12 });

    /* Reading highlight — words illuminate as they scroll into view */
    ScrollTrigger.create({
        trigger: profileText,
        start: 'top 75%',
        end: 'bottom 35%',
        scrub: 0.6,
        onUpdate: (self) => {
            const progress = self.progress;
            const totalWords = wordEls.length;
            const litCount = Math.round(progress * totalWords * 1.15); /* slight lead */

            wordEls.forEach((word, i) => {
                const targetOpacity = i < litCount ? 1 : 0.12;
                gsap.to(word, {
                    opacity: targetOpacity,
                    duration: 0.4,
                    ease: 'none',
                    overwrite: 'auto',
                });
            });
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   5. QUOTE SECTION — PARALLAX
═══════════════════════════════════════════════════════════════ */
(function initQuoteParallax() {
    const quoteSection = document.getElementById('quote');
    if (!quoteSection) return;

    const quoteText = quoteSection.querySelector('.quote-section__text');
    const quoteMarkers = quoteSection.querySelectorAll('.quote-marker');

    /* Text parallax — moves up slower than scroll */
    if (quoteText) {
        gsap.to(quoteText, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: quoteSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
            },
        });
    }

    /* Markers rotate & drift on scroll */
    quoteMarkers.forEach((marker, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(marker, {
            rotation: dir * 8,
            y: dir * -20,
            ease: 'none',
            scrollTrigger: {
                trigger: quoteSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            },
        });
    });

    /* Entrance animation */
    gsap.set(quoteText, { opacity: 0, y: 40 });
    ScrollTrigger.create({
        trigger: quoteSection,
        start: 'top 75%',
        once: true,
        onEnter: () => {
            gsap.to(quoteText, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power4.out',
            });
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   6. SKILL CARDS — STAGGERED ENTRANCE WITH ROTATION
═══════════════════════════════════════════════════════════════ */
(function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;

    gsap.set(skillCards, { y: 40, opacity: 0, rotation: 1.5 });

    ScrollTrigger.create({
        trigger: '.skills__grid',
        start: 'top 78%',
        once: true,
        onEnter: () => {
            gsap.to(skillCards, {
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power3.out',
            });
        },
    });

    /* Subtle hover tilt on desktop */
    if (!state.isMobile) {
        skillCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);

                gsap.to(card, {
                    rotateY: dx * 4,
                    rotateX: -dy * 4,
                    duration: 0.4,
                    ease: 'power2.out',
                    transformPerspective: 800,
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                });
            });
        });
    }
})();

/* ═══════════════════════════════════════════════════════════════
   7. PROJECT CARDS — ALTERNATING SLIDE-IN
═══════════════════════════════════════════════════════════════ */
(function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    if (!projectCards.length) return;

    projectCards.forEach((card, i) => {
        const isFeatured = card.classList.contains('project-card--featured');
        const fromX = i % 2 === 0 ? -60 : 60;
        const fromScale = isFeatured ? 0.95 : 1;

        gsap.set(card, {
            x: fromX,
            opacity: 0,
            scale: fromScale,
        });

        ScrollTrigger.create({
            trigger: card,
            start: 'top 82%',
            once: true,
            onEnter: () => {
                gsap.to(card, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: isFeatured ? 1.1 : 0.9,
                    ease: 'power3.out',
                });
            },
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   8. EDUCATION TIMELINE — SEQUENTIAL REVEAL + YEAR COUNTER
═══════════════════════════════════════════════════════════════ */
(function initEducationTimeline() {
    const eduItems = document.querySelectorAll('.education__item');
    if (!eduItems.length) return;

    eduItems.forEach((item, i) => {
        const yearEl = item.querySelector('.education__item-year');
        const contentEl = item.querySelector('.education__item-content');
        const decEl = item.querySelector('.education__item-dec');
        const targetYear = parseInt(item.dataset.year, 10);

        gsap.set(item, { opacity: 0 });
        if (contentEl) gsap.set(contentEl, { x: 30, opacity: 0 });
        if (decEl) gsap.set(decEl, { opacity: 0, scale: 0 });

        ScrollTrigger.create({
            trigger: item,
            start: 'top 82%',
            once: true,
            onEnter: () => {
                const tl = gsap.timeline();

                /* Fade item wrapper in */
                tl.to(item, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    delay: i * 0.12,
                });

                /* Year count-up clip effect */
                if (yearEl && targetYear) {
                    const startYear = targetYear - 5;
                    const counter = { val: startYear };

                    tl.to(counter, {
                        val: targetYear,
                        duration: 0.9,
                        ease: 'power2.out',
                        onUpdate: () => {
                            yearEl.textContent = Math.round(counter.val);
                        },
                    }, '<');
                }

                /* Content slides in */
                if (contentEl) {
                    tl.to(contentEl, {
                        x: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: 'power3.out',
                    }, '-=0.5');
                }

                /* Decorator pops in */
                if (decEl) {
                    tl.to(decEl, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(2)',
                    }, '-=0.3');
                }
            },
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   9. MARQUEE — SCROLL VELOCITY SPEED VARIATION
═══════════════════════════════════════════════════════════════ */
(function initMarqueeVelocity() {
    const marqueeInner = document.getElementById('marquee-1');
    if (!marqueeInner) return;

    let baseSpeed = 28;   /* seconds for base animation */
    let currentSpeed = baseSpeed;
    let rafId = null;

    /* Track scroll velocity */
    ScrollTrigger.create({
        trigger: '.marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());

            /* Map velocity to speed: fast scroll = shorter duration = faster marquee */
            const speedMultiplier = 1 - Math.min(velocity / 4000, 0.75);
            const targetSpeed = baseSpeed * speedMultiplier;

            /* Smooth interpolation */
            currentSpeed += (targetSpeed - currentSpeed) * 0.08;
            marqueeInner.style.animationDuration = `${Math.max(currentSpeed, 4)}s`;
        },
        onLeave: () => {
            /* Reset to base speed when out of view */
            gsap.to({ speed: currentSpeed }, {
                speed: baseSpeed,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: function () {
                    currentSpeed = this.targets()[0].speed;
                    marqueeInner.style.animationDuration = `${currentSpeed}s`;
                },
            });
        },
    });

    /* Direction flip on scroll direction change */
    let lastDir = 1;
    ScrollTrigger.create({
        onUpdate: (self) => {
            const dir = self.direction;
            if (dir !== lastDir) {
                lastDir = dir;
                marqueeInner.style.animationDirection =
                    dir === -1 ? 'reverse' : 'normal';
            }
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   10. NAVIGATION
═══════════════════════════════════════════════════════════════ */
(function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav__link[data-section]');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    /* ── Scroll opacity ──────────────────────────────────────── */
    ScrollTrigger.create({
        start: 100,
        end: 'max',
        onToggle: (self) => {
            nav.classList.toggle('nav--scrolled', self.isActive);
        },
        onUpdate: (self) => {
            /* Subtle extra shadow/opacity as page scrolls deeper */
            const depth = Math.min(self.progress, 1);
            if (nav) {
                nav.style.borderBottomColor =
                    `rgba(232, 224, 212, ${0.04 + depth * 0.06})`;
            }
        },
    });

    /* nav--scrolled style (injected dynamically) */
    const styleTag = document.createElement('style');
    styleTag.textContent = `
    .nav--scrolled {
      background: rgba(10, 10, 10, 0.97) !important;
      box-shadow: 0 1px 40px rgba(0, 0, 0, 0.6);
    }
  `;
    document.head.appendChild(styleTag);

    /* ── Smooth scroll — desktop nav links ──────────────────── */
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: target, offsetY: 60 },
                ease: 'power3.inOut',
            });
        });
    });

    /* ── Smooth scroll — mobile nav links ───────────────────── */
    mobileLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');

            /* Close mobile nav first */
            closeMobileNav();

            setTimeout(() => {
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: target, offsetY: 60 },
                    ease: 'power3.inOut',
                });
            }, 400);
        });
    });

    /* ── Mobile nav toggle ───────────────────────────────────── */
    function openMobileNav() {
        state.mobileNavOpen = true;
        mobileNav.classList.add('is-open');
        gsap.to(mobileNav, { opacity: 1, duration: 0.01 }); /* ensure visible */

        const links = mobileNav.querySelectorAll('.mobile-nav__link');
        gsap.set(links, { x: -40, opacity: 0 });
        gsap.to(links, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: 'power3.out',
            delay: 0.1,
        });

        /* Animate hamburger to X */
        const line = navToggle.querySelector('.nav__toggle-line');
        gsap.to(line, { scaleX: 0, duration: 0.25, ease: 'power2.in' });
        gsap.to(line, {
            scaleX: 1,
            rotation: 45,
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.25,
        });
    }

    function closeMobileNav() {
        state.mobileNavOpen = false;
        mobileNav.classList.remove('is-open');

        /* Reset hamburger */
        const line = navToggle.querySelector('.nav__toggle-line');
        gsap.to(line, { rotation: 0, scaleX: 1, duration: 0.4, ease: 'power3.out' });
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            state.mobileNavOpen ? closeMobileNav() : openMobileNav();
        });
    }

    /* ── Active nav link highlight on scroll ─────────────────── */
    const sectionIds = ['hero', 'profile', 'skills', 'experience', 'projects', 'education', 'contact'];

    sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onToggle: (self) => {
                navLinks.forEach((link) => {
                    const isActive = link.dataset.section === id && self.isActive;
                    link.style.color = isActive ? 'var(--yellow)' : '';
                });
            },
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   11. FLOATING STICKERS — PARALLAX
═══════════════════════════════════════════════════════════════ */
(function initStickerParallax() {
    if (state.isMobile) return;

    const stickers = [
        { id: 'sticker-star', speed: 0.12, dir: 1 },
        { id: 'sticker-plus-1', speed: 0.18, dir: -1 },
        { id: 'sticker-inf', speed: 0.09, dir: 1 },
        { id: 'sticker-arrow', speed: 0.15, dir: -1 },
    ];

    stickers.forEach(({ id, speed, dir }) => {
        const el = document.getElementById(id);
        if (!el) return;

        gsap.to(el, {
            y: `${dir * speed * 400}px`,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
            },
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   12. INTERESTS BADGE — FADE IN AT 50% PAGE SCROLL
═══════════════════════════════════════════════════════════════ */
(function initInterestsBadge() {
    const badge = document.getElementById('interests-badge');
    if (!badge) return;

    gsap.set(badge, { opacity: 0, y: 20, scale: 0.9 });

    ScrollTrigger.create({
        trigger: 'body',
        start: '50% top',       /* 50% down the total page */
        once: true,
        onEnter: () => {
            gsap.to(badge, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
            });
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   BONUS — SECTION HEADER NUMBERS CLIP REVEAL
   (Skills, Experience, Projects, Education section numbers)
═══════════════════════════════════════════════════════════════ */
(function initSectionNumbers() {
    const numbers = document.querySelectorAll(
        '.skills__num, .experience__num, .projects__num, .education__num'
    );

    numbers.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 8 });

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                });
            },
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   BONUS — SECTION TITLE LETTERS STAGGER
   (Big display headings animate letter-by-letter)
═══════════════════════════════════════════════════════════════ */
(function initSectionTitles() {
    const titleEls = document.querySelectorAll(
        '.skills__title, .experience__title, .projects .projects__pop-label, .education__title'
    );

    titleEls.forEach((titleEl) => {
        const text = titleEl.textContent.trim();
        const isMulti = titleEl.parentElement.querySelectorAll(
            '.projects__pop-label'
        ).length > 1;

        /* Only split if it's a single-line heading */
        if (!isMulti) {
            titleEl.innerHTML = text
                .split('')
                .map((ch) =>
                    ch === ' '
                        ? ' '
                        : `<span class="title-char" style="display:inline-block">${ch}</span>`
                )
                .join('');
        }

        const chars = titleEl.querySelectorAll('.title-char');
        if (!chars.length) return;

        gsap.set(chars, { y: 60, opacity: 0, rotation: 4 });

        ScrollTrigger.create({
            trigger: titleEl,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(chars, {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.7,
                    stagger: 0.04,
                    ease: 'power4.out',
                });
            },
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   BONUS — CERTIFICATIONS ITEMS STAGGER
═══════════════════════════════════════════════════════════════ */
(function initCertItems() {
    const certItems = document.querySelectorAll('.cert-item');
    if (!certItems.length) return;

    gsap.set(certItems, { x: -20, opacity: 0 });

    ScrollTrigger.create({
        trigger: '.certifications',
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(certItems, {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
            });
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   BONUS — SCROLL VELOCITY TRACKING (global)
   Used by marquee; kept here for reference/extension
═══════════════════════════════════════════════════════════════ */
ScrollTrigger.create({
    onUpdate: (self) => {
        state.scrollVelocity = self.getVelocity();
    },
});

/* ═══════════════════════════════════════════════════════════════
   BONUS — CONTACT SOCIAL LINKS STAGGER
═══════════════════════════════════════════════════════════════ */
(function initContactReveal() {
    const socialLinks = document.querySelectorAll('.contact__social-link');
    if (!socialLinks.length) return;

    gsap.set(socialLinks, { x: 30, opacity: 0 });

    ScrollTrigger.create({
        trigger: '.contact__social',
        start: 'top 82%',
        once: true,
        onEnter: () => {
            gsap.to(socialLinks, {
                x: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.1,
                ease: 'power3.out',
            });
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   BONUS — EXPERIENCE DECORATOR TAGS STAGGER
═══════════════════════════════════════════════════════════════ */
(function initExpDecorators() {
    const decs = document.querySelectorAll('.experience__dec');
    if (!decs.length) return;

    gsap.set(decs, { y: 10, opacity: 0 });

    ScrollTrigger.create({
        trigger: '.experience__card-decorators',
        start: 'top 88%',
        once: true,
        onEnter: () => {
            gsap.to(decs, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
            });
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   BONUS — PROJECT TECH STACK PILLS
═══════════════════════════════════════════════════════════════ */
(function initTechPills() {
    const pills = document.querySelectorAll('.project-card__tech');
    if (!pills.length) return;

    gsap.set(pills, { scale: 0.8, opacity: 0 });

    ScrollTrigger.create({
        trigger: '#project-nirogos',
        start: 'top 75%',
        once: true,
        onEnter: () => {
            gsap.to(pills, {
                scale: 1,
                opacity: 1,
                duration: 0.45,
                stagger: 0.07,
                ease: 'back.out(1.8)',
            });
        },
    });
})();

/* ─── REFRESH ALL SCROLL TRIGGERS AFTER FONTS LOAD ─────────── */
document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
});

/* ─── RESIZE HANDLER ────────────────────────────────────────── */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        state.isMobile = window.matchMedia('(max-width: 768px)').matches;
        ScrollTrigger.refresh();
    }, 250);
});

/* ═══════════════════════════════════════════════════════════════
   HOVER HERO LETTERS — VINTAGE ART REVEAL
   Only the hovered letter shows its art; all others stay solid.
═══════════════════════════════════════════════════════════════ */
(function () {
    const letters = document.querySelectorAll('.hero-letter');

    // Preload all art images for instant reveal on hover
    letters.forEach(letter => {
        const artSrc = letter.dataset.art;
        if (artSrc) {
            const img = new Image();
            img.src = artSrc;
        }
    });

    letters.forEach(letter => {
        // ── MOUSE ENTER: reveal art through this letter only ──
        letter.addEventListener('mouseenter', () => {
            const artSrc = letter.dataset.art;
            if (!artSrc) return;

            // Remove any lingering unrevealing class
            letter.classList.remove('is-unrevealing');

            // Set the art as background and reveal
            letter.style.backgroundImage = `url(${artSrc})`;
            letter.classList.add('is-revealed');

            // Light tilt on hover
            gsap.to(letter, {
                rotation: -4,
                scale: 1.03,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        // ── MOUSE LEAVE: revert to solid text ────────────────
        letter.addEventListener('mouseleave', () => {
            // Remove revealed state
            letter.classList.remove('is-revealed');
            letter.classList.add('is-unrevealing');

            // Animate back to normal
            gsap.to(letter, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                    // Clear background image after transition
                    letter.style.backgroundImage = '';
                    letter.classList.remove('is-unrevealing');
                    // Reset fill color
                    letter.style.webkitTextFillColor = '';
                    letter.style.color = '';
                },
            });
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   DRAGGABLE POP ART STICKERS
═══════════════════════════════════════════════════════════════ */
(function () {
    const draggables = document.querySelectorAll('[data-draggable]');

    draggables.forEach(el => {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        el.addEventListener('mousedown', (e) => {
            isDragging = true;
            el.style.animation = 'none';
            el.style.cursor = 'grabbing';
            el.style.zIndex = '200';

            const rect = el.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            initialX = rect.left;
            initialY = rect.top;

            // Remove position properties, use fixed positioning
            el.style.position = 'fixed';
            el.style.left = initialX + 'px';
            el.style.top = initialY + 'px';
            el.style.right = 'auto';
            el.style.bottom = 'auto';
            el.style.transform = 'none';

            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            el.style.left = (initialX + dx) + 'px';
            el.style.top = (initialY + dy) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            el.style.cursor = 'grab';
            el.style.zIndex = '50';
        });
    });

    // Sticker entrance animation
    gsap.from('.pop-sticker', {
        scale: 0,
        rotation: 'random(-30, 30)',
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(2)',
        delay: 1.5,
    });

    // Hire badge entrance
    gsap.from('.hire-badge', {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        delay: 2.5,
    });

    // Hero portrait parallax on scroll
    const portrait = document.querySelector('.hero__portrait');
    if (portrait) {
        gsap.to(portrait, {
            y: -80,
            opacity: 0.2,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });
    }

    // Color block divider animation
    gsap.utils.toArray('.color-block-divider').forEach(div => {
        gsap.from(div.children, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: div,
                start: 'top 90%',
                once: true,
            },
        });
    });

    // Pop stamp rotation on scroll
    const stamp = document.querySelector('.pop-stamp');
    if (stamp) {
        gsap.to(stamp, {
            rotation: 360,
            scrollTrigger: {
                trigger: '.profile',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            },
        });
    }
})();