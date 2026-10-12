import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import { Reveal, SectionHeading } from './ui'

const faqs = [
  { q: 'Which vehicles do you make mirrors for?', a: 'We make side mirrors and rear-view mirrors for bikes, scooters, cars, SUVs, commercial vehicles and tractors.' },
  { q: 'Do you supply to OEMs and the aftermarket?', a: 'Yes. We supply model-specific mirrors to vehicle makers and a replacement range for the aftermarket.' },
  { q: 'Can you develop a mirror from a sample or drawing?', a: 'Yes. Our design team and tool room can build the mirror and its tooling from a sample, drawing or 3D file.' },
  { q: 'What is the minimum order quantity?', a: 'It depends on the product and whether new tooling is needed. Contact us with your requirement for an exact answer.' },
  { q: 'How do you check quality?', a: 'Each batch goes through dimensional, reflectance, vibration and finish checks before it leaves the plant.' },
]

export default function FAQ() {
  const [o, setO] = useState(0)
  return (
    <section className="bg-sky-50 py-12 lg:py-16">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow="FAQs" title="Questions we hear often" desc="Can't find your answer? Use the contact page and we will reply quickly." />
        <div className="space-y-3">
          {faqs.map((f, k) => (
            <Reveal key={f.q} delay={k * 0.07} y={24}>
              <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
                <button onClick={() => setO(o === k ? -1 : k)} aria-expanded={o === k} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium">
                  {f.q}
                  <motion.span animate={{ rotate: o === k ? 45 : 0 }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-light text-brand"><FiPlus /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {o === k && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-steel">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
