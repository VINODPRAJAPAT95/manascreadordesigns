import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSettings, FiArrowLeft } from 'react-icons/fi'

export default function WorkInProgress() {
  const { pathname } = useLocation()
  const title = pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'page'
  return (
    <section className="grid min-h-screen place-items-center bg-gradient-to-b from-sky-50 to-page px-5 pt-32 pb-16 text-center">
      <div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="mx-auto w-fit text-7xl text-brand"><FiSettings /></motion.div>
        <h1 className="mt-8 text-4xl font-light capitalize sm:text-5xl">{title}</h1>
        <p className="mt-3 text-lg text-steel">Work in progress. This page will be available soon.</p>
        <div className="mx-auto mt-8 h-1.5 w-56 overflow-hidden rounded bg-sky-100">
          <motion.div className="h-full w-1/3 rounded bg-brand" animate={{ x: ['-100%', '300%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <Link to="/" className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-brand"><FiArrowLeft /> Back to home</Link>
      </div>
    </section>
  )
}
