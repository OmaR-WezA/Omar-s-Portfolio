"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageSquare, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import emailjs from "@emailjs/browser"
import toast from "react-hot-toast"



const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const { toast } = useToast()

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "omarfahem11@gmail.com",
      href: "mailto:omarfahem11@gmail.com",
      color: "from-blue-500 to-cyan-500",
      description: "Drop me a line anytime",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+20 1150665030",
      href: "tel:+201150665030",
      color: "from-green-500 to-emerald-500",
      description: "Call for urgent matters",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Cairo, Egypt",
      // href: "",
      color: "from-purple-500 to-violet-500",
      description: "Available for local meetings",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      value: "Within 24 hours",
      // href: "#",
      color: "from-orange-500 to-red-500",
      description: "Quick response guaranteed",
    },
  ]

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/omar-fahem-121a87270/",
      color: "hover:text-blue-600",
      followers: "500+",
    },
    {
      icon: <Github className="w-5 h-5" />,
      name: "GitHub",
      href: "https://github.com/OmaR-WezA",
      color: "hover:text-gray-600",
      followers: "200+",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        "service_9zzzxu8",
        "template_dedlyjq",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(), // لو عايز تبعت الوقت في الإيميل
        },
        "ij6NjLDQDzBJ2EhIQ"
      )
      toast.success("✅ Message sent! I’ll contact you within 24 hours.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      toast.error("❌ Failed to send message. Try again or contact me directly.")
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block mb-4" whileHover={{ scale: 1.05 }}>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              📞 Get In Touch
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to bring your ideas to life? Whether you need a full-stack developer, creative solutions, or AI
            innovations, I'm here to help make it happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-primary" />
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                I'm always excited about new opportunities, challenging projects, and meaningful collaborations. Whether
                you have a project in mind, need technical consultation, or just want to discuss innovative ideas, I'd
                love to hear from you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="block group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center text-white mx-auto mb-4`}
                        whileHover={{ rotate: 5 }}
                      >
                        {info.icon}
                      </motion.div>
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{info.title}</h4>
                      <p className="text-sm font-medium mb-1">{info.value}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Follow My Journey</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`group relative`}
                  >
                    <Card className="p-4 hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                      <div className="flex items-center space-x-3">
                        <div className={`text-muted-foreground ${social.color} transition-colors`}>{social.icon}</div>
                        <div>
                          <p className="font-medium text-sm">{social.name}</p>
                          <p className="text-xs text-muted-foreground">{social.followers} connections</p>
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-300">Available for Projects</p>
                      <p className="text-sm text-muted-foreground">Currently accepting new opportunities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's this about?"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project, ideas, or how we can work together..."
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 py-3 text-lg"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center">
                    I'll get back to you within 24 hours. For urgent matters, feel free to call directly.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
