import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Input } from '@/components/ui/input.jsx'
import { Building2, Briefcase, Heart, Home,
   Sparkles, ShoppingBag, Lightbulb, Palette,
    Shield, Leaf, Mail, Phone, Facebook, Linkedin, Instagram,
      Plus, Sun, Layers, Zap, Info, Award, Eye,
      ArrowRight, ArrowUpRight, Menu, X, Play } from 'lucide-react'
import logoImage from '/src/assets/logo-vitres-intelligentes.png'
import whatsappIcon from '/src/assets/whatsapp_icon-DlvpWZxi.png'
import '/src/App.css'
import { LangContext, useT, useLang, T } from './i18n.jsx'

/* Instagram */
const INSTAGRAM_HANDLE = 'vitresintelligentes'
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

const WHATSAPP_NUMBER = '212770330219'
const PHONE_DISPLAY = '+212 7 70 33 02 19'
const PHONE_TEL = 'tel:+212770330219'

/* ------------------------------------------------------------------
   Photos (dossier public/images/)
   Déposez les images générées avec exactement ces noms de fichiers.
   Tant qu'une image manque, le site affiche une version de secours.
------------------------------------------------------------------- */
const DEMO_IMAGES = {
  opaque: '/images/demo-opaque.jpg',
  clear: '/images/demo-transparent.jpg',
}

/* Proportions fixes des paires de photos : les deux états (opaque /
   transparent) sont toujours dessinés dans la MÊME boîte, au pixel près. */
const DEMO_RATIO = 16 / 9
const SECTOR_RATIO = 4 / 3

/* Clients de référence (noms en texte : ajoutez les logos uniquement avec l'accord des clients) */
const CLIENTS = [
  { name: 'CDG Capital', place: 'Casablanca Finance City' },
  { name: 'Alterdeco', place: 'Salé' },
  { name: 'The Ranch Resort', place: 'Marrakech' },
]

/* Reels Instagram affichés dans la section "En action" */
const REELS = [
  { id: 'DdUtzC7hyqt', title: 'Avant / Après à Salé', text: 'Bureaux séparés de l’atelier de production, sans remplacer le vitrage existant.' },
  { id: 'DdpNDcDBNfi', title: 'Une pose au millimètre', text: 'Environnement sans poussière, découpe sur mesure, zéro bulle : nos étapes pour un résultat parfait.' },
  { id: 'Dd5KSDgoF8d', title: 'La pergola d’un client', text: 'L’idée d’une architecte : une pergola en smart glass, transparente ou opaque à la demande.' },
]

/* Image avec repli automatique si le fichier n'existe pas encore */
function Img({ src, fallback, ...props }) {
  const [current, setCurrent] = useState(src)
  useEffect(() => setCurrent(src), [src])
  if (!current) return null
  return (
    <img
      {...props}
      src={current}
      onError={() => setCurrent(fallback && current !== fallback ? fallback : null)}
    />
  )
}

const openWhatsApp = (lang = 'fr') => {
  const message = T[lang].whatsappMsg
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
}

/* Boutons de contact unifiés : même style que la télécommande */
function ContactButtons({ size = 'md', className = '' }) {
  const t = useT(); const lang = useLang()
  return (
    <div className={`cta-pair cta-pair--${size} ${className}`}>
      <a href={PHONE_TEL} className="dock-btn dock-btn--call" aria-label={t.callAria(PHONE_DISPLAY)}>
        <Phone className="h-5 w-5" />
        <span>{t.call}</span>
      </a>
      <button type="button" onClick={() => openWhatsApp(lang)} className="dock-btn dock-btn--wa" aria-label={t.whatsappAria}>
        <img src={whatsappIcon} alt="" className="h-5 w-5 invert" />
        <span>{t.whatsapp}</span>
      </button>
    </div>
  )
}

/* Calque photo : la boîte garde le ratio de la paire et couvre la zone,
   ainsi l'image opaque et l'image transparente se superposent parfaitement. */
function PhotoLayer({ src, alt, ratio, className = '', loading }) {
  return (
    <div className={`photo-stage ${className}`} style={{ '--ar': ratio }}>
      <div className="photo-box">
        <Img src={src} alt={alt} loading={loading} draggable="false" />
      </div>
    </div>
  )
}

/* ==================================================================
   Interrupteur mural – l'élément signature du site.
   Il pilote tout le site : OFF = vitres opaques, ON = transparentes.
================================================================== */
function WallSwitch({ on, onToggle, size = 'md', label, hint, hintSide = 'top' }) {
  const t = useT()
  return (
    <span className={`switch-wrap ${hint ? 'has-hint' : ''}`}>
      {hint && (
        <span className={`switch-hint switch-hint--${hintSide}`} aria-hidden="true">
          {hint}
          <span className="switch-hint-arrow">{hintSide === 'left' ? t.arrow : '↓'}</span>
        </span>
      )}
      {hint && <span className="switch-pulse" aria-hidden="true" />}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label || (on ? t.dock.toOff : t.dock.toOn)}
        onClick={onToggle}
        className={`wall-switch wall-switch--${size}`}
      >
        <span className="rocker">
          <span className="led" />
          <span className="mark">{on ? 'I' : 'O'}</span>
        </span>
      </button>
    </span>
  )
}

/* ==================================================================
   La vitre du hero : film opaque, on "essuie" avec la souris / le doigt
================================================================== */
function SmartWindow({ on, windowRef, onSwitch, hint }) {
  const [hover, setHover] = useState(false)
  const hideTimer = useRef()
  const [touched, setTouched] = useState(false)

  const setPoint = (e) => {
    const el = windowRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  const radius = on ? '150vmax' : hover ? 'var(--wipe)' : '0px'
  const t = useT().window

  return (
    <div
      ref={windowRef}
      className="smart-window relative w-full overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] bg-frame select-none"
      style={{ '--r': radius }}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') { setPoint(e); setHover(true); setTouched(true) } }}
      onPointerMove={(e) => { if (e.pointerType === 'mouse' || hover) setPoint(e) }}
      onPointerDown={(e) => { if (e.target.closest('button')) return; clearTimeout(hideTimer.current); setPoint(e); setHover(true); setTouched(true) }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHover(false) }}
      onPointerUp={(e) => { if (e.pointerType !== 'mouse') { clearTimeout(hideTimer.current); hideTimer.current = setTimeout(() => setHover(false), 2200) } }}
      onPointerCancel={() => { clearTimeout(hideTimer.current); hideTimer.current = setTimeout(() => setHover(false), 2200) }}
    >
      <PhotoLayer src={DEMO_IMAGES.opaque} ratio={DEMO_RATIO} alt={t.altOff} />
      <PhotoLayer src={DEMO_IMAGES.clear} ratio={DEMO_RATIO} alt={t.altOn} className="clear-layer" />

      {/* Indice d'interaction */}
      {!on && !touched && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="wipe-hint flex flex-col items-center gap-3 text-ink">
            <span className="hint-ring" />
            <span className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <span className="hidden md:inline">{t.hintMouse}</span>
              <span className="md:hidden">{t.hintTouch}</span>
            </span>
          </div>
        </div>
      )}

      {/* Statut */}
      <div className="absolute start-4 top-4 md:start-6 md:top-6 flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 text-xs md:text-sm font-medium text-white backdrop-blur">
        <span className={`h-2 w-2 rounded-full transition-colors ${on ? 'bg-teal-300 shadow-[0_0_10px_#5eead4]' : 'bg-slate-400'}`} />
        {t.mode} <span className="font-semibold">{on ? t.on : t.off}</span>
      </div>

    </div>
  )
}

/* ==================================================================
   Comment ça marche : les cristaux liquides s'alignent
================================================================== */
function CrystalDemo({ on, onToggle }) {
  // 5 x 5 liquid crystals seen "under the microscope": scattered without power, lined up with power
  const crystals = useMemo(() => {
    let seed = 11
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
    return Array.from({ length: 25 }, (_, i) => ({
      rot: Math.round(rand() * 150 - 75) || 40,
      delay: Math.round((i % 5) * 70 + rand() * 120),
    }))
  }, [])
  const t = useT().techno

  return (
    <div className="crystal-demo relative overflow-hidden rounded-[2rem] bg-ink p-5 md:p-10 text-white">
      <div className="pointer-events-none absolute inset-0 glow-bg" />

      {/* 1. the choice is explicit: no power / power */}
      <div className="relative mx-auto mb-7 md:mb-10 grid max-w-md grid-cols-2 rounded-full bg-white/10 p-1 ring-1 ring-white/15" role="group" aria-label={t.toggleAria}>
        <button type="button" aria-pressed={!on} onClick={() => on && onToggle()}
          className={`tech-btn ${!on ? 'tech-btn--active' : ''}`}>
          <span className="tech-dot" /> {t.offBtn}
        </button>
        <button type="button" aria-pressed={on} onClick={() => !on && onToggle()}
          className={`tech-btn ${on ? 'tech-btn--active tech-btn--on' : ''}`}>
          <Zap className="h-4 w-4" /> {t.onBtn}
        </button>
      </div>

      <div className="relative grid items-center gap-4 md:gap-8 md:grid-cols-[1fr_auto_1fr]">
        {/* 2. what you see */}
        <figure>
          <div className="tech-window relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-2xl bg-frame ring-1 ring-white/15">
            <img src={DEMO_IMAGES.opaque} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <img src={DEMO_IMAGES.clear} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`} />
            <span className="tech-lens" aria-hidden="true" />
            <span className={`absolute start-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${on ? 'bg-teal-400/90 text-ink' : 'bg-white/85 text-ink'}`}>
              {on ? t.clearTag : t.opaqueTag}
            </span>
          </div>
          <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{t.seeLabel}</figcaption>
        </figure>

        <div className="tech-arrow mx-auto flex items-center gap-2 text-xs text-slate-400 md:flex-col" aria-hidden="true">
          <Plus className="h-4 w-4" /><span>{t.zoomHint}</span><ArrowRight className="h-4 w-4 rotate-90 md:rotate-0 rtl:md:rotate-180" />
        </div>

        {/* 3. inside the film, magnified */}
        <figure>
          <div className="tech-zoom relative mx-auto aspect-square w-full max-w-[17rem] md:max-w-[19rem] overflow-hidden rounded-full">
            <div className="tech-beams" aria-hidden="true">
              {[0, 1, 2].map(i => <span key={i} className="tech-beam" style={{ '--i': i }} />)}
            </div>
            <div className="absolute inset-[16%] grid grid-cols-5 place-items-center">
              {crystals.map((c, i) => (
                <span key={i} className="lc" style={{ '--rot': `${c.rot}deg`, '--d': `${c.delay}ms` }} />
              ))}
            </div>
            <span className="tech-haze" aria-hidden="true" />
          </div>
          <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{t.zoomLabel}</figcaption>
        </figure>
      </div>

      {/* 4. one sentence for the current state only */}
      <p className="relative mx-auto mt-7 md:mt-10 max-w-2xl text-center text-base md:text-lg" aria-live="polite">
        <strong className={on ? 'text-teal-300' : 'text-white'}>{on ? t.onLabel : t.offLabel}</strong>{' '}
        <span className="text-slate-300">{on ? t.onText : t.offText}</span>
      </p>
    </div>
  )
}

/* ==================================================================
   FAQ
================================================================== */
function FAQItem({ icon, question, answer, index }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className={`border-b border-slate-200 transition-colors ${open ? 'bg-white' : ''}`}>
      <button
        className="w-full py-6 px-2 md:px-4 flex justify-between items-center gap-6 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper">{icon}</span>
          <span className="text-ink font-semibold text-base md:text-lg">{question}</span>
        </div>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open ? 'rotate-45 bg-ink border-ink text-white' : 'border-slate-300 text-ink'}`}>
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div className={`grid transition-all duration-500 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-2 md:px-4 sm:ps-[4.5rem] md:ps-[5rem] pb-7 leading-relaxed text-slate-600">{answer}</div>
        </div>
      </div>
    </div>
  )
}

/* ==================================================================
   APP
================================================================== */
function App() {
  // Langue : FR (par défaut) / AR
  // La langue vient de l'adresse : / = français, /ar/ = arabe (deux pages indexées par Google)
  const [lang] = useState(() => (document.documentElement.lang || '').startsWith('ar') || window.location.pathname.startsWith('/ar') ? 'ar' : 'fr')
  const t = T[lang]
  useEffect(() => {
    document.documentElement.lang = lang === 'ar' ? 'ar-MA' : 'fr-MA'
    document.documentElement.dir = t.dir
    if (lang === 'ar' && !document.getElementById('font-ar')) {
      const l = document.createElement('link')
      l.id = 'font-ar'; l.rel = 'stylesheet'
      l.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap'
      document.head.appendChild(l)
    }
  }, [lang])
  const toggleLang = () => { window.location.href = (lang === 'ar' ? '/' : '/ar/') + window.location.hash }

  // SEO hidden text
  const seoRef = useRef()

  // L'état global de "la vitre" : false = opaque, true = transparent
  const [isTransparent, setIsTransparent] = useState(false)
  const windowRef = useRef()

  const toggleMode = (fromEl) => {
    const win = windowRef.current
    if (win) {
      const w = win.getBoundingClientRect()
      if (fromEl && fromEl.getBoundingClientRect) {
        const s = fromEl.getBoundingClientRect()
        win.style.setProperty('--x', `${s.left + s.width / 2 - w.left}px`)
        win.style.setProperty('--y', `${s.top + s.height / 2 - w.top}px`)
      } else {
        win.style.setProperty('--x', '50%')
        win.style.setProperty('--y', '50%')
      }
    }
    setTried(true)
    setIsTransparent((v) => !v)
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [tried, setTried] = useState(false)
  const [hintGone, setHintGone] = useState(false)
  useEffect(() => {
    // the 'Cliquez !' bubble invites once, then gets out of the way while reading
    const onS = () => { if (window.scrollY > window.innerHeight * 1.8) { setHintGone(true); window.removeEventListener('scroll', onS) } }
    window.addEventListener('scroll', onS, { passive: true })
    return () => window.removeEventListener('scroll', onS)
  }, [])
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Apparition au scroll
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const [openPane, setOpenPane] = useState(null)
  const [focusPane, setFocusPane] = useState(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return
    const panes = document.querySelectorAll('.pane')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setFocusPane(Number(en.target.dataset.index)) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    panes.forEach((p) => io.observe(p))
    return () => io.disconnect()
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+212',
    phone: '',
    surface: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [videosVisible, setVideosVisible] = useState(false)

  const EMAILJS_SERVICE_ID = 'service_bmmspcm'
  const EMAILJS_TEMPLATE_ID = 'template_zlf1l2h'
  const EMAILJS_PUBLIC_KEY = 'sCLtjmpeph40aEzni'

  // Lazy load EmailJS on submit
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    const emailjs = await import('@emailjs/browser')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          surface: formData.surface,
        },
        EMAILJS_PUBLIC_KEY
      )

      setSubmitStatus('ok')
      setFormData({ name: '', email: '', countryCode: '+212', phone: '', surface: '' })
    } catch (error) {
      setSubmitStatus('err')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sectorMeta = [
    { icon: Building2, img: 'hotellerie' },
    { icon: Briefcase, img: 'bureaux' },
    { icon: Heart, img: 'sante' },
    { icon: Home, img: 'residentiel' },
    { icon: Sparkles, img: 'beaute' },
    { icon: ShoppingBag, img: 'commerce' },
  ]
  const sectors = sectorMeta.map((m, i) => ({ ...m, title: t.sectors.items[i][0], description: t.sectors.items[i][1] }))

  const values = [Lightbulb, Palette, Shield, Leaf].map((icon, i) => ({ icon, title: t.values.items[i] }))

  const marqueeWords = t.marquee

  const navLinks = ['#techno', '#nos-secteurs', '#clients', '#en-action', '#faq', '#contact'].map((href, i) => ({ href, label: t.nav[i] }))

  // Lazy load videos when visible
  const videosRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVideosVisible(true); observer.disconnect() }
    }, { rootMargin: '300px' })
    if (videosRef.current) observer.observe(videosRef.current)
    return () => observer.disconnect()
  }, [])

  const year = new Date().getFullYear()

  return (
    <LangContext.Provider value={lang}>
    <div dir={t.dir} lang={lang === 'ar' ? 'ar' : 'fr'} className={`min-h-screen bg-white text-slate-700 antialiased pb-24 md:pb-0 lang-${lang} ${isTransparent ? 'is-on' : 'is-off'}`}>
      {/* SEO hidden text */}
      {lang === 'fr' ? (
      <div ref={seoRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <h1>Vitres intelligentes au Maroc – Verre PDLC & Film Commutable</h1>
        <h2>Films intelligents et Smart Glass pour bureaux, maisons, hôtels et commerces</h2>
        <p>
          Découvrez nos solutions de <strong>vitrage intelligent</strong> : PDLC(Polymer Dispersed Liquid Crystal) et films commutables
          offrant confidentialité à la demande, design moderne et performance énergétique.
        </p>
      </div>
      ) : (
      <div ref={seoRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <h1>Vitres Intelligentes Maroc – الزجاج الذكي وفيلم PDLC: زجاج يتحوّل من شفاف إلى معتم</h1>
        <h2>أفلام ذكية وزجاج ذكي للمكاتب، المنازل، الفنادق والمحلات التجارية</h2>
        <p>
          اكتشفوا حلولنا في <strong>الزجاج الذكي</strong> (الجاج الذكي): فيلم PDLC ذو البلورات السائلة يُثبَّت على الزجاج الموجود،
          ليمنحكم الخصوصية عند الطلب، تصميماً عصرياً وأداءً طاقياً أفضل، في الدار البيضاء، الرباط، سلا، مراكش وكل أنحاء المغرب.
        </p>
      </div>
      )}

      {/* ================= Header (flottant) ================= */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
        <div className={`mx-auto max-w-7xl flex items-center justify-between gap-3 rounded-full ps-4 pe-2 py-2 transition-all duration-500 ${scrolled || menuOpen ? 'bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(15,27,42,0.35)] ring-1 ring-ink/5' : 'bg-white/0'}`}>
          <a href="#accueil" className="shrink-0">
            <img src={logoImage} alt={t.logoAlt} className="h-9 md:h-10 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="px-3.5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-ink hover:bg-ink/5 transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_TEL} className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-ink/5 transition-colors" aria-label={t.callAria(PHONE_DISPLAY)}>
              <Phone className="h-4 w-4 text-teal-600" />
              <span dir="ltr" className="hidden xl:inline">{PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.switchLangAria}
              className={`lang-btn ${lang === 'fr' ? 'lang-btn--ar' : ''}`}
            >
              {t.switchLang}
            </button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Vitres Intelligentes Maroc"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-ink hover:text-white hover:bg-[#E1306C] transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink hover:bg-frame text-white text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              {t.devis}
            </a>
            <button
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.menu}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="lg:hidden mx-auto mt-2 max-w-7xl rounded-3xl bg-white/90 backdrop-blur-xl p-3 shadow-xl ring-1 ring-ink/5 grid gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-2xl font-medium text-ink hover:bg-paper">{l.label}</a>
            ))}
            <div className="flex items-center justify-between px-4 py-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-ink flex items-center gap-2">
                <Instagram className="h-5 w-5" /> @{INSTAGRAM_HANDLE}
              </a>
              <a href={PHONE_TEL} className="font-semibold text-teal-700 flex items-center gap-2"><Phone className="h-4 w-4" /> {t.call}</a>
            </div>
          </nav>
        )}
      </header>

      {/* ================= Hero ================= */}
      <section id="accueil" className="relative pt-28 md:pt-32 pb-10 md:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-bg" />
        <div className="container relative mx-auto px-4 flex flex-col lg:block">
          <div className="max-lg:contents lg:grid lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:items-end lg:mb-14">
            <div className="order-1 mb-6 lg:mb-0">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1 className="font-extrabold text-ink leading-[0.95] tracking-tight text-[clamp(3rem,9vw,7.5rem)]">
                {t.hero.line1}<br />
                <span className="frost-word">{t.hero.word}</span>
              </h1>
            </div>
            <div className="order-3 mt-8 lg:mt-0 lg:pb-3">
              <p className="text-xl md:text-2xl text-ink font-medium leading-snug mb-4">
                {t.hero.lead}
              </p>
              <p className="hidden sm:block text-slate-500 mb-8">
                {t.hero.sub}
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">{t.hero.devisLabel}</p>
              <ContactButtons size="lg" />
              <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-ink transition-colors">
                {t.hero.formLink} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>
          </div>

          <div className="order-2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9]">
            <SmartWindow on={isTransparent} windowRef={windowRef} onSwitch={toggleMode} />
          </div>
          <p className="order-2 mt-4 lg:mt-5 text-center text-sm text-slate-500">
            {t.hero.caption}<span className="text-ink font-medium">{t.hero.captionStrong}</span></p>
        </div>
      </section>

      {/* ================= Bandeau défilant ================= */}
      <div className="bg-ink py-6 md:py-8 overflow-hidden" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className={`marquee-word ${i % 2 ? 'is-frost' : ''}`}>
              {w}<span className="mx-6 md:mx-10 text-teal-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= Technologie ================= */}
      <section id="techno" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-end mb-12" data-reveal>
            <div>
              <p className="eyebrow">{t.techno.eyebrow}</p>
              <h2 className="section-title">{t.techno.title}</h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              {t.techno.intro}
            </p>
          </div>

          <div data-reveal>
            <CrystalDemo on={isTransparent} onToggle={() => toggleMode()} />
          </div>

        </div>
      </section>

      {/* ================= Secteurs : une façade de vitres ================= */}
      <section id="nos-secteurs" className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-end mb-12" data-reveal>
            <div>
              <p className="eyebrow">{t.sectors.eyebrow}</p>
              <h2 className="section-title">{t.sectors.title}</h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              {t.sectors.introA}<span className="hidden md:inline">{t.sectors.hover}</span><span className="md:hidden">{t.sectors.touch}</span>{t.sectors.introB}
            </p>
          </div>

          <div className="facade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {sectors.map((sector, index) => (
              <button
                key={index}
                type="button"
                data-index={index}
                className={`pane text-start ${openPane === index || focusPane === index ? 'is-open' : ''}`}
                onClick={() => setOpenPane(openPane === index ? null : index)}
                aria-expanded={openPane === index}
              >
                {/* Derrière la vitre */}
                <div className="pane-back">
                  <span className="pane-blob" style={{ '--h': `${168 + index * 9}deg` }} />
                  <PhotoLayer src={`/images/secteur-${sector.img}-transparent.jpg`} ratio={SECTOR_RATIO} alt={`${sector.title} – ${t.sectors.altOn}`} loading="lazy" className="pane-photo" />
                  <span className="pane-shade" />
                  <sector.icon className="h-10 w-10 text-teal-300 mb-auto relative" />
                  <h3 className="relative text-xl font-semibold text-white mb-3">{sector.title}</h3>
                  <p className="relative text-slate-300 leading-relaxed">{sector.description}</p>
                </div>
                {/* Le film */}
                <div className="pane-frost">
                  <PhotoLayer src={`/images/secteur-${sector.img}-opaque.jpg`} ratio={SECTOR_RATIO} alt={`${sector.title} – ${t.sectors.altOff}`} loading="lazy" className="pane-photo" />
                  <span className="pane-veil" />
                  <span className="relative text-xs font-semibold tracking-widest text-ink/60">0{index + 1}</span>
                  <div className="relative">
                    <sector.icon className="h-8 w-8 text-ink mb-4" />
                    <h3 className="text-xl md:text-2xl font-semibold text-ink leading-tight">{sector.title}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Clients ================= */}
      <section id="clients" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-end mb-12" data-reveal>
            <div>
              <p className="eyebrow">{t.clients.eyebrow}</p>
              <h2 className="section-title">{t.clients.title}</h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              {t.clients.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" data-reveal>
            {CLIENTS.map((c, i) => (
              <div key={c.name} className="client-pane group">
                <span className="client-frost" />
                <div className="relative flex h-full flex-col">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">{t.clients.places[i]}</span>
                  <p className="mt-auto text-3xl md:text-[2.1rem] font-bold leading-[1.05] tracking-tight text-ink">{c.name}</p>
                  <span className="mt-5 h-1 w-10 rounded-full bg-teal-500 transition-all duration-500 group-hover:w-20" />
                </div>
              </div>
            ))}
            <div className="client-pane client-pane--dark group">
              <div className="relative flex h-full flex-col">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-300">{t.clients.manyEyebrow}</span>
                <p className="mt-auto text-3xl md:text-[2.1rem] font-bold leading-[1.05] tracking-tight text-white">
                  <span className="text-teal-300">+</span> {t.clients.many}
                </p>
                <p className="mt-3 text-slate-400">{t.clients.manySub}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= En action : reels Instagram ================= */}
      <section id="en-action" className="py-24 md:py-32 overflow-hidden" ref={videosRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-end mb-14" data-reveal>
            <div>
              <p className="eyebrow">{t.reels.eyebrow}</p>
              <h2 className="section-title">{t.reels.title}</h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              {t.reels.intro}
            </p>
          </div>

          <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-10 overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 pb-8 lg:mx-0 lg:px-0" data-reveal>
            {REELS.map((reel, idx) => (
              <figure key={reel.id} className={`snap-center shrink-0 w-[260px] sm:w-[280px] lg:w-auto lg:max-w-[320px] lg:mx-auto ${idx === 1 ? 'lg:-translate-y-8' : ''}`}>
                <div className="phone">
                  <div className="phone-screen bg-white pt-8">
                    <div className="relative aspect-[9/16]">
                      {videosVisible ? (
                        <iframe
                          src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                          title={`Reel Instagram – ${t.reels.items[idx][0]}`}
                          className="absolute inset-0 h-full w-full"
                          style={{ border: 'none' }}
                          frameBorder="0"
                          scrolling="no"
                          allowFullScreen
                          loading="lazy"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-paper">
                          <Play className="h-10 w-10 text-slate-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <figcaption className="mt-6 px-1">
                  <p className="flex items-center gap-3 font-semibold text-ink">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">0{idx + 1}</span>
                    {t.reels.items[idx][0]}
                  </p>
                  <p className="mt-2 text-slate-600">{t.reels.items[idx][1]}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 text-center" data-reveal>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-button inline-flex items-center gap-3 rounded-full ps-2 pe-6 py-2 font-semibold text-white shadow-xl shadow-pink-900/20 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                <Instagram className="h-5 w-5" />
              </span>
              <span dir="auto">{t.reels.follow(INSTAGRAM_HANDLE)}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= Valeurs ================= */}
      <section id="nos-valeurs" className="relative overflow-hidden py-24 md:py-32 bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 glow-bg" />
        <div className="container relative mx-auto px-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div data-reveal>
            <p className="eyebrow eyebrow--light">{t.values.eyebrow}</p>
            <h2 className="section-title section-title--light">{t.values.title}</h2>
          </div>
          <div>
            {values.map((value, index) => (
              <div key={index} className="value-row group" data-reveal>
                <span className="text-sm font-semibold text-slate-500 w-10">0{index + 1}</span>
                <h3 className="flex-1 text-2xl md:text-4xl font-semibold tracking-tight">{value.title}</h3>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-teal-400 group-hover:text-ink">
                  <value.icon className="h-6 w-6" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-24 md:py-32">
        <div className="container mx-auto px-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div className="lg:sticky lg:top-28 self-start" data-reveal>
            <p className="eyebrow">{t.faq.eyebrow}</p>
            <h2 className="section-title">{t.faq.title}</h2>
            <div className="mt-10 rounded-3xl bg-ink p-7 text-white">
              <p className="text-lg font-semibold">{t.faq.other}</p>
              <p className="mt-1 text-slate-400">{t.faq.otherSub}</p>
              <ContactButtons className="mt-6" />
            </div>
          </div>

          <div className="border-t border-slate-200" data-reveal>
            {t.faq.items.map((_, idx) => [Zap, Sun, Layers, Shield, Info, Award, Home][idx % 7]).map((Icon, idx) => (
              <FAQItem key={lang + idx} index={idx} icon={<Icon className="h-5 w-5 text-teal-600" />} question={t.faq.items[idx][0]} answer={t.faq.items[idx][1]} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= Contact + Footer ================= */}
      <footer id="contact" className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 glow-bg" />
        <div className="container relative mx-auto px-4 pt-24 md:pt-32">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
            <div data-reveal>
              <p className="eyebrow eyebrow--light">{t.contact.eyebrow}</p>
              <h3 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">{t.contact.title}</h3>
              <div className="mt-12 space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">{t.contact.listen}</h3>
                <p className="text-slate-400">{t.contact.fastest}</p>
                <ContactButtons size="lg" className="pb-4" />
                {[
                  { href: 'mailto:contact@vitres-intelligentes.com', icon: Mail, label: 'contact@vitres-intelligentes.com' },
                  { href: INSTAGRAM_URL, icon: Instagram, label: `@${INSTAGRAM_HANDLE}`, external: true },
                ].map((c) => (
                  <a key={c.label} href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-teal-400 group-hover:text-ink">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span dir="ltr" className="text-lg group-hover:text-teal-200 transition-colors">{c.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div className="rounded-[2rem] bg-white p-7 md:p-10 text-ink shadow-2xl" data-reveal>
              <p className="text-2xl font-bold">{t.contact.formTitle}</p>
              <p className="text-slate-500 mb-8">{t.contact.formSub}</p>
              <form onSubmit={handleContactSubmit} className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder={t.contact.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="h-13 rounded-xl bg-paper border-transparent focus-visible:border-teal-500 px-4"
                />
                <Input
                  type="email"
                  placeholder={t.contact.email}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="h-13 rounded-xl bg-paper border-transparent focus-visible:border-teal-500 px-4"
                />
                {/* Téléphone avec indicatif */}
                <div className="flex gap-2 sm:col-span-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="h-13 bg-paper rounded-xl px-3"
                    aria-label={t.contact.codeAria}
                    dir="ltr"
                  >
                    <option value="+212">🇲🇦 +212</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+1">🇺🇸 +1 (US)</option>
                    <option value="+1">🇨🇦 +1 (CA)</option>
                  </select>
                  <Input
                    type="tel"
                    placeholder={t.contact.phone}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 h-13 rounded-xl bg-paper border-transparent focus-visible:border-teal-500 px-4"
                    required
                  />
                </div>

                {/* Surface à équiper */}
                <fieldset className="sm:col-span-2">
                  <legend className="mb-3 text-sm font-medium text-slate-500">{t.contact.surface}</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'moins de 5 m2', label: t.contact.surfaces[0] },
                      { value: 'entre 5 et 40 m2', label: t.contact.surfaces[1] },
                      { value: 'plus de 40 m2', label: t.contact.surfaces[2] },
                    ].map((o) => (
                      <label key={o.value} className={`cursor-pointer rounded-xl border-2 px-2 py-3 text-center text-sm font-medium transition-colors ${formData.surface === o.value ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-paper bg-paper hover:border-slate-200'}`}>
                        <input
                          type="radio"
                          name="surface"
                          value={o.value}
                          checked={formData.surface === o.value}
                          onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                          required
                          className="sr-only"
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:col-span-2 mt-2 h-14 rounded-full bg-ink hover:bg-frame text-white font-semibold transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? t.contact.sending : <>{t.contact.submit} <ArrowRight className="h-5 w-5 rtl:rotate-180" /></>}
                </button>
                {submitStatus && (
                  <p className={`sm:col-span-2 text-sm ${submitStatus === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus === 'ok' ? t.contact.ok : t.contact.err}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bas de page */}
          <div className="mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
            <p>{t.footer(year)}</p>
            <div className="flex gap-3">
              {[
                { href: INSTAGRAM_URL, icon: Instagram, label: 'Instagram', hover: 'hover:bg-[#E1306C]' },
                { href: 'https://www.facebook.com/profile.php?id=61578692011171', icon: Facebook, label: 'Facebook', hover: 'hover:bg-[#1877F2]' },
                { href: 'https://www.linkedin.com/company/vitres-intelligentes-maroc', icon: Linkedin, label: 'LinkedIn', hover: 'hover:bg-[#0A66C2]' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition-colors ${s.hover}`}>
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">{t.seoLine}</p>
          <p className="footer-wordmark" aria-hidden="true">Vitres Intelligentes</p>
        </div>
      </footer>

      {/* ===== Dock flottant : interrupteur + appel + WhatsApp (suit le scroll, pensé mobile) ===== */}
      <div className="dock" role="region" aria-label={t.dock.aria}>
        <div className="dock-switch">
          <WallSwitch on={isTransparent} onToggle={() => toggleMode()} size="dock" hint={!tried && !hintGone ? t.dock.hint : null} />
          <span className="dock-label">
            <span className="dock-label-top">{t.dock.label}</span>
            <span className="dock-label-state">{isTransparent ? t.dock.on : t.dock.off}</span>
          </span>
        </div>
        <span className="dock-sep" aria-hidden="true" />
        <a href={PHONE_TEL} className="dock-btn dock-btn--call" aria-label={t.callAria(PHONE_DISPLAY)}>
          <Phone className="h-5 w-5" />
          <span className="dock-btn-text">{t.call}</span>
        </a>
        <button onClick={() => openWhatsApp(lang)} className="dock-btn dock-btn--wa" aria-label={t.whatsappAria}>
          <img src={whatsappIcon} alt="" className="h-5 w-5 invert" />
          <span className="dock-btn-text">{t.whatsapp}</span>
        </button>
      </div>
    </div>
    </LangContext.Provider>
  )
}

export default App
