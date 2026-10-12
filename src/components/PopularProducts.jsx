import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { MirrorReveal, SectionHeading } from './ui'

// Import your images (adjust the path to where your files are)
import carMirror from '../assets/images/car-mirror.png'
import bikeMirror from '../assets/images/bike-mirror.png'
import interiorMirror from '../assets/images/interior-mirror.png'
import convexMirror from '../assets/images/convex-mirror.png'

const products = [
  { name: 'Car side mirror (ORVM)', d: 'Manual and electric adjust, chrome or body-colour covers.', img: carMirror },
  { name: 'Bike rear-view mirror', d: 'Vibration-tested mirrors with multiple stem and mount options.', img: bikeMirror },
  { name: 'Interior rear-view mirror', d: 'Day-night and standard types with a distortion-free view.', img: interiorMirror },
  { name: 'Convex blind-spot mirror', d: 'Wide-angle glass that covers the blind zone.', img: convexMirror },
]

export default function PopularProducts() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Our popular products" title="Mirrors our customers order most" />
          <Link to="/product" className="group inline-flex items-center gap-2 text-sm font-medium text-brand">
            View all products <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, k) => (
            <MirrorReveal key={p.name} delay={k * 0.12} className="group bg-sky-50 transition hover:shadow-2xl">
              <div className="relative grid h-56 place-items-center overflow-hidden bg-gradient-to-b from-sky-100 to-sky-50 p-8">
                <div className="absolute -bottom-10 h-32 w-32 bg-brand/20 blur-2xl transition-all group-hover:h-44 group-hover:w-44" />
                <motion.img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="relative max-h-40 w-auto object-contain"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5 + k, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.08, rotate: -3 }}
                />
              </div>
              <div className="border-t-2 border-transparent p-6 transition group-hover:border-brand">
                <h3 className="text-lg font-medium">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel">{p.d}</p>
                <Link to="/product" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand">
                  View details <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </MirrorReveal>
          ))}
        </div>
      </div>
    </section>
  )
}