import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiCheck, FiArrowRight } from 'react-icons/fi'
import logo from '../assets/logo.png'
import { company } from '../data/siteData'
import { SocialLinks } from './TopBar'
import { Reveal } from './ui'

const quick = [['Home', '/'], ['About', '/about'], ['Q-Policy', '/q-policy'], ['Mirror Plant', '/mirror-plant'], ['Molding', '/molding'], ['Tool Room', '/tool-room'], ['Career', '/career'], ['Contact Us', '/contact-us']]
const prods = ['Side mirrors (ORVM)', 'Interior rear-view mirrors', 'Two-wheeler mirrors', 'Convex mirrors', 'Power-fold mirrors', 'Mirror glass']
const inputCls = 'w-full bg-neutral-100 px-4 py-3 text-sm text-ink outline-none placeholder:text-steel focus:bg-white focus:ring-2 focus:ring-brand-dark'

function Newsletter() {
  const [done, setDone] = useState(false)
  const submit = (e) => { e.preventDefault(); setDone(true) } // TODO: connect to your mailing service
  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-white/10 p-5 text-white">
          <span className="grid h-10 w-10 place-items-center bg-brand"><FiCheck /></span> Thank you! You are subscribed to our newsletter.
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} className="space-y-3" exit={{ opacity: 0 }}>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={inputCls} placeholder="Name" aria-label="Name" required />
            <input type="email" className={inputCls} placeholder="Email" aria-label="Email" required />
          </div>
          <button className="group relative w-full overflow-hidden bg-brand-dark py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-brand">
            <span className="relative z-10">Sign up newsletter</span>
            <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[120%]" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0b14] text-white/70">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-x grid items-center gap-8 py-12 lg:grid-cols-2">
          <Reveal x={-40} y={0}>
            <h3 className="text-2xl font-semibold text-white">Newsletter</h3>
            <p className="mt-3 max-w-md text-lg text-white">Subscribe to our newsletter and events right now to be updated.</p>
          </Reveal>
          <Reveal x={40} y={0} delay={0.1}><Newsletter /></Reveal>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <img src={logo} alt={company.name} className="h-12 w-auto" />
          <p className="mt-5 text-sm leading-relaxed">Manufacturer of side mirrors and rear-view mirrors for bikes, cars and all four-wheelers.</p>
          <SocialLinks className="mt-6 flex-wrap" itemClass="bg-white/10 text-white" />
        </Reveal>
        <Reveal delay={0.1}>
          <h4 className="mb-5 font-medium text-white">Quick links</h4>
          <ul className="space-y-2.5 text-sm">{quick.map(([l, to]) => <li key={to}><Link to={to} className="inline-block transition hover:translate-x-1 hover:text-brand">{l}</Link></li>)}</ul>
        </Reveal>
        <Reveal delay={0.2}>
          <h4 className="mb-5 font-medium text-white">Products</h4>
          <ul className="space-y-2.5 text-sm">{prods.map((p) => <li key={p}><Link to="/product" className="inline-block transition hover:translate-x-1 hover:text-brand">{p}</Link></li>)}</ul>
        </Reveal>
        <Reveal delay={0.3}>
          <h4 className="mb-5 font-medium text-white">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><FiMapPin className="mt-0.5 shrink-0 text-brand" /> {company.address}</li>
            <li className="flex gap-3"><FiPhone className="mt-0.5 shrink-0 text-brand" /> {company.phone}</li>
            <li className="flex gap-3"><FiMail className="mt-0.5 shrink-0 text-brand" /> {company.email}</li>
          </ul>
          <Link to="/contact-us" className="group mt-6 inline-flex items-center gap-2 bg-brand px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-dark">
            Business enquiry <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      {/* Policies + credit */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <nav aria-label="Policies" className="flex items-center gap-3">
            <Link to="/terms-of-use" className="hover:text-brand">Terms of Use</Link><span className="text-white/30">|</span>
            <Link to="/privacy-policy" className="hover:text-brand">Privacy Policy</Link><span className="text-white/30">|</span>
            <Link to="/cookie-policy" className="hover:text-brand">Cookie Policy</Link>
          </nav>
          <span>Developed by <a href="#" className="font-medium text-white hover:text-brand">Creador Designs</a></span>
        </div>
      </div>
    </footer>
  )
}
