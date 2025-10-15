import React, { useState, Suspense, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Building2, Briefcase, Heart, Home,
   Sparkles, ShoppingBag, Lightbulb, Palette,
    Shield, Leaf, Mail, Phone, Facebook, Linkedin ,
      ChevronDown, ChevronUp, Sun, Layers, Zap, Info, Award} from 'lucide-react'
import logoImage from '/src/assets/Minimalwhitebackground.png'
import whatsappIcon from '/src/assets/whatsapp_icon-DlvpWZxi.png'
import '/src/App.css'
import transparentImage from './assets/transparent_window.png'
import opaqueImage from './assets/opaque_window.png'

// Lazy load Carousel
const Carousel = Suspense
  ? React.lazy(() => import('@/components/ui/carousel').then(mod => ({ default: mod.Carousel })))
  : null
const CarouselContent = React.lazy(() => import('@/components/ui/carousel').then(mod => ({ default: mod.CarouselContent })))
const CarouselItem = React.lazy(() => import('@/components/ui/carousel').then(mod => ({ default: mod.CarouselItem })))
const CarouselNext = React.lazy(() => import('@/components/ui/carousel').then(mod => ({ default: mod.CarouselNext })))
const CarouselPrevious = React.lazy(() => import('@/components/ui/carousel').then(mod => ({ default: mod.CarouselPrevious })))
 
{/* Composant FAQItem */}
function FAQItem({ icon, question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button 
        className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center text-left">
          {icon}
          <span className="text-gray-900 font-medium">{question}</span>
        </div>
        {open ? <ChevronUp className="h-5 w-5 text-teal-600" /> : <ChevronDown className="h-5 w-5 text-teal-600" />}
      </button>
      {open && <div className="px-6 py-4 bg-white border-t border-gray-200">{answer}</div>}
    </div>
  )
}

function App() {
  // SEO hidden text
  const seoRef = useRef()

  const [isTransparent, setIsTransparent] = useState(true)
  const toggleMode = () => {
    setIsTransparent(!isTransparent)
  }
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '',
    phone: '',
    surface: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [activeSlide, setActiveSlide] = useState(0)
  const [carouselVisible, setCarouselVisible] = useState(false)

  const slides = [

    {
      video: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F801888595706424%2Fvideos%2F801888595706424%2F&show_text=false&autoplay=true&mute=true",
      text: "Installation facile, résultat spectaculaire : vos vitres deviennent intelligentes en quelques heures.",
    },
    {
      video: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F61578692011171%2Fvideos%2F1395095338269544%2F&show_text=false&autoplay=true&mute=true",
      text: "De la transparence à l’intimité, créez l’ambiance parfaite à tout moment. Vos espaces suivent vos envies.",
    }
  ]

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
      const result = await emailjs.send(
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
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setSubmitStatus('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }



  const handleWhatsAppDemo = () => { 
    const phoneNumber = "212770330219"
    const message = "Bonjour ! Je suis intéressé(e) par une démonstration de vos vitres intelligentes. Pouvez-vous me contacter ?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const sectors = [
    { icon: Building2, title: "Hôtellerie & Resorts", description: "Surprenez vos clients avec des suites lumineuses le jour, intimes et chaleureuses la nuit." },
    { icon: Briefcase, title: "Bureaux & Espaces de travail", description: "Offrez à vos équipes la confidentialité quand elles en ont besoin, et l’ouverture quand elles la souhaitent." },
    { icon: Heart, title: "Santé & Cliniques", description: "Créez un environnement rassurant, hygiénique et respectueux de l’intimité des patients." },
    { icon: Home, title: "Résidentiel & Villas", description: "Faites entrer la modernité chez vous : plus de rideaux, plus de compromis, seulement confort et élégance." },
    { icon: Sparkles, title: "Beauté & Bien-être", description: "Donnez à vos clients l’expérience d’un cocon apaisant, entre lumière douce et discrétion totale." },
    { icon: ShoppingBag, title: "Commerce & Retail", description: "Attirez le regard avec des vitrines vivantes qui s’adaptent à chaque moment de la journée." }
  ]

  const values = [
    { icon: Lightbulb, title: "Innovation qui simplifie la vie" },
    { icon: Palette, title: "Design qui sublime vos espaces" },
    { icon: Shield, title: "Fiabilité pour une tranquillité d’esprit" },
    { icon: Leaf, title: "Durabilité pour l’avenir et la planète" }
  ]

  // Lazy load carousel when visible
  const carouselRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) setCarouselVisible(true)
    }, { threshold: 0.1 })
    if(carouselRef.current) observer.observe(carouselRef.current)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* SEO hidden text */}
      <div ref={seoRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <h1>Vitres intelligentes au Maroc – Verre PDLC & Film Commutable</h1>
        <h2>Films intelligents et Smart Glass pour bureaux, maisons, hôtels et commerces</h2>
        <p>
          Découvrez nos solutions de <strong>vitrage intelligent</strong> : PDLC(Polymer Dispersed Liquid Crystal) et films commutables
          offrant confidentialité à la demande, design moderne et performance énergétique.
        </p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">

        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#accueil" className="flex items-center space-x-2">
            <img src={logoImage} alt="Vitres intelligentes Maroc – verre PDLC et film commutable" className="h-12 w-auto" />
          </a>
          <nav className="hidden md:flex space-x-8">
            <a href="#accueil" className="text-gray-700 hover:text-teal-600 transition-colors">Accueil</a>
            <a href="#techno" className="text-gray-700 hover:text-teal-600 transition-colors">Notre technologie</a>
            <a href="#nos-secteurs" className="text-gray-700 hover:text-teal-600 transition-colors">Nos secteurs</a>
            <a href="#nos-valeurs" className="text-gray-700 hover:text-teal-600 transition-colors">Nos valeurs</a>
            <a href="#contact" className="text-gray-700 hover:text-teal-600 transition-colors">Contact</a>
          </nav>
          <Button 
            onClick={handleWhatsAppDemo}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <img src={whatsappIcon} alt="Contact WhatsApp Vitres Intelligentes Maroc" className="mr-2 h-5 w-5" />
            Démo gratuite
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Vos vitres, <span className="text-teal-600">Réinventées</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Passez de la transparence à l’intimité en un instant. Offrez à vos espaces élégance, confort et innovation.
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
            Nos films de verre intelligents redéfinissent vos espaces. Sans travaux lourds, vous choisissez : ouverture totale sur la lumière ou bulle d’intimité. Un geste simple, pour un quotidien plus moderne.
          </p>

          {/* Interactive Switch Demo */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              {/* Image Display */}
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]">
                <img 
                  src={isTransparent ? transparentImage : opaqueImage}
                  alt={isTransparent ? "Mode transparent" : "Mode opaque"}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />


                {/* Switch centré en bas de l’image */}
                <button
                  onClick={toggleMode}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 
                            w-32 h-16 bg-gray-200 rounded-full p-2 
                            transition-all duration-300 hover:bg-gray-300 
                            focus:outline-none focus:ring-4 focus:ring-teal-200 shadow-lg"
                  aria-label={`Basculer vers le mode ${isTransparent ? 'opaque' : 'transparent'}`}
                >
                  <div className={`absolute inset-2 rounded-full transition-all duration-300 ${
                    isTransparent ? 'bg-teal-500' : 'bg-gray-400'
                  }`}>
                    <div className={`absolute top-1 w-10 h-10 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                      isTransparent ? 'translate-x-14' : 'translate-x-1'
                    }`}>
                      <div className="flex items-center justify-center h-full">
                        {isTransparent ? (
                          <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Texte explicatif */}
              <div className="text-lg font-medium text-gray-700 mb-4">
                Mode actuel:{" "}
                <span className="font-bold text-teal-600 inline-block min-w-[110px] text-left">
                  {isTransparent ? "Transparent" : "Opaque"}
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-md text-center mx-auto">
                👉 Cliquez sur l'interrupteur pour voir la transformation instantanée de nos vitres intelligentes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="techno" className="py-20 bg-gray-50" ref={carouselRef}>
        <div className="max-w-md mx-auto relative">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Notre <span className="text-teal-600">Technologie</span>
          </h2>

          {carouselVisible && (
            <Suspense fallback={<div>Chargement de la technologie...</div>}>
              <Carousel>
                <CarouselContent>
                  {slides.map((slide, idx) => (
                    <CarouselItem key={idx}>
                      <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
                        {slide.video ? (
                          <iframe
                            src={slide.video}
                            title={`Vidéo ${idx + 1} – Vitres intelligentes PDLC`}
                            className="absolute top-0 left-0 w-full h-full"
                            style={{ border: 'none', overflow: 'hidden' }}
                            frameBorder="0"
                            allowFullScreen
                            loading="lazy"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          />
                        ) : (
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-700">
                            {slide.text}
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center text-lg font-medium">
                          {slide.text}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/50 text-white p-2 rounded-full">◀</CarouselPrevious>
                <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/50 text-white p-2 rounded-full">▶</CarouselNext>
              </Carousel>
            </Suspense>
          )}

          <p className="text-sm text-gray-500 max-w-md text-center">
            👉 Glissez ou utilisez les flèches pour voir plus d'exemples
          </p>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="nos-secteurs" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Nos <span className="text-teal-600">Secteurs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <sector.icon className="h-16 w-16 text-teal-600 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{sector.title}</h3>
                  <p className="text-gray-600">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="nos-valeurs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Nos <span className="text-teal-600">Valeurs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="h-12 w-12 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Accordéon */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Questions <span className="text-teal-600">Fréquentes</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">

            {[
              {
                icon: <Zap className="h-5 w-5 text-teal-600 mr-2" />,
                question: "Qu’est‑ce que le film intelligent PDLC et comment fonctionne-t‑il ?",
                answer: (
                  <p className="text-gray-700">
                    Le film PDLC (Polymer Dispersed Liquid Crystal) est un film mince que nous appliquons <strong>sur une vitre existante</strong> pour la rendre “intelligente”. <br/>
                    Le film contient des cristaux liquides dans une matrice polymère qui s'organisent différemment selon le branchement électrique :<br/>
                      - <strong>Sans courant électrique :</strong> les cristaux sont désordonnés → le film paraît <strong><span className="text-teal-600">opaque</span></strong> et protège votre intimité.<br/>
                      - <strong>Avec courant électrique :</strong> les molécules s’alignent → la vitre redevient <strong><span className="text-teal-600">transparente</span></strong> et laisse passer la lumière.<br/>
                    Cette technologie transforme vos vitres existantes en surfaces modulables, modernes et sécurisées.
                  </p>
                )
              },
              {
                icon: <Sun className="h-5 w-5 text-teal-600 mr-2" />,
                question: "Quels bénéfices concrets pour vos espaces ?",
                answer: (
                  <p className="text-gray-700">
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
                icon: <Layers className="h-5 w-5 text-teal-600 mr-2" />,
                question: "Où installer le film, et quelle gamme choisir selon vos objectifs ?",
                answer: (
                  <p className="text-gray-700">
                    Nos films s’adaptent à vos usages et ambitions :<br/>
                    <strong>Essential</strong> : bureaux, salles de réunion, musées — intimité, transparence, projection.<br/>
                    <strong>Superior</strong> : espaces multi-usages entre vision claire, projection et séparation visuelle.<br/>
                    <strong>Crystal</strong> : lieux prestigieux demandant transparence optimale et rendu haut de gamme.<br/>
                    <strong>Ultra</strong> : villas de luxe, hôtels 5 étoiles, laboratoires ou zones hautement sécurisées.
                  </p>
                )
              },
              {
                icon: <Shield className="h-5 w-5 text-teal-600 mr-2" />,
                question: "Quelle est la différence entre vos “Vitres Intelligentes” et un verre à technologie intégrée ?",
                answer: (
                  <p className="text-gray-700">
                    - Nos <strong>Vitres Intelligentes</strong> désignent exclusivement le <strong>film PDLC appliqué sur vos vitrages existants</strong>, pour les rendre modulables et “intelligentes” instantanément.<br/>
                    - Un <strong>verre à technologie intégrée</strong> (ou “smart glass”) intègre la couche PDLC dès sa fabrication, nécessitant de remplacer le vitrage complet et impliquant un coût plus élevé.<br/>
                    Avec nos films, vous transformez vos vitrages actuels en espaces dynamiques, modernes et sécurisés, <strong>sans changer vos fenêtres</strong>.
                  </p>
                )
              },
              {
                icon: <Info className="h-5 w-5 text-teal-600 mr-2" />,
                question: "Y a‑t-il des points de vigilance à connaître ?",
                answer: (
                  <p className="text-gray-700">
                    <strong>Coût</strong> : plus onéreux qu’un vitrage classique, mais le film PDLC reste <em>beaucoup plus économique</em> qu’un verre intelligent intégré.<br/>
                    <strong>Installation professionnelle</strong> : la pose et le raccordement électrique nécessitent un installateur qualifié.<br/>
                    <strong>Utilisation intérieure</strong> : conçu pour les espaces intérieurs (bureaux, villas, hôtels, etc.).<br/>
                    <strong>Alimentation électrique</strong> : un faible courant alternatif est nécessaire pour passer en mode transparent.<br/>
                    <strong>Technologie encore émergente</strong> : assurez-vous de choisir un <strong>fournisseur fiable</strong> pour garantir la qualité et la durabilité du produit.<br/>
                  </p>
                )
              },
              {
                icon: <Award className="h-5 w-5 text-teal-600 mr-2" />,
                question: "Quelle durabilité et sécurité pour votre investissement ?",
                answer: (
                  <p className="text-gray-700">
                    Nos films résistent jusqu’à 105 °C, sont anti-rayures et améliorent l’isolation acoustique d’environ 20 %.<br/> 
                    En cas de casse, ils retiennent les éclats et garantissent un usage sûr et durable.
                  </p>
                )
              }
              ].map((faq, idx) => (
                <FAQItem key={idx} icon={faq.icon} question={faq.question} answer={faq.answer} />
              ))}

          </div>
        </div>
      </section>



      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Prêts à transformer vos vitres ? Parlons-en !</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <Input
                  placeholder="Nom"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                {/* Téléphone avec indicatif */}
                <div className="flex space-x-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
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
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    required
                  />
                </div>

                {/* Surface à équiper */}
                <select
                  value={formData.surface}
                  onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                  required
                  className="w-full bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2"
                >
                  <option value="">Surface à équiper</option>
                  <option value="moins de 5 m2">Moins de 5 m²</option>
                  <option value="entre 5 et 40 m2">Entre 5 et 40 m²</option>
                  <option value="plus de 40 m2">Plus de 40 m²</option>
                </select>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Je veux découvrir la différence'}
                </Button>
                {submitStatus && (
                  <p className={`text-sm ${submitStatus.includes('succès') ? 'text-green-400' : 'text-red-400'}`}>
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Nous sommes à votre écoute</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-teal-400" />
                  <span>contact@vitres-intelligentes.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-teal-400" />
                  <span>+212 7 70 33 02 19</span>
                </div>
                <div className="flex space-x-4 mt-8">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61578692011171" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/vitres-intelligentes-maroc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Vitres Intelligente Maroc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
