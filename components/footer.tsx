"use client"

import { motion } from "framer-motion"
import { Heart, ArrowUp } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Omar Fahem</h3>
            <p className="text-muted-foreground leading-relaxed">
              Full Stack Web Developer & Video Editor passionate about creating innovative solutions that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: "About", href: "#about" },
                { name: "Experience", href: "#experience" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>omarfahem11@gmail.com</p>
              <p>+20 1150665030</p>
              <p>Cairo, Egypt</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-muted-foreground text-sm text-center md:text-left mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Omar Mohamed Fahem • Weza Production. All rights reserved.
          </motion.p>



          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
