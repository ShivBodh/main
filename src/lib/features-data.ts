
import { CalendarDays, Users, BookOpen, Atom, Sparkles, Baby, Gamepad2, NotebookText } from 'lucide-react';

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
        gradient: 'bg-feature-social',
        buttonColor: 'bg-feature-social'
    },
    {
        icon: CalendarDays,
        title: 'Bodha Calendar',
        description: 'A living archive of daily events, media, and discourses from all four Peethams.',
        link: '/events',
        gradient: 'bg-feature-calendar',
        buttonColor: 'bg-feature-calendar'
    },
    {
        icon: BookOpen,
        title: 'Reading Room',
        description: 'Immerse yourself in the timeless wisdom of Advaita Vedanta with our library of sacred texts.',
        link: '/reading',
        gradient: 'bg-feature-reading',
        buttonColor: 'bg-feature-reading'
    },
    {
        icon: Atom,
        title: 'Sādhanā Suite',
        description: 'Digital tools like a Japa counter and meditation timer to support your daily spiritual practice.',
        link: '/sadhana',
        gradient: 'bg-feature-sadhana',
        buttonColor: 'bg-feature-sadhana'
    },
    {
        icon: Gamepad2,
        title: 'Pasha (Ludo) Game',
        description: 'Challenge our resident AI, Bodhi, to a classic game of Pasha (Ludo) and receive commentary on your moves.',
        link: '/games/ludo',
        gradient: 'bg-feature-games',
        buttonColor: 'bg-feature-games'
    },
    {
        icon: Baby,
        title: 'Vedic Name Finder',
        description: 'Discover auspicious baby names based on Vedic astrology principles like Rashi and Nakshatra Pada.',
        link: '/sadhana/vedic-name-finder',
        gradient: 'bg-feature-names',
        buttonColor: 'bg-feature-names'
    },
    {
        icon: NotebookText,
        title: 'Digital Dainandini',
        description: 'A secure, private digital diary for your daily notes, tasks, and sketches, saved only on your device.',
        link: '/social?tab=dainandini',
        gradient: 'bg-feature-diary',
        buttonColor: 'bg-feature-diary'
    }
];
