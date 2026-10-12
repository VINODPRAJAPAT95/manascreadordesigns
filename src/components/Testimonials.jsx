import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { SectionHeading } from './ui'

/* ---------- Demo avatar (inline SVG, no image files) ---------- */
function Avatar({ skin, hair, shirt, bg, label }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={label}>
      <rect width="100" height="100" fill={bg} />
      <path d="M8 100 C8 74 28 64 50 64 C72 64 92 74 92 100Z" fill={shirt} />
      <path d="M40 64 L50 80 L60 64Z" fill="#fff" />
      <rect x="43" y="52" width="14" height="16" fill={skin} />
      <circle cx="50" cy="40" r="19" fill={skin} />
      <path d="M31 38 C31 20 69 20 69 38 C64 29 36 29 31 38Z" fill={hair} />
      <circle cx="43" cy="42" r="1.8" fill="#222" />
      <circle cx="57" cy="42" r="1.8" fill="#222" />
      <path d="M44 50 Q50 54 56 50" fill="none" stroke="#7a3b2e" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// Placeholder testimonials - replace with real client feedback
const items = [
  {
    q: 'Consistent quality and on-time delivery. Their mirrors have given us very few rejections on our line, and the team always responds quickly to our requests.',
    n: 'Rahul Deshmukh', r: 'Procurement Head, Two-wheeler OEM',
    av: { skin: '#E0AC84', hair: '#1F1F1F', shirt: '#101828', bg: '#DCEAF9' },
  },
  {
    q: 'The team turned our sample into a finished mirror with tooling in a short time. Very responsive, and the fit on our vehicles was right the first time.',
    n: 'Anita Kulkarni', r: 'Product Manager, Automotive brand',
    av: { skin: '#C98E6A', hair: '#2B1A12', shirt: '#B42318', bg: '#FDE8E8' },
  },
  {
    q: 'Clear glass, solid fit and a good finish. A dependable supplier for our aftermarket range, and pricing has stayed fair even on large orders.',
    n: 'Sanjay Patil', r: 'Director, Aftermarket distributor',
    av: { skin: '#D9A07A', hair: '#3A3A3A', shirt: '#1D4E89', bg: '#E3EEFA' },
  },
  {
    q: 'We moved our interior mirror supply to Manas and quality has been steady every month. Their inspection reports give us real confidence on the shop floor.',
    n: 'Vikram Joshi', r: 'Quality Lead, Commercial vehicles',
    av: { skin: '#E8B796', hair: '#5A3A22', shirt: '#344054', bg: '#E8F3EA' },
  },
]

function usePerView() {
  const [n, setN] = useState(1)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const f = () => setN(mq.matches ? 2 : 1)
    f()
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return n
}

const cardV = {
  hidden: (d) => ({ opacity: 0, y: 40, transition: { delay: 0 } }),
  show: (d) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d * 0.15, ease: [0.22, 1, 0.36, 1] } }),
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
}

function Card({ t, d }) {
  return (
    <motion.article
      custom={d}
      variants={cardV}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -6 }}
      className="group relative h-full pb-[34px]"
    >
      {/* white quote box */}
      <div className="relative h-full bg-white px-5 pb-24 pt-6 shadow-sm transition-shadow duration-300 group-hover:shadow-xl sm:px-6">
        <FaQuoteLeft className="absolute left-4 top-6 text-xl text-slate-300 sm:left-5" />
        <p className="pl-8 text-sm leading-7 text-slate-600 sm:pl-9 sm:text-[15px]">{t.q}</p>
        <FaQuoteRight className="absolute bottom-12 right-4 text-xl text-slate-300" />
      </div>

      {/* red name bar with slanted end */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.25 + d * 0.15, ease: 'easeOut' }}
        style={{ clipPath: 'polygon(0 0, 91.2% 0, 100% 100%, 0 100%)', transformOrigin: 'left' }}
        className="absolute bottom-0 left-0 flex h-[68px] w-[93%] flex-col justify-center bg-brand pl-4 text-white sm:pl-5"
      >
        <div className="max-w-[52%] truncate text-base font-medium sm:text-lg">{t.n}</div>
        <div className="max-w-[52%] truncate text-xs sm:text-sm">{t.r}</div>
      </motion.div>

      {/* round avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.45 + d * 0.15 }}
        className="absolute bottom-5 right-[20%] h-20 w-20 overflow-hidden rounded-full border-[5px] border-white bg-white shadow-md sm:h-24 sm:w-24"
      >
        <Avatar {...t.av} label={t.n} />
      </motion.div>
    </motion.article>
  )
}

export default function Testimonials() {
  const perView = usePerView()
  const pages = Math.ceil(items.length / perView)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const p = page % pages

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setPage((x) => (x + 1) % pages), 6000)
    return () => clearTimeout(t)
  }, [p, pages, paused])

  const visible = items.slice(p * perView, p * perView + perView)
  const go = (d) => setPage((p + d + pages) % pages)

  return (
    <section className="overflow-hidden bg-slate-50 py-10 sm:py-12 lg:py-16">
      <div className="container-x">
        <SectionHeading center eyebrow="Client testimonials" title="What our clients say" />
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
          Vehicle makers and distributors trust Manas for mirrors that fit, perform and arrive on time.
        </p>

        <div
          className="mt-8 sm:mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${p}-${perView}`}
              className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:gap-8"
            >
              {visible.map((t, k) => (
                <Card key={t.n} t={t} d={k} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous testimonials" className="text-3xl text-brand transition hover:scale-125">
              <FiChevronLeft />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: pages }).map((_, k) => (
                <button
                  key={k}
                  onClick={() => setPage(k)}
                  aria-label={`Go to testimonials ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${k === p ? 'w-10 bg-brand' : 'w-4 bg-slate-300'}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonials" className="text-3xl text-brand transition hover:scale-125">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}