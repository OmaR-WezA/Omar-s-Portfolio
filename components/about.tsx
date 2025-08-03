"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Video, Lightbulb, Users, Award } from "lucide-react"

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full Stack Developer",
      description: "Expert in modern web technologies, from frontend React to backend Laravel and Python",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Creative Production",
      description: "Professional video editing and creative content production through Weza Production",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "AI Innovation",
      description: "Pioneering AI solutions in agriculture and renewable energy sectors in Egypt",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Leadership",
      description: "Leading technical teams and managing complex full-stack development projects",
      color: "from-orange-500 to-red-500",
    },
  ]

  const stats = [
    { number: "3+", label: "Years Experience", color: "text-blue-500" },
    { number: "20+", label: "Projects Completed", color: "text-green-500" },
    { number: "5+", label: "Technologies Mastered", color: "text-purple-500" },
    { number: "2", label: "AI Innovations", color: "text-orange-500" },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block mb-4" whileHover={{ scale: 1.05 }}>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">👨‍💻 About Me</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Passionate Developer &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Creative Entrepreneur
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I'm a <span className="text-primary font-semibold">Full Stack Web Developer</span> and{" "}
                <span className="text-primary font-semibold">Creative Entrepreneur</span> with a passion for building
                innovative digital solutions that make a real impact. Currently serving as IT Technical Support Team
                Lead at the Ministry of Youth and Sports, where I lead technical teams in developing organizational
                websites and digital infrastructure.
              </p>

              <p>
                My journey spans over 3 years of intensive training with Telecom Egypt, where I gained hands-on
                experience in telecommunications infrastructure, networking, and IT support. This foundation has
                equipped me with a unique perspective on both software development and systems administration.
              </p>

              <p>
                As the <span className="text-primary font-semibold">Founder of Weza Production</span>, I'm building a
                digital media start-up that delivers comprehensive creative services on an on-demand model. We've
                successfully handled major projects including complete media coverage for educational tournaments.
              </p>

              <p>
                I'm particularly proud of developing <span className="text-green-600 font-semibold">AgriTechZ</span> -
                the first AI-powered smart drip irrigation system in Egypt, and{" "}
                <span className="text-yellow-600 font-semibold">SunBusters</span> - an AI-based solar tracking system,
                both representing my commitment to using technology for meaningful environmental impact.
              </p>
            </div>

            <motion.div
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {["Problem Solver", "Team Leader", "AI Innovator", "Creative Thinker", "Video Editor"].map((trait, index) => (
                <motion.span
                  key={trait}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {trait}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${highlight.color} flex items-center justify-center text-white mx-auto mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {highlight.icon}
                    </motion.div>
                    <h4 className="font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                <motion.div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`} whileHover={{ scale: 1.1 }}>
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
            <CardContent className="p-8 lg:p-12 text-center">
              <motion.div className="flex items-center justify-center mb-6" whileHover={{ scale: 1.05 }}>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white mr-4">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold">My Mission</h3>
                  <p className="text-muted-foreground">Driving Innovation Forward</p>
                </div>
              </motion.div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                To bridge the gap between cutting-edge technology and real-world solutions, creating digital experiences
                that not only meet today's needs but anticipate tomorrow's challenges. Through continuous learning,
                creative problem-solving, and collaborative leadership, I strive to make technology more accessible and
                impactful for everyone.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default About
