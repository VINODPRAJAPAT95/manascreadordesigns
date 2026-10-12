import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiPhone, FiMail, FiMenu, FiX, FiChevronDown, FiMapPin, FiClock, FiArrowRight,
} from 'react-icons/fi'
import logo from '../assets/logo.png'
import { nav, company } from '../data/siteData'
import { SocialLinks } from './TopBar'

// Apni real details yahan daalein (company object mein ho to wahi use hoga)
const ADDRESS = company.address || 'Plot No. 00, MIDC, Pimpri, Pune, Maharashtra 411018'
const HOURS = company.hours || 'Mon - Sat: 9:00 AM - 6:00 PM'
const WHATSAPP = company.whatsapp || company.phone

const ease = [0.22, 1, 0.36, 1]
const list = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }
const item = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setAboutOpen(false) }, [pathname])

  // Drawer khula ho to page scroll lock + Esc se band
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const linkCls = ({ isActive }) =>
    `relative block py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform hover:text-brand hover:after:scale-x-100 ${
      isActive ? 'text-brand after:scale-x-100' : 'text-ink'
    }`

  const contacts = [
    { Icon: FiPhone, label: 'Call us', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    { Icon: FiMail, label: 'Email us', value: company.email, href: `mailto:${company.email}` },
    { Icon: FiMapPin, label: 'Our address', value: ADDRESS, href: `https://www.google.com/maps/search/${encodeURIComponent(ADDRESS)}` },
    { Icon: FiClock, label: 'Working hours', value: HOURS },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Row 1: contact + social (right side) */}
      <div className={`overflow-hidden bg-ink text-xs text-white/80 transition-all duration-300 ${scrolled ? 'h-0' : 'h-9'}`}>
        <div className="container-x flex h-9 items-center justify-between">
          <span className="hidden text-white/60 sm:block">Manas Automotive Systems Limited</span>
          <div className="ml-auto flex items-center gap-4 sm:gap-5">
            <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white">
              <FiPhone className="text-brand" /> <span className="hidden sm:inline">{company.phone}</span>
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-white">
              <FiMail className="text-brand" /> <span className="hidden md:inline">{company.email}</span>
            </a>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <SocialLinks itemClass="text-white/80" className="hidden sm:flex" />
          </div>
        </div>
      </div>

      {/* Row 2: logo (left) + menu + drawer icon (right) */}
      <div className={`border-b border-sky-100 bg-white/90 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
        <div className="container-x flex h-16 items-center justify-between gap-6">
          <Link to="/" className="shrink-0" aria-label="Manas Automotive Parts - Home">
            <img src={logo} alt="Manas Automotive Parts" className="h-11 w-auto rounded-sm" />
          </Link>

          <nav className="ml-auto hidden items-center gap-5 xl:flex" aria-label="Main">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button className="flex items-center gap-1 py-2 text-[13px] font-medium text-ink transition-colors hover:text-brand">
                    {item.label} <FiChevronDown className="transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="min-w-44 overflow-hidden rounded-md border border-sky-100 bg-white py-1 shadow-xl">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} className="block px-4 py-2 text-[13px] text-ink transition hover:bg-brand-light hover:text-brand">{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkCls}>{item.label}</NavLink>
              )
            )}
          </nav>

          {/* Right side menu icon: sab screens par drawer kholta hai */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-haspopup="dialog"
            className="group relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden bg-brand text-white transition hover:bg-brand-dark max-xl:ml-auto"
          >
            <span className="flex w-5 flex-col items-end gap-[5px]">
              <span className="h-0.5 w-5 bg-white transition-all duration-300 group-hover:w-5" />
              <span className="h-0.5 w-3.5 bg-white transition-all duration-300 group-hover:w-5" />
              <span className="h-0.5 w-4 bg-white transition-all duration-300 group-hover:w-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Drawer (backdrop-blur wale div ke bahar rakha hai, warna fixed position galat ho jata hai) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            onClick={close}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {open && (
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-[420px] flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease }}
          >
            {/* panel top: logo + close */}
            <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4 sm:px-6">
              <Link to="/" onClick={close} aria-label="Home">
                <img src={logo} alt="Manas Automotive Parts" className="h-10 w-auto rounded-sm" />
              </Link>
              <button
                onClick={close}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center bg-sky-50 text-2xl text-ink transition duration-300 hover:rotate-90 hover:bg-brand hover:text-white"
              >
                <FiX />
              </button>
            </div>

            {/* scrollable body */}
            <motion.div variants={list} initial="hidden" animate="show" className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {/* mobile/tablet: navigation links */}
              <motion.nav variants={item} className="mb-8 xl:hidden" aria-label="Mobile">
                <ul>
                  {nav.map((n) => (
                    <li key={n.label} className="border-b border-sky-50">
                      {n.children ? (
                        <>
                          <button onClick={() => setAboutOpen((o) => !o)} className="flex w-full items-center justify-between py-3 text-sm font-medium text-ink">
                            {n.label}
                            <FiChevronDown className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence initial={false}>
                            {aboutOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mb-2 ml-3 overflow-hidden border-l-2 border-brand pl-3"
                              >
                                {n.children.map((c) => (
                                  <li key={c.to}>
                                    <Link to={c.to} onClick={close} className="block py-2 text-sm text-steel hover:text-brand">{c.label}</Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <NavLink
                          to={n.to}
                          end={n.to === '/'}
                          onClick={close}
                          className={({ isActive }) => `block py-3 text-sm font-medium ${isActive ? 'text-brand' : 'text-ink'}`}
                        >
                          {n.label}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.nav>

              {/* about */}
              <motion.div variants={item}>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand">About us</span>
                <h2 className="mt-2 font-heading text-2xl font-medium text-ink">Manas Automotive Parts</h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  Side mirrors and rear-view mirrors for bikes, cars and commercial vehicles, built with precision tooling and in-house molding.
                </p>
              </motion.div>

              {/* contact info */}
              <motion.div variants={item} className="mb-3 mt-8 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand">Contact info</span>
                <span className="h-px flex-1 bg-sky-100" />
              </motion.div>
              <ul className="grid gap-3">
                {contacts.map(({ Icon, label, value, href }) => {
                  const body = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center bg-brand-light text-lg text-brand transition group-hover:bg-brand group-hover:text-white">
                        <Icon />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-wider text-steel">{label}</span>
                        <span className="block break-words text-sm font-medium text-ink">{value}</span>
                      </span>
                    </>
                  )
                  return (
                    <motion.li key={label} variants={item}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="group flex items-start gap-4 border border-sky-100 p-3 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="group flex items-start gap-4 border border-sky-100 p-3">{body}</div>
                      )}
                    </motion.li>
                  )
                })}
             </ul>

              {/* quick actions */}
              <motion.div variants={item} className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-medium text-white transition hover:brightness-95"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 border border-ink px-4 py-3 text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
                >
                  <FiPhone /> Call now
                </a>
              </motion.div>
            </motion.div>

            {/* panel bottom: socials + CTA */}
            <div className="border-t-2 border-brand bg-ink px-5 py-5 text-white sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-widest text-white/60">Follow us</span>
                <SocialLinks colorful itemClass="bg-white/10 text-white" />
              </div>
              <Link
                to="/contact-us"
                onClick={close}
                className="group relative mt-4 flex items-center justify-center gap-2 overflow-hidden bg-brand px-6 py-3 text-sm font-medium transition hover:bg-brand-dark"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Get a quote <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
                <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/30 transition-all duration-700 group-hover:left-[120%]" />
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  )
}