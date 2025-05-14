"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { BlogCard } from "@/components/blog-card"
import { blogPosts } from "@/lib/blog-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { Navigation } from "@/components/navigation"
import Footer from '@/components/footer'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Extract all unique categories from blog posts
  const allCategories = Array.from(new Set(blogPosts.flatMap((post) => post.categories))).sort()

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.categories.includes(selectedCategory))
    : blogPosts

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Back Button */}
      <div className="container mt-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </motion.div>
          <span>Back to home</span>
        </Link>
      </div>

      {/* Blog Header */}
      <section className="container mt-12">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <AnimatedText text="Solore" type="letter" />
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            <AnimatedText
              text="Solore—where Solar meets Lore—is our collection of sun-soaked stories and solar wisdom. Where sunlight ignites culture, illuminating places, people, and presence through our helio-journal of sound, sight, and feeling. These stories orbit the sun, and we're here to share them with you."
              delay={0.3}
            />
          </p>
        </FadeIn>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap gap-2">
          <FadeIn delay={0.1}>
            <motion.button
              className={`rounded-full px-4 py-1 text-sm backdrop-blur-sm ${
                selectedCategory === null
                  ? "bg-primary/20 text-foreground"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </motion.button>
          </FadeIn>

          {allCategories.map((category, index) => (
            <FadeIn key={category} delay={0.15 + index * 0.05}>
              <motion.button
                className={`rounded-full px-4 py-1 text-sm ${
                  selectedCategory === category
                    ? "bg-primary/20 text-foreground"
                    : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container my-16">
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <FadeIn key={post.slug} delay={0.1 + index * 0.05}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-primary/20 p-4">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-medium">No posts found</h3>
            <p className="mt-2 text-muted-foreground">No posts were found in the {selectedCategory} category.</p>
            <motion.button
              className="mt-4 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
            >
              View all posts
            </motion.button>
          </div>
        )}
      </section>

      <section className="container my-24">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            <AnimatedText text="Latest Articles" type="letter" />
          </h2>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
