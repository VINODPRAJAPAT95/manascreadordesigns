import { useId } from 'react'
import { motion } from 'framer-motion'

// Real transparent PNGs from src/assets/products/ are used automatically (car-mirror.png, bike-mirror.png ...)
const files = import.meta.glob('../assets/products/*.{png,webp,avif}', { eager: true, import: 'default' })
const byName = Object.fromEntries(Object.entries(files).map(([p, u]) => [p.split('/').pop().replace(/\.\w+$/, ''), u]))

const Defs = ({ u, children }) => (
  <defs>
    <linearGradient id={`h${u}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F2473D" /><stop offset="1" stopColor="#9E160F" /></linearGradient>
    <linearGradient id={`d${u}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3A3F47" /><stop offset="1" stopColor="#0F1115" /></linearGradient>
    <linearGradient id={`g${u}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DCEAF9" /><stop offset="0.55" stopColor="#8FB8E6" /><stop offset="1" stopColor="#3C5A80" /></linearGradient>
    <linearGradient id={`s${u}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#A3A8AF" /><stop offset="0.5" stopColor="#E5E7EA" /><stop offset="1" stopColor="#6B7076" /></linearGradient>
    <radialGradient id={`r${u}`} cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#F4F9FF" /><stop offset="0.5" stopColor="#93BDE8" /><stop offset="1" stopColor="#2E4A70" /></radialGradient>
    {children}
  </defs>
)

const Glare = ({ clip, from = -240, to = 460, dur = 3.2 }) => (
  <g clipPath={`url(#${clip})`}>
    <motion.g animate={{ x: [from, to] }} transition={{ duration: dur, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}>
      <polygon points="0,0 46,0 16,320 -30,320" fill="#fff" opacity="0.55" />
      <polygon points="60,0 76,0 46,320 30,320" fill="#fff" opacity="0.3" />
    </motion.g>
  </g>
)

function CarSvg({ u, className }) {
  const glass = 'M78 128 C72 72 122 44 195 46 C262 49 286 90 276 138 C268 177 228 198 162 196 C112 194 82 170 78 128Z'
  return (
    <svg viewBox="0 0 340 260" className={className} role="img" aria-label="Car side mirror">
      <Defs u={u}><clipPath id={`c${u}`}><path d={glass} /></clipPath></Defs>
      <path d="M64 150 L8 178 L8 210 L74 190Z" fill={`url(#s${u})`} />
      <path d="M60 130 C50 60 110 25 195 28 C275 31 305 80 292 140 C282 190 235 218 160 216 C100 214 66 185 60 130Z" fill={`url(#h${u})`} />
      <g clipPath={`url(#c${u})`}>
        <rect x="60" y="30" width="250" height="190" fill={`url(#g${u})`} />
        <path d="M60 150 Q170 120 310 150 L310 220 L60 220Z" fill="#2B3F5C" opacity="0.6" />
        <path d="M60 158 Q170 128 310 158" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" fill="none" />
        <rect x="170" y="140" width="64" height="20" rx="8" fill="#E2231A" opacity="0.85" />
      </g>
      <Glare clip={`c${u}`} />
      <path d={glass} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
    </svg>
  )
}

function BikeSvg({ u, className }) {
  return (
    <svg viewBox="0 0 260 330" className={className} role="img" aria-label="Bike mirror">
      <Defs u={u}><clipPath id={`c${u}`}><ellipse cx="130" cy="100" rx="58" ry="46" /></clipPath></Defs>
      <rect x="124" y="150" width="12" height="150" fill={`url(#s${u})`} />
      <rect x="100" y="296" width="60" height="18" fill={`url(#s${u})`} />
      <circle cx="130" cy="156" r="14" fill={`url(#s${u})`} />
      <ellipse cx="130" cy="100" rx="72" ry="58" fill={`url(#h${u})`} />
      <g clipPath={`url(#c${u})`}>
        <rect x="60" y="40" width="140" height="120" fill={`url(#g${u})`} />
        <path d="M60 110 Q130 90 200 110 L200 160 L60 160Z" fill="#2B3F5C" opacity="0.6" />
      </g>
      <Glare clip={`c${u}`} from={-120} to={280} />
      <ellipse cx="130" cy="100" rx="58" ry="46" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
    </svg>
  )
}

function InteriorSvg({ u, className }) {
  return (
    <svg viewBox="0 0 340 210" className={className} role="img" aria-label="Interior rear-view mirror">
      <Defs u={u}><clipPath id={`c${u}`}><rect x="34" y="62" width="272" height="106" rx="28" /></clipPath></Defs>
      <rect x="158" y="0" width="24" height="56" fill={`url(#s${u})`} />
      <rect x="140" y="40" width="60" height="26" fill={`url(#s${u})`} />
      <rect x="18" y="50" width="304" height="130" rx="40" fill={`url(#d${u})`} />
      <g clipPath={`url(#c${u})`}>
        <rect x="34" y="62" width="272" height="106" fill={`url(#g${u})`} />
        <path d="M34 120 Q170 98 306 120 L306 170 L34 170Z" fill="#2B3F5C" opacity="0.6" />
      </g>
      <Glare clip={`c${u}`} from={-140} to={380} />
      <rect x="34" y="62" width="272" height="106" rx="28" fill="none" stroke="#E2231A" strokeWidth="3" />
    </svg>
  )
}

function ConvexSvg({ u, className }) {
  return (
    <svg viewBox="0 0 280 320" className={className} role="img" aria-label="Convex mirror">
      <Defs u={u}><clipPath id={`c${u}`}><circle cx="140" cy="116" r="82" /></clipPath></Defs>
      <rect x="134" y="200" width="12" height="90" fill={`url(#s${u})`} />
      <rect x="100" y="286" width="80" height="18" fill={`url(#s${u})`} />
      <circle cx="140" cy="116" r="98" fill={`url(#h${u})`} />
      <circle cx="140" cy="116" r="82" fill={`url(#r${u})`} />
      <Glare clip={`c${u}`} from={-120} to={300} />
      <circle cx="140" cy="116" r="82" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
    </svg>
  )
}

const kinds = { car: CarSvg, bike: BikeSvg, interior: InteriorSvg, convex: ConvexSvg }

export function ProductImage({ name, kind = 'car', className = '' }) {
  const u = useId().replace(/:/g, '')
  const src = byName[name]
  if (src) return <img src={src} alt={name.replace(/-/g, ' ')} className={`h-auto w-full object-contain drop-shadow-2xl ${className}`} />
  const S = kinds[kind]
  return <S u={u} className={`h-auto w-full drop-shadow-2xl ${className}`} />
}
