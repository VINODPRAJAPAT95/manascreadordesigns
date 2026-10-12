import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ProductImage } from './ProductArt'

// Floating car + bike mirror with mouse parallax (swap in real transparent PNGs via src/assets/products)
export default function HeroProducts() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  useEffect(() => {
    const f = (e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5) }
    window.addEventListener('mousemove', f)
    return () => window.removeEventListener('mousemove', f)
  }, [mx, my])
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const x1 = useTransform(sx, [-0.5, 0.5], [-26, 26])
  const y1 = useTransform(sy, [-0.5, 0.5], [-18, 18])
  const x2 = useTransform(sx, [-0.5, 0.5], [38, -38])
  const y2 = useTransform(sy, [-0.5, 0.5], [26, -26])

  return (
    <div className="relative mx-auto h-[440px] w-full max-w-lg">
      <motion.div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-white/20" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 bg-sky-200/20 blur-3xl" />
      <motion.div style={{ x: x1, y: y1 }} className="absolute right-0 top-2 w-[82%]">
        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <ProductImage name="car-mirror" kind="car" />
        </motion.div>
      </motion.div>
      <motion.div style={{ x: x2, y: y2 }} className="absolute bottom-0 left-0 w-[34%]">
        <motion.div animate={{ y: [0, 12, 0], rotate: [-4, 4, -4] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <ProductImage name="bike-mirror" kind="bike" />
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-6 right-2 border border-white/25 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        OEM grade quality
      </motion.div>
    </div>
  )
}
