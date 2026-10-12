import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { ProductImage } from './ProductArt'

// Car side-mirror. scroll=true -> rotates as the page scrolls.
export default function MirrorGraphic({ scroll = false, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ry = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), { stiffness: 80, damping: 20 })
  const rx = useTransform(scrollYProgress, [0, 1], [10, -10])
  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={scroll ? { rotateY: ry, rotateX: rx } : undefined}
        animate={scroll ? undefined : { rotateY: [-14, 14, -14], y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ProductImage name="car-mirror" kind="car" />
      </motion.div>
    </div>
  )
}
