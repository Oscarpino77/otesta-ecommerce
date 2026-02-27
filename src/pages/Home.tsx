import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Mail } from 'lucide-react'
import { CATEGORY_LABELS } from '@/lib/utils'

const categories = [
  { key: 'suits', image: 'https://images.unsplash.com/photo-1591047990201-37e919f11e64?w=400&h=500&fit=crop' },
  { key: 'outerwear', image: 'https://images.unsplash.com/photo-1539533857671-2900908f6f10?w=400&h=500&fit=crop' },
  { key: 'shirts', image: 'https://images.unsplash.com/photo-1597070395275-41900e42c87f?w=400&h=500&fit=crop' },
]

const testimonials = [
  {
    name: "Giovanni Ferrero",
    role: "Imprenditore",
    text: "La qualità e l'attenzione ai dettagli sono incomparabili. Finalmente abiti che rispecchiano il mio stile.",
    avatar: "👨‍💼"
  },
  {
    name: "Marco Visconti",
    role: "Avvocato",
    text: "Indosso O.TESTA ogni giorno. Comfort e eleganza senza compromessi.",
    avatar: "👔"
  },
  {
    name: "Luca Rossi",
    role: "Fotografo",
    text: "I vostri abiti raccontano una storia di eccellenza italiana. Bellissimi!",
    avatar: "🎨"
  }
]

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section con Parallax */}
      <section className="relative h-[600px] md:h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1591047990201-37e919f11e64?w=1400&h=900&fit=crop)',
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-left text-white z-10 px-4 md:px-8 container"
        >
          <motion.h1 
            className="font-serif text-6xl md:text-7xl xl:text-8xl mb-4 tracking-wide leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Eleganza<br />Senza Tempo
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 font-light max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            La raffinatezza della sartoria italiana dal 1995
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/Shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-yellow-500 text-primary px-8 py-4 rounded-lg font-serif text-lg hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 group"
            >
              SCOPRI LA COLLEZIONE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Collections Section */}
      <section className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-center mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Le Nostre Collezioni
            </span>
          </h2>
          <p className="text-center text-text-secondary max-w-2xl mx-auto text-lg">
            Scopri collezioni curate per l'uomo che apprezza qualità, stile e sostenibilità
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.key}
              variants={childVariants}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={cat.image}
                alt={CATEGORY_LABELS[cat.key]}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  to={`/Shop?category=${cat.key}`}
                  className="px-8 py-3 bg-white text-primary rounded-full font-serif text-lg hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  {CATEGORY_LABELS[cat.key]}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gradient-to-r from-primary via-primary/95 to-primary text-white section-padding relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8">La Nostra Filosofia</h2>
            <p className="text-lg leading-relaxed font-light mb-8">
              Dal 1995, O.TESTA rappresenta l'eccellenza della sartoria italiana. Ogni capo è confezionato
              con attenzione meticolosa, utilizzando i migliori materiali provenienti dalle cucinaie del tessile europeo.
            </p>
            <p className="text-lg leading-relaxed font-light">
              Crediamo che l'eleganza non è solo quello che indossi, ma come ti fa sentire. I nostri abiti sono
              una dichiarazione di stile, qualità e raffinatezza per l'uomo moderno che non scende a compromessi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cosa Dicono i Nostri Clienti
            </span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={childVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-2xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <span className="text-2xl">{testimonial.avatar}</span>
                <div className="text-left">
                  <p className="font-serif font-600 text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-5xl md:text-6xl mb-6">
            Scopri la Collezione Completa
          </h2>
          <p className="text-text-secondary mb-10 max-w-2xl mx-auto text-lg">
            Explore i nostri prodotti selezionati per qualità, stile e sostenibilità
          </p>
          <Link
            to="/Shop"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-gray-800 text-white px-10 py-4 rounded-lg font-serif text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 group"
          >
            ACCEDI AL NEGOZIO
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 section-padding">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Rimani Aggiornato</h2>
            <p className="text-gray-600 mb-8">Ricevi le ultime novità e offerte esclusive sulla tua email</p>
            
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-gradient-to-r from-accent to-yellow-500 text-primary px-6 py-3 rounded-lg font-serif hover:shadow-lg transition-all duration-300 flex items-center gap-2 group">
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">Iscriviti</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
