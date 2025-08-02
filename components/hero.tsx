"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Phone, Play, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const Hero = () => {
  const [text, setText] = useState("")
  const roles = ["Full Stack Developer", "Video Editor", "Creative Entrepreneur", "AI Innovator"]
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const roleText = roles[currentRole]
    let index = 0

    const timer = setInterval(() => {
      setText(roleText.slice(0, index))
      index++
      if (index > roleText.length) {
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }, 2000)
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [currentRole])

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/omar-fahem-121a87270/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/OmaR-WezA",
      label: "GitHub",
      color: "hover:text-gray-600",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:omarfahem11@gmail.com",
      label: "Email",
      color: "hover:text-green-600",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      href: "tel:+201150665030",
      label: "Phone",
      color: "hover:text-purple-600",
    },
  ]

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Profile Image */}
          <motion.div
            className="relative w-40 h-40 mx-auto mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-background">
                <img
                  src="/img/profile.jpg"
                  alt="Omar Mohamed Fahem"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Omar Mohamed
            </span>
            <br />
            <span className="text-foreground">Fahem</span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            className="text-2xl md:text-3xl text-muted-foreground mb-8 h-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="mr-2">I'm a</span>
            <span className="text-primary font-semibold min-w-[300px] text-left">
              {text}
              <motion.span
                className="inline-block w-0.5 h-8 bg-primary ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Passionate about creating innovative digital solutions and leading creative projects. Currently building the
            future through <span className="text-primary font-semibold">AI innovations</span> and
            <span className="text-primary font-semibold"> creative entrepreneurship</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              size="lg"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-4 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Let's Connect
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-background border border-border hover:border-primary/50 transition-all duration-300 ${link.color} group`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="group-hover:scale-110 transition-transform duration-200"
                >
                  {link.icon}
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-medium">Scroll Down</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
