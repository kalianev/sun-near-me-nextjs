"use client"

import { useTheme } from "@/contexts/theme-context"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
        theme === "sun" ? "bg-amber-400 text-amber-950" : "bg-indigo-900 text-indigo-100"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={theme === "sun" ? "Switch to Moon Mode" : "Switch to Sun Mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "sun" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {theme === "sun" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </motion.div>
    </motion.button>
  )
}
