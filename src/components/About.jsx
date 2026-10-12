import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import aboutImg from '../assets/about/about-1.jpg'
import { Counter, MirrorReveal, Reveal, SectionHeading } from './ui'

const ease = [0.22, 1, 0.36, 1]
// Placeholder numbers - replace with real company figures
const stats = [
  { n: 25, s: '+', l: 'Years of experience' },
  { n: 150, s: '+', l: 'Mirror models' },
  { n: 40, s: '+', l: 'OEM and aftermarket clients' },
  { n: 99, s: '%', l: 'Quality acceptance' },
]

// true on laptop / desktop (>= 1024px): cards sit side by side and fold open like a mirror.
// On tablet / mobile they are stacked, so they slide up instead.
function useIsDesktop() {
  const q = '(min-width: 1024px)'
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const f = (e) => setD(e.matches)
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])
  return d
}

function Background() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute -left-24 top-10 h-72 w-72 bg-brand/15 blur-3xl" animate={{ x: [0, 90, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -right-24 bottom-0 h-80 w-80 bg-sky-300/40 blur-3xl" animate={{ x: [0, -80, 0], y: [0, -40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      {[0, 1, 2].map((k) => (
        <motion.div key={k} className="absolute -top-20 h-[150%] w-20 -skew-x-12 bg-gradient-to-b from-transparent via-white/80 to-transparent" style={{ left: `${12 + k * 32}%` }}
          animate={{ x: [-70, 70, -70], opacity: [0.15, 0.7, 0.15] }} transition={{ duration: 8 + k * 2, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

const Shine = ({ delay }) => (
  <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
    initial={{ x: '-120%' }} whileInView={{ x: '420%' }} viewport={{ once: true }} transition={{ duration: 1.4, delay, ease: 'easeInOut' }} />
)

export default function About() {
  const desktop = useIsDesktop()
  const fold = (origin, deg, delay = 0) =>
    desktop
      ? {
          style: { transformOrigin: origin },
          initial: { rotateY: deg, opacity: 0 },
          whileInView: { rotateY: 0, opacity: 1 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 1.4, ease },
        }
      : {
          initial: { y: 50, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.8, delay, ease },
        }
  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-page to-sky-50 py-10 sm:py-12 lg:py-16">
      <Background />
      <div className="container-x relative" style={{ perspective: 1800 }}>
        <div className="relative grid shadow-2xl shadow-ink/10 lg:grid-cols-2">
          {/* Two cards fold open like a mirror */}
          <motion.div {...fold('100% 50%', -88)} className="relative overflow-hidden bg-white p-6 sm:p-10 lg:p-12">
            <SectionHeading eyebrow="About Manas" title="Mirrors made to the last detail" />
            <Reveal delay={0.5}>
              <p className="mt-5 text-sm leading-relaxed text-steel sm:text-base">
                Manas Automotive Parts designs and manufactures side mirrors and rear-view mirrors for two-wheelers, cars and all four-wheeled vehicles. Tool room, molding and mirror plant sit under one roof, so quality stays in our hands from first sketch to final dispatch.
              </p>
              <ul className="mt-5 grid gap-2 text-sm min-[480px]:grid-cols-2">
                {['In-house tool room', 'Precision plastic molding', 'OEM-grade glass and coating', 'Strict quality checks'].map((t) => (
                  <li key={t} className="flex items-center gap-2"><FiCheckCircle className="text-brand" /> {t}</li>
                ))}
              </ul>
              <Link to="/about" className="group mt-7 inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-brand sm:w-auto">
                Know more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
            <Shine delay={1.4} />
          </motion.div>

          <motion.div {...fold('0% 50%', 88, 0.15)} className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10] lg:aspect-auto lg:min-h-full">
            <motion.img src={aboutImg} alt="Manas Automotive Parts mirror manufacturing" className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.25 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 3, ease }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <Shine delay={1.6} />
          </motion.div>

          <motion.span aria-hidden className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 origin-center bg-brand lg:block" initial={{ scaleY: 0 }} whileInView={{ scaleY: [0, 1, 0] }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.2 }} />
        </div>
      </div>

      <div className="container-x relative mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, k) => (
          <MirrorReveal key={s.l} delay={k * 0.12} className="border-l-4 border-brand bg-white p-4 shadow-sm sm:p-6">
            <div className="font-heading text-3xl font-light text-brand sm:text-4xl"><Counter to={s.n} suffix={s.s} /></div>
            <div className="mt-1 text-xs text-steel sm:text-sm">{s.l}</div>
          </MirrorReveal>
        ))}
      </div>
    </section>
  )
}