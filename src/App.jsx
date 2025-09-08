import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Building2, Briefcase, Heart, Home, Sparkles, ShoppingBag, Lightbulb, Palette, Shield, Leaf, Mail, Phone, Facebook, Linkedin } from 'lucide-react'
import emailjs from '@emailjs/browser'
import logoImage from '/src/assets/logo_cropped_transparent-Cdd5jMCx.png'
import whatsappIcon from '/src/assets/whatsapp_icon-DlvpWZxi.png'
import '/src/App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  // Configuration EmailJS (à remplacer par vos vraies clés)
  const EMAILJS_SERVICE_ID = 'service_bmmspcm'
  const EMAILJS_TEMPLATE_ID = 'template_zlf1l2h'
  const EMAILJS_PUBLIC_KEY = 'sCLtjmpeph40aEzni'

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      console.log('EmailJS result:', result)
      
      setSubmitStatus('Message envoyé avec succès!')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setSubmitStatus('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppDemo = () => { 
    const phoneNumber = "212770330219" // Numéro sans espaces ni caractères spéciaux
    const message = "Bonjour ! Je suis intéressé(e) par une démonstration de vos vitres intelligentes. Pouvez-vous me contacter ?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const sectors = [
    {
      icon: Building2,
      title: "Hôtellerie & Resorts",
      description: "Offrir des expériences haut de gamme et personnalisées"
    },
    {
      icon: Briefcase,
      title: "Bureaux & Espaces de travail",
      description: "Optimiser confidentialité et lumière naturelle"
    },
    {
      icon: Heart,
      title: "Santé & Cliniques",
      description: "Garantir confort, hygiène et intimité aux patients"
    },
    {
      icon: Home,
      title: "Résidentiel & Villas",
      description: "Apporter luxe, confort et modernité au quotidien"
    },
    {
      icon: Sparkles,
      title: "Beauté & Bien-être",
      description: "Sublimer spas, salons et instituts avec des espaces élégants et apaisants"
    },
    {
      icon: ShoppingBag,
      title: "Commerce & Retail",
      description: "Créer des espaces commerciaux modernes et attractifs pour une expérience client unique"
    }
  ]

  const values = [
    { icon: Lightbulb, title: "Innovation" },
    { icon: Palette, title: "Design moderne" },
    { icon: Shield, title: "Fiabilité" },
    { icon: Leaf, title: "Durabilité" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logoImage} alt="Vitres Intelligentes Maroc" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#accueil" className="text-gray-700 hover:text-teal-600 transition-colors">Accueil</a>
            <a href="#apropos" className="text-gray-700 hover:text-teal-600 transition-colors">À propos</a>
            <a href="#contact" className="text-gray-700 hover:text-teal-600 transition-colors">Contact</a>
          </nav>
          <Button 
            onClick={handleWhatsAppDemo}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            Demander une démo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Vos vitres, <span className="text-teal-600">Réinventées</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Des solutions innovantes pour transformer vos vitres : 
            Transparence ou Intimité en un clic.
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
            Vitres Intelligentes Maroc apporte l'innovation au cœur de vos espaces. Grâce à nos films de verre intelligents, 
            profitez d'une transparence ou d'une intimité à la demande, sans travaux. Design, confort et simplicité réunis 
            pour transformer chaque environnement.
          </p>
          <Button 
            size="lg" 
            onClick={handleWhatsAppDemo}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="mr-2 h-5 w-5" />
            Demander une démo
          </Button>
        </div>
      </section>

      {/* Video Section */}
      <div className="relative aspect-[9/16] max-w-md mx-auto rounded-lg overflow-hidden">
        <iframe
          src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F61578692011171%2Fvideos%2F1395095338269544%2F&show_text=false&autoplay=true&mute=true"
          className="absolute top-0 left-0 w-full h-full"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>


      {/* Sectors Section */}
      <section className="py-20">
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
      <section className="py-20 bg-gray-50">
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

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Contactez-nous</h3>
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
                <Input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-32"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
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
              <h3 className="text-2xl font-bold mb-8">Informations</h3>
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
                    href="https://linkedin.com/company/YOUR_LINKEDIN_PAGE" 
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

