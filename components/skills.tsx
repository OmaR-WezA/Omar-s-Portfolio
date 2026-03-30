"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Server, Wrench, Palette, MessageSquare, Bug, Layout, FileCode2, Zap } from "lucide-react"

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
      skills: ["PHP", "Laravel", "Node.js", "Express.js"],
      color: "from-primary/80 to-primary/40",
    },
    {
      title: "Programming Language",
      icon: <FileCode2 className="w-6 h-6" />,
      skills: ["Python", "OOP", "Data Structure", "Algorithm"],
      color: "from-primary/80 to-primary/40",
    },
    {
      title: "Database & Data",
      icon: <Database className="w-6 h-6" />,
      skills: ["SQL", "MySQL", "MariaDB", "Algorithms"],
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
      title: "GUI Development",
      icon: <Layout className="w-6 h-6" />,
      skills: ["Tkinter"],
      color: "from-primary/70 to-primary/30",
    },
    {
      title: "Software Engineering",
      icon: <Bug className="w-6 h-6" />,
      skills: ["Testing", "Design Patterns", "SDLC", "Version Control"],
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Networking",
      icon: <Zap className="w-6 h-6" />,
      skills: ["Computer Network", "Network Topology", "CCNA"],
      color: "from-primary/70 to-primary/30",
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
    "CapCut",
    "Adope"
  ]

  // Don't Miss adding Soft skills.

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

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 mb-16 px-2">
          {skillCategories.map((category, index) => {
            let spans = "lg:col-span-4"
            if (index === 0 || index === 1) spans = "lg:col-span-6"
            else if (index >= 2 && index <= 7) spans = "lg:col-span-4"
            else if (index === 8 || index === 9) spans = "lg:col-span-6"

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={spans}
              >
                <Card className="h-full group border border-primary/10 bg-background/40 backdrop-blur-xl overflow-hidden relative hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
                  {/* Decorative Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, currentColor 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}
                  />

                  {/* Gradient Glow */}
                  <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${category.color} opacity-[0.08] blur-3xl group-hover:opacity-20 transition-all duration-700`} />

                  <CardContent className="p-6 h-full flex flex-col relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {category.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground/90">{category.title}</h3>
                        <div className={`h-0.5 w-8 bg-gradient-to-r ${category.color} rounded-full mt-1 opacity-50`} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + skillIndex * 0.02 }}
                          className="px-4 py-2 bg-primary/[0.03] hover:bg-primary/10 border border-primary/5 hover:border-primary/20 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-1 cursor-default text-muted-foreground hover:text-foreground"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
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
