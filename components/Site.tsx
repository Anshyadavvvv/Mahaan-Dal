'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Menu,
  X,
  Send,
  GraduationCap,
  Briefcase,
  Scale,
  HeartPulse,
  Users,
  Tractor,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Award,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  UserCheck,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import hi from '@/lib/translations/hi.json';
import en from '@/lib/translations/en.json';
import { siteConfig } from '@/lib/config';

type Lang = 'hi' | 'en';
type Kind = 'letter' | 'jan' | 'member';
type Dict = typeof hi;

const navLinks = [
  ['foundation', '/#foundation'],
  ['agenda', '/#agenda'],
  ['about', '/about'],
  ['history', '/history'],
  ['contact', '/contact']
] as const;

export function Site({ children }: { children?: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('hi');
  const [open, setOpen] = useState<Kind | null>(null);
  const [menu, setMenu] = useState(false);

  const t = (lang === 'hi' ? hi : en) as Dict;

  useEffect(() => {
    const saved = localStorage.getItem('mahan-lang') as Lang | null;
    if (saved === 'en' || saved === 'hi') setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    localStorage.setItem('mahan-lang', lang);
  }, [lang]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (menu) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [menu]);

  useEffect(() => {
    const fn = (e: Event) => setOpen((e as CustomEvent<Kind>).detail);
    window.addEventListener('md:open', fn);
    return () => window.removeEventListener('md:open', fn);
  }, []);

  const toggleLang = () => setLang((l) => (l === 'hi' ? 'en' : 'hi'));

  return (
    <div className="site-root">
      {/* Top Tricolor Accent */}
      <div className="tricolor-stripe" aria-hidden="true" />

      {/* Official Announcement Top Bar (Desktop & Tablet) */}
      <div className="top-bar">
        <div className="wrap top-bar-inner">
          <div className="top-bar-notice">
            <span className="top-bar-badge">आधिकारिक पोर्टल</span>
            <span className="top-bar-text">{t.eciNotice}</span>
          </div>
          <div className="top-bar-right">
            <a href="tel:18001200000" className="top-bar-contact">
              <Phone size={13} />
              <span>{t.helpline}: 1800-120-0000</span>
            </a>
            <div className="footer-social-links" style={{ gap: 8 }}>
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="top-bar-contact" aria-label="Facebook">
                <Facebook size={14} />
              </a>
              <a href={siteConfig.social.x} target="_blank" rel="noreferrer" className="top-bar-contact" aria-label="X (Twitter)">
                <span style={{ fontSize: 13, fontWeight: 'bold' }}>𝕏</span>
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="top-bar-contact" aria-label="YouTube">
                <Youtube size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header className="header">
        <div className="wrap header-inner">
          <Link href="/" className="logo" aria-label={`${t.brand} Home`}>
            <div className="logo-badge" aria-hidden="true">
              <span>म</span>
            </div>
            <div className="logo-texts">
              <span className="logo-title">{t.brand}</span>
              <span className="logo-sub">{lang === 'hi' ? 'हक़ • अधिकार • न्याय' : 'Rights • Dignity • Justice'}</span>
            </div>
          </Link>

          <nav className="nav" aria-label="Main Navigation">
            {navLinks.map(([key, url]) => (
              <Link key={key} href={url}>
                {t.nav[key]}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button className="lang-switch" onClick={toggleLang} aria-label="Switch Language">
              <span>{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ fontWeight: 800 }}>{lang === 'hi' ? 'EN' : 'हि'}</span>
            </button>

            <button className="btn-header-join" onClick={() => setOpen('member')}>
              <UserCheck size={16} />
              <span>{t.membership}</span>
            </button>

            <button
              className="menu-btn"
              onClick={() => setMenu((v) => !v)}
              aria-label={t.menu}
              aria-expanded={menu}
            >
              {menu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Drawer Modal with Backdrop */}
        <AnimatePresence>
          {menu && (
            <motion.div
              className="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenu(false)}
            >
              <motion.div
                className="mobile-drawer-sheet"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label="Mobile Navigation"
              >
                <div className="mobile-drawer-header">
                  <div className="logo" style={{ gap: 10 }}>
                    <div className="logo-badge" style={{ width: 38, height: 38, fontSize: 20 }}>
                      <span>म</span>
                    </div>
                    <span className="logo-title" style={{ fontSize: 20 }}>
                      {t.brand}
                    </span>
                  </div>
                  <button className="modal-close-btn" style={{ position: 'static' }} onClick={() => setMenu(false)} aria-label="Close menu">
                    <X size={20} />
                  </button>
                </div>

                <div className="mobile-drawer-links">
                  {navLinks.map(([key, url]) => (
                    <Link
                      key={key}
                      href={url}
                      className="mobile-drawer-link"
                      onClick={() => setMenu(false)}
                    >
                      <span>{t.nav[key]}</span>
                      <ChevronRight size={16} color="#94a3b8" />
                    </Link>
                  ))}
                  <Link
                    href="/jan-sunwai"
                    className="mobile-drawer-link"
                    onClick={() => setMenu(false)}
                  >
                    <span>{t.jan}</span>
                    <ChevronRight size={16} color="#94a3b8" />
                  </Link>
                  <Link
                    href="/membership"
                    className="mobile-drawer-link"
                    onClick={() => setMenu(false)}
                  >
                    <span>{t.membership}</span>
                    <ChevronRight size={16} color="#94a3b8" />
                  </Link>
                </div>

                <div className="mobile-drawer-actions">
                  <button
                    className="btn-header-join"
                    style={{ width: '100%', justifyContent: 'center', height: 48, fontSize: 16 }}
                    onClick={() => {
                      setMenu(false);
                      setOpen('member');
                    }}
                  >
                    <UserCheck size={18} />
                    <span>{t.membership}</span>
                  </button>

                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <button
                      className="lang-switch"
                      style={{ flex: 1, justifyContent: 'center', height: 44 }}
                      onClick={toggleLang}
                    >
                      <span>भाषा: </span>
                      <strong>{lang === 'hi' ? 'Switch to English' : 'हिन्दी में देखें'}</strong>
                    </button>
                  </div>

                  <a
                    href="tel:18001200000"
                    className="btn-portal"
                    style={{
                      marginTop: 12,
                      background: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      color: '#0f172a',
                      textDecoration: 'none',
                      height: 44
                    }}
                  >
                    <Phone size={16} color="#15803d" />
                    <span>{lang === 'hi' ? 'टोल-फ्री हेल्पलाइन: 1800-120-0000' : 'Toll-Free Helpline: 1800-120-0000'}</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <div className="content-wrapper">
        {children ?? <Home t={t} lang={lang} />}
      </div>

      {/* Portal Footer */}
      <Footer t={t} lang={lang} />

      {/* Floating Action Button (Desktop & Tablet only - hidden on phone) */}
      <button
        className="float-letter"
        onClick={() => setOpen('letter')}
        aria-label={t.letter}
      >
        <Send size={18} />
        <span>{t.letter}</span>
      </button>

      {/* 3-Action Mobile Bottom Dock for Phones (iPhone, Samsung, etc.) */}
      <div className="bottom-dock" role="navigation" aria-label="Quick Actions">
        <button
          className="dock-action-btn btn-dock-member"
          onClick={() => setOpen('member')}
          aria-label={t.membership}
        >
          <UserCheck size={18} />
          <span>{t.membership}</span>
        </button>

        <button
          className="dock-action-btn btn-dock-jan"
          onClick={() => setOpen('jan')}
          aria-label={t.jan}
        >
          <FileText size={18} />
          <span>{t.jan}</span>
        </button>

        <button
          className="dock-action-btn btn-dock-letter"
          onClick={() => setOpen('letter')}
          aria-label={t.letter}
        >
          <Send size={18} />
          <span>{lang === 'hi' ? 'पत्र लिखें' : 'Write Letter'}</span>
        </button>
      </div>

      {/* Multi-Purpose Modal Dialog */}
      <FormModal kind={open} close={() => setOpen(null)} t={t} lang={lang} />
    </div>
  );
}

function Home({ t, lang }: { t: Dict; lang: Lang }) {
  const [slide, setSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const touchStart = useRef(0);

  useEffect(() => {
    if (heroPaused) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroPaused]);

  const triggerModal = (kind: Kind) => {
    window.dispatchEvent(new CustomEvent('md:open', { detail: kind }));
  };

  const agendaIcons = [GraduationCap, Briefcase, Scale, HeartPulse, Users, Tractor];

  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
        onTouchStart={(e) => {
          setHeroPaused(true);
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 50) {
            setSlide((s) => (s + (delta < 0 ? 1 : 2)) % 3);
          }
          setHeroPaused(false);
        }}
      >
        <div className="hero-pattern" />
        <div className="hero-glow" />

        <div className="wrap hero-inner">
          <div className="hero-copy">
            <div className="hero-tag">
              <Sparkles size={14} />
              <span>{t.brand} · {t.tagline}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <h1>{t.hero[slide].title}</h1>
                <p>{slide === 0 ? t.quote : t.hero[slide].subtitle}</p>

                <div className="hero-actions">
                  <button
                    className="btn-primary"
                    onClick={() => {
                      if (slide === 1) triggerModal('jan');
                      else if (slide === 2) triggerModal('member');
                      else document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>{t.hero[slide].cta}</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    className="btn-outline-white"
                    onClick={() => triggerModal('letter')}
                  >
                    <Send size={16} />
                    <span>{t.letter}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Controls */}
            <div className="hero-controls">
              {t.hero.map((_, idx) => (
                <button
                  key={idx}
                  className={`hero-dot ${idx === slide ? 'active' : ''}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* President Prestige Card in Hero */}
          <div className="president-card-hero">
            <div className="president-portrait-frame">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="president-silhouette-svg"
                aria-hidden="true"
              >
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
              </svg>
              <div className="president-badge-chip">
                <span>{t.president}</span>
              </div>
            </div>

            <div className="president-name-plate">
              <h3>{siteConfig.president}</h3>
              <span>{t.president}</span>
            </div>

            <p className="president-quote-snippet">
              “{t.quote.length > 90 ? t.quote.slice(0, 85) + '…' : t.quote}”
            </p>

            <button
              className="btn-header-join"
              style={{ width: '100%', justifyContent: 'center', height: 46 }}
              onClick={() => triggerModal('letter')}
            >
              <Send size={15} />
              <span>{t.letter}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="stats-ribbon">
        <div className="wrap">
          <div className="stats-grid">
            {t.stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <span className="stat-val">{s.val}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Core Public Service Portals */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">{lang === 'hi' ? 'जन सेवा प्रकोष्ठ' : 'Citizen Portals'}</span>
            <h2>{lang === 'hi' ? 'सीधे जुड़ें और समाधान पाएँ' : 'Connect Directly With Mahan Dal'}</h2>
            <p>
              {lang === 'hi'
                ? 'प्रशासनिक सहायता, संगठनात्मक सुझाव अथवा पार्टी की सदस्यता के लिए समर्पित डिजिटल माध्यम।'
                : 'Dedicated public access channels for grievance redressal, leadership communication and digital membership.'}
            </p>
          </div>

          <div className="portals-grid">
            {/* 1. Jan Sunwai */}
            <article className="portal-card orange">
              <div className="portal-icon">
                <Scale size={28} />
              </div>
              <h3>{t.services.janSunwaiTitle}</h3>
              <p>{t.services.janSunwaiDesc}</p>
              <button className="btn-portal" onClick={() => triggerModal('jan')}>
                <span>{t.jan}</span>
                <ArrowRight size={16} />
              </button>
            </article>

            {/* 2. Direct Letter to President */}
            <article className="portal-card green">
              <div className="portal-icon">
                <Send size={28} />
              </div>
              <h3>{t.services.letterTitle}</h3>
              <p>{t.services.letterDesc}</p>
              <button className="btn-portal" onClick={() => triggerModal('letter')}>
                <span>{t.letter}</span>
                <ArrowRight size={16} />
              </button>
            </article>

            {/* 3. Digital Membership */}
            <article className="portal-card blue">
              <div className="portal-icon">
                <UserCheck size={28} />
              </div>
              <h3>{t.services.memberTitle}</h3>
              <p>{t.services.memberDesc}</p>
              <button className="btn-portal" onClick={() => triggerModal('member')}>
                <span>{t.membership}</span>
                <ArrowRight size={16} />
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* Leadership Showcase Section */}
      <section className="section" id="leadership">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">{t.president}</span>
            <h2>{t.presidentSection.title}</h2>
            <p>{t.presidentSection.subtitle}</p>
          </div>

          <div className="president-showcase">
            <div className="showcase-visual">
              <div className="showcase-frame">
                <svg
                  viewBox="0 0 24 24"
                  fill="#ea580c"
                  style={{ width: 100, height: 100 }}
                  aria-hidden="true"
                >
                  <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
                </svg>
              </div>
              <div className="showcase-title-box">
                <h3>{siteConfig.president}</h3>
                <span>{t.president} · महान दल</span>
              </div>
            </div>

            <div className="showcase-content">
              <span className="kicker" style={{ alignSelf: 'flex-start' }}>
                {lang === 'hi' ? 'अध्यक्षीय संकल्प' : 'Leadership Pledge'}
              </span>
              <blockquote className="quote-highlight">
                “{t.quote}”
              </blockquote>
              <p className="showcase-bio">
                {t.presidentSection.bio}
              </p>
              <div className="showcase-cta">
                <button className="btn-header-join" onClick={() => triggerModal('letter')}>
                  <Send size={16} />
                  <span>{t.letter}</span>
                </button>
                <button
                  className="btn-header-join"
                  style={{ background: '#0f172a' }}
                  onClick={() => triggerModal('member')}
                >
                  <UserCheck size={16} />
                  <span>{t.membership}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles / Foundation */}
      <section className="section section-alt" id="foundation">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">{t.brand}</span>
            <h2>{t.foundation}</h2>
            <p>{t.foundationSubtitle}</p>
          </div>

          <div className="pillars-grid">
            {t.foundationCards.map(([title, desc], i) => (
              <motion.article
                className="pillar-card"
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="pillar-icon-box">
                  {i === 0 ? <Users size={26} /> : i === 1 ? <Scale size={26} /> : <HeartPulse size={26} />}
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Point People's Agenda */}
      <section className="section" id="agenda">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">{lang === 'hi' ? 'दृष्टिकोण एवं संकल्प' : 'Vision & Charter'}</span>
            <h2>{t.agenda}</h2>
            <p>{t.agendaSubtitle}</p>
          </div>

          <div className="agenda-grid">
            {t.agendaDetails.map((item, idx) => {
              const Icon = agendaIcons[idx] || Scale;
              return (
                <article className="agenda-item-card" key={idx}>
                  <div className="agenda-item-header">
                    <div className="agenda-number-pill">
                      <span>0{idx + 1}</span>
                    </div>
                    <div>
                      <Icon size={20} color="#ea580c" />
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <p>{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guiding Inspirations */}
      <section className="section section-inspirations">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">{t.inspiration}</span>
            <h2>{t.inspiration}</h2>
            <p>{t.inspirationSubtitle}</p>
          </div>

          <div className="inspirations-grid">
            {t.inspirationsList.map((insp, idx) => (
              <article className="inspiration-card" key={idx}>
                <div className="inspiration-avatar-ring">
                  <Award size={32} />
                </div>
                <h3>{insp.name}</h3>
                <span className="inspiration-role">{insp.title}</span>
                <p>{insp.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* News & Movement Activities */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">{lang === 'hi' ? 'ताज़ा समाचार' : 'Latest Updates'}</span>
            <h2>{t.events}</h2>
            <p>{t.eventsSubtitle}</p>
          </div>

          <div className="news-grid">
            {t.newsUpdates.map((news, i) => (
              <article className="news-card" key={i}>
                <div className="news-meta">
                  <span className="news-tag">{news.tag}</span>
                  <span className="news-date">{news.date}</span>
                </div>
                <h3>{news.title}</h3>
                <p>{news.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Call to Action */}
      <section className="cta-banner">
        <div className="wrap cta-banner-inner">
          <div className="cta-banner-text">
            <h2>{lang === 'hi' ? 'न्याय के संघर्ष में अपना योगदान दें' : 'Stand With Us For Equality and Justice'}</h2>
            <p>
              {lang === 'hi'
                ? 'महान दल के जन आंदोलन से जुड़कर समाज के शोषित व वंचित वर्ग को उनका संवैधानिक हक़ दिलाने में सहभागी बनें।'
                : 'Join the Mahan Dal movement to secure dignity, equal representation and constitutional justice for all.'}
            </p>
          </div>
          <div className="cta-banner-actions">
            <button className="btn-primary" onClick={() => triggerModal('member')}>
              <UserCheck size={18} />
              <span>{t.membership}</span>
            </button>
            <button className="btn-outline-white" onClick={() => triggerModal('jan')}>
              <Scale size={18} />
              <span>{t.jan}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Central Office & Contact Directory */}
      <section className="section office-section" id="contact">
        <div className="wrap office-grid">
          <div className="office-card-hq">
            <span className="kicker">{lang === 'hi' ? 'मुख्यालय' : 'Headquarters'}</span>
            <h3>{t.contact}</h3>
            <div className="contact-lines">
              <div className="contact-line-item">
                <div className="contact-icon-wrap">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong>{lang === 'hi' ? 'कार्यालय पता' : 'Office Address'}</strong>
                  <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                    {lang === 'hi' ? siteConfig.officeAddress : siteConfig.officeAddressEn}
                  </p>
                </div>
              </div>

              <div className="contact-line-item">
                <div className="contact-icon-wrap">
                  <Phone size={20} />
                </div>
                <div>
                  <strong>{lang === 'hi' ? 'दूरभाष एवं हेल्पलाइन' : 'Phone & Helpline'}</strong>
                  <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                    <a href="tel:18001200000" style={{ color: '#15803d', fontWeight: 700, textDecoration: 'none' }}>
                      {siteConfig.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-line-item">
                <div className="contact-icon-wrap">
                  <Mail size={20} />
                </div>
                <div>
                  <strong>{lang === 'hi' ? 'ईमेल संपर्क' : 'Official Email'}</strong>
                  <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                    <a href={`mailto:${siteConfig.email}`} style={{ color: '#0284c7', textDecoration: 'none' }}>
                      {siteConfig.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-line-item">
                <div className="contact-icon-wrap">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <strong>{lang === 'hi' ? 'पंजीकरण स्थिति' : 'ECI Registration'}</strong>
                  <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                    {lang === 'hi' ? siteConfig.registration : siteConfig.registrationEn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="office-card-hq" style={{ background: '#fffaf5', borderColor: '#fed7aa' }}>
            <span className="kicker">{lang === 'hi' ? 'सीधा संपर्क' : 'Write to Us'}</span>
            <h3>{lang === 'hi' ? 'हमसे संवाद करें' : 'Get in Touch'}</h3>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 24 }}>
              {lang === 'hi'
                ? 'यदि आपके पास पार्टी संगठन, युवा प्रकोष्ठ अथवा अपने क्षेत्र की किसी जनसमस्या से जुड़ा कोई सुझाव है, तो सीधे ईमेल भेजें या राष्ट्रीय अध्यक्ष जी को पत्र लिखें।'
                : 'If you have suggestions for our organizational wings or issues regarding your constituency, write to us directly.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                className="btn-header-join"
                style={{ width: '100%', justifyContent: 'center', height: 48 }}
                onClick={() => triggerModal('letter')}
              >
                <Send size={18} />
                <span>{t.letter}</span>
              </button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-portal"
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#1e293b',
                  textAlign: 'center',
                  textDecoration: 'none',
                  height: 48
                }}
              >
                <Mail size={18} />
                <span>{lang === 'hi' ? 'ईमेल भेजें' : 'Send an Email'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link href="/" className="logo">
              <div className="logo-badge" style={{ width: 42, height: 42, fontSize: 22 }}>
                <span>म</span>
              </div>
              <div className="logo-texts">
                <span className="logo-title" style={{ color: '#ffffff', fontSize: 20 }}>
                  {t.brand}
                </span>
                <span className="logo-sub" style={{ color: '#fb923c' }}>
                  {lang === 'hi' ? 'हक़ • अधिकार • न्याय' : 'Rights • Dignity • Justice'}
                </span>
              </div>
            </Link>
            <p>{t.footer}</p>
            <div className="footer-social-links">
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={siteConfig.social.x} target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="X">
                <span style={{ fontWeight: 800 }}>𝕏</span>
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div className="footer-col">
            <h4>{t.nav.about}</h4>
            <div className="footer-links">
              <Link href="/about">{t.nav.about}</Link>
              <Link href="/history">{t.nav.history}</Link>
              <Link href="/#foundation">{t.foundation}</Link>
              <Link href="/#agenda">{t.agenda}</Link>
              <Link href="/contact">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Citizen Services */}
          <div className="footer-col">
            <h4>{lang === 'hi' ? 'जन सेवा प्रकोष्ठ' : 'Citizen Services'}</h4>
            <div className="footer-links">
              <Link href="/membership">{t.membership}</Link>
              <Link href="/jan-sunwai">{t.jan}</Link>
              <Link href="/support">{t.support}</Link>
              <Link href="/privacy">{t.privacy}</Link>
              <Link href="/terms">{t.terms}</Link>
            </div>
          </div>

          {/* Official Registry */}
          <div className="footer-col">
            <h4>{lang === 'hi' ? 'केंद्रीय कार्यालय' : 'Central Office'}</h4>
            <div className="footer-links" style={{ fontSize: 13, lineHeight: 1.7, color: '#94a3b8' }}>
              <p style={{ margin: 0 }}>{lang === 'hi' ? siteConfig.officeAddress : siteConfig.officeAddressEn}</p>
              <p style={{ margin: '8px 0 0' }}>
                <a href="tel:18001200000" style={{ color: '#fb923c', textDecoration: 'none' }}>
                  {siteConfig.phone}
                </a>
              </p>
              <p style={{ margin: '4px 0 0' }}>{siteConfig.email}</p>
              <p style={{ margin: '8px 0 0', color: '#fb923c' }}>
                {lang === 'hi' ? siteConfig.registration : siteConfig.registrationEn}
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t.brand}. {t.all}
          </span>
          <span style={{ color: '#94a3b8' }}>
            {lang === 'hi' ? 'समानता, गरिमा और सामाजिक न्याय को समर्पित' : 'Dedicated to Equality, Dignity & Social Justice'}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FormModal({
  kind,
  close,
  t,
  lang
}: {
  kind: Kind | null;
  close: () => void;
  t: Dict;
  lang: Lang;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ref?: string; message: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState<string>('');

  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    if (!kind) {
      setResult(null);
      setErrors({});
      setFileName('');
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstInputRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [kind]);

  if (!kind) return null;

  const title = kind === 'letter' ? t.letterTitle : kind === 'jan' ? t.jan : t.membership;
  const endpoint = kind === 'letter' ? '/api/letters' : kind === 'jan' ? '/api/jan-sunwai' : '/api/membership';

  const copyReference = () => {
    if (result?.ref) {
      navigator.clipboard.writeText(result.ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const obj = Object.fromEntries(fd.entries()) as Record<string, string>;
    const err: Record<string, string> = {};

    if (!obj.name?.trim()) err.name = t.required;
    if (obj.mobile && !/^[6-9]\d{9}$/.test(obj.mobile.trim())) err.mobile = t.invalidMobile;
    if (!obj.consent) err.consent = t.required;

    if (kind === 'letter') {
      if (!obj.subject?.trim()) err.subject = t.required;
      if (!obj.message?.trim()) err.message = t.required;
    }

    if (kind === 'jan') {
      if (!obj.district?.trim()) err.district = t.required;
      if (!obj.details?.trim()) err.details = t.required;
    }

    if (kind === 'member') {
      if (!obj.district?.trim()) err.district = t.required;
      if (!obj.address?.trim()) err.address = t.required;
    }

    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setBusy(true);
    setResult(null);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...obj,
          category: obj.category || 'other'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.sendError);

      setResult({
        ref: data.reference,
        message: t.success
      });
      formRef.current?.reset();
      setFileName('');
    } catch (err: unknown) {
      setErrors({ form: err instanceof Error ? err.message : t.sendError });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <button className="modal-close-btn" onClick={close} aria-label={t.close}>
            <X size={20} />
          </button>
          <small>{kind === 'letter' ? t.letterSubtitle : 'MAHAN DAL · OFFICIAL PORTAL'}</small>
          <h2 id="modal-title">{title}</h2>
        </div>

        <div className="modal-body">
          {result ? (
            <div className="success-banner">
              <CheckCircle2 size={44} color="#16a34a" style={{ margin: '0 auto 12px' }} />
              <h4>{result.message}</h4>
              {result.ref && (
                <div style={{ margin: '18px 0', padding: 14, background: '#ffffff', borderRadius: 12, border: '1px solid #bbf7d0' }}>
                  <span style={{ fontSize: 13, color: '#64748b', display: 'block', marginBottom: 4 }}>
                    {t.reference}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <code style={{ fontSize: 18, fontWeight: 800, color: '#166534' }}>{result.ref}</code>
                    <button
                      type="button"
                      onClick={copyReference}
                      className="lang-switch"
                      style={{ padding: '6px 12px', fontSize: 13 }}
                      aria-label="Copy reference number"
                    >
                      {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                      <span>{copied ? (lang === 'hi' ? 'कॉपी हुआ' : 'Copied') : (lang === 'hi' ? 'कॉपी' : 'Copy')}</span>
                    </button>
                  </div>
                </div>
              )}
              <p style={{ marginTop: 12 }}>
                {lang === 'hi'
                  ? 'आपकी जानकारी सुरक्षित रूप से दर्ज कर ली गई है। हमारे प्रतिनिधि जल्द आपसे संपर्क करेंगे।'
                  : 'Your submission has been securely logged. Our team will review and respond accordingly.'}
              </p>
              <button
                type="button"
                className="btn-header-join"
                style={{ margin: '20px auto 0', display: 'inline-flex', width: '100%', maxWidth: 260, justifyContent: 'center', height: 48 }}
                onClick={close}
              >
                <span>{t.close}</span>
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <p className="modal-instruction">
                {kind === 'letter'
                  ? t.letterHelp
                  : kind === 'member'
                  ? t.missed
                  : lang === 'hi'
                  ? 'अपनी समस्या का विवरण दर्ज करें। शिकायत दर्ज होने पर आपको ट्रैकिंग संदर्भ संख्या प्राप्त होगी।'
                  : 'Submit the grievance details below. A unique tracking reference will be generated.'}
              </p>

              {kind === 'member' && (
                <div
                  style={{
                    marginBottom: 20,
                    padding: '14px 16px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <Phone size={22} color="#15803d" />
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#166534', display: 'block' }}>
                      {lang === 'hi' ? 'टोल-फ्री मिस्ड कॉल सदस्यता' : 'Toll-Free Missed Call Enrollment'}
                    </span>
                    <strong style={{ fontSize: 16, color: '#15803d' }}>
                      <a href="tel:18001200000" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {siteConfig.missedCall}
                      </a>
                    </strong>
                  </div>
                </div>
              )}

              {/* Honeypot field */}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-10000px' }}
              />

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="field-name">{t.name} *</label>
                  <input
                    ref={firstInputRef}
                    id="field-name"
                    name="name"
                    type="text"
                    placeholder={lang === 'hi' ? 'उदा. अमित कुमार मौर्य' : 'e.g. Amit Kumar Maurya'}
                    required
                  />
                  {errors.name && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="field-mobile">{t.mobile} *</label>
                  <input
                    id="field-mobile"
                    name="mobile"
                    type="tel"
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="98XXXXXXXX"
                    required
                  />
                  {errors.mobile && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.mobile}</span>}
                </div>
              </div>

              {kind === 'letter' ? (
                <>
                  <div className="form-field">
                    <label htmlFor="field-subject">{t.subject} *</label>
                    <input
                      id="field-subject"
                      name="subject"
                      type="text"
                      placeholder={t.subjectPlaceholder}
                      required
                    />
                    {errors.subject && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.subject}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="field-message">{t.message} *</label>
                    <textarea
                      id="field-message"
                      name="message"
                      placeholder={t.messagePlaceholder}
                      maxLength={5000}
                      required
                    />
                    {errors.message && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.message}</span>}
                  </div>
                </>
              ) : kind === 'jan' ? (
                <>
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="field-district">{t.district} *</label>
                      <input
                        id="field-district"
                        name="district"
                        type="text"
                        placeholder={lang === 'hi' ? 'उदा. लखनऊ / प्रयागराज' : 'e.g. Lucknow / Prayagraj'}
                        required
                      />
                      {errors.district && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.district}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="field-category">{t.category}</label>
                      <select id="field-category" name="category" defaultValue="education">
                        <option value="education">{lang === 'hi' ? 'शिक्षा व स्कूल सुविधा' : 'Education'}</option>
                        <option value="health">{lang === 'hi' ? 'स्वास्थ्य व चिकित्सा' : 'Healthcare'}</option>
                        <option value="employment">{lang === 'hi' ? 'रोज़गार व भर्ती' : 'Employment'}</option>
                        <option value="agriculture">{lang === 'hi' ? 'किसान, खाद व सिंचाई' : 'Agriculture'}</option>
                        <option value="land">{lang === 'hi' ? 'भूमि विवाद / राजस्व' : 'Land / Revenue'}</option>
                        <option value="police">{lang === 'hi' ? 'पुलिस / प्रशासनिक प्रताड़ना' : 'Police / Administration'}</option>
                        <option value="other">{lang === 'hi' ? 'अन्य जन समस्या' : 'Other Grievance'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="field-details">{t.details} *</label>
                    <textarea
                      id="field-details"
                      name="details"
                      placeholder={lang === 'hi' ? 'समस्या का स्पष्ट व पूर्ण विवरण लिखें...' : 'Describe your grievance in detail…'}
                      maxLength={5000}
                      required
                    />
                    {errors.details && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.details}</span>}
                  </div>

                  <div className="form-field">
                    <label>{t.upload}</label>
                    <div className="file-upload-box">
                      <input
                        type="file"
                        id="file-upload-input"
                        accept="image/*,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 5 * 1024 * 1024) {
                              e.currentTarget.value = '';
                              setErrors((v) => ({ ...v, attachment: 'Maximum allowed file size is 5 MB' }));
                              setFileName('');
                            } else {
                              setFileName(file.name);
                              const reader = new FileReader();
                              reader.onload = () => {
                                const hiddenInput = formRef.current?.querySelector<HTMLInputElement>('[name=attachment]');
                                if (hiddenInput) {
                                  hiddenInput.value = String(reader.result).split(',')[1] || '';
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }
                        }}
                      />
                      <label htmlFor="file-upload-input" style={{ cursor: 'pointer', display: 'block', padding: '8px 0' }}>
                        <FileText size={28} color="#ea580c" style={{ margin: '0 auto 8px' }} />
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', display: 'block' }}>
                          {fileName ? fileName : lang === 'hi' ? 'दस्तावेज़ / फ़ोटो चुनें' : 'Choose File or Photo'}
                        </span>
                        <small style={{ color: '#64748b', fontSize: 12 }}>
                          {lang === 'hi' ? 'PDF या चित्र (अधिकतम 5 MB)' : 'PDF or Image up to 5 MB'}
                        </small>
                      </label>
                      <input type="hidden" name="attachment" />
                    </div>
                    {errors.attachment && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.attachment}</span>}
                  </div>
                </>
              ) : (
                <>
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="field-dob">{t.dob}</label>
                      <input id="field-dob" name="dob" type="date" />
                    </div>

                    <div className="form-field">
                      <label htmlFor="field-gender">{t.gender}</label>
                      <select id="field-gender" name="gender" defaultValue="">
                        <option value="">— {lang === 'hi' ? 'चुनें' : 'Select'} —</option>
                        <option value="male">{lang === 'hi' ? 'पुरुष' : 'Male'}</option>
                        <option value="female">{lang === 'hi' ? 'महिला' : 'Female'}</option>
                        <option value="other">{lang === 'hi' ? 'अन्य' : 'Other'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label htmlFor="field-district">{t.district} *</label>
                      <input
                        id="field-district"
                        name="district"
                        type="text"
                        placeholder={lang === 'hi' ? 'उदा. वाराणसी / कानपुर' : 'e.g. Varanasi / Kanpur'}
                        required
                      />
                      {errors.district && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.district}</span>}
                    </div>

                    <div className="form-field">
                      <label htmlFor="field-address">{t.address} *</label>
                      <input
                        id="field-address"
                        name="address"
                        type="text"
                        placeholder={lang === 'hi' ? 'ग्राम / ब्लॉक / पिन कोड' : 'Village / Block / PIN'}
                        required
                      />
                      {errors.address && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.address}</span>}
                    </div>
                  </div>
                </>
              )}

              <label className="consent-row">
                <input type="checkbox" name="consent" value="true" required style={{ width: 18, height: 18, marginTop: 2 }} />
                <span>
                  {t.consent}{' '}
                  <Link href="/privacy" onClick={close} style={{ color: '#ea580c', textDecoration: 'underline' }}>
                    {t.privacy}
                  </Link>
                </span>
              </label>
              {errors.consent && (
                <div style={{ color: '#dc2626', fontSize: 12, marginBottom: 12 }}>{errors.consent}</div>
              )}

              {errors.form && (
                <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 16, padding: 10, background: '#fee2e2', borderRadius: 8 }}>
                  {errors.form}
                </div>
              )}

              <button className="btn-submit" disabled={busy}>
                {busy ? t.loading : kind === 'letter' ? t.send : t.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
