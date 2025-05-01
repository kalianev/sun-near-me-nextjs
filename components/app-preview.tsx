"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export function AppPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      container.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`
    }

    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="flex justify-center px-4">
      <div ref={containerRef} className="relative w-full max-w-2xl transition-transform duration-200 ease-out">
        <motion.div
          className="aspect-[9/16] w-full max-w-xs mx-auto overflow-hidden rounded-[2.5rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="relative h-full w-full overflow-hidden bg-black">
            {/* App mockup image */}
            <div
              className={`absolute inset-0 ${
                theme === "sun"
                  ? "bg-gradient-to-br from-primary/20 to-accent/20"
                  : "bg-gradient-to-br from-primary/20 to-accent/20"
              }`}
              style={{
                backgroundImage:
                  theme === "sun"
                    ? "url('https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=400')"
                    : "url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=400')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                className={`h-16 w-16 rounded-full ${
                  theme === "sun"
                    ? "bg-gradient-to-br from-primary to-accent"
                    : "bg-gradient-to-br from-primary to-accent"
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <h3 className="mt-6 text-2xl font-bold">Sun Near Me</h3>
              <p className="mt-2 text-muted-foreground">Your personal sunshine companion</p>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

              <div className="mt-8 grid w-full grid-cols-2 gap-4">
                <motion.div className="rounded-lg bg-card/50 p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl font-bold text-primary">87%</div>
                  <div className="text-xs text-muted-foreground">Sunshine quality</div>
                </motion.div>
                <motion.div className="rounded-lg bg-card/50 p-4" whileHover={{ scale: 1.05 }}>
                  <div className="text-2xl font-bold text-accent">4:32</div>
                  <div className="text-xs text-muted-foreground">Until golden hour</div>
                </motion.div>
              </div>

              <div className="mt-auto">
                <motion.div
                  className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find Sun Now
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-primary/20 blur-2xl animate-pulse-slow" />
        <div className="absolute -right-12 top-1/4 h-32 w-32 rounded-full bg-accent/20 blur-3xl animate-pulse-slow" />
      </div>
    </div>
  )
}
