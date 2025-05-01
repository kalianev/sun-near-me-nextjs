"use client"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

export function DayNightAnimation() {
  const { theme } = useTheme()

  return (
    <div className="relative w-full max-w-md mx-auto h-64 my-8">
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500" />

        {/* Night overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-b from-green-700 to-green-900 rounded-b-xl" />

        {/* Sun */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-yellow-400"
          style={{
            boxShadow: "0 0 30px 5px rgba(251, 191, 36, 0.6)",
          }}
          animate={{
            y: ["0%", "200%"],
            x: ["30%", "70%"],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: 5,
            times: [0, 0.8, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />

        {/* Moon */}
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-gray-100"
          style={{
            boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.3)",
          }}
          animate={{
            y: ["200%", "0%"],
            x: ["70%", "30%"],
            opacity: [0, 0.8, 1],
          }}
          transition={{
            duration: 5,
            times: [0, 0.2, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 5,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Stars */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
              }}
              animate={{
                opacity: [0, 1, 0.8, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>

        {/* Clouds */}
        <motion.div
          className="absolute w-20 h-8 bg-white/80 rounded-full blur-sm"
          style={{ left: "10%", top: "20%" }}
          animate={{
            x: [0, 100, 0],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute w-24 h-10 bg-white/80 rounded-full blur-sm"
          style={{ left: "60%", top: "15%" }}
          animate={{
            x: [0, -120, 0],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.p
              className="text-white font-medium text-lg"
              animate={{
                opacity: [1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            >
              Sun Mode
            </motion.p>
            <motion.p
              className="text-white font-medium text-lg"
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            >
              Moon Mode
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
