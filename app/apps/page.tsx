"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppsHeader } from "@/components/apps/apps-header"
import { AppCard } from "@/components/apps/app-card"
import { ThemeProvider } from "@/components/theme-provider"

export default function AppsPage() {
    const apps = [
        {
            id: "weza-whatsapp-sender",
            "name": "Weza WhatsApp Sender",
            "description": "Automated WhatsApp messaging tool with Excel import, message templates, and delivery tracking",
            "icon": "/img/icon/icon.ico",
            "color": "from-green-500 to-teal-500",
            "status": "active",
            "version": "1.0.1",
            "downloads": "—",
            "rating": 4.7
        },
        // {
        //     id: "task-master",
        //     name: "Task Master",
        //     description: "Smart task management app with productivity tracking and notifications",
        //     icon: "✓",
        //     color: "from-blue-500 to-cyan-500",
        //     status: "active",
        //     version: "2.1.0",
        //     downloads: "15.2K",
        //     rating: 4.8,
        // },
        {
            id: "api-monitor",
            name: "API Monitor",
            description: "API monitoring tool with real-time alerts and detailed reports",
            icon: "📊",
            color: "from-orange-500 to-red-500",
            status: "beta",
            version: "1.0.0-beta.3",
            downloads: "—",
            rating: 4.5,
        },
    ]

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

            <div className="min-h-screen bg-background">
                <AppsHeader />

                <main className="container mx-auto px-4 py-12">
                    {/* Back Button */}
                    <Link href="/">
                        <Button variant="ghost" className="mb-8 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>

                    {/* Page Title */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-4">My Applications</h1>
                        <p className="text-lg text-muted-foreground">
                            A collection of applications and tools I've developed to improve productivity and workflow
                        </p>
                    </div>

                    {/* Apps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {apps.map((app) => (
                            <AppCard key={app.id} app={app} />
                        ))}
                    </div>
                </main>
            </div>
        </ThemeProvider >
    )

}
