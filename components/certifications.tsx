"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"

const Certifications = () => {
  const certifications = [
    {
      title: "Full-Stack Web Development Specialization",
      issuer: "Coursera (HKUST)",
      category: "Web Development",
      description: "Comprehensive full-stack development covering modern web technologies and best practices.",
    },
    {
      title: "Back-End Development (Laravel & PHP)",
      issuer: "Laracasts",
      category: "Backend",
      description: "Advanced Laravel framework and PHP development techniques.",
    },
    {
      title: "Database Management with MySQL",
      issuer: "Coursera (University of Michigan)",
      category: "Database",
      description: "Database design, optimization, and management with MySQL.",
    },
    {
      title: "JavaScript Advanced Concepts",
      issuer: "Udemy",
      category: "Frontend",
      description: "Advanced JavaScript concepts including ES6+, async programming, and modern patterns.",
    },
    {
      title: "Front-End Development",
      issuer: "Elzero Web School",
      category: "Frontend",
      description: "Modern front-end development with HTML5, CSS3, and JavaScript.",
    },
    {
      title: "Python Essentials & Intermediate",
      issuer: "SoloLearn",
      category: "Programming",
      description: "Python programming fundamentals and intermediate concepts.",
    },
    {
      title: "Networking Basics",
      issuer: "Cisco Skills for All",
      category: "Networking",
      description: "Fundamental networking concepts and protocols.",
    },
    {
      title: "Operating Systems & IT Fundamentals",
      issuer: "IBM / Cisco",
      category: "IT Support",
      description: "Core IT concepts, operating systems, and technical support.",
    },
    {
      title: "Ready for Tomorrow",
      issuer: "Life Makers",
      category: "Learning And Growing",
      description: "Focuses on integrating youth into the job market.",
    },
  ]

  const categoryColors = {
    "Web Development": "from-blue-500 to-cyan-500",
    Backend: "from-green-500 to-emerald-500",
    Database: "from-purple-500 to-violet-500",
    Frontend: "from-orange-500 to-red-500",
    Programming: "from-pink-500 to-rose-500",
    Networking: "from-indigo-500 to-blue-500",
    "IT Support": "from-yellow-500 to-orange-500",
    "Learning And Growing": "from-blue-500 to-green-500"

  }

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Certifications & Courses</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications and specialized courses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryColors[cert.category]} flex items-center justify-center text-white flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Award className="w-6 h-6" />
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="mb-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[cert.category]} text-white`}
                    >
                      {cert.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                    {cert.title}
                  </h3>

                  <p className="text-primary font-medium mb-3">{cert.issuer}</p>

                  <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Training Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white mr-4">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-primary">3-Year Experience Certificate</h3>
                  <p className="text-muted-foreground">Telecom Egypt (WE) - Continuous Practical Training</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Earned a comprehensive 3-year experience certificate from Telecom Egypt for continuous practical
                training in telecommunications infrastructure, networking, and IT support. This intensive program
                provided hands-on experience in live environments including Data Center operations and fiber welding
                techniques.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
