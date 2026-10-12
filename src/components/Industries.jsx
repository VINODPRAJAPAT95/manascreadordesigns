import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { FaMotorcycle, FaCar, FaTruck, FaTractor } from 'react-icons/fa6'
import { MirrorReveal, SectionHeading } from './ui'
import imgTwo from '../assets/industries/two-wheelers.png'
import imgCars from '../assets/industries/cars.png'
import imgCommercial from '../assets/industries/commercial.png'
import imgTractors from '../assets/industries/tractors.png'

// Replace the images in src/assets/industries with your own photos (same file names)
const industries = [
  { icon: FaMotorcycle, img: imgTwo, name: 'Two Wheelers', desc: 'Light, vibration-proof mirrors for motorcycles and scooters.', items: ['Bike rear-view mirrors', 'Scooter mirrors', 'Bar-end mirrors', 'Folding stem mirrors'] },
  { icon: FaCar, img: imgCars, name: 'Cars and SUVs', desc: "Side and interior mirrors that match each model's design.", items: ['Side mirrors (ORVM)', 'Interior rear-view mirrors', 'Power-fold mirrors', 'Mirror glass and covers'] },
  { icon: FaTruck, img: imgCommercial, name: 'Commercial Vehicles', desc: 'Large, tough mirrors for trucks, buses and light commercial vehicles.', items: ['Truck mirrors', 'Bus mirrors', 'Convex blind-spot mirrors', 'Heavy-duty brackets'] },
  { icon: FaTractor, img: imgTractors, name: 'Tractors and Off-Highway', desc: 'Dust and shock resistant mirrors for farm and construction vehicles.', items: ['Tractor mirrors', 'Construction vehicle mirrors', 'Adjustable arms', 'Weatherproof housings'] },
]

// ===== Scroll strip (outlined text: scroll down -> moves right, scroll up -> moves left) =====
const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

const TEXT = 'Testing  •  Product Design & Development  •  Tool Room  •  Molding  •  '
const COPIES = 4

// Outlined text strip: keeps moving by itself, scroll down -> moves right, scroll up -> moves left (faster while scrolling)
function ScrollStrip({ baseSpeed = 2.2 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const dir = useRef(1)
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    const f = factor.get()
    if (f < -0.05) dir.current = -1
    else if (f > 0.05) dir.current = 1
    let move = dir.current * baseSpeed * (delta / 1000)
    move += dir.current * Math.abs(move) * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  return (
    <div aria-hidden className="relative overflow-hidden bg-white py-6 lg:py-8">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl" />
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        {Array.from({ length: COPIES }).map((_, k) => (
          <span key={k} className="font-heading text-6xl font-extrabold leading-tight text-transparent sm:text-7xl lg:text-8xl" style={{ WebkitTextStroke: '1.5px #cfd2d6' }}>
            {TEXT}
          </span>
        ))}
      </motion.div>
      <span className="absolute right-0 top-1/2 h-14 w-2 -translate-y-1/2 bg-brand" />
    </div>
  )
}

export default function Industries() {
  const [a, setA] = useState(0)
  const cur = industries[a]
  return (
    <>
      <section className="py-12 lg:py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Industries" title="Mirrors for every kind of vehicle" desc="Choose a segment to see what we make for it." />

          <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {industries.map((x, k) => (
                <button key={x.name} onClick={() => setA(k)}
                  className={`flex items-center gap-3 border p-4 text-left text-sm font-medium transition ${k === a ? 'border-brand bg-brand text-white shadow-lg shadow-brand/20' : 'border-sky-100 bg-white hover:border-brand/50'}`}>
                  <x.icon className="text-2xl" /> {x.name}
                </button>
              ))}
            </div>

            <MirrorReveal className="min-h-[420px] bg-ink text-white">
              {/* Background image changes with the selected industry */}
              <AnimatePresence initial={false}>
                <motion.img key={cur.name} src={cur.img} alt={cur.name} className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 0.8 }, scale: { duration: 6, ease: 'linear' } }} />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />

              <div className="relative z-10 p-8 sm:p-12">
                <AnimatePresence mode="wait">
                  <motion.div key={a} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                    <cur.icon className="text-5xl text-brand" />
                    <h3 className="mt-5 text-3xl font-light">{cur.name}</h3>
                    <p className="mt-3 max-w-lg text-white/80">{cur.desc}</p>
                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {cur.items.map((it, k) => (
                        <motion.li key={it} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + k * 0.08 }}
                          className="border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur">{it}</motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </MirrorReveal>
          </div>
        </div>
      </section>

      <ScrollStrip />
    </>
  )
}