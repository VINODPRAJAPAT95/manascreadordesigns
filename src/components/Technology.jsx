import { FiTool, FiLayers, FiEye, FiShield, FiSettings, FiPenTool } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { MirrorReveal, SectionHeading } from './ui'

const tech = [
  { icon: FiPenTool, t: 'Design and simulation', d: '3D CAD design and flow analysis to finalise every mirror before tooling starts.' },
  { icon: FiTool, t: 'In-house tool room', d: 'Moulds and dies are designed and maintained by our own toolmakers.' },
  { icon: FiLayers, t: 'Injection molding', d: 'Precision molding for housings, covers and brackets with tight tolerances.' },
  { icon: FiEye, t: 'Glass and coating line', d: 'Cutting, bending and reflective coating for a clear, true image.' },
  { icon: FiSettings, t: 'Power-fold assembly', d: 'Motor and gear assemblies tested for thousands of fold cycles.' },
  { icon: FiShield, t: 'Quality testing', d: 'Vibration, fog, heat and reflectance tests before every dispatch.' },
]

export default function Technology() {
  return (
    <section className="relative overflow-hidden bg-ink py-10 text-white sm:py-12 lg:py-16">
      <div className="absolute -right-32 -top-32 h-72 w-72 bg-brand/20 blur-3xl sm:h-96 sm:w-96" />
      <motion.div aria-hidden className="absolute -bottom-16 -left-16 text-[12rem] text-white/[0.04] sm:-bottom-24 sm:-left-24 sm:text-[22rem]" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}><FiSettings /></motion.div>
      <div className="container-x relative">
        <SectionHeading light eyebrow="Technology" title="The technology behind every mirror" desc="From design to testing, the key processes we use to build reliable mirrors." />
        {/* 1 column on mobile, 2 on tablet, 3 on laptop/desktop - 6 cards fill every layout evenly */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {tech.map((x, k) => (
            <MirrorReveal key={x.t} delay={(k % 3) * 0.12} className="group border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-brand/60 hover:bg-white/10 sm:p-7">
              <div className="flex items-center gap-4 sm:block">
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand/15 text-2xl text-brand transition group-hover:bg-brand group-hover:text-white sm:h-14 sm:w-14 sm:text-3xl">
                  <x.icon />
                </span>
                <h3 className="text-base font-medium sm:mt-5 sm:text-lg">{x.t}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/65 sm:mt-2">{x.d}</p>
            </MirrorReveal>
          ))}
        </div>
      </div>
    </section>
  )
}