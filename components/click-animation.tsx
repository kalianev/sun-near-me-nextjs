"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export function ClickAnimation() {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't add click animation for clicks on interactive elements
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"

      if (!isInteractive) {
        const newClick = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        }
        setClicks((prev) => [...prev, newClick])

        // Remove the click after animation completes
        setTimeout(() => {
          setClicks((prev) => prev.filter((click) => click.id !== newClick.id))
        }, 1000)
      }
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="absolute"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              left: click.x,
              top: click.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <div
              className={`h-24 w-24 rounded-full ${
                theme === "sun"
                  ? "bg-gradient-to-r from-amber-300 to-orange-400"
                  : "bg-gradient-to-r from-indigo-400 to-purple-500"
              } opacity-30`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
