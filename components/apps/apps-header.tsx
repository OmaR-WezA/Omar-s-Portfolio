"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function AppsHeader() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="border-b border-border bg-card">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
                    <motion.div
                        className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg"
                        whileHover={{ rotate: 5 }}
                    >
                        O
                    </motion.div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            Omar Fahem
                        </h1>
                        <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6">
                    <Link href="/" className="text-muted-foreground hover:text-foreground transition">
                        Home
                    </Link>
                    <Link href="/apps" className="text-foreground font-semibold">
                        Apps
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-card border-t border-border"
                    >
                        <div className="flex flex-col px-4 py-4 space-y-2">
                            <Link href="/" className="text-muted-foreground hover:text-foreground transition py-2">
                                Home
                            </Link>
                            <Link href="/apps" className="text-foreground font-semibold py-2">
                                Apps
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}
