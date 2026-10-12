import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1]

export const Reveal = ({ children, delay = 0, y = 40, x = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease }}
  >
    {children}
  </motion.div>
)

// Mirror-style reveal: panel opens from the centre like a mirror, then a glass shine sweeps across
export const MirrorReveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={`relative overflow-hidden ${className}`}
    initial={{ clipPath: 'inset(0 50% 0 50%)', opacity: 0 }}
    whileInView={{ clipPath: 'inset(0 0% 0 0%)', opacity: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.9, delay, ease }}
  >
    {children}
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
      initial={{ x: '-120%' }}
      whileInView={{ x: '420%' }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay: delay + 0.5, ease: 'easeInOut' }}
    />
  </motion.div>
)

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (l) => setV(Math.round(l)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v}{suffix}</span>
}

export const SectionHeading = ({ eyebrow, title, desc, light = false, center = false }) => (
  <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    {eyebrow && (
      <Reveal y={16}>
        <div className={`mb-3 flex items-center gap-3 text-sm font-medium text-brand ${center ? 'justify-center' : ''}`}>
          <span className="h-0.5 w-8 bg-brand" /> {eyebrow}
        </div>
      </Reveal>
    )}
    <Reveal delay={0.08}>
      <h2 className={`text-3xl font-light leading-tight sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
    </Reveal>
    {desc && (
      <Reveal delay={0.16}>
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/70' : 'text-steel'}`}>{desc}</p>
      </Reveal>
    )}
  </div>
)
