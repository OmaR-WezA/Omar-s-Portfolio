"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Shield, Trophy, Zap, Leaf, Sun, Play, X, ChevronLeft, ChevronRight, Wrench } from "lucide-react"

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const statusColors = {
    "Completed": "bg-green-500/90 text-white",
    "In Progress": "bg-blue-500/90 text-white",
    "Pending": "bg-orange-500/90 text-white",
    "Draft": "bg-gray-500/90 text-white",
    "Planned": "bg-purple-500/90 text-white",
    "Innovation Award Winner": "bg-yellow-500/90 text-white",
    "Open Source": "bg-emerald-500/90 text-white",
    "Private": "bg-zinc-700 text-white",
  }

  const projects = [
    {
      id: 1,
      title: "Berimbolo Security Website",
      category: "Web Development",
      description: "Full-stack secure website focused on performance and responsive design.",
      longDescription:
        "Developed a comprehensive security-focused website with emphasis on performance optimization and responsive design. The project features advanced security measures, optimized loading times, and a modern user interface that adapts seamlessly across all devices. Built with modern web technologies and following security best practices.",
      technologies: ["React", "Laravel", "MySQL", "Bootstrap"],
      layoutSections: ["Home", "Services", "Products", "Cart", "Contact"],

      features: [
        "Advanced security implementation with encryption",
        "Performance optimization and caching",
        "Responsive design across all devices",
        "Modern UI/UX with smooth animations",
        "Database integration with secure queries",
        "Admin dashboard with role management",
      ],
      icon: <Shield className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      images: [
        "/img/Berimbolo-Security/Home.png",
        "/img/Berimbolo-Security/Service.png",
        "/img/Berimbolo-Security/Services.png",
        "/img/Berimbolo-Security/Products.png",
        "/img/Berimbolo-Security/Cart.png",
        "/img/Berimbolo-Security/CheckOut.png",
      ],
      demoUrl: "https://berimbolo-security-liart.vercel.app/",
      githubUrl: "https://github.com/OmaR-WezA/berimbolo-security",
      status: "Completed",
    },
    {
      id: 2,
      title: "Tournament Scoring System",
      category: "Web Application",
      description: "Real-time scoring system for university competitions with automated calculations.",
      longDescription:
        "Built a comprehensive real-time scoring system for university competitions featuring automated calculations, live updates, and interactive user interface. The system handles multiple tournament formats, provides real-time analytics, and includes comprehensive admin controls for tournament management.",
      technologies: ["PHP", "MySQL"],
      layoutSections: ["Dashboard", "Manage Participants", "Scores", "Events", "Tournament Rankings", "Register", "Login", "Logout"],
      features: [
        "Real-time score updates with WebSocket",
        "Automated calculations and rankings",
        "Multiple tournament format support",
        "Live analytics dashboard",
        "User role management system",
        "Mobile-responsive interface",
      ],
      icon: <Trophy className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      images: [
        "/img/Tournament-Scoring-System/dashboard1.png",
        // "/img/Tournament-Scoring-System/Dashboard.jpg",
        "/img/Tournament-Scoring-System/Manage-Participants.jpg",
        "/img/Tournament-Scoring-System/Scores.jpg",
        "/img/Tournament-Scoring-System/Events.jpg",
        "/img/Tournament-Scoring-System/Tournament-Rankings.jpg",
        // "/img/Tournament-Scoring-System/Login.jpg",
      ],
      demoUrl: "https://system-weza.kesug.com/",
      githubUrl: "https://github.com/OmaR-WezA/Tournament-Scoring-Systems",
      status: "In Progress",
    },
    {
      id: 3,
      title: "School Tournament Website",
      category: "Web Platform",
      description: "Interactive platform to manage match schedules, scores, and engagement.",
      longDescription:
        "Created a dynamic platform for managing school tournaments with features for scheduling matches, tracking scores, and enhancing user engagement. The platform includes admin panels, student dashboards, real-time notifications, and comprehensive tournament management tools.",
      technologies: ["HTML", "Laravel", "JavaScript", "MySQL", "Bootstrap"],
      layoutSections: ["Home", "Standing", "Match Schedule", "Statistics", "Draw"],

      features: [
        "Match scheduling and management system",
        "Score tracking with live updates",
        "User engagement and notification system",
        "Comprehensive admin control panel",
        "Student and teacher dashboards",
        "Tournament bracket visualization",
      ],
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      images: [
        "/img/School-Tournament-Website/WE-League/Home.jpg",
        "/img/School-Tournament-Website/WE-League/Standing.jpg",
        "/img/School-Tournament-Website/WE-League/Schedule.jpg",
        "/img/School-Tournament-Website/WE-League/Statistics.jpg",
        "/img/School-Tournament-Website/WE-League/Draw.jpg",
      ],
      demoUrl: "https://we-league.vercel.app/",
      githubUrl: "https://github.com/OmaR-WezA/WE-League",
      status: "Completed",
    },
    {
      id: 4,
      title: "AgriTechZ",
      category: "AI Innovation",
      description: "AI-powered smart drip irrigation system – first of its kind in Egypt.",
      longDescription:
        "Developed an innovative AI-powered smart drip irrigation system, the first of its kind in Egypt. The system uses machine learning algorithms to optimize water usage, monitor soil conditions, and automate irrigation processes for maximum crop yield while conserving water resources.",
      technologies: ["C++", "IoT", "Sensors", "Arduino", "Data Analytics", "AI/ML"],
      layoutSections: ["Home", "About", "Services", "Gallery", "Control Panel"],
      features: [
        "AI-powered irrigation optimization algorithms",
        "Real-time soil moisture monitoring",
        "Automated watering schedule generation",
        "Water usage analytics and reporting",
        "Mobile app for remote monitoring",
        "Soil Moisture Sensor: Measures the water level in soil to decide if irrigation is needed or not",
        "Weather Temperature Sensor: Detects ambient temperature to adjust watering based on heat levels",
        "Weather Humidity Sensor: Monitors air humidity to help reduce unnecessary watering during humid conditions"
      ],
      icon: <Leaf className="w-6 h-6" />,
      color: "from-green-600 to-lime-500",
      images: [
        "/img/AgriTechz/Home.jpg",
        "/img/AgriTechz/About.jpg",
        "/img/AgriTechz/Services.jpg",
        "/img/AgriTechz/Gallery.jpg",
        "/img/AgriTechz/Control-Panel.jpg",

      ],
      demoUrl: "https://agritechz-tech.vercel.app/",
      githubUrl: "#",
      status: "Innovation Award Winner",
    },
    {
      id: 5,
      title: "SunBusters",
      category: "AI Innovation",
      description: "AI-based solar tracking system to optimize solar panel positioning and energy capture.",
      longDescription:
        "Designed an intelligent AI-based solar tracking system that optimizes solar panel positioning throughout the day to maximize energy capture. The system uses machine learning to predict optimal angles based on weather patterns, sun position, and historical data for enhanced efficiency.",
      technologies: ["C++", "Arduino", "Sensors", "IoT", "Data Analytics", "AI/ML"],
      features: [
        "AI-powered solar tracking algorithms",
        "Weather pattern prediction integration",
        "Energy optimization and efficiency monitoring",
        "Real-time positioning control system",
        "Performance analytics dashboard",
        "Predictive maintenance alerts",
      ],
      icon: <Sun className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      images: [
        "/img/SunBusters/model-3.jpg",
        "/img/SunBusters/model-2.jpg",
        "/img/SunBusters/model.jpg",

      ],
      demoUrl: "#",
      githubUrl: "#",
      status: "Innovation Award Winner",
    },
    {
      id: 6,
      title: "Dern-Support Platform",
      category: "Web Application",
      description: "Full-stack IT support platform for managing client tickets, assets, and reports.",
      longDescription:
        "Dern-Support is a full-stack platform developed for IT technical support companies. It includes features for managing client support tickets, tracking IT assets, generating performance reports, and streamlining internal communication. The system supports multiple user roles with secured authentication and admin controls. It aims to improve response time, customer satisfaction, and workflow automation for technical support teams.",
      technologies: ["Laravel", "React", "MySQL", "PHP", "Bootstrap", "JavaScript"],
      layoutSections: [
        "Home",
        "Client Dashboard",
        "Reports",
        "Support Tickets",
        "Asset Management",
        "Admin Panel",
        "Login/Register"
      ],
      features: [
        "Ticket creation, assignment, and status tracking",
        "Asset management with inventory system",
        "Real-time notifications and updates",
        "Admin dashboard with analytics and logs",
        "Multi-role authentication (Admin, Support, Client)",
        "Performance and issue reports generation",
        "Mobile-responsive and secure platform",
      ],
      icon: <Wrench className="w-6 h-6" />,
      color: "from-slate-500 to-gray-700",
      images: [
        "/img/Dern-Support/demo.png",
        "/img/Dern-Support/demo1.png",
        "/img/Dern-Support/demo2.png",
        "/img/Dern-Support/demo3.png",
        "/img/Dern-Support/logo.png",
      ],
      demoUrl: "#",
      githubUrl: "#",
      status: "Planned",
    },


  ]

  const categories = ["All", "Web Development", "Web Application", "Web Platform", "AI Innovation"]
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
    }
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div className="inline-block mb-4" whileHover={{ scale: 1.05 }}>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">🚀 My Work</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of innovative solutions spanning web development, AI applications, and cutting-edge technology
            implementations that make a real impact.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "bg-background border border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden border-0 bg-background/50 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}
                    >
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelectedProject(project)
                          setCurrentImageIndex(0)
                        }}
                        className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className={statusColors[project.status] || "bg-muted text-white"}
                      >
                        {project.status}
                      </Badge>

                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <motion.div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center text-white mr-3`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {project.icon}
                      </motion.div>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-muted rounded text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-muted rounded text-xs font-medium">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="absolute right-0 top-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <DialogTitle className="flex items-center gap-3 text-2xl pr-8">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedProject.color} flex items-center justify-center text-white`}
                    >
                      {selectedProject.icon}
                    </div>
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image Gallery */}
                  <div className="relative">
                    <div className="relative h-80 rounded-lg overflow-hidden">
                      <img
                        src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {selectedProject.images.length > 1 && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Image Indicators */}
                    {selectedProject.images.length > 1 && (
                      <div className="flex justify-center mt-4 space-x-2">
                        {selectedProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-primary" : "bg-muted"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Project Details */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Badge
                            variant="secondary"
                            className={statusColors[selectedProject.status] || "bg-muted text-white"}
                          >
                            {selectedProject.status}
                          </Badge>

                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${selectedProject.color} text-white`}
                          >
                            {selectedProject.category}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start text-muted-foreground"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technologies & Actions */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-2 bg-muted rounded-lg font-medium hover:bg-primary/10 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedProject?.layoutSections && (
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Layout Sections</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.layoutSections.map((section) => (
                              <span
                                key={section}
                                className="px-3 py-2 bg-muted rounded-lg font-medium hover:bg-secondary/10 transition-colors"
                              >
                                {section}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Project Links</h4>
                        <div className="flex flex-col gap-3">
                          {selectedProject.demoUrl && selectedProject.demoUrl !== "#" ? (
                            <Button className="w-full justify-start" asChild>
                              <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          ) : (
                            <Button disabled className="w-full justify-start opacity-70 cursor-not-allowed">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Coming Soon
                            </Button>
                          )}

                          {selectedProject.githubUrl && selectedProject.githubUrl !== "#" ? (
                            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Source Code
                              </a>
                            </Button>
                          ) : (
                            <Button disabled variant="outline" className="w-full justify-start bg-transparent opacity-70 cursor-not-allowed">
                              <Github className="w-4 h-4 mr-2" />
                              Coming Soon
                            </Button>
                          )}
                        </div>
                      </div>


                      {/* Project Stats */}
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-3">Project Impact</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          {/* Success Rate or Award */}
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {selectedProject.category === "AI Innovation" ? "1st" : "100%"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {selectedProject.category === "AI Innovation" ? "In Egypt" : "Success Rate"}
                            </div>
                          </div>

                          {/* Technologies Count */}
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {selectedProject.technologies.length}
                            </div>
                            <div className="text-xs text-muted-foreground">Technologies</div>
                          </div>

                          {/* Layouts Count */}
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              {selectedProject.layoutSections?.length || 0}
                            </div>
                            <div className="text-xs text-muted-foreground">Layouts</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default Projects
