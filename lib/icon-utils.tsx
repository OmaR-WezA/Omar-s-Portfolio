import {
    Shield, Trophy, Zap, Leaf, Sun, Wrench, Linkedin, Github, Mail, Phone,
    Code, Video, Lightbulb, Users, Award, MessageSquare, Rocket, Cpu, Terminal,
    Database, Server, Globe, Smartphone, Layers, Monitor, Cloud, Activity,
    HardDrive, Wifi, Layout, Palette, Star, Link
} from "lucide-react";
import Image from "next/image";

export const getIcon = (iconName: string, className?: string) => {
    const icons: Record<string, any> = {
        Shield,
        Trophy,
        Zap,
        Leaf,
        Sun,
        Wrench,
        Linkedin,
        Github,
        Mail,
        Phone,
        Code,
        Video,
        Lightbulb,
        Users,
        Award,
        MessageSquare,
        Rocket,
        Cpu,
        Terminal,
        Database,
        Server,
        Globe,
        Smartphone,
        Layers,
        Monitor,
        Cloud,
        Activity,
        HardDrive,
        Wifi,
        Layout,
        Palette,
        Star,
        Link
    };

    // If it's a path to an image (e.g., .ico, .png)
    if (iconName && iconName.match(/\.(png|jpg|jpeg|ico|svg)$/i)) {
        return (
            <div className="relative w-full h-full">
                <Image src={iconName} alt="Icon" fill className="object-contain" />
            </div>
        );
    }

    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
};
