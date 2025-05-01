"use client"

import { useEffect, useRef } from "react"

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient
    const drawGradient = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create a radial gradient
      const centerX = canvas.width / 2
      const centerY = canvas.height / 3
      const radius = Math.max(canvas.width, canvas.height) * 0.8

      const gradient = ctx.createRadialGradient(
        centerX + Math.sin(time / 5000) * 100,
        centerY + Math.cos(time / 7000) * 100,
        0,
        centerX,
        centerY,
        radius,
      )

      // Add color stops
      gradient.addColorStop(0, "rgba(251, 146, 60, 0.15)") // orange-400
      gradient.addColorStop(0.5, "rgba(251, 113, 133, 0.05)") // rose-400
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      // Fill with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(() => drawGradient(time + 16))
    }

    drawGradient(0)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" style={{ width: "100%", height: "100%" }} />
}
