
export type Peetham = 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath';

export type Event = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  peetham: Peetham;
  description: string;
  category: string;
};

export const allEvents: Event[] = [
    { id: 1, title: 'Sharada Sharannavaratri Mahotsava', date: '2024-10-03', peetham: 'Sringeri', description: 'The grand nine-night festival dedicated to Goddess Sharadamba. The event features elaborate daily pujas, Vedic chants, classical music and dance performances, and discourses by the Jagadguru.', category: 'Festival' },
    { id: 2, title: 'Chaturmasya Vrata Anushtanam Begins', date: '2024-07-21', peetham: 'Sringeri', description: 'The commencement of the four-month spiritual retreat observed by the Jagadguru, a period of intensive study, prayer, and discourse for the benefit of all devotees.', category: 'Observance' },
    { id: 3, title: 'Janmashtami Mahotsav', date: '2024-08-26', peetham: 'Dwaraka', description: 'A grand celebration of Sri Krishna Janmashtami at the holy city of Dwaraka, featuring special pujas, bhajans, and a ceremonial procession.', category: 'Festival' },
    { id: 4, title: 'Adi Shankaracharya Jayanti', date: '2024-05-12', peetham: 'Dwaraka', description: 'Commemorating the birth of the great philosopher and saint Adi Shankaracharya, with special lectures and seminars on the principles of Advaita Vedanta.', category: 'Jayanti' },
    { id: 5, title: 'Ratha Yatra', date: '2024-07-07', peetham: 'Puri', description: 'The world-renowned chariot festival of Lord Jagannath, where the deities are brought out onto the streets in a grand procession for all to see.', category: 'Festival' },
    { id: 6, title: 'Vedanta Sammelan', date: '2024-12-20', peetham: 'Puri', description: 'An annual conference of eminent scholars, saints, and philosophers to discuss and deliberate on the timeless wisdom of Vedanta.', category: 'Sammelan' },
    { id: 7, title: 'Badrinath Temple Opening Ceremony', date: '2024-05-10', peetham: 'Jyotirmath', description: 'The ceremonial opening of the sacred Badrinath shrine after the winter closure, a moment of great joy and devotion for pilgrims.', category: 'Ceremony' },
    { id: 8, title: 'Summer Meditation & Yoga Retreat', date: '2024-06-15', peetham: 'Jyotirmath', description: 'A guided retreat for seekers of all levels, focusing on intensive meditation and yoga practices in the serene Himalayan environment.', category: 'Retreat' },
    { id: 9, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Sringeri', description: 'A day of special pujas and ceremonies to honor the sacred Guru Parampara, with devotees gathering to seek the blessings of the Jagadguru.', category: 'Festival' },
    { id: 10, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Dwaraka', description: 'Devotees from all over the world gather to offer their respects to the Jagadguru and receive his blessings on this auspicious day.', category: 'Festival' },
    { id: 11, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Puri', description: 'A special observance of the sacred day dedicated to the Guru, with discourses and pujas held at the Peetham.', category: 'Festival' },
    { id: 12, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Jyotirmath', description: 'Paying homage to the lineage of spiritual masters, with special events and opportunities for darshan of the Shankaracharya.', category: 'Festival' },
];

export const peethamBadgeColors: Record<Peetham, string> = {
    Sringeri: 'bg-primary/10 text-primary border-primary/20',
    Dwaraka: 'bg-accent/10 text-accent border-accent/20',
    Puri: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
    Jyotirmath: 'bg-muted text-muted-foreground border-border',
};

export const peethamDotColors: Record<Peetham, string> = {
    Sringeri: 'hsl(var(--primary))',
    Dwaraka: 'hsl(var(--accent))',
    Puri: 'hsl(var(--secondary-foreground))',
    Jyotirmath: 'hsl(var(--muted-foreground))',
};
