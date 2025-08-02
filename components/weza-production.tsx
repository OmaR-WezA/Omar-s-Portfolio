"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Video, Palette, Globe, Award, Users, Zap, ExternalLink, Play, ImageIcon } from "lucide-react"
import SimpleImageSlider from "./Slider"
import AutoImageSlider from "./Slider"
import { achievements } from "./achievementsData"

const WezaProduction = () => {
  const services = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Production",
      description: "Professional video creation, filming, and editing services for events and marketing",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Event Photography",
      description: "Comprehensive event coverage with high-quality photography and documentation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Poster & Branding Design",
      description: "Creative visual identity design, posters, and branding materials",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "School Branding",
      description: "Specialized branding solutions for educational institutions and academic events",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website Hosting & Management",
      description: "Complete web hosting solutions with ongoing maintenance and management",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section id="weza" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block mb-6" whileHover={{ scale: 1.05 }}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white"
                whileHover={{ rotate: 5 }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-bold">Weza Production</h2>
                <p className="text-primary font-semibold">Digital Media Start-Up</p>
              </div>
            </div>
          </motion.div>

          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />

          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Founded and leading <span className="text-primary font-semibold">Weza Production</span>, a dynamic digital
            media and creative services start-up operating on an innovative on-demand freelance model. We deliver
            comprehensive creative solutions that bring visions to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white mx-auto mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>

                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white mr-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Award className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">Key Achievement</h3>
                      <p className="text-muted-foreground">Major Project Success</p>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold mb-4">School League Tournament - Complete Media Coverage</h4>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Successfully delivered comprehensive media and digital coverage for the School League Tournament at
                    WE Applied Technology School, showcasing our full-service capabilities.
                  </p>

                  <div className="space-y-3 mb-8">
                    {achievements[0].details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        <span className="text-muted-foreground">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {/* View Project */}
                    {achievements[0].projectUrl ? (
                      <a href={achievements[0].projectUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </a>
                    ) : (
                      <Button disabled className="bg-muted text-muted-foreground cursor-not-allowed">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}

                    {/* Watch Highlights */}
                    {achievements[0].videoUrl ? (
                      <a href={achievements[0].videoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-primary/20 hover:bg-primary/10 bg-transparent">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Highlights
                        </Button>
                      </a>
                    ) : (
                      <Button disabled variant="outline" className="text-muted-foreground cursor-not-allowed">
                        <Play className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}
                  </div>


                </div>

                {/* Visual */}
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-8">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >

                    {/* <div className="w-64 h-48 bg-background/20 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-16 h-16 text-primary/60 mx-auto mb-4" />
                        <p className="text-primary/80 font-medium">Tournament Coverage</p>
                        <p className="text-primary/60 text-sm">Media Gallery</p>
                      </div>
                    </div> */}

                    <AutoImageSlider />

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Video className="w-4 h-4 text-white" />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary rounded-full flex items-center justify-center"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Model */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto border-0 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Zap className="w-8 h-8" />
                </motion.div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold">On-Demand Creative Solutions</h3>
                  <p className="text-muted-foreground">Flexible Freelance Model</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Weza Production operates on an innovative on-demand model, providing flexible, high-quality creative
                services tailored to each client's unique needs. Our approach combines entrepreneurial agility with
                professional excellence.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Flexible", desc: "Adaptable to project needs" },
                  { title: "Professional", desc: "High-quality deliverables" },
                  { title: "Innovative", desc: "Creative problem solving" },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default WezaProduction
