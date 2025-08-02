// achievementsData.tsx
import { Award } from "lucide-react"

export const achievements = [
    {
        title: "School League Tournament Coverage",
        description: "Complete media and digital coverage for WE Applied Technology School",
        details: [
            "Custom tournament website development",
            "Full branding and poster design suite",
            "Professional video coverage and editing",
            "Official event sponsorship",
        ],
        projectUrl: "https://we-league.vercel.app/",
        videoUrl: "https://youtu.be/s2Ucfdyha9g?si=wMU2MU_-2uNpEk1g", // أو سيبها فاضية لو لسه مش موجود
        icon: <Award className="w-8 h-8" />,
    },
    // تقدر تزود عناصر تانية بنفس الشكل لو عندك Achievements جديدة
]
