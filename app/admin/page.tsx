"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Key, Save, User, Info, Briefcase, Rocket, LogOut, Loader2, Plus, Trash2, ChevronRight, ChevronLeft, AlertTriangle, CheckCircle2, X } from "lucide-react"
import { toast } from "react-hot-toast"
import { updatePortfolioData, verifyAdminPassword } from "@/lib/actions/portfolio"
import initialData from "@/data/portfolio-data.json"
import { PortfolioData } from "@/types/portfolio"

interface ConfirmConfig {
    isOpen: boolean;
    title: string;
    message: string;
    type: "delete" | "save" | "add" | "logout" | "warning";
    onConfirm: () => void;
}

const ConfirmDialog = ({ config, onClose }: { config: ConfirmConfig, onClose: () => void }) => {
    if (!config.isOpen) return null;

    const colors = {
        delete: "bg-red-500/10 border-red-500/50 text-red-500",
        save: "bg-blue-500/10 border-blue-500/50 text-blue-500",
        add: "bg-green-500/10 border-green-500/50 text-green-500",
        logout: "bg-zinc-500/10 border-zinc-500/50 text-zinc-400",
        warning: "bg-red-600/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] text-red-500"
    };

    const icons = {
        delete: <Trash2 className="w-8 h-8" />,
        save: <Save className="w-8 h-8" />,
        add: <Plus className="w-8 h-8" />,
        logout: <LogOut className="w-8 h-8" />,
        warning: (
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                <AlertTriangle className="w-10 h-10" />
            </motion.div>
        )
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className={`p-6 flex flex-col items-center text-center space-y-4 border-b border-zinc-800 ${colors[config.type]}`}>
                        <div className="p-3 rounded-full bg-current/10">
                            {icons[config.type]}
                        </div>
                        <h3 className="text-xl font-bold text-white">{config.title}</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-zinc-400 text-center leading-relaxed">
                            {config.message}
                        </p>
                    </div>
                    <div className="p-4 bg-zinc-900/50 border-t border-zinc-800 flex gap-3">
                        <Button
                            variant="ghost"
                            className="flex-1 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`flex-1 font-semibold ${config.type === 'delete' ? 'bg-red-600 hover:bg-red-700' :
                                    config.type === 'warning' ? 'bg-red-600 hover:bg-red-700 animate-pulse' :
                                        config.type === 'save' ? 'bg-blue-600 hover:bg-blue-700' :
                                            config.type === 'add' ? 'bg-green-600 hover:bg-green-700' :
                                                'bg-primary hover:bg-primary/90'
                                }`}
                            onClick={() => {
                                config.onConfirm();
                                onClose();
                            }}
                        >
                            {config.type === 'warning' ? 'Confirm and Lose Changes' : 'Confirm'}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [syncMode, setSyncMode] = useState<"local" | "github">("github")
    const [data, setData] = useState<PortfolioData>(initialData as PortfolioData)
    const [lastSavedData, setLastSavedData] = useState<string>(JSON.stringify(initialData))
    const [confirm, setConfirm] = useState<ConfirmConfig>({
        isOpen: false,
        title: "",
        message: "",
        type: "save",
        onConfirm: () => { }
    })

    const openConfirm = (config: Omit<ConfirmConfig, "isOpen">) => {
        setConfirm({ ...config, isOpen: true })
    }

    const hasUnsavedChanges = JSON.stringify(data) !== lastSavedData

    // Warn on window close/refresh
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault()
                e.returnValue = ""
            }
        }
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [hasUnsavedChanges])

    // Check session on mount
    useEffect(() => {
        const session = localStorage.getItem("admin_session")
        if (session) {
            const { timestamp } = JSON.parse(session)
            const now = Date.now()
            const fiveMinutes = 5 * 60 * 1000

            if (now - timestamp < fiveMinutes) {
                setIsAuthenticated(true)
            } else {
                localStorage.removeItem("admin_session")
            }
        }
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoggingIn(true)
        try {
            const isValid = await verifyAdminPassword(password)
            if (isValid) {
                setIsAuthenticated(true)
                // Store session timestamp
                localStorage.setItem("admin_session", JSON.stringify({ timestamp: Date.now() }))
                setLastSavedData(JSON.stringify(data))
                toast.success("Welcome, Omar!")
            } else {
                toast.error("Invalid password")
            }
        } catch (error) {
            toast.error("Authentication error")
        } finally {
            setIsLoggingIn(false)
        }
    }

    const handleSave = async () => {
        const title = syncMode === "local" ? "Save Locally" : "Sync to GitHub"
        const message = syncMode === "local"
            ? "Save current changes to your local file system? This will update your local development data."
            : "Are you sure you want to push these changes to GitHub? This will trigger a redeploy of your live website."

        openConfirm({
            title,
            message,
            type: "save",
            onConfirm: async () => {
                setIsSaving(true)
                try {
                    const result = await updatePortfolioData(data, syncMode === "local")
                    if (result.success) {
                        toast.success(result.isLocal ? "Saved locally!" : "Portfolio updated on GitHub!")
                        localStorage.setItem("admin_session", JSON.stringify({ timestamp: Date.now() }))
                        setLastSavedData(JSON.stringify(data))
                    } else {
                        toast.error("Failed to update: " + result.error)
                    }
                } catch (error) {
                    toast.error("An error occurred")
                } finally {
                    setIsSaving(false)
                }
            }
        })
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <Card className="border-zinc-800 bg-zinc-900 shadow-2xl">
                        <CardHeader className="text-center space-y-1">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Key className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-white">Admin Access</CardTitle>
                            <CardDescription className="text-zinc-400">
                                Enter your password to manage your portfolio.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleLogin}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                        autoFocus
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full group" disabled={isLoggingIn}>
                                    {isLoggingIn ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            Login
                                            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">PortfoliEditor</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {process.env.NODE_ENV === "development" && (
                            <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                                <Button
                                    size="sm"
                                    variant={syncMode === "local" ? "secondary" : "ghost"}
                                    onClick={() => setSyncMode("local")}
                                    className="h-7 px-2 text-xs"
                                >
                                    Local
                                </Button>
                                <Button
                                    size="sm"
                                    variant={syncMode === "github" ? "secondary" : "ghost"}
                                    onClick={() => setSyncMode("github")}
                                    className="h-7 px-2 text-xs"
                                >
                                    GitHub
                                </Button>
                            </div>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-800 hover:bg-zinc-900"
                            onClick={() => {
                                const title = hasUnsavedChanges ? "Danger: Unsaved Changes" : "Sign Out"
                                const message = hasUnsavedChanges
                                    ? "You have unsaved changes! If you sign out now, all your edits will be permanently lost. Are you sure?"
                                    : "Are you sure you want to sign out and end your session?"
                                const type = hasUnsavedChanges ? "warning" : "logout"

                                openConfirm({
                                    title,
                                    message,
                                    type,
                                    onConfirm: () => {
                                        setIsAuthenticated(false)
                                        localStorage.removeItem("admin_session")
                                    }
                                })
                            }}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                        <Button size="sm" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    {syncMode === "local" ? "Save Locally" : "Save Changes"}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 mt-8">
                <div className="max-w-5xl mx-auto">
                    <Tabs defaultValue="hero" className="space-y-8">
                        <TabsList className="grid grid-cols-4 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                            <TabsTrigger value="hero" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                                <User className="w-4 h-4 mr-2" />
                                Hero
                            </TabsTrigger>
                            <TabsTrigger value="about" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                                <Info className="w-4 h-4 mr-2" />
                                About
                            </TabsTrigger>
                            <TabsTrigger value="experience" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                                <Briefcase className="w-4 h-4 mr-2" />
                                Exp
                            </TabsTrigger>
                            <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                                <Rocket className="w-4 h-4 mr-2" />
                                Work
                            </TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                            {/* HERO SECTION */}
                            <TabsContent value="hero">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <Card className="border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">
                                        <div className="h-2 w-full bg-gradient-to-r from-primary to-secondary" />
                                        <CardHeader>
                                            <CardTitle>Hero Section</CardTitle>
                                            <CardDescription>Manage your name, roles, and introduction.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Display Name</Label>
                                                    <Input
                                                        value={data.hero.name}
                                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, name: e.target.value } })}
                                                        className="bg-zinc-800 border-zinc-700"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Short Description</Label>
                                                <Textarea
                                                    value={data.hero.description}
                                                    onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                                                    className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-lg font-semibold">Roles</Label>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => {
                                                            openConfirm({
                                                                title: "Add Role",
                                                                message: "Are you sure you want to add a new role entry?",
                                                                type: "add",
                                                                onConfirm: () => {
                                                                    const newRoles = [...data.hero.roles, "New Role"]
                                                                    setData({ ...data, hero: { ...data.hero, roles: newRoles } })
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" /> Add Role
                                                    </Button>
                                                </div>
                                                <div className="grid gap-3">
                                                    {data.hero.roles.map((role, idx) => (
                                                        <div key={idx} className="flex gap-2">
                                                            <Input
                                                                value={role}
                                                                onChange={(e) => {
                                                                    const newRoles = [...data.hero.roles]
                                                                    newRoles[idx] = e.target.value
                                                                    setData({ ...data, hero: { ...data.hero, roles: newRoles } })
                                                                }}
                                                                className="bg-zinc-800 border-zinc-700"
                                                            />
                                                            <Button
                                                                variant="destructive"
                                                                size="icon"
                                                                onClick={() => {
                                                                    openConfirm({
                                                                        title: "Delete Role",
                                                                        message: "Are you sure you want to delete this role?",
                                                                        type: "delete",
                                                                        onConfirm: () => {
                                                                            const newRoles = data.hero.roles.filter((_, i) => i !== idx)
                                                                            setData({ ...data, hero: { ...data.hero, roles: newRoles } })
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-4 border-t border-zinc-800">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-lg font-semibold">Social Links</Label>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => {
                                                            openConfirm({
                                                                title: "Add Social Link",
                                                                message: "Add a new social media or contact link to your hero section?",
                                                                type: "add",
                                                                onConfirm: () => {
                                                                    const newLinks = [...data.hero.socialLinks, { label: "New", href: "#", icon: "Link" }]
                                                                    setData({ ...data, hero: { ...data.hero, socialLinks: newLinks } })
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" /> Add Link
                                                    </Button>
                                                </div>
                                                <div className="grid gap-4">
                                                    {data.hero.socialLinks.map((link, idx) => (
                                                        <div key={idx} className="grid grid-cols-3 gap-2 items-end p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
                                                            <div className="space-y-2">
                                                                <Label className="text-xs">Label</Label>
                                                                <Input
                                                                    value={link.label}
                                                                    onChange={(e) => {
                                                                        const newLinks = [...data.hero.socialLinks]
                                                                        newLinks[idx].label = e.target.value
                                                                        setData({ ...data, hero: { ...data.hero, socialLinks: newLinks } })
                                                                    }}
                                                                    className="bg-zinc-800 border-zinc-700"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-xs">Href</Label>
                                                                <Input
                                                                    value={link.href}
                                                                    onChange={(e) => {
                                                                        const newLinks = [...data.hero.socialLinks]
                                                                        newLinks[idx].href = e.target.value
                                                                        setData({ ...data, hero: { ...data.hero, socialLinks: newLinks } })
                                                                    }}
                                                                    className="bg-zinc-800 border-zinc-700"
                                                                />
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <div className="flex-grow">
                                                                    <Label className="text-xs">Icon</Label>
                                                                    <Input
                                                                        value={link.icon}
                                                                        onChange={(e) => {
                                                                            const newLinks = [...data.hero.socialLinks]
                                                                            newLinks[idx].icon = e.target.value
                                                                            setData({ ...data, hero: { ...data.hero, socialLinks: newLinks } })
                                                                        }}
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    onClick={() => {
                                                                        openConfirm({
                                                                            title: "Delete Social Link",
                                                                            message: "Remove this social link from your portfolio?",
                                                                            type: "delete",
                                                                            onConfirm: () => {
                                                                                const newLinks = data.hero.socialLinks.filter((_, i) => i !== idx)
                                                                                setData({ ...data, hero: { ...data.hero, socialLinks: newLinks } })
                                                                            }
                                                                        })
                                                                    }}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>

                            {/* EXPERIENCE SECTION */}
                            <TabsContent value="experience">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={() => {
                                                openConfirm({
                                                    title: "Add Experience",
                                                    message: "Create a new professional experience entry?",
                                                    type: "add",
                                                    onConfirm: () => {
                                                        const newExp = {
                                                            title: "New Position",
                                                            company: "Company Name",
                                                            period: "2024 - Present",
                                                            location: "Remote",
                                                            description: ["Did awesome things"],
                                                            current: true
                                                        }
                                                        setData({ ...data, experience: [newExp, ...data.experience] })
                                                    }
                                                })
                                            }}
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> Add Experience
                                        </Button>
                                    </div>

                                    {data.experience.map((exp, idx) => (
                                        <Card key={idx} className="border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors">
                                            <CardHeader className="flex flex-row items-start justify-between">
                                                <div className="space-y-1">
                                                    <CardTitle>{exp.title}</CardTitle>
                                                    <CardDescription>{exp.company} • {exp.period}</CardDescription>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-zinc-500 hover:text-red-400"
                                                    onClick={() => {
                                                        openConfirm({
                                                            title: "Delete Experience",
                                                            message: "Are you sure you want to delete this experience entry? This action is permanent local-only until you sync.",
                                                            type: "delete",
                                                            onConfirm: () => {
                                                                const newExp = data.experience.filter((_, i) => i !== idx)
                                                                setData({ ...data, experience: newExp })
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Job Title</Label>
                                                        <Input
                                                            value={exp.title}
                                                            onChange={(e) => {
                                                                const newExp = [...data.experience]
                                                                newExp[idx].title = e.target.value
                                                                setData({ ...data, experience: newExp })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Company</Label>
                                                        <Input
                                                            value={exp.company}
                                                            onChange={(e) => {
                                                                const newExp = [...data.experience]
                                                                newExp[idx].company = e.target.value
                                                                setData({ ...data, experience: newExp })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Responsibilities (One per line)</Label>
                                                    <Textarea
                                                        value={exp.description.join("\n")}
                                                        onChange={(e) => {
                                                            const newExp = [...data.experience]
                                                            newExp[idx].description = e.target.value.split("\n")
                                                            setData({ ...data, experience: newExp })
                                                        }}
                                                        className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </motion.div>
                            </TabsContent>

                            {/* PROJECTS SECTION */}
                            <TabsContent value="projects">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-end">
                                        <Button
                                            onClick={() => {
                                                openConfirm({
                                                    title: "Add Project",
                                                    message: "Would you like to add a new project showcase to your portfolio?",
                                                    type: "add",
                                                    onConfirm: () => {
                                                        const newProject = {
                                                            id: Date.now(),
                                                            title: "New Project",
                                                            category: "Web Development",
                                                            description: "Short description",
                                                            longDescription: "Detailed description",
                                                            technologies: ["React"],
                                                            features: ["Responsive design"],
                                                            icon: "Zap",
                                                            color: "from-blue-500 to-indigo-600",
                                                            images: [],
                                                            demoUrl: "#",
                                                            githubUrl: "#",
                                                            status: "In Progress"
                                                        }
                                                        setData({ ...data, projects: [newProject, ...data.projects] })
                                                    }
                                                })
                                            }}
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> Add Project
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {data.projects.map((project, idx) => (
                                            <Card key={project.id} className="border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col">
                                                <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`} />
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-zinc-500 hover:text-red-400"
                                                            onClick={() => {
                                                                openConfirm({
                                                                    title: "Delete Project",
                                                                    message: "Are you sure you want to delete this project? This will remove all associated data and images from the display.",
                                                                    type: "delete",
                                                                    onConfirm: () => {
                                                                        const newProjects = data.projects.filter((_, i) => i !== idx)
                                                                        setData({ ...data, projects: newProjects })
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <CardDescription>{project.category}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4 flex-grow">
                                                    <div className="space-y-2">
                                                        <Label>Project Title</Label>
                                                        <Input
                                                            value={project.title}
                                                            onChange={(e) => {
                                                                const newProj = [...data.projects]
                                                                newProj[idx].title = e.target.value
                                                                setData({ ...data, projects: newProj })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="space-y-2">
                                                            <Label>Status</Label>
                                                            <Input
                                                                value={project.status}
                                                                onChange={(e) => {
                                                                    const newProj = [...data.projects]
                                                                    newProj[idx].status = e.target.value
                                                                    setData({ ...data, projects: newProj })
                                                                }}
                                                                className="bg-zinc-800 border-zinc-700"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Icon (Lucide name)</Label>
                                                            <Input
                                                                value={project.icon}
                                                                onChange={(e) => {
                                                                    const newProj = [...data.projects]
                                                                    newProj[idx].icon = e.target.value
                                                                    setData({ ...data, projects: newProj })
                                                                }}
                                                                className="bg-zinc-800 border-zinc-700"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Technologies (One per line)</Label>
                                                        <Textarea
                                                            value={project.technologies.join("\n")}
                                                            onChange={(e) => {
                                                                const newProj = [...data.projects]
                                                                newProj[idx].technologies = e.target.value.split("\n")
                                                                setData({ ...data, projects: newProj })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700 h-20"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Features (One per line)</Label>
                                                        <Textarea
                                                            value={project.features.join("\n")}
                                                            onChange={(e) => {
                                                                const newProj = [...data.projects]
                                                                newProj[idx].features = e.target.value.split("\n")
                                                                setData({ ...data, projects: newProj })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700 h-20"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="space-y-2">
                                                            <Label>Demo URL</Label>
                                                            <Input
                                                                value={project.demoUrl}
                                                                onChange={(e) => {
                                                                    const newProj = [...data.projects]
                                                                    newProj[idx].demoUrl = e.target.value
                                                                    setData({ ...data, projects: newProj })
                                                                }}
                                                                className="bg-zinc-800 border-zinc-700"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>GitHub URL</Label>
                                                            <Input
                                                                value={project.githubUrl}
                                                                onChange={(e) => {
                                                                    const newProj = [...data.projects]
                                                                    newProj[idx].githubUrl = e.target.value
                                                                    setData({ ...data, projects: newProj })
                                                                }}
                                                                className="bg-zinc-800 border-zinc-700"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Images (One per line)</Label>
                                                        <Textarea
                                                            value={project.images.join("\n")}
                                                            onChange={(e) => {
                                                                const newProj = [...data.projects]
                                                                newProj[idx].images = e.target.value.split("\n")
                                                                setData({ ...data, projects: newProj })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700 h-20"
                                                            placeholder="/img/project-1.png"
                                                        />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="pt-0 flex gap-2">
                                                    <Button variant="secondary" className="flex-grow" size="sm">
                                                        Edit Links & Images
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>
                            </TabsContent>

                            {/* ABOUT SECTION */}
                            <TabsContent value="about">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <Card className="border-zinc-800 bg-zinc-900 border-b-0 rounded-b-none">
                                        <CardHeader>
                                            <CardTitle>Highlights</CardTitle>
                                            <CardDescription>Major focus areas displayed as cards.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid gap-4">
                                                {data.about.highlights.map((h, hIdx) => (
                                                    <div key={hIdx} className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-800 space-y-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label>Title</Label>
                                                                <Input
                                                                    value={h.title}
                                                                    onChange={(e) => {
                                                                        const newH = [...data.about.highlights]
                                                                        newH[hIdx].title = e.target.value
                                                                        setData({ ...data, about: { ...data.about, highlights: newH } })
                                                                    }}
                                                                    className="bg-zinc-800 border-zinc-700"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label>Icon</Label>
                                                                <Input
                                                                    value={h.icon}
                                                                    onChange={(e) => {
                                                                        const newH = [...data.about.highlights]
                                                                        newH[hIdx].icon = e.target.value
                                                                        setData({ ...data, about: { ...data.about, highlights: newH } })
                                                                    }}
                                                                    className="bg-zinc-800 border-zinc-700"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Description</Label>
                                                            <Input
                                                                value={h.description}
                                                                onChange={(e) => {
                                                                    const newH = [...data.about.highlights]
                                                                    newH[hIdx].description = e.target.value
                                                                    setData({ ...data, about: { ...data.about, highlights: newH } })
                                                                }}
                                                                className="bg-zinc-800 border-zinc-700"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-zinc-800 bg-zinc-900 rounded-none border-b-0">
                                        <CardHeader>
                                            <CardTitle>Stats</CardTitle>
                                            <CardDescription>Numeric achievements and labels.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {data.about.stats.map((stat, sIdx) => (
                                                    <div key={sIdx} className="p-3 bg-zinc-800/30 rounded-lg border border-zinc-800 space-y-2">
                                                        <Label className="text-xs">Number</Label>
                                                        <Input
                                                            value={stat.number}
                                                            onChange={(e) => {
                                                                const newS = [...data.about.stats]
                                                                newS[sIdx].number = e.target.value
                                                                setData({ ...data, about: { ...data.about, stats: newS } })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700 h-8"
                                                        />
                                                        <Label className="text-xs">Label</Label>
                                                        <Input
                                                            value={stat.label}
                                                            onChange={(e) => {
                                                                const newS = [...data.about.stats]
                                                                newS[sIdx].label = e.target.value
                                                                setData({ ...data, about: { ...data.about, stats: newS } })
                                                            }}
                                                            className="bg-zinc-800 border-zinc-700 h-8"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-zinc-800 bg-zinc-900 rounded-t-none">
                                        <CardHeader>
                                            <CardTitle>Mission Statement</CardTitle>
                                            <CardDescription>The core philosophy displayed on your About page.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Title</Label>
                                                    <Input
                                                        value={data.about.mission.title}
                                                        onChange={(e) => setData({ ...data, about: { ...data.about, mission: { ...data.about.mission, title: e.target.value } } })}
                                                        className="bg-zinc-800 border-zinc-700"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Subtitle</Label>
                                                    <Input
                                                        value={data.about.mission.subtitle}
                                                        onChange={(e) => setData({ ...data, about: { ...data.about, mission: { ...data.about.mission, subtitle: e.target.value } } })}
                                                        className="bg-zinc-800 border-zinc-700"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Mission Description</Label>
                                                <Textarea
                                                    value={data.about.mission.description}
                                                    onChange={(e) => setData({ ...data, about: { ...data.about, mission: { ...data.about.mission, description: e.target.value } } })}
                                                    className="bg-zinc-800 border-zinc-700 min-h-[120px]"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>
                        </AnimatePresence>
                    </Tabs>
                </div>
            </main>

            <ConfirmDialog
                config={confirm}
                onClose={() => setConfirm({ ...confirm, isOpen: false })}
            />
        </div>
    )
}
