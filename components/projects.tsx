"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Shield, Trophy, Zap, Leaf, Sun, Play, X, ChevronLeft, ChevronRight, Wrench } from "lucide-react"

import data from "@/data/portfolio-data.json"
import { ProjectData } from "@/types/portfolio"
import { getIcon } from "@/lib/icon-utils"

const projects = data.projects as ProjectData[]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const statusColors: Record<string, string> = {
    "Completed": "bg-green-500/90 text-white",
    "In Progress": "bg-blue-500/90 text-white",
    "Pending": "bg-orange-500/90 text-white",
    "Draft": "bg-gray-500/90 text-white",
    "Planned": "bg-purple-500/90 text-white",
    "Innovation Award Winner": "bg-yellow-500/90 text-white",
    "Open Source": "bg-primary/90 text-white",
    "Private": "bg-zinc-700 text-white",
  }

  const categories = ["All", "Web Development", "Web Application", "Web Platform", "AI Innovation", "GUI Application"]
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
          className="w-full relative mb-12 flex justify-center"
        >
          {/* Edge fade placeholders for mobile scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 md:hidden pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 md:hidden pointer-events-none" />

          {/* Scrollable Container */}
          <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center min-w-max justify-center md:justify-center px-4 md:px-0 auto-cols-max mx-auto py-2">
              <div className="flex bg-muted/40 p-1.5 rounded-full border border-border/30 backdrop-blur-sm gap-1 sm:gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-medium whitespace-nowrap transition-all duration-300 outline-none ${isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategory"
                          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-sm -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group h-full"
              >
                <Card
                  onClick={() => {
                    setSelectedProject(project)
                    setCurrentImageIndex(0)
                  }}
                  className="h-full flex flex-col hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] transition-all duration-500 cursor-pointer overflow-hidden bg-gradient-to-b from-background to-muted/20 border-border/40 hover:border-primary/50 rounded-3xl"
                >
                  <div className="relative p-2 md:p-3 pb-0">
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:rounded-[22px] bg-zinc-950/30">
                      <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <Image
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                        priority={index < 2}
                      />

                      {/* Play overlay for hover effect */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-80 transition-opacity duration-500 z-20 flex items-center justify-center`}>
                        <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-center gap-2 text-white">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <Play className="w-5 h-5 ml-1" />
                          </div>
                          <span className="font-medium text-sm">View Case Study</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 z-30 transform group-hover:-translate-y-2 opacity-100 group-hover:opacity-0 transition-all duration-300">
                        <Badge
                          variant="secondary"
                          className={`${statusColors[project.status] || "bg-muted text-white"} shadow-lg backdrop-blur-md border-0 py-1 px-3`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 md:p-8 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} shadow-lg shadow-${project.color.split(' ')[0].replace('from-', '')}/20 flex items-center justify-center text-white`}
                          whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                          {getIcon(project.icon, "w-6 h-6")}
                        </motion.div>
                        <span className="text-xs font-bold tracking-wider uppercase text-primary/80 bg-primary/10 px-3 py-1.5 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/50">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-muted/60 hover:bg-primary/20 hover:text-primary transition-colors rounded-lg text-xs font-semibold text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1.5 bg-muted/60 rounded-lg text-xs font-semibold text-muted-foreground">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-5xl w-[calc(100%-2rem)] sm:w-[90vw] max-h-[calc(100vh-2rem)] sm:max-h-[90vh] p-0 flex flex-col sm:block overflow-hidden sm:overflow-y-auto bg-background/95 backdrop-blur-3xl border-white/10 shadow-2xl gap-0 rounded-2xl mx-auto z-50 scrollbar-none sm:scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {selectedProject && (
              <>
                <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>
                <DialogDescription className="sr-only">{selectedProject.longDescription}</DialogDescription>

                {/* Custom Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-3 top-3 sm:right-4 sm:top-4 z-50 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/70 hover:text-white backdrop-blur-lg border border-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Hero Section */}
                <div className="relative w-full aspect-video flex-shrink-0 bg-zinc-950 flex items-center justify-center border-b border-white/5">
                  <Image
                    src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Slider Controls */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <div className="absolute top-1/2 left-3 md:left-8 -translate-y-1/2 flex items-center justify-between w-[calc(100%-1.5rem)] md:w-[calc(100%-4rem)] pointer-events-none">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevImage}
                          className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md border border-white/10 transition-all"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextImage}
                          className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md border border-white/10 transition-all"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </Button>
                      </div>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                        {selectedProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-primary w-6" : "bg-white/50 hover:bg-white/80"
                              }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-5 sm:p-6 md:p-8 flex-1 overflow-y-auto sm:overflow-visible sm:flex-none scrollbar-none">
                  <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 pb-8 sm:pb-0">

                    {/* Left Column (Details & Features) */}
                    <div className="lg:col-span-2 space-y-8 sm:space-y-10">

                      {/* Title & Badges (All viewport sizes) */}
                      <div className="flex flex-col mb-4 border-b border-border/50 pb-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              className={`${statusColors[selectedProject.status] || "bg-muted text-white"} px-2.5 py-1 text-xs font-semibold border-0`}
                            >
                              {selectedProject.status}
                            </Badge>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                              {selectedProject.category}
                            </span>
                          </div>

                          <div className={`flex w-12 h-12 rounded-xl bg-gradient-to-br ${selectedProject.color} shadow-lg items-center justify-center text-white transform rotate-3`}>
                            {getIcon(selectedProject.icon, "w-6 h-6")}
                          </div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
                          {selectedProject.title}
                        </h2>
                      </div>

                      <div>
                        <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-primary" />
                          Project Overview
                        </h4>
                        <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground flex items-center gap-2">
                          <Zap className="w-5 h-5 text-primary" />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {selectedProject.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-muted/40 border border-border/50">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary/80 rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                              <span className="text-muted-foreground text-sm sm:text-base font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (Tech & Actions) */}
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs sm:text-sm uppercase font-bold text-muted-foreground tracking-widest mb-3 sm:mb-4">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span key={tech} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-muted/80 border border-border/50 rounded-lg text-xs sm:text-sm font-semibold text-foreground shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedProject?.layoutSections && (
                        <div>
                          <h4 className="text-xs sm:text-sm uppercase font-bold text-muted-foreground tracking-widest mb-3 sm:mb-4">
                            Layouts
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.layoutSections.map((section) => (
                              <span key={section} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs sm:text-sm font-semibold shadow-sm">
                                {section}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Project Impact Stats */}
                      <div className="bg-gradient-to-br from-muted/50 to-muted/10 border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
                        <h4 className="text-[10px] sm:text-xs uppercase font-bold text-muted-foreground tracking-widest mb-3 sm:mb-4 text-center">Project Impact</h4>
                        <div className="grid grid-cols-3 gap-2 text-center divide-x divide-border/50">
                          <div>
                            <div className="text-lg sm:text-2xl font-black text-foreground">{selectedProject.category === "AI Innovation" ? "1st" : "100%"}</div>
                            <div className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase mt-1">{selectedProject.category === "AI Innovation" ? "In Egypt" : "Success"}</div>
                          </div>
                          <div>
                            <div className="text-lg sm:text-2xl font-black text-foreground">{selectedProject.technologies.length}</div>
                            <div className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase mt-1">Techs</div>
                          </div>
                          <div>
                            <div className="text-lg sm:text-2xl font-black text-foreground">{selectedProject.layoutSections?.length || 0}</div>
                            <div className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase mt-1">Layouts</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="space-y-3 pt-2 sm:pt-4 border-t border-border/50">
                        {selectedProject.demoUrl && selectedProject.demoUrl !== "#" ? (
                          <Button className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" asChild>
                            <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                              Live Demo
                            </a>
                          </Button>
                        ) : (
                          <Button disabled className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold opacity-50">
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                            Demo Coming Soon
                          </Button>
                        )}

                        {selectedProject.githubUrl && selectedProject.githubUrl !== "#" ? (
                          <Button variant="outline" className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-transparent backdrop-blur-sm border-border hover:bg-muted/50 transition-all" asChild>
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                              View Source
                            </a>
                          </Button>
                        ) : (
                          <Button disabled variant="outline" className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-transparent opacity-50">
                            <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                            Source Private
                          </Button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section >
  )
}

export default Projects
