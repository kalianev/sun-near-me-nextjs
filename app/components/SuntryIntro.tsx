import { motion } from 'framer-motion';
import { FadeIn } from "@/components/fade-in";
import { AnimatedText } from "@/components/animated-text";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SuntryIntro() {
  return (
    <div className="container mt-8">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <motion.div whileHover={{ x: -3 }} whileTap={{ x: -6 }}>
          <ArrowLeft className="mr-2 h-4 w-4" />
        </motion.div>
        <span>Back to home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <AnimatedText text="What is a Suntry?" type="letter" />
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            <AnimatedText
              text="A Suntry (sun + entry) is a personal, poetic, and sensory record of your experience with the sun. Each Suntry captures a moment of your life bathed in sunlight — whether it's a bright rooftop morning, a shimmering afternoon walk, or a rare golden winter hour. They're not just weather logs — they are your sun archives, your solar memory bank, your heliocentric diary."
              delay={0.3}
            />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FadeIn delay={0.2}>
              <motion.div 
                className="bg-card p-6 rounded-[var(--radius)] border border-border backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-xl font-medium mb-4">Each Suntry Includes:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>📅 Date & Time (auto-populated or user-edited)</li>
                  <li>📍 Location (auto or custom names like "Secret Garden")</li>
                  <li>🌤️ Weather Snapshot (temp, humidity, cloudiness, UV index)</li>
                  <li>💫 Mood Selection with emojis</li>
                  <li>✍️ Custom Title (e.g., "Sun Over the Lemon Tree")</li>
                  <li>📝 Notes or Reflection Field</li>
                  <li>📸 Optional Photo Upload</li>
                  <li>🎵 Add a song to sum up your suntry</li>
                </ul>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <motion.div 
                className="bg-card p-6 rounded-[var(--radius)] border border-border backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-xl font-medium mb-4">Features Over Time:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>📚 Suntry Collections by season, location, or mood</li>
                  <li>🏆 Sun Streaks and badges</li>
                  <li>🗺️ Suntry Map of your sunny spots</li>
                  <li>⏰ Golden Hour Reminders</li>
                  <li>📊 Mood Analysis with sunlight patterns</li>
                  <li>✨ "Solar Poet" Mode with prompts</li>
                  <li>🤝 Optional Suntry Sharing</li>
                  <li>🌞 Suntry AI Circadian Rythym Assistant</li>
                </ul>
              </motion.div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <motion.div 
              className="mt-8 p-6 bg-card rounded-[var(--radius)] border border-border backdrop-blur-sm"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-medium mb-4">Our Approach</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                <li>🌟 Lighthearted but sacred</li>
                <li>👁️ Encourages sensory noticing</li>
                <li>✨ Gently motivates exploration</li>
                <li>🤔 Allows deep introspection</li>
                <li>💝 Values every sun moment</li>
                <li>🌾 Your personal feeld journal</li>
              </ul>
            </motion.div>
          </FadeIn>
        </FadeIn>
      </motion.div>
    </div>
  );
} 