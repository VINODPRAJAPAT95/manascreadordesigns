import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiArrowRight } from 'react-icons/fi'
import { MirrorReveal, SectionHeading } from './ui'

// Placeholder news - replace `img` with your real photos (e.g. '/images/news-1.jpg')
const news = [
  {
    d: '10 Oct 2026', tag: 'Plant',
    t: 'Mirror plant capacity expansion begins',
    img: 'https://picsum.photos/seed/manas-plant/800/500',
  },
  {
    d: '28 Sep 2026', tag: 'Product',
    t: 'New power-fold mirror line launched',
    img: 'https://picsum.photos/seed/manas-product/800/500',
  },
  {
    d: '15 Sep 2026', tag: 'Quality',
    t: 'Manas achieves a new quality milestone',
    img: 'https://picsum.photos/seed/manas-quality/800/500',
  },
  {
    d: '02 Sep 2026', tag: 'Event',
    t: 'Team Manas at the auto components expo',
    img: 'https://picsum.photos/seed/manas-event/800/500',
  },
]

export default function News() {
  return (
    <section className="bg-sky-50 py-10 sm:py-12 lg:py-16">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Latest news" title="News and updates from Manas" />
          <Link to="/news" className="group inline-flex items-center gap-2 text-sm font-medium text-brand">
            All news <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {news.map((n, k) => (
            <MirrorReveal key={n.t} delay={k * 0.1} className="group h-full bg-white shadow-sm transition hover:shadow-xl">
              <Link to="/news" className="flex h-full flex-col">
                {/* image on top of the card */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-sky-100 sm:aspect-[16/10]">
                  <motion.img
                    src={n.img}
                    alt={n.t}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="absolute left-0 top-0 bg-brand px-3 py-1 text-xs font-medium text-white">{n.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs text-steel"><FiCalendar /> {n.d}</div>
                  <h3 className="mt-2 font-medium leading-snug transition group-hover:text-brand">{n.t}</h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-brand">
                    Read more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </MirrorReveal>
          ))}
        </div>
      </div>
    </section>
  )
}