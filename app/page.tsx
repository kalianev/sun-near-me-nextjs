"use client"

import Link from "next/link"
import { ArrowRight, Instagram, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { NewsletterForm } from "@/components/newsletter-form"
import { AppPreview } from "@/components/app-preview"
import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { HeroAnimation } from "@/components/hero-animation"
import { DayNightAnimation } from "@/components/day-night-animation"
import { Navigation } from "@/components/navigation"
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="container mt-12 md:mt-24 relative">
        <HeroAnimation />
        <div className="relative z-10 md:max-w-[60%]">
          <FadeIn>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <AnimatedText text="Find your" type="letter" />{" "}
              <AnimatedText text="perfect" type="gradient" className="font-bold" delay={0.5} />{" "}
              <AnimatedText text="sunshine moment" type="letter" delay={0.8} />
            </h1>
            <p className="mt-6 max-w-2xl text-lg">
              <AnimatedText
                text="The revolutionary app that tracks, predicts, and enhances your relationship with sunlight. Elevate your daily experience with precision sun forecasting."
                delay={1.2}
              />
            </p>
          </FadeIn>

          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center">
            <FadeIn delay={0.2}>
              <NewsletterForm />
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-6">
                <Link href="https://instagram.com" className="group" aria-label="Instagram">
                  <Instagram className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
                <Link href="https://twitter.com" className="group" aria-label="Twitter">
                  <Twitter className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="relative mt-24 md:mt-32">
        <FadeIn delay={0.4}>
          <AppPreview />
        </FadeIn>
      </section>

      {/* Features Section */}
      <section className="container mt-24 md:mt-40">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            <AnimatedText text="Reimagine your relationship with sunlight" type="letter" />
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <FadeIn delay={0.2}>
            <motion.div
              className="rounded-xl border bg-card p-6 backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-primary" />
              </div>
              <h3 className="text-xl font-medium">Precision Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                Know exactly when and where to find perfect sunlight in your area.
              </p>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div
              className="rounded-xl border bg-card p-6 backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-secondary" />
              </div>
              <h3 className="text-xl font-medium">Smart Notifications</h3>
              <p className="mt-2 text-muted-foreground">
                Get alerted when golden hour approaches or when rare sun events occur.
              </p>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <motion.div
              className="rounded-xl border bg-card p-6 backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-accent" />
              </div>
              <h3 className="text-xl font-medium">Mood Enhancement</h3>
              <p className="mt-2 text-muted-foreground">
                Optimize your exposure to natural light for improved wellbeing and energy.
              </p>
            </motion.div>
          </FadeIn>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <FadeIn delay={0.5}>
            <motion.div
              className="rounded-xl border bg-card p-6 backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-primary" />
              </div>
              <h3 className="text-xl font-medium">AI-Powered Insights</h3>
              <p className="mt-2 text-muted-foreground">
                Speak naturally to our AI and get personalized recommendations without sifting through Reddit threads.
              </p>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <motion.div
              className="rounded-xl border bg-card p-6 backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-secondary" />
              </div>
              <h3 className="text-xl font-medium">Circadian Rhythm</h3>
              <p className="mt-2 text-muted-foreground">
                Smart suggestions that align with your body's natural rhythm for optimal energy and wellbeing.
              </p>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <motion.div
              className="rounded-xl border bg-card p-6 backdrop-blur-sm"
              whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-accent" />
              </div>
              <h3 className="text-xl font-medium">Smart Trip Planning</h3>
              <p className="mt-2 text-muted-foreground">
                Plan quick adventures or longer journeys with sun-optimized itineraries and recommendations.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Cultural Content Section */}
      <section className="container my-24 md:my-40">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            <AnimatedText text="Experience the sun through culture" type="letter" />
          </h2>
          <p className="mt-6 max-w-2xl text-lg">
            <AnimatedText
              text="Discover heliocentric music, architecture, visual art, somatic practices, and agricultural traditions curated for your sun journey."
              delay={0.3}
            />
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <FadeIn delay={0.2}>
            <Link href="/blog" className="group">
              <motion.div
                className="overflow-hidden rounded-xl border bg-card backdrop-blur-sm"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-video w-full relative overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=800"
                    alt="Sun Journal"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-medium">Sun Journal</h3>
                      <p className="mt-2 text-white/70">
                        Explore articles about heliocentric art, architecture, and agricultural traditions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium">Sun Journal</h3>
                  <p className="mt-2 text-muted-foreground">
                    Explore articles about heliocentric art, architecture, and agricultural traditions from around the
                    world.
                  </p>
                  <div className="mt-4 flex items-center text-primary">
                    <span className="text-sm font-medium">Explore the journal</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Link href="/playlists" className="group">
              <motion.div
                className="overflow-hidden rounded-xl border bg-card backdrop-blur-sm"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="aspect-video w-full relative overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=800"
                    alt="Sun Playlists"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-medium">Sun Playlists</h3>
                      <p className="mt-2 text-white/70">Custom playlists curated to accompany your sun adventures.</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium">Sun Playlists</h3>
                  <p className="mt-2 text-muted-foreground">
                    Custom playlists curated to accompany your sun adventures, from dawn meditations to sunset
                    celebrations.
                  </p>
                  <div className="mt-4 flex items-center text-primary">
                    <span className="text-sm font-medium">Discover the sounds</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container my-24 md:my-40">
        <FadeIn>
          <motion.div
            className="rounded-2xl border bg-gradient-to-b from-background/50 to-background/80 p-8 md:p-12 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <AnimatedText text="Be the first to experience Sun Near Me" type="letter" />
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              <AnimatedText
                text="Join our exclusive early access list and receive updates as we approach launch. Early subscribers will receive premium features free for life."
                delay={0.3}
              />
            </p>
            <Button className="mt-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Join the waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </FadeIn>
      </section>

      {/* Moon Mode Message */}
      <section className="container mb-16">
        <FadeIn>
          <div className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-medium">
              <AnimatedText text="Moon Mode is more than just dark mode" type="gradient" />
            </h3>
            <p className="mt-2 text-muted-foreground">
              <AnimatedText
                text="We're also here to help you find those perfect moonlit times when the sun is on the other side. Sun Near Me will help you find those perfect night adventures too."
                delay={0.2}
              />
            </p>
            <DayNightAnimation />
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
