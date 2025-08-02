"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Award, Users, Star } from "lucide-react"

const Volunteering = () => {
  const volunteerWork = [
    "Safir El-Tafawok – Technical Team Lead",
    "Special Olympics – Capable Heroes",
    "Iftar Campaigns with WE, Egyptian Food Bank, and Ministry of Communications",
    "15 Ramadan Global Event – El Matareya",
    "Tawer w Ghayer Program",
    "El Abakera Schools TV Competition – 2023",
    "GDG Workshops and Events – Egypt",
    "Ready for Tomorrow - Life Makers",
  ]

  const achievements = [
    {
      title: "International AI Conference Al-Forum",
      description:
        "Honored by H.E. Prime Minister Dr. Mostafa Madbouly and Minister of Youth and Sports Dr. Ashraf Sobhy",
      icon: <Award className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "WorldSkills International 2023",
      description: "Represented Egypt in Programming and Artificial Intelligence competition",
      icon: <Star className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "ICPC Competitive Programming",
      description: "Participated twice in the International Collegiate Programming Contest",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "EduTech Egypt Exhibition Finalist",
      description: "Selected as finalist in two consecutive editions under Prime Minister patronage",
      icon: <Heart className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Academic Excellence",
      description: "Ranked 3rd place in Cairo Governorate in Preparatory Certificate",
      icon: <Award className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
    },
  ]

  return (
    <section id="volunteering" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Volunteering & Awards</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Committed to community service and recognized for excellence in technology and academics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Volunteer Work */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white mr-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Volunteer Work</h3>
                </div>

                <div className="space-y-4">
                  {volunteerWork.map((work, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-muted-foreground">{work}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Awards & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white mr-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Awards & Achievements</h3>
                </div>

                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white mr-4 flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold mb-1">{achievement.title}</h4>
                        <p className="text-muted-foreground text-sm">{achievement.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card>
            <CardContent className="p-8">
              <h4 className="text-xl font-semibold mb-6 text-center">Additional Recognition</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h5 className="font-semibold mb-2">Pearson International Certification</h5>
                  <p className="text-muted-foreground text-sm">Level 3 training and certification</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h5 className="font-semibold mb-2">Ready For Tomorrow Program</h5>
                  <p className="text-muted-foreground text-sm">Life Makers Foundation participant</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Volunteering
