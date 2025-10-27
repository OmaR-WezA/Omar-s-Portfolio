"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

interface App {
    id: string
    name: string
    description: string
    icon: string
    color: string
    status: string
    version: string
    downloads: string
    rating: number
}

interface AppCardProps {
    app: App
}

export function AppCard({ app }: AppCardProps) {

    // تابع صغير يتحقق إذا الـ icon صورة
    const isImage = (icon: string) => {
        return /\.(png|jpe?g|gif|ico|svg)$/i.test(icon)
    }

    return (
        <Link href={`/apps/${app.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <div className="p-6 space-y-4">
                    {/* Icon and Header */}
                    <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${app.color} text-white flex items-center justify-center`} style={{ width: 48, height: 48 }}>
                            {isImage(app.icon) ? (
                                <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain" />
                            ) : (
                                <span className="text-2xl">{app.icon}</span>
                            )}
                        </div>

                        <Badge variant={app.status === "active" ? "default" : "secondary"}>
                            {app.status === "active" ? "Active" : "Beta"}
                        </Badge>
                    </div>

                    {/* Title and Description */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">{app.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{app.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Version</p>
                            <p className="font-semibold">{app.version}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-semibold flex items-center gap-1">
                                {app.rating}
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Downloads</p>
                            <p className="font-semibold">{app.downloads}</p>
                        </div>
                    </div>

                    {/* Button */}
                    <Button className="w-full gap-2 group-hover:translate-x-1 transition-transform">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </Card>
        </Link>
    )
}
