"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isClickable)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Don't render custom cursor on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className={`rounded-full ${
            theme === "sun" ? "bg-amber-500 shadow-amber-300" : "bg-indigo-500 shadow-indigo-300"
          } ${isPointer ? "h-6 w-6 opacity-50" : "h-4 w-4 opacity-70"}`}
          animate={{
            boxShadow: isPointer
              ? theme === "sun"
                ? "0 0 15px 5px rgba(251, 191, 36, 0.5)"
                : "0 0 15px 5px rgba(99, 102, 241, 0.5)"
              : "none",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Trailer effect */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 h-8 w-8 rounded-full"
        animate={{
          x: position.x,
          y: position.y,
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.2 : 0.1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 150,
          mass: 0.8,
          delay: 0.03,
        }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        <div className={`h-full w-full rounded-full ${theme === "sun" ? "bg-amber-400" : "bg-indigo-400"}`} />
      </motion.div>
    </>
  )
}
