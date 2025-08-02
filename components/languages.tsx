"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

const Languages = () => {
  const languages = [
    {
      language: "Arabic",
      level: "Native",
      proficiency: 100,
      description: "Native speaker with full fluency in reading, writing, and speaking",
      flag: "🇪🇬",
    },
    {
      language: "English",
      level: "B2 (Upper Intermediate)",
      proficiency: 80,
      description: "Strong professional proficiency in technical communication and documentation",
      flag: "🇺🇸",
    },
    {
      language: "Italian",
      level: "Beginner",
      proficiency: 25,
      description: "Basic conversational skills and fundamental grammar understanding",
      flag: "🇮🇹",
    },
  ]

  return (
    <section id="languages" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Languages</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Multilingual communication skills enabling effective collaboration in diverse environments.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {lang.flag}
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                      {lang.language}
                    </h3>

                    <div className="mb-4">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {lang.level}
                      </span>
                    </div>

                    {/* Proficiency Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Proficiency</span>
                        <span className="text-sm text-muted-foreground">{lang.proficiency}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.proficiency}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">{lang.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Communication Skills Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white mr-4">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold">Global Communication</h3>
                    <p className="text-muted-foreground">Bridging cultures through technology</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  My multilingual abilities enable me to work effectively with international teams, understand diverse
                  user requirements, and create solutions that resonate across different cultural contexts. This
                  linguistic diversity enhances my ability to communicate complex technical concepts to varied
                  audiences.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Languages
