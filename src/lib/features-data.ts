
import { CalendarDays, Users, BookOpen, Atom, Sparkles, Baby, Gamepad2, NotebookText } from 'lucide-react';

export interface FeatureCardData {
    icon: React.ElementType;
    title: string;
    description: string;
    link: string;
    accentColor: 'blue' | 'pink' | 'green' | 'orange' | 'purple' | 'cyan' | 'yellow';
}

export const featuresData: FeatureCardData[] = [
    {
        icon: Users,
        title: 'Sanatan Social',
        description: 'A private community for devotees to connect, share, and support dharmic causes.',
        link: '/social',
        accentColor: 'blue',
    },
    {
        icon: CalendarDays,
        title: 'Bodha Calendar',
        description: 'A living archive of daily events, media, and discourses from all four Peethams.',
        link: '/events',
        accentColor: 'pink',
    },
    {
        icon: BookOpen,
        title: 'Reading Room',
        description: 'Immerse yourself in the timeless wisdom of Advaita Vedanta with our library of sacred texts.',
        link: '/reading',
        accentColor: 'green',
    },
    {
        icon: Atom,
        title: 'Sādhanā Suite',
        description: 'Digital tools like a Japa counter and meditation timer to support your daily spiritual practice.',
        link: '/sadhana',
        accentColor: 'orange',
    },
    {
        icon: Baby,
        title: 'Vedic Name Finder',
        description: 'Discover auspicious baby names based on Vedic astrology principles like Rashi and Nakshatra Pada.',
        link: '/sadhana/vedic-name-finder',
        accentColor: 'cyan',
    },
    {
        icon: NotebookText,
        title: 'Digital Dainandini',
        description: 'A secure, private digital diary for your daily notes, tasks, and sketches, saved only on your device.',
        link: '/social?tab=dainandini',
        accentColor: 'yellow',
    }
];
