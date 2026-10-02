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

const openWhatsApp = () => {
  const message = "Bonjour ! Je souhaite un devis gratuit pour vos vitres intelligentes. Pouvez-vous me contacter ?"
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
}

/* Boutons de contact unifiés : même style que la télécommande */
function ContactButtons({ size = 'md', className = '' }) {
  return (
    <div className={`cta-pair cta-pair--${size} ${className}`}>
      <a href={PHONE_TEL} className="dock-btn dock-btn--call" aria-label={`Appeler le ${PHONE_DISPLAY}`}>
        <Phone className="h-5 w-5" />
        <span>Appeler</span>
      </a>
      <button type="button" onClick={openWhatsApp} className="dock-btn dock-btn--wa" aria-label="Devis sur WhatsApp">
        <img src={whatsappIcon} alt="" className="h-5 w-5 invert" />
        <span>WhatsApp</span>
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
  return (
    <span className={`switch-wrap ${hint ? 'has-hint' : ''}`}>
      {hint && (
        <span className={`switch-hint switch-hint--${hintSide}`} aria-hidden="true">
          {hint}
          <span className="switch-hint-arrow">{hintSide === 'left' ? '→' : '↓'}</span>
        </span>
      )}
      {hint && <span className="switch-pulse" aria-hidden="true" />}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label || (on ? 'Rendre les vitres opaques' : 'Rendre les vitres transparentes')}
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
      <PhotoLayer src={DEMO_IMAGES.opaque} ratio={DEMO_RATIO} alt="Vitre intelligente en mode opaque – film PDLC" />
      <PhotoLayer src={DEMO_IMAGES.clear} ratio={DEMO_RATIO} alt="Vitre intelligente en mode transparent – film PDLC" className="clear-layer" />

      {/* Indice d'interaction */}
      {!on && !touched && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="wipe-hint flex flex-col items-center gap-3 text-ink">
            <span className="hint-ring" />
            <span className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <span className="hidden md:inline">Passez la souris sur la vitre</span>
              <span className="md:hidden">Touchez la vitre</span>
            </span>
          </div>
        </div>
      )}

      {/* Statut */}
      <div className="absolute left-4 top-4 md:left-6 md:top-6 flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 text-xs md:text-sm font-medium text-white backdrop-blur">
        <span className={`h-2 w-2 rounded-full transition-colors ${on ? 'bg-teal-300 shadow-[0_0_10px_#5eead4]' : 'bg-slate-400'}`} />
        Mode actuel : <span className="font-semibold">{on ? 'Transparent' : 'Opaque'}</span>
      </div>

    </div>
  )
}

/* ==================================================================
   Comment ça marche : les cristaux liquides s'alignent
================================================================== */
function CrystalDemo({ on, onToggle, hint }) {
  const crystals = useMemo(() => {
    let seed = 7
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
    return Array.from({ length: 96 }, (_, i) => ({
      rot: Math.round(rand() * 160 - 80),
      delay: Math.round(rand() * 350 + (i % 12) * 25),
    }))
  }, [])

  return (
    <div className="crystal-demo relative overflow-hidden rounded-[2rem] bg-ink p-6 md:p-10 text-white">
      <div className="pointer-events-none absolute inset-0 glow-bg" />
      <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        {/* Lumière */}
        <div className="flex items-center gap-4 md:flex-col md:items-start">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/15 ring-1 ring-amber-200/30">
            <Sun className="h-6 w-6 text-amber-200" />
          </span>
          <div className="rays rays-in flex-1 w-full">
            {[0,1,2,3,4].map(i => <span key={i} className="ray" style={{ '--i': i }} />)}
          </div>
        </div>

        {/* Film */}
        <div className="film mx-auto rounded-2xl p-4 md:p-5">
          <div className="grid grid-cols-12 gap-x-2 gap-y-3 md:gap-x-3 md:gap-y-4">
            {crystals.map((c, i) => (
              <span key={i} className="crystal" style={{ '--rot': `${c.rot}deg`, '--d': `${c.delay}ms` }} />
            ))}
          </div>
        </div>

        {/* Votre espace */}
        <div className="flex flex-row-reverse items-center gap-4 md:flex-col md:items-end">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-300/10 ring-1 ring-teal-200/30">
            <Eye className="h-6 w-6 text-teal-200" />
          </span>
          <div className="rays rays-out flex-1 w-full">
            {[0,1,2,3,4].map(i => <span key={i} className="ray" style={{ '--i': i }} />)}
          </div>
        </div>
      </div>

      <div className="relative mt-8 flex flex-col md:flex-row md:items-center gap-6 justify-between border-t border-white/10 pt-6">
        <div className="grid sm:grid-cols-2 gap-4 text-sm md:text-base max-w-3xl">
          <p className={`transition-opacity ${on ? 'opacity-40' : 'opacity-100'}`}>
            <strong className="text-white">Sans courant électrique :</strong> <span className="text-slate-300">les cristaux sont désordonnés → le film paraît opaque et protège votre intimité.</span>
          </p>
          <p className={`transition-opacity ${on ? 'opacity-100' : 'opacity-40'}`}>
            <strong className="text-teal-300">Avec courant électrique :</strong> <span className="text-slate-300">les molécules s’alignent → la vitre redevient transparente.</span>
          </p>
        </div>
      </div>
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
        className="w-full py-6 px-2 md:px-4 flex justify-between items-center gap-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl"
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
          <div className="px-2 md:px-4 sm:pl-[4.5rem] md:pl-[5rem] pb-7 leading-relaxed text-slate-600">{answer}</div>
        </div>
      </div>
    </div>
  )
}

/* ==================================================================
   APP
================================================================== */
function App() {
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

      setSubmitStatus('Message envoyé avec succès!')
      setFormData({ name: '', email: '', countryCode: '+212', phone: '', surface: '' })
    } catch (error) {
      setSubmitStatus('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sectors = [
    { icon: Building2, title: "Hôtellerie & Resorts", img: 'hotellerie', description: "Surprenez vos clients avec des suites lumineuses le jour, intimes et chaleureuses la nuit." },
    { icon: Briefcase, title: "Bureaux & Espaces de travail", img: 'bureaux', description: "Offrez à vos équipes la confidentialité quand elles en ont besoin, et l’ouverture quand elles la souhaitent." },
    { icon: Heart, title: "Santé & Cliniques", img: 'sante', description: "Créez un environnement rassurant, hygiénique et respectueux de l’intimité des patients." },
    { icon: Home, title: "Résidentiel & Villas", img: 'residentiel', description: "Faites entrer la modernité chez vous : plus de rideaux, plus de compromis, seulement confort et élégance." },
    { icon: Sparkles, title: "Beauté & Bien-être", img: 'beaute', description: "Donnez à vos clients l’expérience d’un cocon apaisant, entre lumière douce et discrétion totale." },
    { icon: ShoppingBag, title: "Commerce & Retail", img: 'commerce', description: "Attirez le regard avec des vitrines vivantes qui s’adaptent à chaque moment de la journée." }
  ]

  const values = [
    { icon: Lightbulb, title: "Innovation qui simplifie la vie" },
    { icon: Palette, title: "Design qui sublime vos espaces" },
    { icon: Shield, title: "Fiabilité pour une tranquillité d’esprit" },
    { icon: Leaf, title: "Durabilité pour l’avenir et la planète" }
  ]

  const marqueeWords = ['Transparent', 'Opaque', 'Intimité', 'Lumière', 'Sans travaux', 'Film PDLC', 'Smart Glass', 'Filtre UV']

  const navLinks = [
    { href: '#techno', label: 'Technologie' },
    { href: '#nos-secteurs', label: 'Secteurs' },
    { href: '#clients', label: 'Références' },
    { href: '#en-action', label: 'Réalisations' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ]

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
    <div className={`min-h-screen bg-white text-slate-700 antialiased pb-24 md:pb-0 ${isTransparent ? 'is-on' : 'is-off'}`}>
      {/* SEO hidden text */}
      <div ref={seoRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <h1>Vitres intelligentes au Maroc – Verre PDLC & Film Commutable</h1>
        <h2>Films intelligents et Smart Glass pour bureaux, maisons, hôtels et commerces</h2>
        <p>
          Découvrez nos solutions de <strong>vitrage intelligent</strong> : PDLC(Polymer Dispersed Liquid Crystal) et films commutables
          offrant confidentialité à la demande, design moderne et performance énergétique.
        </p>
      </div>

      {/* ================= Header (flottant) ================= */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
        <div className={`mx-auto max-w-7xl flex items-center justify-between gap-3 rounded-full pl-4 pr-2 py-2 transition-all duration-500 ${scrolled || menuOpen ? 'bg-white/75 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(15,27,42,0.35)] ring-1 ring-ink/5' : 'bg-white/0'}`}>
          <a href="#accueil" className="shrink-0">
            <img src={logoImage} alt="Vitres intelligentes Maroc – verre PDLC et film commutable" className="h-9 md:h-10 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="px-3.5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-ink hover:bg-ink/5 transition-colors">{l.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_TEL} className="hidden md:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-ink/5 transition-colors" aria-label={`Appeler le ${PHONE_DISPLAY}`}>
              <Phone className="h-4 w-4 text-teal-600" />
              <span className="hidden xl:inline">{PHONE_DISPLAY}</span>
            </a>
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
              className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-frame text-white text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              Devis gratuit
            </a>
            <button
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
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
              <a href={PHONE_TEL} className="font-semibold text-teal-700 flex items-center gap-2"><Phone className="h-4 w-4" /> Appeler</a>
            </div>
          </nav>
        )}
      </header>

      {/* ================= Hero ================= */}
      <section id="accueil" className="relative pt-28 md:pt-32 pb-10 md:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hero-bg" />
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-16 items-end mb-10 md:mb-14">
            <div>
              <p className="eyebrow">Film PDLC · Smart Glass · Maroc</p>
              <h1 className="font-extrabold text-ink leading-[0.95] tracking-tight text-[clamp(3rem,9vw,7.5rem)]">
                Vos vitres,<br />
                <span className="frost-word" data-text="Réinventées">Réinventées</span>
              </h1>
            </div>
            <div className="lg:pb-3">
              <p className="text-xl md:text-2xl text-ink font-medium leading-snug mb-4">
                Passez de la transparence à l’intimité en un instant. Offrez à vos espaces élégance, confort et innovation.
              </p>
              <p className="text-slate-500 mb-8">
                Nos films de verre intelligents redéfinissent vos espaces. Sans travaux lourds, vous choisissez : ouverture totale sur la lumière ou bulle d’intimité. Un geste simple, pour un quotidien plus moderne.
              </p>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Devis gratuit, sans engagement</p>
              <ContactButtons size="lg" />
              <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-ink transition-colors">
                ou par formulaire <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
            <SmartWindow on={isTransparent} windowRef={windowRef} onSwitch={toggleMode} />
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            👉 Utilisez l’interrupteur en bas de l’écran pour voir la transformation instantanée de nos vitres intelligentes — <span className="text-ink font-medium">tout le site réagit.</span></p>
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
              <p className="eyebrow">Comment ça marche</p>
              <h2 className="section-title">Notre <span className="text-teal-600">Technologie</span></h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              Un film mince appliqué <strong className="text-ink">sur vos vitres existantes</strong>. À l’intérieur, des cristaux liquides qui obéissent à un simple interrupteur.
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
              <p className="eyebrow">Pour qui ?</p>
              <h2 className="section-title">Nos <span className="text-teal-600">Secteurs</span></h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              Chaque vitre cache un usage. <span className="hidden md:inline">Survolez</span><span className="md:hidden">Touchez</span> une vitre pour la rendre transparente.
            </p>
          </div>

          <div className="facade grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {sectors.map((sector, index) => (
              <button
                key={index}
                type="button"
                className={`pane text-left ${openPane === index ? 'is-open' : ''}`}
                onClick={() => setOpenPane(openPane === index ? null : index)}
                aria-expanded={openPane === index}
              >
                {/* Derrière la vitre */}
                <div className="pane-back">
                  <span className="pane-blob" style={{ '--h': `${168 + index * 9}deg` }} />
                  <PhotoLayer src={`/images/secteur-${sector.img}-transparent.jpg`} ratio={SECTOR_RATIO} alt={`${sector.title} – vitre intelligente en mode transparent`} loading="lazy" className="pane-photo" />
                  <span className="pane-shade" />
                  <sector.icon className="h-10 w-10 text-teal-300 mb-auto relative" />
                  <h3 className="relative text-xl font-semibold text-white mb-3">{sector.title}</h3>
                  <p className="relative text-slate-300 leading-relaxed">{sector.description}</p>
                </div>
                {/* Le film */}
                <div className="pane-frost">
                  <PhotoLayer src={`/images/secteur-${sector.img}-opaque.jpg`} ratio={SECTOR_RATIO} alt={`${sector.title} – vitre intelligente en mode opaque`} loading="lazy" className="pane-photo" />
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
              <p className="eyebrow">Références</p>
              <h2 className="section-title">Ils nous ont fait <span className="text-teal-600">confiance</span></h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              Institutions financières, industriels, hôtels de prestige et particuliers : partout au Maroc, nos vitres intelligentes équipent des espaces exigeants.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal>
            {CLIENTS.map((c, i) => (
              <div key={c.name} className="client-pane group">
                <span className="client-frost" />
                <div className="relative flex h-full flex-col">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">{c.place}</span>
                  <p className="mt-auto text-3xl md:text-[2.1rem] font-bold leading-[1.05] tracking-tight text-ink">{c.name}</p>
                  <span className="mt-5 h-1 w-10 rounded-full bg-teal-500 transition-all duration-500 group-hover:w-20" />
                </div>
              </div>
            ))}
            <div className="client-pane client-pane--dark group">
              <div className="relative flex h-full flex-col">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-300">Partout au Maroc</span>
                <p className="mt-auto text-3xl md:text-[2.1rem] font-bold leading-[1.05] tracking-tight text-white">
                  <span className="text-teal-300">+</span> de nombreux particuliers
                </p>
                <p className="mt-3 text-slate-400">Villas, appartements, bureaux à domicile.</p>
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
              <p className="eyebrow">En action</p>
              <h2 className="section-title">Quelques heures de pose. <span className="text-teal-600">Des années d’effet waouh.</span></h2>
            </div>
            <p className="text-lg text-slate-600 lg:pb-2">
              Installation facile, résultat spectaculaire : vos vitres deviennent intelligentes en quelques heures. De la transparence à l’intimité, créez l’ambiance parfaite à tout moment. Vos espaces suivent vos envies.
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
                          title={`Reel Instagram – ${reel.title}`}
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
                    {reel.title}
                  </p>
                  <p className="mt-2 text-slate-600">{reel.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 text-center" data-reveal>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-button inline-flex items-center gap-3 rounded-full pl-2 pr-6 py-2 font-semibold text-white shadow-xl shadow-pink-900/20 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                <Instagram className="h-5 w-5" />
              </span>
              Suivre @{INSTAGRAM_HANDLE} sur Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ================= Valeurs ================= */}
      <section id="nos-valeurs" className="relative overflow-hidden py-24 md:py-32 bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 glow-bg" />
        <div className="container relative mx-auto px-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div data-reveal>
            <p className="eyebrow eyebrow--light">Notre engagement</p>
            <h2 className="section-title section-title--light">Nos <span className="text-teal-300">Valeurs</span></h2>
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
            <p className="eyebrow">Tout savoir</p>
            <h2 className="section-title">Questions <span className="text-teal-600">Fréquentes</span></h2>
            <div className="mt-10 rounded-3xl bg-ink p-7 text-white">
              <p className="text-lg font-semibold">Une autre question ?</p>
              <p className="mt-1 text-slate-400">Notre équipe vous répond directement.</p>
              <ContactButtons className="mt-6" />
            </div>
          </div>

          <div className="border-t border-slate-200" data-reveal>
            {[
              {
                icon: <Zap className="h-5 w-5 text-teal-600" />,
                question: "Qu’est‑ce que le film intelligent PDLC et comment fonctionne-t‑il ?",
                answer: (
                  <p>
                    Le film PDLC (Polymer Dispersed Liquid Crystal) est un film mince que nous appliquons <strong>sur une vitre existante</strong> pour la rendre “intelligente”. <br/>
                    Le film contient des cristaux liquides dans une matrice polymère qui s'organisent différemment selon le branchement électrique :<br/>
                      - <strong>Sans courant électrique :</strong> les cristaux sont désordonnés → le film paraît <strong><span className="text-teal-600">opaque</span></strong> et protège votre intimité.<br/>
                      - <strong>Avec courant électrique :</strong> les molécules s’alignent → la vitre redevient <strong><span className="text-teal-600">transparente</span></strong> et laisse passer la lumière.<br/>
                    Cette technologie transforme vos vitres existantes en surfaces modulables, modernes et sécurisées.
                  </p>
                )
              },
              {
                icon: <Sun className="h-5 w-5 text-teal-600" />,
                question: "Quels bénéfices concrets pour vos espaces ?",
                answer: (
                  <p>
                    <strong>Intimité instantanée</strong> : d’un simple geste, passez de transparent à opaque selon vos besoins.<br/>
                    <strong>Filtration des UV</strong> : protegez vos intérieurs et vos occupants des rayons ultraviolets.<br/>
                    <strong>Entretien minimal</strong> : facile à nettoyer, sans mécanisme fragile ni store à dépoussiérer.<br/>
                    <strong>Économies d’énergie</strong> : Réduisez les coûts de climatisation et de chauffage grâce à ses propriétés d’isolation thermique.<br/>
                    <strong>Lumière naturelle maximale</strong> : même en mode opaque, la luminosité reste douce et diffuse.<br/>
                    <strong>Sécurité renforcée</strong> : en cas de bris, le film retient les éclats de verre, évitant toute projection dangereuse.<br/>
                    <strong>Polyvalence</strong> : sert de cloison dynamique, d’écran de projection HD ou même de tableau blanc interactif dans les salles de réunion.<br/>
               </p>
                )
              },
              {
                icon: <Layers className="h-5 w-5 text-teal-600" />,
                question: "Où installer le film, et quelle gamme choisir selon vos objectifs ?",
                answer: (
                  <p>
                    Nos films s’adaptent à vos usages et ambitions :<br/>
                    <strong>Essential</strong> : bureaux, salles de réunion, musées — intimité, transparence, projection.<br/>
                    <strong>Superior</strong> : espaces multi-usages entre vision claire, projection et séparation visuelle.<br/>
                    <strong>Crystal</strong> : lieux prestigieux demandant transparence optimale et rendu haut de gamme.<br/>
                    <strong>Ultra</strong> : villas de luxe, hôtels 5 étoiles, laboratoires ou zones hautement sécurisées.
                  </p>
                )
              },
              {
                icon: <Shield className="h-5 w-5 text-teal-600" />,
                question: "Quelle est la différence entre vos “Vitres Intelligentes” et un verre à technologie intégrée ?",
                answer: (
                  <p>
                    - Nos <strong>Vitres Intelligentes</strong> désignent exclusivement le <strong>film PDLC appliqué sur vos vitrages existants</strong>, pour les rendre modulables et “intelligentes” instantanément.<br/>
                    - Un <strong>verre à technologie intégrée</strong> (ou “smart glass”) intègre la couche PDLC dès sa fabrication, nécessitant de remplacer le vitrage complet et impliquant un coût plus élevé.<br/>
                    Avec nos films, vous transformez vos vitrages actuels en espaces dynamiques, modernes et sécurisés, <strong>sans changer vos fenêtres</strong>.
                  </p>
                )
              },
              {
                icon: <Info className="h-5 w-5 text-teal-600" />,
                question: "Y a‑t-il des points de vigilance à connaître ?",
                answer: (
                  <p>
                    <strong>Coût</strong> : plus onéreux qu’un vitrage classique, mais le film PDLC reste <em>beaucoup plus économique</em> qu’un verre intelligent intégré.<br/>
                    <strong>Installation professionnelle</strong> : la pose et le raccordement électrique nécessitent un installateur qualifié.<br/>
                    <strong>Utilisation intérieure</strong> : conçu pour les espaces intérieurs (bureaux, villas, hôtels, etc.).<br/>
                    <strong>Alimentation électrique</strong> : un faible courant alternatif est nécessaire pour passer en mode transparent.<br/>
                    <strong>Technologie encore émergente</strong> : assurez-vous de choisir un <strong>fournisseur fiable</strong> pour garantir la qualité et la durabilité du produit.<br/>
                  </p>
                )
              },
              {
                icon: <Award className="h-5 w-5 text-teal-600" />,
                question: "Quelle durabilité et sécurité pour votre investissement ?",
                answer: (
                  <p>
                    Nos films résistent jusqu’à 105 °C, sont anti-rayures et améliorent l’isolation acoustique d’environ 20 %.<br/>
                    En cas de casse, ils retiennent les éclats et garantissent un usage sûr et durable.
                  </p>
                )
              }
              ].map((faq, idx) => (
                <FAQItem key={idx} index={idx} icon={faq.icon} question={faq.question} answer={faq.answer} />
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
              <p className="eyebrow eyebrow--light">Contact</p>
              <h3 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">Prêts à transformer vos vitres ? <span className="text-teal-300">Parlons-en !</span></h3>
              <div className="mt-12 space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Nous sommes à votre écoute</h3>
                <p className="text-slate-400">Le plus rapide pour votre devis gratuit :</p>
                <ContactButtons size="lg" className="pb-4" />
                {[
                  { href: 'mailto:contact@vitres-intelligentes.com', icon: Mail, label: 'contact@vitres-intelligentes.com' },
                  { href: INSTAGRAM_URL, icon: Instagram, label: `@${INSTAGRAM_HANDLE}`, external: true },
                ].map((c) => (
                  <a key={c.label} href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-teal-400 group-hover:text-ink">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="text-lg group-hover:text-teal-200 transition-colors">{c.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div className="rounded-[2rem] bg-white p-7 md:p-10 text-ink shadow-2xl" data-reveal>
              <p className="text-2xl font-bold">Ou laissez-nous vos coordonnées</p>
              <p className="text-slate-500 mb-8">Nous vous rappelons pour votre devis gratuit, sans engagement.</p>
              <form onSubmit={handleContactSubmit} className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Nom"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="h-13 rounded-xl bg-paper border-transparent focus-visible:border-teal-500 px-4"
                />
                <Input
                  type="email"
                  placeholder="Email"
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
                    aria-label="Indicatif"
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
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 h-13 rounded-xl bg-paper border-transparent focus-visible:border-teal-500 px-4"
                    required
                  />
                </div>

                {/* Surface à équiper */}
                <fieldset className="sm:col-span-2">
                  <legend className="mb-3 text-sm font-medium text-slate-500">Surface à équiper</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'moins de 5 m2', label: 'Moins de 5 m²' },
                      { value: 'entre 5 et 40 m2', label: '5 à 40 m²' },
                      { value: 'plus de 40 m2', label: 'Plus de 40 m²' },
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
                  {isSubmitting ? 'Envoi en cours...' : <>Recevoir mon devis gratuit <ArrowRight className="h-5 w-5" /></>}
                </button>
                {submitStatus && (
                  <p className={`sm:col-span-2 text-sm ${submitStatus.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bas de page */}
          <div className="mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
            <p>&copy; {year} Vitres Intelligentes Maroc, Noorium Group SARL. Tous droits réservés.</p>
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
          <p className="footer-wordmark" aria-hidden="true">Vitres Intelligentes</p>
        </div>
      </footer>

      {/* ===== Dock flottant : interrupteur + appel + WhatsApp (suit le scroll, pensé mobile) ===== */}
      <div className="dock" role="region" aria-label="Interrupteur et contact rapide">
        <div className="dock-switch">
          <WallSwitch on={isTransparent} onToggle={() => toggleMode()} size="dock" hint={!tried ? 'Cliquez !' : null} />
          <span className="dock-label">
            <span className="dock-label-top">Vitres</span>
            <span className="dock-label-state">{isTransparent ? 'Transparentes' : 'Opaques'}</span>
          </span>
        </div>
        <span className="dock-sep" aria-hidden="true" />
        <a href={PHONE_TEL} className="dock-btn dock-btn--call" aria-label={`Appeler le ${PHONE_DISPLAY}`}>
          <Phone className="h-5 w-5" />
          <span className="dock-btn-text">Appeler</span>
        </a>
        <button onClick={openWhatsApp} className="dock-btn dock-btn--wa" aria-label="WhatsApp">
          <img src={whatsappIcon} alt="" className="h-5 w-5 invert" />
          <span className="dock-btn-text">WhatsApp</span>
        </button>
      </div>
    </div>
  )
}

export default App
