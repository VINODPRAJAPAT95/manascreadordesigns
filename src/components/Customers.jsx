import { SectionHeading } from './ui'

// Demo logos (simple text wordmarks, no image files needed).
// Real logo lagana ho to `logo: '/images/jcb.svg'` jaisa path de dein.
const customers = [
  { name: 'JCB', color: '#F5A800', weight: 900, spacing: 2, bg: '#fff' },
  { name: 'FORCE', color: '#C8102E', weight: 800, spacing: 3 },
  { name: 'ASHOK LEYLAND', color: '#1B4D9B', weight: 700, spacing: 1, size: 15 },
  { name: 'MAHINDRA', color: '#D6201F', weight: 800, spacing: 2 },
  { name: 'TATA', color: '#1F4E9C', weight: 900, spacing: 6 },
  { name: 'Mercedes-Benz', color: '#222222', weight: 600, spacing: 1, size: 17 },
  { name: 'BMW', color: '#1C69D4', weight: 900, spacing: 5, ring: true },
  { name: 'EICHER', color: '#E31E24', weight: 800, spacing: 3 },
  { name: 'DAIMLER', color: '#1A1A1A', weight: 700, spacing: 4 },
  { name: 'SCANIA', color: '#041E42', weight: 800, spacing: 4 },
]

function DemoLogo({ c }) {
  return (
    <svg viewBox="0 0 180 56" className="h-14 w-auto" role="img" aria-label={c.name}>
      {c.ring && (
        <circle cx="28" cy="28" r="18" fill="none" stroke={c.color} strokeWidth="3" />
      )}
      <text
        x={c.ring ? 98 : 90}
        y="35"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize={c.size || 22}
        fontWeight={c.weight}
        letterSpacing={c.spacing}
        fill={c.color}
      >
        {c.name}
      </text>
    </svg>
  )
}

export default function Customers() {
  const loop = [...customers, ...customers]
  return (
    <section className="overflow-hidden bg-sky-50 py-12">
      <div className="container-x"><SectionHeading center eyebrow="Our customers" title="Trusted by vehicle makers" /></div>
      <div className="group mt-8 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
          {loop.map((c, k) => (
            <div key={k} className="grid h-24 w-52 shrink-0 place-items-center rounded-2xl border border-sky-100 bg-white px-6 shadow-sm">
              {c.logo
                ? <img src={c.logo} alt={c.name} loading="lazy" className="max-h-14 w-auto object-contain" />
                : <DemoLogo c={c} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}