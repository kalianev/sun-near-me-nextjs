"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import Footer from '@/components/footer'

export default function TermsPage() {
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

      {/* Terms of Service Content */}
      <div className="container my-12 max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight">
            <AnimatedText text="Terms of Service" type="letter" />
          </h1>
          <div className="mt-8 rounded-xl border bg-card/50 p-8 backdrop-blur-sm">
            <div className="prose prose-lg max-w-none">
              <p>
                <strong>Last Updated:</strong> April 29, 2023
              </p>

              <h2>
                <AnimatedText text="Agreement to Terms" type="letter" delay={0.1} />
              </h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you and Sun Near Me
                concerning your access to and use of the Sun Near Me mobile application and website. You agree that by
                accessing the Application, you have read, understood, and agree to be bound by all of these Terms of
                Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from
                using the Application and you must discontinue use immediately.
              </p>

              <h2>
                <AnimatedText text="Intellectual Property Rights" type="letter" delay={0.2} />
              </h2>
              <p>
                Unless otherwise indicated, the Application is our proprietary property and all source code, databases,
                functionality, software, website designs, audio, video, text, photographs, and graphics on the
                Application (collectively, the "Content") and the trademarks, service marks, and logos contained therein
                (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and
                trademark laws and various other intellectual property rights and unfair competition laws of the United
                States, international copyright laws, and international conventions.
              </p>
              <p>
                The Content and the Marks are provided on the Application "AS IS" for your information and personal use
                only. Except as expressly provided in these Terms of Service, no part of the Application and no Content
                or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed,
                encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial
                purpose whatsoever, without our express prior written permission.
              </p>

              <h2>
                <AnimatedText text="User Representations" type="letter" delay={0.3} />
              </h2>
              <p>By using the Application, you represent and warrant that:</p>
              <ol>
                <li>All registration information you submit will be true, accurate, current, and complete;</li>
                <li>
                  You will maintain the accuracy of such information and promptly update such registration information
                  as necessary;
                </li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service;</li>
                <li>You are not a minor in the jurisdiction in which you reside;</li>
                <li>
                  You will not access the Application through automated or non-human means, whether through a bot,
                  script, or otherwise;
                </li>
                <li>You will not use the Application for any illegal or unauthorized purpose;</li>
                <li>Your use of the Application will not violate any applicable law or regulation.</li>
              </ol>

              <h2>
                <AnimatedText text="Prohibited Activities" type="letter" delay={0.4} />
              </h2>
              <p>
                You may not access or use the Application for any purpose other than that for which we make the
                Application available. The Application may not be used in connection with any commercial endeavors
                except those that are specifically endorsed or approved by us.
              </p>
              <p>As a user of the Application, you agree not to:</p>
              <ol>
                <li>
                  Systematically retrieve data or other content from the Application to create or compile, directly or
                  indirectly, a collection, compilation, database, or directory without written permission from us.
                </li>
                <li>
                  Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
                  information such as user passwords.
                </li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Application.</li>
                <li>Engage in unauthorized framing of or linking to the Application.</li>
                <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages.</li>
                <li>
                  Interfere with, disrupt, or create an undue burden on the Application or the networks or services
                  connected to the Application.
                </li>
                <li>Attempt to impersonate another user or person or use the username of another user.</li>
                <li>
                  Use any information obtained from the Application in order to harass, abuse, or harm another person.
                </li>
                <li>
                  Use the Application as part of any effort to compete with us or otherwise use the Application and/or
                  the Content for any revenue-generating endeavor or commercial enterprise.
                </li>
              </ol>

              <h2>
                <AnimatedText text="Limitation of Liability" type="letter" delay={0.5} />
              </h2>
              <p>
                In no event will we or our directors, employees, or agents be liable to you or any third party for any
                direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost
                profit, lost revenue, loss of data, or other damages arising from your use of the application, even if
                we have been advised of the possibility of such damages.
              </p>

              <h2>
                <AnimatedText text="Contact Us" type="letter" delay={0.6} />
              </h2>
              <p>If you have questions or comments about these Terms of Service, please contact us at:</p>
              <p>
                <strong>Sun Near Me</strong>
                <br />
                terms@sunnearme.com
                <br />
                123 Sunshine Avenue
                <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  )
}
