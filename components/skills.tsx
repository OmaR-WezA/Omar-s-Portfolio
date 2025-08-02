"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Server, Wrench, Palette, MessageSquare, Bug, Layout } from "lucide-react"

const Skills = () => {
  const skillCategories = [
    {
      title: "Front-End Development",
      icon: <Code className="w-6 h-6" />,
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "React.js"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Back-End Development",
      icon: <Server className="w-6 h-6" />,
      skills: ["PHP", "Laravel", "Node.js", "Express.js", "Python", "OOP"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Database & Data",
      icon: <Database className="w-6 h-6" />,
      skills: ["SQL", "MySQL", "MariaDB", "Data Structures", "Algorithms"],
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Technical Support",
      icon: <Wrench className="w-6 h-6" />,
      skills: ["Troubleshooting", "POS Systems", "Networking", "System Maintenance", "Hardware"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Creative & Design",
      icon: <Palette className="w-6 h-6" />,
      skills: ["Adobe Premiere", "Photoshop", "Video Editing", "UI/UX Design"],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Soft Skills",
      icon: <MessageSquare className="w-6 h-6" />,
      skills: ["Communication", "Leadership", "Problem Solving", "Presentation Skills"],
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Software Engineering",
      icon: <Bug className="w-6 h-6" />,
      skills: ["Testing", "Design Patterns", "SDLC", "Version Control"],
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "GUI Development",
      icon: <Layout className="w-6 h-6" />,
      skills: ["Tkinter"],
      color: "from-teal-500 to-cyan-600",
    },
  ];



  const tools = [
    "VS Code",
    "PyCharm",
    "Git",
    "GitHub",
    "Microsoft Office",
    "Google Sheets",
    "Adobe Creative Suite",
    "Figma",
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Skills</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set spanning full-stack development, system administration, and creative technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mr-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="px-3 py-1 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 transition-colors duration-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools & Software */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">Tools & Software</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-primary/10 rounded-lg font-medium hover:bg-primary/20 transition-colors duration-200 cursor-default"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
