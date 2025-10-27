"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, Github, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppsHeader } from "@/components/apps/apps-header"
import { UpdatesList } from "@/components/apps/updates-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "@/components/theme-provider"

// تابع للتحقق إذا كانت أيقونة صورة
const isImage = (icon: string) => /\.(png|jpe?g|gif|ico|svg)$/i.test(icon)

interface AppDetailsPageProps {
    params: {
        id: string
    }
}

export default function AppDetailsPage({ params }: AppDetailsPageProps) {
    const [downloadingPlatform, setDownloadingPlatform] = useState<string | null>(null)

    const apps: Record<string, any> = {
        "weza-whatsapp-sender": {
            id: "weza-whatsapp-sender",
            name: "Weza WhatsApp Sender",
            description: "Automated WhatsApp messaging tool with Excel import, message templates, and delivery tracking",
            icon: "/img/icon/icon.ico",
            color: "from-green-500 to-teal-500",
            status: "active",
            version: "1.0.1",
            downloads: "—",
            rating: 4.7,
            link: "https://drive.google.com/file/d/12C_aNUpagoRwcGyN4XwzPXToW69nniDK/view?usp=drive_link",
            github: "",
            longDescription:
                "Weza WhatsApp Sender is a powerful tool to automate WhatsApp messages, import contacts from Excel, use templates, and track delivery status.",
            features: [
                "Automated WhatsApp messaging",
                "Excel contact import",
                "Message templates",
                "Delivery tracking",
                "Supports multiple devices",
                "Customizable scheduling",
            ],
            platforms: [
                { name: "Windows", icon: "🪟", size: "52 MB", url: "https://drive.google.com/file/d/12C_aNUpagoRwcGyN4XwzPXToW69nniDK/view?usp=drive_link" },
                { name: "Web", icon: "🌐", size: "Online", url: "https://omarportfolios.vercel.app/apps/weza-whatsapp-sender" },
            ],
            updates: [
                {
                    version: "1.0.1",
                    date: "2025-10-27",
                    changes: ["Added multi-device support"],
                },
                {
                    version: "1.0.0",
                    date: "2025-10-25",
                    changes: ["Initial release"],
                },
            ],
        },
        // "task-master": {
        //     id: "task-master",
        //     name: "Task Master",
        //     description: "Smart task management app with productivity tracking and notifications",
        //     icon: "✓",
        //     color: "from-blue-500 to-cyan-500",
        //     status: "active",
        //     version: "2.1.0",
        //     downloads: "15.2K",
        //     rating: 4.8,
        //     link: "",
        //     github: "",
        //     longDescription: "Task Master is a comprehensive task management solution designed for professionals and teams. It features intelligent task organization, real-time collaboration, productivity analytics, and seamless integration with popular tools.",
        //     features: [
        //         "Smart task organization with AI-powered suggestions",
        //         "Real-time team collaboration", "Advanced productivity analytics",
        //         "Dark mode support",
        //         "Cross-platform synchronization",
        //         "Offline mode support",
        //         "Custom notifications and reminders",
        //         "Integration with Slack, Teams, and more",
        //     ],
        //     platforms: [
        //         { name: "Windows", icon: "🪟", size: "125 MB", url: "" },
        //         { name: "macOS", icon: "🍎", size: "98 MB", url: "" },
        //         { name: "Linux", icon: "🐧", size: "110 MB", url: "" },
        //         { name: "iOS", icon: "📱", size: "45 MB", url: "" },
        //         { name: "Android", icon: "🤖", size: "52 MB", url: "" },
        //         { name: "Web", icon: "🌐", size: "Online", url: "" },
        //     ],
        //     updates: [
        //         {
        //             version: "2.1.0", date: "2025-10-20", changes: ["Added team collaboration features", "40% performance improvement", "Fixed UI bugs"],
        //         },
        //         {
        //             version: "2.0.5", date: "2025-10-10", changes: ["Added dark mode", "Improved user experience", "Fixed compatibility issues"],
        //         },
        //         {
        //             version: "2.0.0", date: "2025-09-15", changes: ["Complete UI redesign", "Added notification system", "Multi-language support"],
        //         },
        //     ],
        // },
        "api-monitor": {
            id: "api-monitor",
            name: "API Monitor",
            description: "API monitoring tool with real-time alerts and detailed reports",
            icon: "📊",
            color: "from-orange-500 to-red-500",
            status: "beta",
            version: "1.0.0-beta.3",
            downloads: "—",
            rating: 4.5,
            link: "",
            github: "",
            longDescription:
                "API Monitor is a real-time monitoring solution for APIs and web services. Track uptime, performance metrics, and receive instant alerts when issues occur.",
            features: [
                "Real-time API monitoring",
                "Uptime tracking and reporting",
                "Performance metrics and analytics",
                "Custom alert rules",
                "Multi-channel notifications",
                "Historical data analysis",
                "API endpoint testing",
                "Team collaboration features",
            ],
            platforms: [
                { name: "Web Dashboard", icon: "🌐", size: "Online", url: "" },
                { name: "Docker", icon: "🐳", size: "150 MB", url: "" },
                { name: "CLI Tool", icon: "⌨️", size: "15 MB", url: "" },
                { name: "Mobile App", icon: "📱", size: "38 MB", url: "" },
            ],
            updates: [
                {
                    version: "1.0.0-beta.3",
                    date: "2025-10-19",
                    changes: ["Enhanced dashboard", "Improved alert system", "Fixed connection errors"],
                },
                {
                    version: "1.0.0-beta.2",
                    date: "2025-10-08",
                    changes: ["Added reporting feature", "Performance improvements", "New UI"],
                },
            ],
        },
    }

    const app = apps[params.id]

    if (!app) {
        return (
            <div className="min-h-screen bg-background">
                <AppsHeader />
                <main className="container mx-auto px-4 py-12">
                    <Link href="/apps">
                        <Button variant="ghost" className="mb-8 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Apps
                        </Button>
                    </Link>
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold mb-4">App not found</h1>
                        <p className="text-muted-foreground mb-6">The application you're looking for doesn't exist.</p>
                        <Link href="/apps">
                            <Button>View All Apps</Button>
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    const handleDownload = (platform: string, url: string) => {
        setDownloadingPlatform(platform)
        setTimeout(() => {
            window.open(url, "_blank")
            setDownloadingPlatform(null)
        }, 500)
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background">
                <AppsHeader />

                <main className="container mx-auto px-4 py-12">
                    <Link href="/apps">
                        <Button variant="ghost" className="mb-8 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Apps
                        </Button>
                    </Link>

                    {/* App Header */}
                    <div className="mb-12 space-y-6">
                        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className={`p-4 rounded-lg bg-gradient-to-br ${app.color} text-white flex items-center justify-center`}
                                        style={{ width: 96, height: 96 }}
                                    >
                                        {isImage(app.icon) ? (
                                            <img src={app.icon} alt={app.name} className="w-16 h-16 object-contain" />
                                        ) : (
                                            <span className="text-6xl">{app.icon}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold mb-2">{app.name}</h1>
                                        <Badge variant={app.status === "active" ? "default" : "secondary"}>
                                            {app.status === "active" ? "Active" : "Beta"}
                                        </Badge>
                                    </div>
                                </div>
                                <p className="text-lg text-muted-foreground mb-4">{app.description}</p>
                                <p className="text-base text-muted-foreground">{app.longDescription}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="p-4">
                                <p className="text-sm text-muted-foreground mb-1">Version</p>
                                <p className="text-2xl font-bold">{app.version}</p>
                            </Card>
                            <Card className="p-4">
                                <p className="text-sm text-muted-foreground mb-1">Rating</p>
                                <p className="text-2xl font-bold">{app.rating} ⭐</p>
                            </Card>
                            <Card className="p-4">
                                <p className="text-sm text-muted-foreground mb-1">Downloads</p>
                                <p className="text-2xl font-bold">{app.downloads}</p>
                            </Card>
                            <Card className="p-4">
                                <p className="text-sm text-muted-foreground mb-1">Status</p>
                                <p className="text-2xl font-bold">{app.status === "active" ? "Active" : "Beta"}</p>
                            </Card>
                        </div>

                        {/* Visit App & Source Code */}
                        <div className="flex gap-4 flex-wrap">
                            <Button
                                asChild={!!app.link}
                                size="lg"
                                className={`gap-2 ${!app.link ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!app.link}
                            >
                                {app.link ? (
                                    <a href={app.link} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                        Visit App
                                    </a>
                                ) : (
                                    <>
                                        <ExternalLink className="h-4 w-4" />
                                        Visit App
                                    </>
                                )}
                            </Button>

                            <Button
                                asChild={!!app.github}
                                variant="outline"
                                size="lg"
                                className={`gap-2 bg-transparent ${!app.github ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!app.github}
                            >
                                {app.github ? (
                                    <a href={app.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-4 w-4" />
                                        Source Code
                                    </a>
                                ) : (
                                    <>
                                        <Github className="h-4 w-4" />
                                        Source Code
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="downloads" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="downloads">Downloads</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="updates">Updates</TabsTrigger>
                        </TabsList>

                        {/* Downloads Tab */}
                        <TabsContent value="downloads" className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Download {app.name}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {app.platforms.map((platform: any, index: number) => (
                                        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <p className="text-3xl mb-2">{platform.icon}</p>
                                                    <h3 className="text-lg font-bold">{platform.name}</h3>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-4">{platform.size}</p>
                                            <Button
                                                onClick={() => handleDownload(platform.name, platform.url)}
                                                disabled={!platform.url || downloadingPlatform === platform.name}
                                                className="w-full gap-2"
                                            >
                                                {downloadingPlatform === platform.name ? (
                                                    <>
                                                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                                                        Downloading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download className="h-4 w-4" />
                                                        Download
                                                    </>
                                                )}
                                            </Button>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Features Tab */}
                        <TabsContent value="features" className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {app.features.map((feature: string, index: number) => (
                                        <Card key={index} className="p-4 flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm">{feature}</p>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Updates Tab */}
                        <TabsContent value="updates" className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Updates & Releases</h2>
                                <UpdatesList updates={app.updates} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </ThemeProvider>
    )
}
