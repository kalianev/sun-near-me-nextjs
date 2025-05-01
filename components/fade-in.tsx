"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  once?: boolean
}

export function FadeIn({ children, delay = 0, duration = 0.5, y = 20, once = true }: FadeInProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
