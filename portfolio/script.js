/* ═══════════════════════════════════════════════════════════════
   SAHIL KAMBLE — PORTFOLIO
   GSAP 3.12.5 Animation Script
   ScrollTrigger · ScrollToPlugin · Custom Interactions
═══════════════════════════════════════════════════════════════ */

/* ─── PLUGIN REGISTRATION ───────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ═══════════════════════════════════════════════════════════════
   0. LOADING SCREEN — Warhol Cross-Grid Image Shuffle
═══════════════════════════════════════════════════════════════ */
(function initLoader() {
    const loader = document.getElementById('loader');
    const counterNum = document.getElementById('loader-counter-num');
    const progressFill = document.getElementById('loader-progress-fill');
    const frameCells = document.querySelectorAll('.loader__cell--img');

    if (!loader) return;

    /* ── Loading screen image pool ─────────────────────────── */
    const imagePaths = [
        'assets/Loading Screen/Playboy X Butcher Billy _ The Unreleased Art Pieces - Butcher Billy.jpeg',
        'assets/Loading Screen/The Art of Retro Illustration_ Connecting Past and Present.jpeg',
        'assets/Loading Screen/_ (1).jpeg',
        'assets/Loading Screen/_.jpeg',
        'assets/Loading Screen/_ (2).jpeg',
    ];

    /* Preload images */
    const loadedImages = [];
    let imagesLoaded = 0;

    imagePaths.forEach((src) => {
        const img = new Image();
        img.onload = () => {
            imagesLoaded++;
            loadedImages.push(src);
        };
        img.onerror = () => {
            imagesLoaded++;
        };
        img.src = src;
    });

    /* ── Set up background positions for the 5×6 puzzle grid ─────── */
    const allCells = document.querySelectorAll('.loader__cell');
    const cols = 5;
    const rows = 6;
    const cellSize = 88;
    const gapSize = 2;

    /* Each cell gets a pixel offset so the image tiles seamlessly */
    allCells.forEach((cell, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const posX = -(col * (cellSize + gapSize));
        const posY = -(row * (cellSize + gapSize));
        cell.style.backgroundPosition = `${posX}px ${posY}px`;
    });

    function shuffleCells() {
        /* 1. Pick a new image for the whole puzzle */
        if (loadedImages.length > 0) {
            const randomImg = loadedImages[Math.floor(Math.random() * loadedImages.length)];
            frameCells.forEach((cell) => {
                cell.style.backgroundImage = `url('${randomImg}')`;
            });
        }

        /* 2. Randomly toggle ~25% of image cells to solid black (missing pieces) */
        frameCells.forEach((cell) => {
            if (Math.random() < 0.25) {
                cell.classList.add('is-solid');
            } else {
                cell.classList.remove('is-solid');
            }
        });
    }

    /* Initial shuffle */
    shuffleCells();

    /* Keep shuffling every 400ms during loading */
    const shuffleInterval = setInterval(shuffleCells, 400);

    /* ── Loading counter animation ────────────────────────── */
    let currentPercent = 0;
    const loadDuration = 3000; /* 3 seconds minimum load time */
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const rawProgress = Math.min(elapsed / loadDuration, 1);

        /* Ease out the progress for dramatic effect */
        const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
        currentPercent = Math.round(easedProgress * 100);

        if (counterNum) counterNum.textContent = currentPercent;
        if (progressFill) progressFill.style.width = currentPercent + '%';

        if (currentPercent < 100) {
            requestAnimationFrame(updateCounter);
        } else {
            /* Loading complete — dismiss */
            clearInterval(shuffleInterval);

            setTimeout(() => {
                loader.classList.add('is-done');

                /* Fire the magnifier wave as the loader fades out */
                setTimeout(() => {
                    triggerHeroWave();
                }, 400);

                /* Remove from DOM after transition */
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 900);
            }, 300);
        }
    }

    requestAnimationFrame(updateCounter);

    /* ── Prevent scrolling during loading ─────────────────── */
    document.body.style.overflow = 'hidden';

    const observer = new MutationObserver(() => {
        if (loader.classList.contains('is-done')) {
            document.body.style.overflow = '';
            observer.disconnect();
        }
    });
    observer.observe(loader, { attributes: true, attributeFilter: ['class'] });
})();

/* ═══════════════════════════════════════════════════════════════
   HERO WAVE — Magnifier animation across S → A → H → I → L
   Fires once after the loading screen is dismissed.
   Each letter scales up with a red Warhol glow, then returns
   to its original color. The existing hover mask is preserved.
═══════════════════════════════════════════════════════════════ */
function triggerHeroWave() {
    const letters = document.querySelectorAll('.hero-letter');
    if (!letters.length) return;

    const waveTL = gsap.timeline({
        onComplete: () => {
            /* Clean up — ensure all letters are back to default */
            letters.forEach((letter) => {
                letter.classList.remove('hero-letter--wave-active');
                letter.style.transform = '';
            });
        },
    });

    /* Stagger wave: each letter scales up (magnifier), turns red,
       then scales back down and returns to original color */
    letters.forEach((letter, i) => {
        const delay = i * 0.18; /* 180ms between each letter */

        /* Scale UP + turn red */
        waveTL.to(letter, {
            scale: 1.35,
            y: -12,
            duration: 0.35,
            ease: 'power2.out',
            onStart: () => {
                letter.classList.add('hero-letter--wave-active');
            },
        }, delay);

        /* Scale BACK DOWN + revert color */
        waveTL.to(letter, {
            scale: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.inOut',
            onComplete: () => {
                letter.classList.remove('hero-letter--wave-active');
            },
        }, delay + 0.35);
    });
}

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
        { el: '.experience', children: '.experience__header > *, .experience__card' },
        { el: '.projects', children: '.projects__header, .project-card' },
        { el: '.education', children: '.education__header > *, .education__item, .certifications' },
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
   4. PROFILE SECTION — EDITORIAL SCROLL ANIMATION
═══════════════════════════════════════════════════════════════ */
(function initProfileSection() {
    const profile = document.querySelector('.profile');
    const profileTitle = document.getElementById('profile-title');
    const profileText = document.getElementById('profile-text');
    const tapeLabel = document.querySelector('.profile__tape-label');
    const markers = document.querySelectorAll('.profile__marker');
    const cta = document.getElementById('profile-cta');
    const decBar = document.querySelector('.profile__dec-bar');
    const header = document.querySelector('.profile__header');
    const leftSticker = document.querySelector('.profile__sticker--left');
    const rightSticker = document.querySelector('.profile__sticker--right');

    if (!profile || !profileTitle || !profileText) return;

    /* ── Initial hidden states ─────────────────────────────── */
    if (header) gsap.set(header, { opacity: 0, y: -20 });
    if (tapeLabel) gsap.set(tapeLabel, { opacity: 0, y: 20, rotation: -3 });
    gsap.set(profileTitle, { y: 80, opacity: 0 });
    gsap.set(markers, { opacity: 0, scale: 0.8 });
    if (cta) gsap.set(cta, { opacity: 0, y: 30 });
    if (decBar) gsap.set(decBar, { opacity: 0 });
    if (leftSticker) gsap.set(leftSticker, { x: -180, opacity: 0, rotate: -28 });
    if (rightSticker) gsap.set(rightSticker, { x: 180, opacity: 0, rotate: 20 });

    /* ── Entrance timeline ─────────────────────────────────── */
    const enterTl = gsap.timeline({
        scrollTrigger: {
            trigger: profile,
            start: 'top 78%',
            once: true,
        },
    });

    /* Section header fades in */
    if (header) {
        enterTl.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
        });
    }

    /* Tape label slides in with rotation */
    if (tapeLabel) {
        enterTl.to(tapeLabel, {
            opacity: 1,
            y: 0,
            rotation: -1,
            duration: 0.7,
            ease: 'power3.out',
        }, '-=0.3');
    }

    /* Title cascades up */
    enterTl.to(profileTitle, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
    }, '-=0.4');

    /* Markers pop in */
    enterTl.to(markers, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(2)',
    }, '-=0.5');

    /* CTA fades up */
    if (cta) {
        enterTl.to(cta, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
        }, '-=0.3');
    }

    /* Decorative bar fades in */
    if (decBar) {
        enterTl.to(decBar, {
            opacity: 0.5,
            duration: 0.6,
            ease: 'power2.out',
        }, '-=0.4');
    }

    /* Stickers fly in */
    if (leftSticker) {
        enterTl.to(leftSticker, {
            x: 0,
            opacity: 1,
            rotate: -16,
            duration: 0.8,
            ease: 'back.out(1.8)',
        }, '-=0.6');
    }

    if (rightSticker) {
        enterTl.to(rightSticker, {
            x: 0,
            opacity: 1,
            rotate: 12,
            duration: 0.8,
            ease: 'back.out(1.8)',
        }, '-=0.7');
    }

    /* ── Scroll color change: white → red ──────────────────── */
    gsap.fromTo(profileTitle,
        { color: '#e8e0d4' },
        {
            color: '#ff3b3b',
            scrollTrigger: {
                trigger: profile,
                start: 'top 40%',
                end: 'top -20%',
                scrub: 0.8,
            },
        }
    );

    /* ── Typewriter effect on scroll ───────────────────────── */
    const rawText = profileText.dataset.fullText || profileText.textContent.trim();
    profileText.dataset.fullText = rawText;
    profileText.textContent = rawText.slice(0, 1);

    ScrollTrigger.create({
        trigger: profile,
        start: 'top 55%',
        end: 'top -30%',
        scrub: 0.2,
        onUpdate: (self) => {
            const visibleChars = Math.max(1, Math.floor(rawText.length * self.progress));
            profileText.textContent = rawText.slice(0, visibleChars);
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   5. CIRCLE REVEAL ANIMATION
═══════════════════════════════════════════════════════════════ */
(function initCircleReveal() {
    const revealSection = document.getElementById('zipper-reveal');
    if (!revealSection) return;

    const cloth = document.getElementById('reveal-cloth');
    const innerContent = document.getElementById('reveal-inner');
    const scrollHint = document.getElementById('reveal-scroll-hint');
    const clothDecor = revealSection.querySelector('.reveal__cloth-decor');
    const closedCopy = revealSection.querySelectorAll('.reveal__closed-copy');
    const videoCards = revealSection.querySelectorAll('.reveal__bento-item');

    if (!cloth || !innerContent || !videoCards.length) return;

    const clamp = gsap.utils.clamp(0, 1);
    const lerp = gsap.utils.interpolate;
    const ease = gsap.parseEase('power3.inOut');

    function setCircleReveal(progress) {
        const openingProgress = clamp(progress / 0.82);
        const finalReveal = clamp((progress - 0.82) / 0.18);
        const eased = ease(openingProgress);
        const copyProgress = clamp(progress / 0.54);
        const radius = lerp(0, state.isMobile ? 150 : 118, eased);
        const ringOpacity = progress < 0.96 ? lerp(0, 1, clamp(progress * 4)) : lerp(1, 0, finalReveal);

        revealSection.style.setProperty('--reveal-radius', `${radius}vmax`);
        revealSection.style.setProperty('--reveal-ring-opacity', ringOpacity.toFixed(3));
        cloth.style.setProperty('--reveal-radius', `${radius}vmax`);
        cloth.style.setProperty('--reveal-edge', `${Math.max(0, radius - 3)}vmax`);

        gsap.set(cloth, {
            opacity: lerp(1, 0, finalReveal),
        });

        gsap.set(innerContent, {
            opacity: lerp(0.08, 1, clamp((progress - 0.04) / 0.7)),
            scale: lerp(0.96, 1, eased),
            filter: `blur(${lerp(14, 0, eased)}px)`,
        });

        if (scrollHint) {
            gsap.set(scrollHint, {
                opacity: lerp(1, 0, clamp(progress * 3.2)),
                y: lerp(0, -18, eased),
            });
        }

        if (clothDecor) {
            gsap.set(clothDecor, {
                opacity: lerp(1, 0, clamp(progress / 0.72)),
                scale: lerp(1, 1.08, eased),
            });
        }

        if (closedCopy.length) {
            gsap.set(closedCopy, {
                opacity: lerp(1, 0, copyProgress),
                y: lerp(0, -24, copyProgress),
            });
        }

        videoCards.forEach((card, index) => {
            const cardProgress = clamp((progress - 0.18 - index * 0.035) / 0.44);
            gsap.set(card, {
                opacity: lerp(0, 1, cardProgress),
                y: lerp(34, 0, cardProgress),
                scale: lerp(0.96, 1, cardProgress),
            });
        });

        revealSection.classList.toggle('is-revealed', progress > 0.96);
    }

    setCircleReveal(0);

    ScrollTrigger.create({
        trigger: revealSection,
        start: 'top top',
        end: state.isMobile ? '+=220%' : '+=185%',
        scrub: 0.75,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            setCircleReveal(self.progress);
        },
    });
})();

/* ═══════════════════════════════════════════════════════════════
   6. SKILLS — SCROLL-BUILT CARD DECK + READY-STATE 3D HOVER
═══════════════════════════════════════════════════════════════ */
(function initSkillCards() {
    const skillsSection = document.querySelector('.skills');
    const skillCards = gsap.utils.toArray('.skill-card');

    if (!skillsSection) return;
    if (!skillCards.length) return;

    const brushEls = skillsSection.querySelectorAll('.skills__brush');
    const cardRotations = [-2.4, 1.1, -0.9, 2.2];

    function setCardsReady(isReady) {
        skillsSection.classList.toggle('skills--cards-ready', isReady);
    }

    function isDeckReady(progress) {
        return progress > 0.82;
    }

    skillCards.forEach((card, i) => {
        card.dataset.restRotation = cardRotations[i] || 0;
    });

    gsap.set(skillCards, {
        y: state.isMobile ? 54 : 190,
        opacity: 0,
        rotationX: state.isMobile ? 0 : 18,
        rotationZ: (i) => cardRotations[i] || 0,
        scale: 0.92,
        z: -40,
        transformPerspective: 1000,
    });

    if (state.isMobile) {
        const mobileTl = gsap.timeline({
            scrollTrigger: {
                trigger: skillsSection,
                start: 'top 74%',
                once: true,
                onEnter: () => setCardsReady(true),
            },
        });

        mobileTl
            .to(skillCards, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                z: 0,
                duration: 0.78,
                stagger: 0.14,
                ease: 'power3.out',
            }, '-=0.25');
    } else {
        const skillsTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.skills__grid',
                start: 'top 92%',
                end: 'top 28%',
                scrub: 0.65,
                invalidateOnRefresh: true,
                onUpdate: (self) => setCardsReady(isDeckReady(self.progress)),
                onRefresh: (self) => setCardsReady(isDeckReady(self.progress)),
                onLeave: () => setCardsReady(true),
                onLeaveBack: () => setCardsReady(false),
            },
        });

        skillsTl
            .to(brushEls, {
                x: (i) => i === 0 ? 80 : -70,
                duration: 0.55,
                ease: 'none',
            }, 0);

        skillCards.forEach((card, i) => {
            skillsTl.to(card, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                scale: 1,
                z: 0,
                duration: 0.18,
                ease: 'power3.out',
            }, 0.18 + i * 0.16);
        });

        skillsTl.to(skillCards, {
            y: -8,
            duration: 0.16,
            stagger: 0.025,
            ease: 'sine.inOut',
        }, 0.9);
    }

    /* Hover tilt unlocks after the scroll-built deck is complete. */
    if (!state.isMobile) {
        skillCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                if (!skillsSection.classList.contains('skills--cards-ready')) return;

                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);

                gsap.to(card, {
                    rotateY: dx * 12,
                    rotateX: -dy * 8,
                    z: 34,
                    scale: 1.025,
                    duration: 0.34,
                    ease: 'power3.out',
                    transformPerspective: 1000,
                });
            });

            card.addEventListener('mouseleave', () => {
                const restRotation = parseFloat(card.dataset.restRotation || '0');

                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    z: 0,
                    scale: 1,
                    rotationZ: restRotation,
                    duration: 0.65,
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
        '.experience__num, .projects__num, .education__num'
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
        '.experience__title, .projects .projects__pop-label, .education__title'
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
   BONUS — FOOTER REVEAL ANIMATION
═══════════════════════════════════════════════════════════════ */
(function initFooterReveal() {
    const footerTitle = document.querySelector('.footer__title');
    const footerCols = document.querySelectorAll('.footer__col');
    const footerMiddle = document.querySelector('.footer__middle');

    if (footerTitle) {
        gsap.set(footerTitle, { y: 40, opacity: 0 });
        ScrollTrigger.create({
            trigger: '.footer__top',
            start: 'top 82%',
            once: true,
            onEnter: () => {
                gsap.to(footerTitle, {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                });
            },
        });
    }

    if (footerCols.length) {
        gsap.set(footerCols, { y: 30, opacity: 0 });
        ScrollTrigger.create({
            trigger: '.footer__columns',
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(footerCols, {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                });
            },
        });
    }

    if (footerMiddle) {
        gsap.set(footerMiddle, { y: 20, opacity: 0 });
        ScrollTrigger.create({
            trigger: footerMiddle,
            start: 'top 88%',
            once: true,
            onEnter: () => {
                gsap.to(footerMiddle, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            },
        });
    }

    /* Back to top smooth scroll */
    const backTop = document.getElementById('footer-back-top');
    if (backTop) {
        backTop.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1.4,
                scrollTo: { y: '#hero', offsetY: 0 },
                ease: 'power3.inOut',
            });
        });
    }
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

            // Set the art as background — NO movement/tilt/scale
            letter.style.backgroundImage = `url("${artSrc}")`;
            letter.style.setProperty('--hero-art-position', letter.dataset.artPosition || 'center center');
            letter.style.setProperty('--hero-art-size', letter.dataset.artSize || 'auto 120%');
            letter.classList.add('is-revealed');
        });

        // ── MOUSE LEAVE: revert to solid text ────────────────
        letter.addEventListener('mouseleave', () => {
            letter.classList.remove('is-revealed');
            // Clear background image immediately
            letter.style.backgroundImage = '';
            letter.style.removeProperty('--hero-art-position');
            letter.style.removeProperty('--hero-art-size');
            letter.style.webkitTextFillColor = '';
            letter.style.color = '';
        });
    });
})();

/* ═══════════════════════════════════════════════════════════════
   HERO BACKGROUND GLOW — Torch-in-the-dark spotlight
   Mouse acts like a fire revealing the red-glowing portrait
   behind the text. Updates CSS mask custom properties.
═══════════════════════════════════════════════════════════════ */
(function initHeroBackgroundGlow() {
    const hero = document.querySelector('.hero');
    const portrait = document.getElementById('hero-portrait');
    if (!hero || !portrait) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = portrait.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        portrait.style.setProperty('--glow-x', x + 'px');
        portrait.style.setProperty('--glow-y', y + 'px');
    });

    hero.addEventListener('mouseleave', () => {
        portrait.style.setProperty('--glow-x', '-999px');
        portrait.style.setProperty('--glow-y', '-999px');
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
