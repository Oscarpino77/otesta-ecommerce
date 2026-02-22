import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CATEGORY_LABELS } from '@/lib/utils'

const categories = [
  { key: 'suits', image: 'https://images.unsplash.com/photo-1591047990201-37e919f11e64?w=400&h=500&fit=crop' },
  { key: 'outerwear', image: 'https://images.unsplash.com/photo-1539533857671-2900908f6f10?w=400&h=500&fit=crop' },
  { key: 'shirts', image: 'https://images.unsplash.com/photo-1597070395275-41900e42c87f?w=400&h=500&fit=crop' },
]

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1591047990201-37e919f11e64?w=1400&h=900&fit=crop)',
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10 px-4"
        >
          <h1 className="font-serif text-6xl md:text-7xl mb-4 tracking-wide">
            Eleganza Senza Tempo
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            La raffinatezza della moda maschile italiana
          </p>
          <Link
            to="/Shop"
            className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 rounded font-serif text-lg hover:opacity-90 transition"
          >
            VAI AL NEGOZIO
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Collections Section */}
      <section className="container section-padding">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-serif text-5xl text-center mb-4">Le Collezioni</h2>
          <p className="text-center text-text-secondary max-w-2xl mx-auto">
            Scopri le nostre collezioni curate per l'uomo che apprezza la qualità e lo stile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden"
            >
              <img
                src={cat.image}
                alt={CATEGORY_LABELS[cat.key]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 gradient-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  to={`/Shop?category=${cat.key}`}
                  className="text-white font-serif text-2xl hover:text-accent transition"
                >
                  {CATEGORY_LABELS[cat.key]}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-primary text-white section-padding">
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl mb-6">La Nostra Filosofia</h2>
            <p className="text-lg leading-relaxed font-light mb-6">
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

      {/* CTA Section */}
      <section className="container section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl mb-6">Scopri la Collezione Completa</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Explore i nostri prodotti selezionati per qualità, stile e sostenibilità
          </p>
          <Link
            to="/Shop"
            className="inline-block bg-accent text-primary px-8 py-4 rounded font-serif text-lg hover:opacity-90 transition"
          >
            Accedi al Negozio
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
