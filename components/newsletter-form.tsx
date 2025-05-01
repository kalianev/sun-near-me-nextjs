"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email)
      setSubmitted(true)
      setEmail("")

      // Reset the submitted state after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 w-full rounded-lg border bg-card/50 px-4 backdrop-blur-sm focus-visible:ring-primary"
        />
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          className={`h-12 transition-all ${
            submitted
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          }`}
        >
          {submitted ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Subscribed
            </>
          ) : (
            <>
              Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </form>
  )
}
