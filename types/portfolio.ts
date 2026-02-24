export interface HeroData {
    name: string;
    roles: string[];
    description: string;
    socialLinks: {
        label: string;
        href: string;
        icon: string;
    }[];
}

export interface AboutHighlight {
    title: string;
    description: string;
    icon: string;
    color: string;
}

export interface AboutStat {
    number: string;
    label: string;
    color: string;
}

export interface AboutData {
    highlights: AboutHighlight[];
    stats: AboutStat[];
    mission: {
        title: string;
        subtitle: string;
        description: string;
    };
}

export interface ExperienceData {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string[];
    current: boolean;
    isBusiness?: boolean;
}

export interface ProjectData {
    id: number;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    technologies: string[];
    layoutSections?: string[];
    features: string[];
    icon: string;
    color: string;
    images: string[];
    demoUrl: string;
    githubUrl: string;
    status: string;
}

export interface PortfolioData {
    hero: HeroData;
    about: AboutData;
    experience: ExperienceData[];
    projects: ProjectData[];
}
