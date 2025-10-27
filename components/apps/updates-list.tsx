"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface Update {
    version: string
    date: string
    changes: string[]
}

interface UpdatesListProps {
    updates: Update[]
}

export function UpdatesList({ updates }: UpdatesListProps) {
    return (
        <div className="space-y-4">
            {updates.map((update, index) => (
                <Card key={index} className="p-6 border-l-4 border-l-primary hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4 flex-col md:flex-row gap-4">
                        <div>
                            <h3 className="text-lg font-bold">Version {update.version}</h3>
                            <p className="text-sm text-muted-foreground">
                                {new Date(update.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                        {index === 0 && <Badge className="bg-green-500 hover:bg-green-600">Latest</Badge>}
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">What's New:</p>
                        <ul className="space-y-2">
                            {update.changes.map((change, changeIndex) => (
                                <li key={changeIndex} className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{change}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            ))}
        </div>
    )
}
