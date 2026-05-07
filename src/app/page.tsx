'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

const navItems = ['about', 'services', 'projects', 'contact']

const brands = [
  { name: 'NirogOS', note: 'Live clinic SaaS', icon: 'N+' },
  { name: 'Sobi', note: 'Nearby social', icon: 'SO' },
  { name: 'Questlog', note: 'Learning quests', icon: 'Q' },
  { name: 'Brand Matterz', note: 'Creative work', icon: 'BM' },
  { name: 'Sahil Labs', note: 'Product ideas', icon: 'SL' },
]

const dashboardTiles = [
  {
    title: 'Soft Studio',
    meta: 'Photo texture / gradient wash',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=80',
  },
  {
    title: 'Material Mood',
    meta: 'Glass / grain / layered color',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1100&q=80',
  },
  {
    title: 'Color Play',
    meta: 'Abstract app atmosphere',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1100&q=80',
  },
  {
    title: 'Editorial Light',
    meta: 'Photography / poster energy',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=80',
  },
  {
    title: 'Motion Cards',
    meta: '3D surfaces / bold spacing',
    image: 'https://images.unsplash.com/photo-1635776062043-223faf322554?auto=format&fit=crop&w=1100&q=80',
  },
  {
    title: 'Paper Grain',
    meta: 'Tactile layout studies',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1100&q=80',
  },
  {
    title: 'Neon Detail',
    meta: 'Interface glow / night palette',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=80',
  },
  {
    title: 'Shape System',
    meta: 'Rounded symbols / visual rhythm',
    image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=1100&q=80',
  },
]

const services = [
  {
    number: '01',
    title: 'Full stack SaaS',
    description: 'React, Supabase, Vercel, auth, realtime data, dashboards, and deployment for usable product systems.',
  },
  {
    number: '02',
    title: 'Product websites',
    description: 'Bold portfolio and landing pages with conversion copy, scroll motion, mobile layouts, and visual polish.',
  },
  {
    number: '03',
    title: 'Research and analytics',
    description: 'Questionnaires, field study work, competitor research, Excel, Power BI basics, reports, and insights.',
  },
  {
    number: '04',
    title: 'Marketing content',
    description: 'Campaign creatives, social media assets, digital branding, launch positioning, and content systems.',
  },
  {
    number: '05',
    title: 'AI build workflows',
    description: 'Fast product prototyping with Cursor, Codex, ChatGPT, Gemini, Claude, and prompt-led iteration.',
  },
]

const projects = [
  {
    number: '01',
    client: 'NirogOS',
    status: 'LIVE PROJECT',
    href: 'https://nirogos.in/',
    title: 'Clinic Management SaaS',
    copy: 'A full-stack healthcare platform built and deployed for clinic operations, patient queueing, scheduling, EMR workflows, and responsive dashboards.',
    tags: ['React', 'Supabase', 'Realtime', 'Vercel'],
    colors: ['#eafff7', '#75e6bf', '#0d1f18', '#c9ff5f'],
  },
  {
    number: '02',
    client: 'Sobi',
    status: 'IN MIND',
    title: 'Nearby Social Layer',
    copy: 'A proximity-first social app concept for discovering people, places, and moments around you through playful mobile interactions.',
    tags: ['Mobile app', 'Social', 'Location', 'Prototype'],
    colors: ['#ebe7ff', '#8d6cff', '#101026', '#ef55d3'],
  },
  {
    number: '03',
    client: 'Questlog',
    status: 'IN MIND',
    title: 'Learning Quest Tracker',
    copy: 'A gamified progress system that turns learning, habits, and self-improvement into quests, streaks, levels, and reflection loops.',
    tags: ['Gamified', 'Learning', 'Habits', 'AI-ready'],
    colors: ['#fff1b8', '#ffb13d', '#201307', '#62e6ff'],
  },
]

const testimonials = [
  ['Sahil moves fast, thinks visually, and keeps the product logic underneath the page intact.', 'Product feedback'],
  ['He can take a loose idea and make it feel like a real, usable product in a short sprint.', 'Build collaborator'],
  ['NirogOS shows he can own requirements, UI, frontend, backend, and deployment together.', 'Project note'],
  ['His edge is the mix of marketing instincts, research habits, and hands-on full-stack execution.', 'Creative partner'],
  ['Good taste, practical tools, and the patience to keep polishing until the screen feels right.', 'Launch review'],
  ['He understands that content, design, and business goals need to speak the same language.', 'Brand note'],
]

const footerMarks = ['SA', 'HI', 'L']

function ProjectMedia({ colors }: { colors: string[] }) {
  const style = {
    '--c1': colors[0],
    '--c2': colors[1],
    '--c3': colors[2],
    '--c4': colors[3],
  } as CSSProperties

  return (
    <div className="project-media" aria-hidden="true" style={style}>
      <div className="media-large abstract-tile">
        <span className="abstract-loop loop-one" />
        <span className="abstract-loop loop-two" />
        <span className="abstract-pill pill-one" />
        <span className="abstract-pill pill-two" />
      </div>
      <div className="media-stack">
        <div className="media-small abstract-tile is-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="media-small abstract-tile is-symbol">
          <span />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false })
    const update = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  useEffect(() => {
    if (!rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.nav-shell', { y: -24, opacity: 0, duration: 0.7 })
        .from('.hero-mini-nav span', { y: 14, opacity: 0, stagger: 0.055, duration: 0.5 }, '-=0.25')
        .from('.hero-word', { yPercent: 114, rotateX: 12, opacity: 0, stagger: 0.08, duration: 1 }, '-=0.18')
        .from('.hero-copy, .hero-contact-pill', { y: 28, opacity: 0, stagger: 0.08, duration: 0.68 }, '-=0.48')
        .from('.memoji-depth', { y: 95, z: -160, rotateX: 18, opacity: 0, duration: 1, ease: 'back.out(1.2)' }, '-=0.52')

      gsap.to('.hero-title', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-panel', start: 'top top', end: 'bottom top', scrub: 1 },
      })

      gsap.to('.memoji-depth', {
        yPercent: 12,
        scale: 0.93,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-panel', start: 'top top', end: 'bottom top', scrub: 1 },
      })

      gsap.to('.brand-track', {
        xPercent: -36,
        ease: 'none',
        scrollTrigger: { trigger: '.brands-panel', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.to('.dashboard-row.is-one .dashboard-track', {
        xPercent: -24,
        ease: 'none',
        scrollTrigger: { trigger: '.dashboard-panel', start: 'top bottom', end: 'center center', scrub: 1 },
      })

      gsap.fromTo('.dashboard-row.is-two .dashboard-track', { xPercent: -22 }, {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.dashboard-panel', start: 'center center', end: 'bottom top', scrub: 1 },
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 52, opacity: 0, filter: 'blur(8px)' }, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.service-row').forEach((row, index) => {
        gsap.fromTo(row, { y: 46, opacity: 0, filter: 'blur(8px)' }, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          delay: index * 0.04,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 82%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.dashboard-tile').forEach((tile, index) => {
        gsap.fromTo(tile, { y: 42, opacity: 0, scale: 0.96 }, {
          y: 0,
          scale: 1,
          opacity: 1,
          delay: index * 0.025,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: tile, start: 'top 88%' },
        })
      })

      gsap.matchMedia().add('(min-width: 801px)', () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: '.about-panel',
            pin: '.about-stage',
            start: 'top top+=86',
            end: '+=760',
            scrub: 0.85,
          },
        })
          .fromTo('.about-title', { scale: 0.82, opacity: 0.2 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
          .fromTo('.about-copy-block p', { y: 70, opacity: 0.08 }, { y: 0, opacity: 1, stagger: 0.12, ease: 'none' }, 0.08)
          .to('.sticker-heart', { x: 34, y: -18, rotate: 12, ease: 'none' }, 0)
          .to('.sticker-flower', { x: -30, y: 24, rotate: -10, ease: 'none' }, 0)
          .to('.sticker-gem', { x: -24, y: -24, rotate: 14, ease: 'none' }, 0)

        gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, index) => {
          gsap.fromTo(card, { y: 90, opacity: 0, rotateX: 6 }, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%' },
          })
        })
      })

      gsap.to('.quote-row.is-one .quote-track', {
        xPercent: -29,
        ease: 'none',
        scrollTrigger: { trigger: '.testimonials-panel', start: 'top bottom', end: 'center center', scrub: 1 },
      })

      gsap.fromTo('.quote-row.is-two .quote-track', { xPercent: -28 }, {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.testimonials-panel', start: 'center center', end: 'bottom top', scrub: 1 },
      })

      gsap.utils.toArray<HTMLElement>('.floaty').forEach((item, index) => {
        gsap.to(item, {
          y: index % 2 === 0 ? -12 : 12,
          rotate: index % 2 === 0 ? 7 : -7,
          duration: 2.7 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      const hero = document.querySelector<HTMLElement>('.hero-panel')
      const memoji = document.querySelector<HTMLElement>('.memoji-depth')
      const onMove = (event: MouseEvent) => {
        if (!hero || !memoji) return
        const rect = hero.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        gsap.to(memoji, { rotateY: x * 14, rotateX: y * -12, duration: 0.45, ease: 'power2.out' })
      }
      const onLeave = () => gsap.to('.memoji-depth', { rotateY: 0, rotateX: 0, duration: 0.55, ease: 'power2.out' })
      hero?.addEventListener('mousemove', onMove)
      hero?.addEventListener('mouseleave', onLeave)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 2400)
  }

  return (
    <div ref={rootRef} className="portfolio-shell">
      <div className="noise-layer" />

      <header className="nav-shell">
        <button className="nav-brand" onClick={() => scrollToSection('top')} type="button">SAHIL</button>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <button key={item} onClick={() => scrollToSection(item)} type="button">{item}</button>
          ))}
        </nav>
        <button
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          className={`mobile-toggle${mobileOpen ? ' is-open' : ''}`}
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-drawer${mobileOpen ? ' is-open' : ''}`}>
        {[...navItems, 'testimonials'].map((item) => (
          <button key={item} onClick={() => scrollToSection(item)} type="button">{item}</button>
        ))}
      </div>

      <main>
        <section className="hero-panel" id="top">
          <div className="hero-inner">
            <div className="hero-mini-nav">
              <span>ABOUT</span>
              <span>CUSTOMERS</span>
              <span>PROJECTS</span>
              <span>CONTACT</span>
            </div>

            <p className="hero-copy">
              Full-stack developer crafting bold products, clean systems, and launch-ready digital experiences.
            </p>

            <h1 className="hero-title" aria-label="Hi, I'm Sahil">
              <span className="word-mask"><span className="hero-word">HI, I&apos;M SAHIL</span></span>
            </h1>

            <button className="hero-contact-pill" onClick={() => scrollToSection('contact')} type="button">CONTACT ME</button>

            <div className="memoji-stage" aria-hidden="true">
              <div className="memoji-shadow" />
              <div className="memoji-depth">
                <Image src="/sahil-memoji.png" alt="" width={900} height={600} priority className="memoji-image" />
              </div>
            </div>
          </div>
        </section>

        <section className="brands-panel section-box" aria-label="Brands and product ideas">
          <div className="brand-track">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <article className="brand-card" key={`${brand.name}-${index}`}>
                <span>{brand.icon}</span>
                <div>
                  <strong>{brand.name}</strong>
                  <p>{brand.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-panel section-box" aria-label="Visual dashboard">
          <div className="dashboard-heading" data-reveal>
            <span>Design Texture Board</span>
            <p>Cool photography, tactile surfaces, abstract color, and bold UI moods for the visual direction.</p>
          </div>
          {[0, 1].map((row) => (
            <div className={`dashboard-row ${row === 0 ? 'is-one' : 'is-two'}`} key={row}>
              <div className="dashboard-track">
                {[...dashboardTiles.slice(row * 4, row * 4 + 4), ...dashboardTiles.slice(row * 4, row * 4 + 4)].map((tile, index) => (
                  <article className="dashboard-tile" key={`${tile.title}-${index}`} style={{ backgroundImage: `url(${tile.image})` }}>
                    <span>{tile.title}</span>
                    <p>{tile.meta}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="panel about-panel section-box" id="about">
          <div className="panel-inner about-stage">
            <Image src="/heart-3d-cut.png" alt="" width={132} height={132} className="sticker-3d sticker-heart floaty" aria-hidden="true" />
            <Image src="/flower-3d-cut.png" alt="" width={132} height={132} className="sticker-3d sticker-flower floaty" aria-hidden="true" />
            <Image src="/gem-3d-cut.png" alt="" width={122} height={122} className="sticker-3d sticker-gem floaty" aria-hidden="true" />

            <div className="about-copy-block">
              <h2 className="display-title about-title">ABOUT ME</h2>
              <p className="section-copy">
                I am Sahil Kamble from Pune, a BBA Marketing graduate who builds like a product person. I combine research, campaign thinking, UI taste, and full-stack execution to turn rough ideas into useful software.
              </p>
              <p className="section-copy secondary">
                My strongest live proof is NirogOS, a clinic SaaS built with React, Supabase, realtime workflows, and Vercel. Alongside that I am shaping Sobi as a nearby social idea and Questlog as a gamified learning tracker.
              </p>
              <p className="section-copy tertiary">
                The marketing side comes from Brand Matterz work, field studies, competitor analysis, campaign assets, Excel, Power BI basics, and content systems. I like building screens that look sharp, but also know what job they are doing.
              </p>
              <button className="hero-contact-pill about-cta" onClick={() => scrollToSection('contact')} type="button">CONTACT ME</button>
            </div>
          </div>
        </section>

        <section className="panel services-panel section-box" id="services">
          <div className="panel-inner services-scene">
            <h2 className="display-title services-title" data-reveal>SERVICES</h2>
            <div className="services-list">
              {services.map((service) => (
                <article className="service-row" key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="panel projects-panel section-box" id="projects">
          <div className="panel-inner">
            <h2 className="display-title projects-title" data-reveal>PROJECTS</h2>
            <div className="projects-stack">
              {projects.map((project, index) => (
                <article className="project-card" key={project.title} style={{ top: `${7 + index * 1.3}rem` }}>
                  <div className="project-header">
                    <div className="project-kicker">
                      <span>{project.number}</span>
                      <div>
                        <strong>CLIENT</strong>
                        <p>{project.client}</p>
                      </div>
                    </div>
                    {project.href ? (
                      <a className="outline-pill" href={project.href} rel="noreferrer" target="_blank">{project.status}</a>
                    ) : (
                      <span className="outline-pill is-muted">{project.status}</span>
                    )}
                  </div>
                  <div className="project-body">
                    <div className="project-copy">
                      <h3>{project.title}</h3>
                      <p>{project.copy}</p>
                      <div className="project-tags">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                    <ProjectMedia colors={project.colors} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-panel section-box" id="testimonials">
          <div className="quotes-heading">
            <h2 className="quotes-title">What Clients Are Saying</h2>
            <span className="emoji-badge" aria-hidden="true">😍</span>
          </div>
          {[0, 1].map((row) => (
            <div className={`quote-row ${row === 0 ? 'is-one' : 'is-two'}`} key={row}>
              <div className="quote-track">
                {[...testimonials.slice(row * 3, row * 3 + 3), ...testimonials.slice(row * 3, row * 3 + 3)].map(([quote, person], index) => (
                  <article className="quote-card" key={`${person}-${index}`}>
                    <p>{quote}</p>
                    <span>{person}</span>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="contact-panel" id="contact">
          <div className="contact-upper section-box">
            <Image src="/flower-3d-cut.png" alt="" width={120} height={120} className="contact-shape shape-one" aria-hidden="true" />
            <Image src="/lightning-3d.png" alt="" width={120} height={120} className="contact-shape shape-two" aria-hidden="true" />
            <div className="panel-inner contact-grid">
              <div>
                <h2 className="contact-title">LET&apos;S GET IN TOUCH</h2>
                <a href="mailto:sahilkamble25614@gmail.com" className="contact-mail">sahilkamble25614@gmail.com</a>
                <p className="contact-location">Yerwada, Pune / +91 76204 22387</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <input aria-label="Full name" name="name" placeholder="Full Name" type="text" />
                <input aria-label="Email" name="email" placeholder="Email" type="email" />
                <input aria-label="Project type" name="project" placeholder="Project / Idea" type="text" />
                <textarea aria-label="Project details" name="message" placeholder="Message" rows={3} />
                <button className="send-button" type="submit">SEND</button>
                <p className={`form-toast${sent ? ' visible' : ''}`}>Message draft ready. Backend wiring can be added next.</p>
              </form>
            </div>
          </div>

          <footer className="contact-lower">
            <div className="panel-inner footer-grid">
              <div>
                <p className="footer-name">SAHIL</p>
                <div className="footer-wordmark" aria-hidden="true">
                  {footerMarks.map((mark, index) => (
                    <span className={`footer-mark tone-${index + 1}`} key={mark}>{mark}</span>
                  ))}
                </div>
              </div>
              <div className="footer-meta">
                <div>
                  <span>SOCIAL</span>
                  <a href="https://www.linkedin.com/in/sahil-g-kamble/" rel="noreferrer" target="_blank">LinkedIn</a>
                  <a href="https://nirogos.in/" rel="noreferrer" target="_blank">NirogOS</a>
                  <p>Portfolio</p>
                </div>
                <div>
                  <span>STACK</span>
                  <p>React / Supabase / Vercel</p>
                  <p>WordPress / Elementor / Canva</p>
                  <p>Cursor / Codex / Claude</p>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}
