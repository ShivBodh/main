
import { Award, HeartHandshake, Sparkles, Users, Crown } from 'lucide-react';

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    condition: (value: any) => boolean;
}

export const badges: Badge[] = [
    { 
        id: 'quiz-master', 
        name: 'Quiz Master', 
        description: 'Awarded for scoring perfectly on the Peetham Knowledge Quiz.', 
        icon: Crown,
        condition: (score: number) => score >= 5
    },
    { 
        id: 'very-active', 
        name: 'Community Spark', 
        description: 'Awarded for being a frequent contributor to the community feed.', 
        icon: Sparkles,
        condition: (postCount: number) => postCount >= 1 // Low for demo
    },
    { 
        id: 'responsible', 
        name: 'Campaign Starter', 
        description: 'Awarded for initiating a dharmic campaign.', 
        icon: Award,
        condition: (campaignCount: number) => campaignCount >= 1 // Low for demo
    },
    { 
        id: 'socialist', 
        name: 'Mitra Connect', 
        description: 'Awarded for building a strong network of Mitras.', 
        icon: Users,
        condition: (mitraCount: number) => mitraCount >= 2 // Low for demo
    },
    { 
        id: 'humankind', 
        name: 'Dharma Supporter', 
        description: 'Awarded for supporting community campaigns.', 
        icon: HeartHandshake,
        condition: (supportedCount: number) => supportedCount >= 1 // Low for demo
    }
];
