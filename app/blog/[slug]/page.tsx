"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import ReactMarkdown from 'react-markdown'

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { blogPosts } from "@/lib/blog-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import { BlogVisualization } from "@/components/blog-visualization"
import { Navigation } from "@/components/navigation"
import Footer from '@/components/footer'

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

      {/* Back Button */}
      <div className="container mt-8">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </motion.div>
          <span>Back to Solore</span>
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
            <div className="mt-8">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => (
                    <motion.h1
                      className="text-4xl font-bold text-primary mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span {...props} />
                    </motion.h1>
                  ),
                  h2: ({node, ...props}) => (
                    <motion.h2
                      className="text-3xl font-semibold text-accent mt-10 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span {...props} />
                    </motion.h2>
                  ),
                  h3: ({node, ...props}) => (
                    <motion.h3
                      className="text-2xl font-semibold text-accent-foreground mt-8 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span {...props} />
                    </motion.h3>
                  ),
                  a: ({node, ...props}) => (
                    <a
                      className="text-primary underline hover:text-accent transition-colors font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  img: ({node, ...props}) => (
                    <img
                      className="rounded-xl shadow-lg my-6 mx-auto max-w-full h-auto"
                      alt={props.alt || ''}
                      {...props}
                    />
                  ),
                  ul: ({node, ...props}) => (
                    <ul className="list-disc pl-6 my-4 text-base" {...props} />
                  ),
                  ol: ({node, ...props}) => (
                    <ol className="list-decimal pl-6 my-4 text-base" {...props} />
                  ),
                  li: ({node, ...props}) => (
                    <li className="mb-2" {...props} />
                  ),
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-6" {...props} />
                  ),
                  code: ({node, ...props}) => (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
                  ),
                  pre: ({node, ...props}) => (
                    <pre className="bg-muted p-4 rounded my-4 overflow-x-auto" {...props} />
                  ),
                  p: ({node, ...props}) => (
                    <p className="my-4 text-foreground" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Interactive Visualization</h2>
            <BlogVisualization type={post.slug} />
          </div>
        </FadeIn>
      </article>

      {/* Related Posts */}
      <section className="container my-24">
        <FadeIn>
          <h2 className="text-2xl font-semibold tracking-tight">
            <AnimatedText text="More from Solore" type="letter" />
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

      <Footer />
    </main>
  )
}
