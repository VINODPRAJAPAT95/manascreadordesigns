import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import hero1 from '../assets/hero/hero-1.jpg'
import hero2 from '../assets/hero/hero-2.jpg'
import hero3 from '../assets/hero/hero-3.jpg'

const DURATION = 7000
const ease = [0.22, 1, 0.36, 1]
const wipeEase = [0.76, 0, 0.24, 1]

// Replace the files in src/assets/hero (hero-1.jpg, hero-2.jpg, hero-3.jpg) with your own HD photos (2560x1440 recommended)
const slides = [
  {
    img: hero1,
    tag: 'Automotive mirror manufacturer',
    title: 'The Next Generation of Vehicle Mirrors',
    text: 'Side mirrors and rear-view mirrors for bikes, cars and every four-wheeler, built with precision tooling and in-house molding.',
  },
  {
    img: hero2,
    tag: 'Two-wheeler range',
    title: 'Clear Vision For Every Ride',
    text: 'Vibration-tested bike and scooter mirrors with sharp, distortion-free glass for safer journeys.',
  },
  {
    img: hero3,
    tag: 'Cars and four-wheelers',
    title: 'Engineered For Safer Journeys',
    text: 'OEM-grade ORVMs and interior mirrors, from design and tool room to molding and final assembly.',
  },
]

// Text animation: words rise from a mask with blur + 3D tilt, leave upwards
const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}
const word = {
  hidden: { y: '115%', rotateX: -70, opacity: 0, filter: 'blur(10px)' },
  show: { y: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
  exit: { y: '-115%', opacity: 0, filter: 'blur(6px)', transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
}
const fade = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), DURATION)
    return () => clearTimeout(t)
  }, [i])
  const s = slides[i]

  // Scroll effects: background parallax, content fades up
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], [0, 140])
  const contentY = useTransform(scrollY, [0, 500], [0, -60])
  const contentO = useTransform(scrollY, [0, 450], [1, 0])

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pb-28 pt-32 text-white sm:pt-36">
        {/* HD background: curtain wipe + slow zoom on every change */}
        <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-32 bottom-0">
          <AnimatePresence>
            <motion.div
              key={i}
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              animate={{ clipPath: 'inset(0 0 0 0%)' }}
              exit={{ transition: { duration: 1.3 } }}
              transition={{ duration: 1.2, ease: wipeEase }}
            >
              <motion.img
                src={s.img}
                alt=""
                decoding="async"
                className="h-full w-full object-cover"
                initial={{ scale: 1.3 }}
                animate={{ scale: 1.02 }}
                transition={{ duration: 10, ease: 'easeOut' }}
              />
            </motion.div>
          </AnimatePresence>
          {/* leading edge line that follows the wipe */}
          <motion.span
            key={`edge${i}`}
            aria-hidden
            className="absolute inset-y-0 z-10 w-[3px] bg-brand"
            initial={{ left: '100%', opacity: 1 }}
            animate={{ left: '0%', opacity: [1, 1, 0] }}
            transition={{ duration: 1.2, ease: wipeEase }}
          />
        </motion.div>

        {/* readability overlays (neutral dark, no colour tint) */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

        {/* Glass shine sweeping across the hero */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-40 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ left: ['-20%', '120%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        />

        <motion.div style={{ y: contentY, opacity: contentO }} className="container-x relative">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={i} variants={group} initial="hidden" animate="show" exit="exit">
                <motion.div variants={fade} className="mb-4 inline-flex items-center gap-3 border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs backdrop-blur sm:mb-5 sm:px-4 sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping bg-brand opacity-75" />
                    <span className="relative inline-flex h-2 w-2 bg-brand" />
                  </span>
                  {s.tag}
                </motion.div>

                <h1 className="font-heading text-[2.15rem] font-light leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem]" style={{ perspective: 800 }}>
                  {s.title.split(' ').map((w, k) => (
                    <span key={k} className="mr-2 inline-block overflow-hidden pb-1.5 align-bottom sm:mr-3">
                      <motion.span variants={word} className="inline-block origin-bottom">{w}</motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p variants={fade} className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base lg:text-lg">
                  {s.text}
                </motion.p>

                <motion.div variants={fade} className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
                  <Link to="/product" className="group relative inline-flex items-center gap-2 overflow-hidden bg-brand px-6 py-3 text-sm font-medium transition hover:bg-brand-dark sm:px-7 sm:py-3.5">
                    <span className="relative z-10 inline-flex items-center gap-2">Explore products <FiArrowRight className="transition-transform group-hover:translate-x-1" /></span>
                    <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/30 transition-all duration-700 group-hover:left-[120%]" />
                  </Link>
                  <Link to="/contact-us" className="inline-flex items-center border border-white/40 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-ink sm:px-7 sm:py-3.5">
                    Get a quote
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  )
}