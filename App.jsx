import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Building2, Hotel, Heart, Home, Sparkles, Lightbulb, Palette, Shield, Leaf, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import whatsappIcon from './assets/whatsapp_icon.png'
import './App.css'

import logo from './assets/logo_cropped_transparent.png'

function App() {
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const secteurs = [
    {
      icon: Hotel,
      title: "Hôtellerie & Resorts",
      description: "Offrir des expériences haut de gamme et personnalisées"
    },
    {
      icon: Building2,
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
    }
  ]

  const valeurs = [
    { icon: Lightbulb, title: "Innovation" },
    { icon: Palette, title: "Design moderne" },
    { icon: Shield, title: "Fiabilité" },
    { icon: Leaf, title: "Durabilité" }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-white smooth-scroll">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 glass-effect border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <img src={logo} alt="Vitres Intelligente Maroc Logo" className="h-16" />
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <motion.a 
                whileHover={{ color: "var(--accent)" }}
                href="#accueil" 
                className="text-gray-700 hover:text-accent transition-colors"
              >
                Accueil
              </motion.a>
              <motion.a 
                whileHover={{ color: "var(--accent)" }}
                href="#presentation-rapide" 
                className="text-gray-700 hover:text-accent transition-colors"
              >
                À propos
              </motion.a>
              <motion.a 
                whileHover={{ color: "var(--accent)" }}
                href="#contact" 
                className="text-gray-700 hover:text-accent transition-colors"
              >
                Contact
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen hero-gradient flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight"
          >
            Vos vitres, <span className="text-accent">Réinventées</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Des solutions innovantes pour transformer vos vitres : Transparence ou Intimité en un clic.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full flex justify-center"
          >
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white px-10 py-5 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <img src={whatsappIcon} alt="WhatsApp Icon" className="h-6 w-6" />
              <span>Demander une démo</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Présentation rapide */}
      <section id="presentation-rapide" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            id="presentation"
            data-animate
            initial="hidden"
            animate={isVisible.presentation ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-700 leading-relaxed"
          >
            Vitres Intelligentes Maroc apporte l’innovation au cœur de vos espaces. Grâce à nos films de verre intelligents, profitez d’une transparence ou d’une intimité à la demande, sans travaux. Design, confort et simplicité réunis pour transformer chaque environnement.
          </motion.p>
        </div>
      </section>

      {/* Secteurs et clients cibles */}
      <section id="apropos" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            id="secteurs-title"
            data-animate
            initial="hidden"
            animate={isVisible['secteurs-title'] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16"
          >
            Nos <span className="text-accent">Secteurs</span>
          </motion.h2>
          <motion.div 
            id="secteurs-grid"
            data-animate
            initial="hidden"
            animate={isVisible['secteurs-grid'] ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {secteurs.map((secteur, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className="section-card border-0 shadow-lg bg-white h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <secteur.icon className="w-12 h-12 text-accent mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {secteur.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {secteur.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Valeurs clés */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            id="valeurs-title"
            data-animate
            initial="hidden"
            animate={isVisible['valeurs-title'] ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16"
          >
            Nos <span className="text-accent">Valeurs</span>
          </motion.h2>
          <motion.div 
            id="valeurs-grid"
            data-animate
            initial="hidden"
            animate={isVisible['valeurs-grid'] ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {valeurs.map((valeur, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                className="value-card text-center"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <valeur.icon className="w-10 h-10 text-accent" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {valeur.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer avec formulaire */}
      <footer id="contact" className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            id="footer-content"
            data-animate
            initial="hidden"
            animate={isVisible['footer-content'] ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {/* Formulaire */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-light mb-8">Contactez-nous</h3>
              <form className="space-y-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Input 
                    placeholder="Nom" 
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Textarea 
                    placeholder="Message" 
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    type="submit" 
                    className="bg-accent hover:bg-accent/90 text-white w-full"
                  >
                    Envoyer le message
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Coordonnées et réseaux sociaux */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-light mb-8">Informations</h3>
              <div className="space-y-4 mb-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  <span>info@vimaroc.ma</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  <span>+212 6 61 50 19 50</span>
                </motion.div>
              </div>
              
              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                  <Facebook className="w-6 h-6 text-gray-400 hover:text-accent transition-colors cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: -5 }}>
                  <Twitter className="w-6 h-6 text-gray-400 hover:text-accent transition-colors cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                  <Instagram className="w-6 h-6 text-gray-400 hover:text-accent transition-colors cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: -5 }}>
                  <Linkedin className="w-6 h-6 text-gray-400 hover:text-accent transition-colors cursor-pointer" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2025 Vitres Intelligente Maroc. Tous droits réservés.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default App

