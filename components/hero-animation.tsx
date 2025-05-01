"use client"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export function HeroAnimation() {
  const { theme } = useTheme()
  const isSunMode = theme === "sun"

  // Animation variants for the sun/moon
  const centerCircleVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Animation variants for the rays/stars
  const raysVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 60,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  // Animation variants for the small particles
  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      x: [0, i % 2 === 0 ? 5 : -5, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3 + (i % 3),
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] max-w-full">
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main circle (sun or moon) */}
        <motion.div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            isSunMode
              ? "bg-gradient-to-r from-amber-300 to-orange-500 w-48 h-48"
              : "bg-gradient-to-r from-indigo-300 to-purple-400 w-40 h-40"
          }`}
          variants={centerCircleVariants}
          animate="animate"
          style={{
            boxShadow: isSunMode ? "0 0 60px 10px rgba(251, 191, 36, 0.4)" : "0 0 40px 10px rgba(129, 140, 248, 0.4)",
          }}
        />

        {/* Rays or stars */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
          variants={raysVariants}
          animate="animate"
        >
          {isSunMode
            ? // Sun rays
              Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-4 origin-center"
                  style={{ transform: `rotate(${i * 30}deg)` }}
                >
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-amber-300/30 to-transparent"
                    custom={i}
                    animate={{
                      scaleX: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              ))
            : // Stars for moon mode
              Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  custom={i}
                  variants={particleVariants}
                  animate="animate"
                />
              ))}
        </motion.div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isSunMode ? "bg-amber-300/60" : "bg-indigo-300/60"}`}
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            custom={i}
            variants={particleVariants}
            animate="animate"
          />
        ))}
      </motion.div>
    </div>
  )
}
