"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useTheme } from "@/contexts/theme-context"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  type?: "word" | "letter" | "gradient"
  delay?: number
}

export function AnimatedText({ text, className = "", once = true, type = "word", delay = 0 }: AnimatedTextProps) {
  const controls = useAnimation()
  const { theme } = useTheme()
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold: 0.2 },
    )

    const element = document.getElementById(`animated-text-${text.slice(0, 10).replace(/\s/g, "-")}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [text, once])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  if (type === "gradient") {
    return (
      <motion.span
        id={`animated-text-${text.slice(0, 10).replace(/\s/g, "-")}`}
        className={`inline-block bg-gradient-to-r ${
          theme === "sun"
            ? "from-amber-400 via-orange-500 to-amber-400"
            : "from-indigo-400 via-purple-500 to-indigo-400"
        } bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
        animate={{
          backgroundPosition: ["0% center", "200% center"],
        }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          delay,
        }}
      >
        {text}
      </motion.span>
    )
  }

  if (type === "letter") {
    const letters = text.split("")

    const letterVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delay + i * 0.05,
          duration: 0.3,
        },
      }),
    }

    return (
      <motion.span
        id={`animated-text-${text.slice(0, 10).replace(/\s/g, "-")}`}
        className={`inline-block ${className}`}
        initial="hidden"
        animate={controls}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            custom={i}
            variants={letterVariants}
            className="inline-block"
            style={{
              display: letter === " " ? "inline" : "inline-block",
              whiteSpace: letter === " " ? "pre" : "normal",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  // Default: word animation
  const words = text.split(" ")

  const wordVariants: Variants = {
    hidden: {},
    visible: {},
  }

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.span
      id={`animated-text-${text.slice(0, 10).replace(/\s/g, "-")}`}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={controls}
      variants={wordVariants}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={childVariants}
          className="inline-block"
          transition={{
            delay: delay + i * 0.1,
          }}
        >
          {word}
          {i !== words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  )
}
