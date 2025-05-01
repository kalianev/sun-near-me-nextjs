"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group block">
      <Link href={`/blog/${post.slug}`}>
        <motion.div
          className="overflow-hidden rounded-xl"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            width={600}
            height={400}
            className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </motion.div>
      </Link>
      <div className="mt-4 flex gap-2">
        {post.categories.slice(0, 2).map((category) => (
          <Link key={category} href={`/blog?category=${category}`} onClick={(e) => e.stopPropagation()}>
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
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mt-2 text-xl font-medium group-hover:text-primary">{post.title}</h3>
        <p className="mt-2 text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-6 w-6 overflow-hidden rounded-full bg-card/50">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={24}
              height={24}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm text-muted-foreground">{post.author.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{post.date}</span>
        </div>
      </Link>
    </div>
  )
}
