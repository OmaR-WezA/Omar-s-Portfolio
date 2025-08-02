"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

const Experience = () => {
  const experiences = [
    {
      title: "Founder & Full Stack Developer",
      company: "Weza Production",
      period: "Present",
      location: "Free Lance",
      description: [
        "Founded and currently leading Weza Production – a creative media company specializing in video production, branding, and platform hosting",
        "Developed and deployed the company’s full-stack web platform using Laravel and React",
        "Implemented admin dashboard to manage services, orders, and pricing packages",
        "Oversaw hosting, database management (MySQL), and technical team coordination",
      ],
      current: true,
    },
    {
      title: "IT Technical Support – Team Lead",
      company: "Ministry of Youth and Sports via Kayani Organization",
      period: "Apr 2024 - Aug 2025",
      location: "Cairo, Egypt",
      description: [
        "Lead technical team in designing and developing the organization's website",
        "Manage full-stack development processes and ensure seamless integration",
        "Coordinate with stakeholders to align functionality with organizational goals",
        "Oversee technical infrastructure and system maintenance",
      ],
      current: false,
    },
    {
      title: "IT Help Desk & Cashier",
      company: "Community Restaurant BRGR",
      period: "May 2024 – Sep 2024",
      location: "Cairo, Egypt",
      description: [
        "Managed POS systems and resolved IT-related issues in fast-paced environment",
        "Ensured smooth operation of restaurant IT systems",
        "Enhanced operational efficiency through technical problem-solving",
        "Provided customer service while maintaining technical systems",
      ],
      current: false,
    },
    {
      title: "IT Training & Technical Experience",
      company: "Telecom Egypt (WE)",
      period: "2021 – 2024",
      location: "Cairo, Egypt",
      description: [
        "Completed comprehensive 3-year technical training program",
        "Gained expertise in telecommunications infrastructure and networking",
        "Worked in live environments including Data Center operations",
        "Developed practical skills in FTTX networks and fiber welding",
        "Enhanced problem-solving abilities under Ministry of Communications",
      ],
      current: false,
    },
  ]

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Work Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                <Card
                  className={`ml-0 md:ml-20 hover:shadow-lg transition-all duration-300 ${exp.current ? "ring-2 ring-primary/20" : ""}`}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-2xl font-bold text-primary mb-2">{exp.title}</h3>
                        <h4 className="text-lg font-semibold text-foreground mb-2">{exp.company}</h4>
                        {exp.current && (
                          <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                            Current Position
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col lg:items-end text-muted-foreground">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-primary/60 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
