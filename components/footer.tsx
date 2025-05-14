"use client"

import React from 'react'
import { Sun, Github, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="container pb-12 pt-24">
      <div className="grid grid-cols-1 gap-8 border-t pt-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent"
            />
            <span className="text-sm font-medium">Sun Near Me</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Helping you find the best sun-soaked locations near you, anywhere in the world.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-sm font-medium">Discover</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground">
                Explore Places
              </Link>
            </li>
            <li>
              <Link href="/suntries" className="text-sm text-muted-foreground hover:text-foreground">
                Suntries
              </Link>
            </li>
            <li>
              <Link href="/trips" className="text-sm text-muted-foreground hover:text-foreground">
                Trip Planner
              </Link>
            </li>
            <li>
              <Link href="/compare" className="text-sm text-muted-foreground hover:text-foreground">
                Compare Cities
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-sm font-medium">Experience</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/playlists" className="text-sm text-muted-foreground hover:text-foreground">
                Sun Playlists
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                Solore
              </Link>
            </li>
            <li>
              <Link href="/place" className="text-sm text-muted-foreground hover:text-foreground">
                Place Details
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-sm font-medium">Legal</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy#cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/terms#data" className="text-sm text-muted-foreground hover:text-foreground">
                Data Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Sun Near Me. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer 