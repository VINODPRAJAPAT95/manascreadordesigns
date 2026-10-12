import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import WorkInProgress from './pages/WorkInProgress'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ScrollUi() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-brand" style={{ scaleX }} />
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top" className="fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center bg-brand text-white shadow-lg transition hover:bg-ink sm:bottom-6">
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollUi />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* All other pages are "Work in progress" for now - replace each route with a real page later */}
          <Route path="*" element={<WorkInProgress />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
