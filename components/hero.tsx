"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Phone, Play, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

import data from "@/data/portfolio-data.json"
import { HeroData } from "@/types/portfolio"
import { getIcon } from "@/lib/icon-utils"

const heroData = data.hero as HeroData

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const roles = heroData.roles

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [roles.length])

  const socialLinks = heroData.socialLinks.map(link => ({
    ...link,
    icon: getIcon(link.icon, "w-5 h-5")
  }))

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
  }


  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-10 bg-background selection:bg-primary/30">
      {/* Animated Background Content */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />

        {/* Particles with Client-Side only positions */}
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          {/* Enhanced Profile Image */}
          <motion.div
            className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-10 group"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-primary/60 rounded-full p-1.5 shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] transition-all duration-500">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-background ring-4 ring-background">
                <Image
                  src="/img/profile.jpg"
                  alt="Omar Mohamed Fahem"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-10 h-10 bg-background border border-primary/20 rounded-full flex items-center justify-center shadow-xl shadow-primary/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>

          {/* Name Section with Better Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              <span className="opacity-40 font-medium block text-2xl md:text-3xl tracking-normal mb-4 font-sans italic">Creative Developer</span>
              Omar <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">Fahem</span>
            </h1>
          </motion.div>

          {/* High-End Rolling Text */}
          <div className="h-12 flex items-center justify-center overflow-hidden mb-12">
            <AnimatePresence mode="wait">
              {mounted && (
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl md:text-2xl font-bold tracking-tight bg-primary/5 text-primary/90 px-5 py-2 rounded-xl border border-primary/10"
                >
                  {roles[roleIndex]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {heroData.description}
          </motion.p>

          {/* CTA Group */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              size="lg"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="h-16 px-10 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              Start Exploration
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="h-16 px-10 text-xl font-bold rounded-2xl border-2 border-primary/20 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              Initiate Chat
            </Button>
          </motion.div>

          {/* Final Social Bar */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="h-px w-12 bg-primary/20" />
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-400 transition-all duration-300 transform hover:scale-125">
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="h-px w-12 bg-primary/20" />
          </div>

        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/40 hover:text-primary transition-all duration-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-8 h-8" />
      </motion.button>
    </section>
  )
}

export default Hero
