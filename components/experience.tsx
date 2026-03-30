"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

import data from "@/data/portfolio-data.json"
import { ExperienceData } from "@/types/portfolio"

const Experience = () => {
  const experiences = (data.experience as ExperienceData[]).sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;

    const getYear = (p: string) => {
      const match = p.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.period) - getYear(a.period);
  })

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
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">{exp.company}</h4>
                        {exp.current && (
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${exp.isBusiness ? "bg-primary/20 text-primary border border-primary/20 shadow-sm" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`}>
                            {exp.isBusiness ? "My Business" : "Current Position"}
                          </span>
                        )}
                        {exp.isProjectBased && (
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Project Based
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
