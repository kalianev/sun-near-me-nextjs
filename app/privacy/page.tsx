"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/fade-in"
import { AnimatedBackground } from "@/components/sun-background"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedText } from "@/components/animated-text"
import Footer from '@/components/footer'

export default function PrivacyPage() {
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

      {/* Privacy Policy Content */}
      <div className="container my-24">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">
              <AnimatedText text="Privacy Policy" type="letter" />
            </h1>
            <div className="mt-8 rounded-xl border bg-card/50 p-8 backdrop-blur-sm">
              <div className="prose prose-lg max-w-none">
                <p>
                  <strong>Last Updated:</strong> April 29, 2023
                </p>

                <h2>
                  <AnimatedText text="Introduction" type="letter" delay={0.1} />
                </h2>
                <p>
                  At Sun Near Me, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you use our mobile application and website. Please read
                  this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not
                  access the application.
                </p>

                <h2>
                  <AnimatedText text="Information We Collect" type="letter" delay={0.2} />
                </h2>
                <p>
                  We may collect information about you in various ways. The information we may collect via the Application
                  includes:
                </p>
                <ul>
                  <li>
                    <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address,
                    and demographic information that you voluntarily give to us when you register with the application or
                    when you choose to participate in various activities related to the application.
                  </li>
                  <li>
                    <strong>Location Data:</strong> With your permission, we collect precise location data to provide you
                    with sun tracking and prediction features. You can disable location services through your device
                    settings.
                  </li>
                  <li>
                    <strong>Device Information:</strong> Device information such as your mobile device ID, model,
                    manufacturer, and information about the location of your device, application usage, operating system,
                    browser type, and other system activity.
                  </li>
                </ul>

                <h2>
                  <AnimatedText text="Use of Your Information" type="letter" delay={0.3} />
                </h2>
                <p>
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized
                  experience. Specifically, we may use information collected about you via the application to:
                </p>
                <ul>
                  <li>Create and manage your account.</li>
                  <li>Provide personalized sun tracking and prediction services.</li>
                  <li>Email you regarding your account or order.</li>
                  <li>
                    Fulfill and manage purchases, orders, payments, and other transactions related to the application.
                  </li>
                  <li>Increase the efficiency and operation of the application.</li>
                  <li>Monitor and analyze usage and trends to improve your experience with the application.</li>
                  <li>Notify you of updates to the application.</li>
                  <li>Resolve disputes and troubleshoot problems.</li>
                </ul>

                <h2>
                  <AnimatedText text="Disclosure of Your Information" type="letter" delay={0.4} />
                </h2>
                <p>
                  We may share information we have collected about you in certain situations. Your information may be
                  disclosed as follows:
                </p>
                <ul>
                  <li>
                    <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is
                    necessary to respond to legal process, to investigate or remedy potential violations of our policies,
                    or to protect the rights, property, and safety of others, we may share your information as permitted
                    or required by any applicable law, rule, or regulation.
                  </li>
                  <li>
                    <strong>Third-Party Service Providers:</strong> We may share your information with third parties that
                    perform services for us or on our behalf, including payment processing, data analysis, email delivery,
                    hosting services, customer service, and marketing assistance.
                  </li>
                  <li>
                    <strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to
                    withdraw consent, we may share your information with third parties for marketing purposes.
                  </li>
                </ul>

                <h2>
                  <AnimatedText text="Security of Your Information" type="letter" delay={0.5} />
                </h2>
                <p>
                  We use administrative, technical, and physical security measures to help protect your personal
                  information. While we have taken reasonable steps to secure the personal information you provide to us,
                  please be aware that despite our efforts, no security measures are perfect or impenetrable, and no
                  method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>

                <h2>
                  <AnimatedText text="Contact Us" type="letter" delay={0.6} />
                </h2>
                <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                <p>
                  <strong>Sun Near Me</strong>
                  <br />
                  privacy@sunnearme.com
                  <br />
                  123 Sunshine Avenue
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </main>
  )
}
