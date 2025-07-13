
import { CalendarDays, Users, BookOpen, Atom, Sparkles } from 'lucide-react';

export interface FeatureCardData {
    icon: React.ElementType;
    title: string;
    description: string;
    link: string;
    gradient: string;
    buttonColor: string;
}

export const featuresData: FeatureCardData[] = [
    {
        icon: Users,
        title: 'Sanatan Social',
        description: 'A private community for devotees to connect, share, and support dharmic causes.',
        link: '/social',
        gradient: 'from-orange-500 to-amber-500',
        buttonColor: 'bg-gradient-to-r from-orange-500 to-amber-500'
    },
    {
        icon: CalendarDays,
        title: 'Bodha Calendar',
        description: 'A living archive of daily events, media, and discourses from all four Peethams.',
        link: '/events',
        gradient: 'from-purple-500 to-indigo-500',
        buttonColor: 'bg-gradient-to-r from-purple-500 to-indigo-500'
    },
    {
        icon: BookOpen,
        title: 'Reading Room',
        description: 'Immerse yourself in the timeless wisdom of Advaita Vedanta with our library of sacred texts.',
        link: '/reading',
        gradient: 'from-sky-500 to-cyan-500',
        buttonColor: 'bg-gradient-to-r from-sky-500 to-cyan-500'
    },
    {
        icon: Atom,
        title: 'Sādhanā Suite',
        description: 'Digital tools like a Japa counter and meditation timer to support your daily spiritual practice.',
        link: '/sadhana',
        gradient: 'from-emerald-500 to-green-500',
        buttonColor: 'bg-gradient-to-r from-emerald-500 to-green-500'
    }
];
