"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Certifications from "@/components/certifications"
import Projects from "@/components/projects"
import WezaProduction from "@/components/weza-production"
import Volunteering from "@/components/volunteering"
import Languages from "@/components/languages"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ScrollProgress />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative w-24 h-24 mx-auto mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Omar Mohamed Fahem
                </h2>
                <p className="text-muted-foreground text-lg">Full Stack Web Developer & Creative Entrepreneur</p>
                <motion.div
                  className="flex justify-center space-x-1 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-background"
          >
            <Header />
            <main className="relative">
              <Hero />
              <About />
              <Education />
              <Experience />
              <Skills />
              <Certifications />
              <Projects />
              <WezaProduction />
              <Volunteering />
              <Languages />
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
