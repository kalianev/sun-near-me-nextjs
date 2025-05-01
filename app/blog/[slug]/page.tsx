"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { blogPosts } from "@/lib/blog-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"

export default function BlogPost() {
  const { slug } = useParams() as { slug: string }
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Post not found</p>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <motion.div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <span className="text-xl font-medium tracking-tight">Sun Near Me</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/blog" className="text-sm hover:text-primary transition-colors">
            Journal
          </Link>
          <Link href="/playlists" className="text-sm hover:text-primary transition-colors">
            Playlists
          </Link>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <motion.button className="text-foreground" whileTap={{ scale: 0.9 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mt-8">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </motion.div>
          <span>Back to journal</span>
        </Link>
      </div>

      <article className="container my-12 max-w-3xl">
        <FadeIn>
          <div className="mb-8">
            <div className="mb-4 flex gap-2">
              {post.categories.map((category) => (
                <Link key={category} href={`/blog?category=${category}`}>
                  <motion.span
                    className="rounded-full bg-card/80 px-3 py-1 text-xs backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.span>
                </Link>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <AnimatedText text={post.title} type="letter" />
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 overflow-hidden rounded-full bg-card/50">
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm">{post.author.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.div
            className="mb-12 overflow-hidden rounded-xl"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="prose prose-lg max-w-none">
            <p className="lead">
              <AnimatedText text={post.excerpt} />
            </p>
            <div className="whitespace-pre-line">
              <AnimatedText text={post.content} />
            </div>
          </div>
        </FadeIn>
      </article>

      {/* Related Posts */}
      <section className="container my-24">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            <AnimatedText text="More from the Journal" type="letter" />
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {blogPosts
            .filter((relatedPost) => relatedPost.slug !== post.slug)
            .slice(0, 3)
            .map((relatedPost, index) => (
              <FadeIn key={relatedPost.slug} delay={0.1 + index * 0.05}>
                <Link href={`/blog/${relatedPost.slug}`} className="group block">
                  <motion.div
                    className="overflow-hidden rounded-lg"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={relatedPost.coverImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      width={400}
                      height={225}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-medium group-hover:text-primary">{relatedPost.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{relatedPost.date}</p>
                </Link>
              </FadeIn>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container pb-12 pt-24">
        <div className="flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row">
          <div className="flex items-center gap-2">
            <motion.div
              className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <span className="text-sm font-medium">Sun Near Me</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sun Near Me. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
