"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(isSunMode: boolean) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        if (isSunMode) {
          // Sun mode: warm colors
          const hue = Math.floor(Math.random() * 60) + 30 // 30-90: yellow to orange
          const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
          const lightness = Math.floor(Math.random() * 20) + 70 // 70-90%
          this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.2})`
        } else {
          // Moon mode: cool colors
          const hue = Math.floor(Math.random() * 60) + 210 // 210-270: blue to purple
          const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
          const lightness = Math.floor(Math.random() * 20) + 70 // 70-90%
          this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.2})`
        }
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = []
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 200)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(theme === "sun"))
      }
    }

    initParticles()

    // Draw gradient background
    const drawBackground = () => {
      if (theme === "sun") {
        // Sun mode: warm gradient
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width,
        )
        gradient.addColorStop(0, "rgba(255, 236, 210, 1)")
        gradient.addColorStop(0.5, "rgba(255, 223, 175, 0.8)")
        gradient.addColorStop(1, "rgba(255, 210, 161, 0.6)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        // Moon mode: dark gradient
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 3,
          0,
          canvas.width / 2,
          canvas.height / 3,
          canvas.width,
        )
        gradient.addColorStop(0, "rgba(30, 40, 80, 1)")
        gradient.addColorStop(0.5, "rgba(20, 25, 50, 0.8)")
        gradient.addColorStop(1, "rgba(10, 15, 30, 0.6)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add stars in moon mode
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 1.5
          const opacity = Math.random() * 0.8 + 0.2

          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawBackground()

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ width: "100%", height: "100%" }} />
}
