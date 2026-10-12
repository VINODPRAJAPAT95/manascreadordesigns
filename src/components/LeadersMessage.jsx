import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiChevronRight as Arrow } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa6'
import { SectionHeading } from './ui'

// Direct image imports (match the file names and extensions to yours)
import chairmanImg from '../assets/leaders/chairman.png'
import directorImg from '../assets/leaders/director.png'

// Placeholder names and text - replace with real messages
const leaders = [
  { key: 'chairman', photo: chairmanImg, name: 'Mr. Name Surname', role: 'Chairman and Managing Director', text: 'In today\'s fast-changing automotive world, good performance is not enough. We aim to be the best in what we do by pairing innovation with speed and discipline. Integrity, customer focus and a passion for excellence guide every mirror that leaves our plant. We encourage an entrepreneurial mindset in every associate so they can take the right decision at the right time…' },
  { key: 'director', photo: directorImg, name: 'Mrs. Name Surname', role: 'Director', text: 'Quality is built in the tool room, the molding shop and the mirror plant, long before a product reaches the customer. Our teams work closely with every client to understand their needs and deliver mirrors that fit, perform and last. We are investing in people, technology and process to grow with the mobility industry…' },
]

function Photo({ src, alt }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover" />
}

export default function LeadersMessage() {
  const [i, setI] = useState(0)
  const n = leaders.length
  useEffect(() => {
    const t = setTimeout(() => setI((x) => (x + 1) % n), 7000)
    return () => clearTimeout(t)
  }, [i, n])
  const cur = leaders[i]
  const next = leaders[(i + 1) % n]

  return (
    <section className="overflow-hidden py-12 lg:py-16">
      <div className="container-x">
        <SectionHeading eyebrow="Leadership" title="Chairman and Director's message" />
        <div className="relative mt-8 lg:h-[570px]">
          {/* dark text panel */}
          <div className="relative overflow-hidden bg-ink p-8 text-white lg:absolute lg:left-0 lg:top-[55px] lg:h-[452px] lg:w-[58%] lg:p-14 lg:pr-[14%]">
            <FaQuoteLeft className="absolute left-8 top-8 text-7xl text-white/10" />
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }} className="relative lg:pl-10">
                <h3 className="text-2xl font-medium">{cur.name}</h3>
                <p className="mt-1 text-white/70">{cur.role}</p>
                <p className="mt-6 text-sm leading-7 text-white/75">{cur.text}</p>
                <Link to="/about/about-me" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
                  READ MORE <Arrow className="text-brand transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
            <motion.span key={`bar${i}`} className="absolute bottom-0 left-0 h-1 bg-brand" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 7, ease: 'linear' }} />
          </div>

          {/* next photo peeking behind */}
          <div className="absolute right-[3%] top-[57px] hidden h-[446px] w-[19%] overflow-hidden opacity-70 shadow-xl lg:block">
            <AnimatePresence mode="popLayout">
              <motion.div key={next.key} className="h-full w-full" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.6 }}>
                <Photo src={next.photo} alt={next.name} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* main photo overlapping the panel */}
          <div className="relative -mt-0 h-96 overflow-hidden shadow-2xl shadow-ink/30 max-lg:mx-auto max-lg:mt-6 max-lg:max-w-xs lg:absolute lg:left-[50%] lg:top-0 lg:h-full lg:w-[30%]">
            <AnimatePresence mode="popLayout">
              <motion.div key={cur.key} className="absolute inset-0" initial={{ opacity: 0, x: 80, scale: 1.05 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <Photo src={cur.photo} alt={cur.name} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-4 text-3xl text-brand lg:absolute lg:bottom-0 lg:right-[7%] lg:mt-0">
            <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous message" className="transition hover:scale-125"><FiChevronLeft /></button>
            <button onClick={() => setI((i + 1) % n)} aria-label="Next message" className="transition hover:scale-125"><FiChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  )
}