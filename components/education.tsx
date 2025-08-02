"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"

const Education = () => {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Education</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <motion.div
                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <GraduationCap className="w-8 h-8" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-primary mb-2 md:mb-0">WE Applied Technology School</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Graduated: 2025
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Web Developement & Programming
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      Specializing in Computer Science and Information Technology with a focus on modern software
                      development practices, system administration, and emerging technologies. The program combines
                      theoretical knowledge with hands-on practical experience in real-world IT environments.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Training Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold mb-4 text-primary">Additional Training</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary/30 pl-4">
                    <h5 className="font-semibold">Ready for Tomorrow</h5>
                    <p className="text-sm text-muted-foreground mb-2">Life Makers • Feb 2025</p>
                    <p className="text-muted-foreground">
                      Focuses on integrating youth into the job market.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary/30 pl-4">
                    <h5 className="font-semibold">Telecom Egypt, Smart Village</h5>
                    <p className="text-sm text-muted-foreground mb-2">Dec 2023 – Jan 2024</p>
                    <p className="text-muted-foreground">
                      Intensive training in Data Center operations, FTTX Networks, and fiber welding techniques. Gained
                      insights into SDLC processes and integration of telecom and IT systems.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary/30 pl-4">
                    <h5 className="font-semibold">IT Training & Technical Experience</h5>
                    <p className="text-sm text-muted-foreground mb-2">Telecom Egypt (WE) • 2021 – 2024</p>
                    <p className="text-muted-foreground">
                      Completed a comprehensive 3-year technical training program, gaining expertise in
                      telecommunications infrastructure, networking, and IT support. Worked in live environments
                      including Data Center operations and fiber welding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
