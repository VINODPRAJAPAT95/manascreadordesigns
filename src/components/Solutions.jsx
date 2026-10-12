import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion, animate, useInView, useMotionTemplate, useMotionValue, useSpring, useTransform,
} from 'framer-motion'
import {
  FiTruck, FiRepeat, FiPenTool, FiTool, FiLayers, FiSettings, FiGlobe, FiArrowUpRight, FiCheck,
} from 'react-icons/fi'
import { Reveal, SectionHeading } from './ui'

const ease = [0.22, 1, 0.36, 1]

const solutions = [
  {
    t: 'OEM supply', Icon: FiTruck,
    d: 'Model-specific mirrors supplied on schedule to vehicle makers.',
    tags: ['PPAP ready', 'Just-in-time', 'Line-side delivery'],
  },
  {
    t: 'Aftermarket range', Icon: FiRepeat,
    d: 'Replacement mirrors and glass for popular bikes, cars and trucks.',
    tags: ['500+ models', 'Export packing', 'Private label'],
  },
  {
    t: 'Custom development', Icon: FiPenTool,
    d: 'Share a sample or drawing and we build the mirror and tooling for it.',
    tags: ['Sample to tool', '3D design', 'Fast prototyping'],
  },
]

const steps = [
  { t: 'Design', d: '3D CAD and sample study', Icon: FiPenTool },
  { t: 'Tooling', d: 'In-house tool room', Icon: FiTool },
  { t: 'Molding', d: 'Precision injection molding', Icon: FiLayers },
  { t: 'Assembly', d: 'Glass fit and quality checks', Icon: FiSettings },
  { t: 'Delivery', d: 'Packed and shipped worldwide', Icon: FiGlobe },
]

// Placeholder numbers - replace with real figures
const stats = [
  { to: 25, suffix: '+', label: 'Countries served' },
  { to: 500, suffix: '+', label: 'Mirror models' },
  { to: 15, suffix: '+', label: 'Years of experience' },
  { to: 99, suffix: '%', label: 'On-time delivery' },
]

/* entrance direction per card: left, top, right */
const enter = [
  { x: -160, y: 0, rotate: -6 },
  { x: 0, y: -160, rotate: 0 },
  { x: 160, y: 0, rotate: 6 },
]

/* ---------- 3D tilt card: entrance from sides + depth hover ---------- */
function SolutionCard({ s, k }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 160, damping: 16 })
  const ry = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 160, damping: 16 })
  const px = useTransform(x, (v) => `${v * 100}%`)
  const py = useTransform(y, (v) => `${v * 100}%`)
  const shine = useMotionTemplate`radial-gradient(280px circle at ${px} ${py}, rgba(255,255,255,0.9), transparent 65%)`

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { x.set(0.5); y.set(0.5) }

  const d = enter[k]
  const z = 'transition-transform duration-500 ease-out'

  return (
    /* 1) scroll entrance: left / top / right se aata hai */
    <motion.div
      className="h-full"
      initial={{ opacity: 0, x: d.x, y: d.y, rotate: d.rotate, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 70, damping: 15, mass: 0.9, delay: k * 0.12 }}
    >
      <div style={{ perspective: 1100 }} className="h-full">
        {/* 2) tilt + hover scale */}
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          className="group relative h-full rounded-2xl p-6 shadow-sm transition-shadow duration-500 hover:shadow-[0_40px_70px_-25px_rgba(14,116,144,0.5)] sm:p-8"
        >
          {/* BACKGROUND LAYER (andar dhansta hai) - yahan overflow-hidden safe hai */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-100 to-white
                       shadow-[inset_0_0_0_rgba(16,24,40,0)] transition-all duration-500
                       group-hover:shadow-[inset_0_18px_50px_rgba(16,24,40,0.16)]"
          >
            {/* mouse spotlight */}
            <motion.div
              style={{ background: shine }}
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* ghost number: hover par peeche jata hai */}
            <span
              className={`absolute -right-2 -top-4 select-none font-heading text-8xl font-black leading-none text-transparent sm:text-9xl ${z} group-hover:scale-90 group-hover:translate-y-2`}
              style={{ WebkitTextStroke: '1.5px rgba(16,24,40,0.08)' }}
            >
              0{k + 1}
            </span>
            {/* bottom accent line */}
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
          </div>

          {/* CONTENT LAYERS (bahar aate hain) - har layer ka alag Z depth */}
          <div style={{ transformStyle: 'preserve-3d' }} className="relative">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              className={`grid h-14 w-14 place-items-center bg-brand text-2xl text-white shadow-lg [transform:translateZ(30px)] ${z}
                          group-hover:[transform:translateZ(90px)] group-hover:shadow-2xl`}
            >
              <s.Icon />
            </motion.span>

            <h3 className={`mt-6 text-xl font-medium sm:text-2xl [transform:translateZ(20px)] ${z} group-hover:[transform:translateZ(60px)]`}>
              {s.t}
            </h3>
            <p className={`mt-3 text-sm leading-relaxed text-steel [transform:translateZ(10px)] ${z} group-hover:[transform:translateZ(45px)]`}>
              {s.d}
            </p>

            <ul className={`mt-5 flex flex-wrap gap-2 [transform:translateZ(10px)] ${z} group-hover:[transform:translateZ(70px)]`}>
              {s.tags.map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5 border border-sky-200 bg-white/90 px-2.5 py-1 text-xs text-ink shadow-sm">
                  <FiCheck className="text-brand" /> {t}
                </li>
              ))}
            </ul>

            <Link
              to="/contact-us"
              className={`mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand [transform:translateZ(10px)] ${z} group-hover:[transform:translateZ(80px)]`}
            >
              Discuss your requirement
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ---------- Count-up number ---------- */
function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v}{suffix}</span>
}

export default function Solutions() {
  // Process timeline: active step auto-cycles; click/tap a step to jump
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (hold) return
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), 2600)
    return () => clearTimeout(t)
  }, [active, hold])
  const pct = (active / (steps.length - 1)) * 100

  return (
    <section className="relative overflow-hidden py-10 sm:py-12 lg:py-16">
      {/* soft background blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-x relative">
        <SectionHeading eyebrow="Solutions" title="One partner from design to delivery" />
        <Reveal>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel sm:text-base">
            From a single prototype to container-load export orders, we help vehicle makers and distributors around the world get the right mirror, on time.
          </p>
        </Reveal>

        {/* Solution cards */}
        <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3">
          {solutions.map((s, k) => <SolutionCard key={s.t} s={s} k={k} />)}
        </div>

        {/* Process timeline */}
        <Reveal className="mt-12 sm:mt-16">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">Our process</span>
            <h3 className="mt-2 text-xl font-light text-steel sm:text-2xl">How an order moves through our plant</h3>
          </div>

          <div
            className="relative mt-10"
            onMouseEnter={() => setHold(true)}
            onMouseLeave={() => setHold(false)}
          >
            {/* desktop line */}
            <div className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-sky-100 md:block">
              <motion.div className="h-full bg-brand" animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease }} />
            </div>
            {/* mobile line */}
            <div className="absolute bottom-7 left-7 top-7 w-0.5 -translate-x-1/2 bg-sky-100 md:hidden">
              <motion.div className="w-full bg-brand" animate={{ height: `${pct}%` }} transition={{ duration: 0.7, ease }} />
            </div>

            <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
              {steps.map((s, k) => {
                const done = k <= active
                const on = k === active
                return (
                  <motion.li
                    key={s.t}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + k * 0.12, duration: 0.6, ease }}
                    className="flex items-center gap-4 md:flex-col md:text-center"
                  >
                    <button
                      onClick={() => setActive(k)}
                      aria-label={`Step ${k + 1}: ${s.t}`}
                      aria-current={on ? 'step' : undefined}
                      className="relative shrink-0"
                    >
                      {on && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-brand"
                          animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}
                      <motion.span
                        animate={{ scale: on ? 1.12 : 1 }}
                        whileHover={{ scale: 1.15 }}
                        className={`relative grid h-14 w-14 place-items-center rounded-full text-xl ring-4 ring-white transition-colors duration-500 ${
                          done ? 'bg-brand text-white shadow-lg' : 'bg-sky-100 text-steel'
                        }`}
                      >
                        <s.Icon />
                      </motion.span>
                      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-medium text-white">
                        {k + 1}
                      </span>
                    </button>

                    <div className="min-w-0 md:mt-4">
                      <div className={`text-sm font-medium transition-colors duration-500 sm:text-base ${on ? 'text-brand' : 'text-ink'}`}>
                        {s.t}
                      </div>
                      <div className="mt-0.5 text-xs leading-snug text-steel sm:text-[13px]">{s.d}</div>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>
        </Reveal>

        {/* Worldwide stats band */}
        <Reveal className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden bg-ink p-6 text-white sm:p-10">
            <FiGlobe aria-hidden className="pointer-events-none absolute -right-8 -top-8 text-[10rem] text-white/5 sm:text-[14rem]" />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-32 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ left: ['-20%', '120%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand">Global reach</span>
                <h3 className="mt-2 font-heading text-2xl font-light sm:text-3xl">Mirrors that travel the world</h3>
                <Link to="/contact-us" className="group mt-5 inline-flex items-center gap-2 bg-brand px-6 py-3 text-sm font-medium transition hover:bg-brand-dark">
                  Start an export enquiry
                  <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </Link>
              </div>

              <dl className="grid flex-1 grid-cols-2 gap-6 lg:max-w-xl lg:grid-cols-4">
                {stats.map((s, k) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * k, duration: 0.5 }}
                    className="border-l-2 border-brand pl-4"
                  >
                    <dt className="font-heading text-3xl font-light tabular-nums sm:text-4xl">
                      <Counter to={s.to} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-1 text-xs text-white/70 sm:text-sm">{s.label}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}