"use client"

import { Grid } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Download, Home, User, Briefcase, Code, FolderOpen, Building, Phone } from "lucide-react"
import { useTheme } from "next-themes"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()

  const navItems = [
    { name: "Home", href: "#home", icon: <Home className="w-4 h-4" /> },
    { name: "About", href: "#about", icon: <User className="w-4 h-4" /> },
    { name: "Experience", href: "#experience", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Skills", href: "#skills", icon: <Code className="w-4 h-4" /> },
    { name: "Projects", href: "#projects", icon: <FolderOpen className="w-4 h-4" /> },
    { name: "Weza Production", href: "#weza", icon: <Building className="w-4 h-4" /> },
    { name: "Apps", href: "apps/", icon: <Grid className="w-4 h-4" />, external: true },
    { name: "Contact", href: "#contact", icon: <Phone className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.filter(item => !item.external).map(item => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (item: typeof navItems[0]) => {
    if (item.external) {
      // صفحة Next.js جديدة
      window.location.href = item.href
    } else {
      // scroll داخل الصفحة
      const element = document.querySelector(item.href)
      if (element) element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv/Omar_Mohamed_Fahem_CV.pdf"
    link.download = "Omar_Mohamed_Fahem_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg" : "bg-transparent"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div className="flex items-center space-x-3 cursor-pointer group" whileHover={{ scale: 1.05 }} onClick={() => handleClick(navItems[0])}>
              <motion.div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg" whileHover={{ rotate: 5 }}>
                O
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Omar Fahem</h1>
                <p className="text-xs text-muted-foreground">Full Stack Developer</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) =>
                item.external ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-foreground hover:text-primary hover:bg-primary/10`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <motion.button
                    key={item.name}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.href.substring(1) ? "bg-primary text-primary-foreground shadow-lg" : "text-foreground hover:text-primary hover:bg-primary/10"}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleClick(item)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.button>
                )
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={downloadCV} className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 bg-transparent">
                <Download className="w-4 h-4" />
                Download CV
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:bg-primary/10">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="fixed top-[73px] left-0 right-0 z-30 lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50">
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) =>
                  item.external ? (
                    <Link key={item.name} href={item.href} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-foreground hover:text-primary hover:bg-primary/10">
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ) : (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeSection === item.href.substring(1) ? "bg-primary text-primary-foreground" : "text-foreground hover:text-primary hover:bg-primary/10"}`}
                      onClick={() => handleClick(item)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  )
                )}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.1 }} className="pt-4 border-t border-border/50">
                  <Button variant="outline" onClick={downloadCV} className="w-full flex items-center justify-center gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download CV
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
