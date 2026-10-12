import { FiTrendingUp, FiGlobe, FiAward } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { MirrorReveal, SectionHeading } from './ui'

const points = [
  { icon: FiTrendingUp, t: 'Steady growth', d: 'Rising demand from two-wheeler and passenger vehicle makers.' },
  { icon: FiGlobe, t: 'Wider reach', d: 'Expanding OEM supply and an aftermarket network across India.' },
  { icon: FiAward, t: 'Quality first', d: 'Strong process control and in-house tooling keep costs and defects low.' },
]

export default function Investors() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-x">
        <MirrorReveal className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-8 text-white sm:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeading light eyebrow="Investors" title="Growing with the mobility industry" desc="Reach out to learn about our plans, capacity and the road ahead." />
              <Link to="/contact-us" className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-medium text-brand transition hover:bg-ink hover:text-white">Talk to our team</Link>
            </div>
            <div className="grid gap-4">
              {points.map((p) => (
                <div key={p.t} className="flex gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                  <p.icon className="mt-1 shrink-0 text-2xl" />
                  <div><h3 className="font-medium">{p.t}</h3><p className="mt-1 text-sm text-white/80">{p.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </MirrorReveal>
      </div>
    </section>
  )
}
