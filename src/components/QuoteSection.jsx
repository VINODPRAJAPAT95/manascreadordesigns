import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiCheck } from 'react-icons/fi'

// Sticky (fixed) background. Put your own photo in src/assets/bg/quote-bg.jpg to replace it.
const local = import.meta.glob('../assets/bg/quote-bg.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })
const bg = Object.values(local)[0] || 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1920&q=70'

const ease = [0.22, 1, 0.36, 1]
const field = 'w-full bg-white px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink/70 focus:ring-2 focus:ring-brand'
const list = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }

export default function QuoteSection() {
  const [sent, setSent] = useState(false)
  const submit = (e) => { e.preventDefault(); setSent(true) } // TODO: connect to your backend / email service

  return (
    <section className="relative z-10 py-20" style={{ backgroundImage: `linear-gradient(90deg, rgba(16,24,40,.88), rgba(16,24,40,.55)), url(${bg})`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#101828' }}>
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="text-white">
          <motion.p variants={item} className="font-medium text-brand">Request a custom quote</motion.p>
          <motion.h2 variants={item} className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Submit your project details</motion.h2>
          <motion.p variants={item} className="mt-5 max-w-lg leading-relaxed text-white/80">
            Looking for reliable mirrors for your vehicle range? Share your requirement with our experts and we will prepare a customised plan for your volumes, timeline and budget.
          </motion.p>
          <ul className="mt-6 space-y-3">
            {['Expert consultation', 'Fast response within 24 hours', 'Customised mirror solutions'].map((t) => (
              <motion.li key={t} variants={item} className="flex items-center gap-3"><FiCheckCircle className="text-xl text-brand" /> {t}</motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease }}
          className="border border-white/20 bg-ink/50 p-6 shadow-2xl backdrop-blur-xl lg:-my-14 lg:p-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-96 place-items-center text-center text-white">
                <div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="mx-auto grid h-16 w-16 place-items-center bg-brand text-3xl"><FiCheck /></motion.div>
                  <h3 className="mt-5 text-2xl font-medium">Thank you!</h3>
                  <p className="mt-2 text-white/75">We have received your details and will contact you within 24 hours.</p>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} variants={list} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4">
                <motion.input variants={item} required className={field} placeholder="Full name" aria-label="Full name" />
                <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
                  <input required type="email" className={field} placeholder="Email address" aria-label="Email address" />
                  <input required type="tel" className={field} placeholder="Phone number" aria-label="Phone number" />
                </motion.div>
                <motion.input variants={item} className={field} placeholder="Company name" aria-label="Company name" />
                <motion.select variants={item} defaultValue="" className={field} aria-label="Service type" required>
                  <option value="" disabled>Service type</option>
                  <option>OEM supply</option><option>Aftermarket supply</option><option>Custom mirror development</option><option>Tooling and molding</option>
                </motion.select>
                <motion.textarea variants={item} rows={4} className={field} placeholder="Project details" aria-label="Project details" />
                <motion.button variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="group relative overflow-hidden bg-brand py-4 font-medium text-white transition hover:bg-brand-dark">
                  <span className="relative z-10">Get free consultation</span>
                  <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/30 transition-all duration-700 group-hover:left-[120%]" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
