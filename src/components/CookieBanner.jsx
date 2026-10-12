import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const KEY = 'manas-cookie-consent'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let saved = null
    try { saved = localStorage.getItem(KEY) } catch { /* storage blocked */ }
    if (!saved) { const t = setTimeout(() => setShow(true), 900); return () => clearTimeout(t) }
  }, [])
  const choose = (v) => { try { localStorage.setItem(KEY, v) } catch { /* ignore */ } setShow(false) }

  return (
    <AnimatePresence>
      {show && (
        <motion.div role="dialog" aria-label="Cookie consent" initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }} transition={{ type: 'spring', damping: 24, stiffness: 160 }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-4xl border-l-4 border-brand bg-ink p-5 text-white shadow-2xl sm:bottom-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-white/80">
              We use cookies to improve your experience on our website and to understand how it is used. Read our{' '}
              <Link to="/cookie-policy" className="text-white underline">Cookie Policy</Link>.
            </p>
            <div className="flex shrink-0 gap-3">
              <button onClick={() => choose('declined')} className="border border-white/40 px-5 py-2.5 text-sm transition hover:bg-white hover:text-ink">Decline</button>
              <button onClick={() => choose('accepted')} className="bg-brand px-5 py-2.5 text-sm font-medium transition hover:bg-brand-dark">Accept all</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
