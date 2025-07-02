
export type Peetham = 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath';

export type Event = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  peetham: Peetham;
  description: string;
  category: string;
  story?: string;
  references?: string[];
};

export const allEvents: Event[] = [
    { 
      id: 1, 
      title: 'Sharada Sharannavaratri Mahotsava', 
      date: '2024-10-03', 
      peetham: 'Sringeri', 
      description: 'The grand nine-night festival dedicated to Goddess Sharadamba, featuring elaborate daily pujas, Vedic chants, cultural events, and discourses by the Jagadguru.', 
      category: 'Festival',
      story: 'Navaratri is one of the most significant festivals celebrated at Sringeri. For nine nights, special pujas are offered to Goddess Sharadamba, the embodiment of divine wisdom. The Jagadguru performs elaborate rituals, and the entire town is immersed in a devotional atmosphere. The festival culminates on Vijayadashami, celebrating the victory of good over evil.',
      references: ['Devi Mahatmyam', 'Markandeya Purana']
    },
    { id: 2, title: 'Chaturmasya Vrata Anushtanam Begins', date: '2024-07-21', peetham: 'Sringeri', description: 'The commencement of the four-month spiritual retreat observed by the Jagadguru, a period of intensive study, prayer, and discourse for the benefit of all devotees.', category: 'Observance' },
    { id: 3, title: 'Janmashtami Mahotsav', date: '2024-08-26', peetham: 'Dwaraka', description: 'A grand celebration of Sri Krishna Janmashtami at the holy city of Dwaraka, featuring special pujas, bhajans, and a ceremonial procession.', category: 'Festival' },
    { id: 4, title: 'Adi Shankaracharya Jayanti', date: '2024-05-12', peetham: 'Dwaraka', description: 'Commemorating the birth of the great philosopher and saint Adi Shankaracharya, with special lectures and seminars on the principles of Advaita Vedanta.', category: 'Jayanti' },
    { 
        id: 5, 
        title: 'Ratha Yatra', 
        date: '2024-07-07', 
        peetham: 'Puri', 
        description: 'The world-renowned chariot festival of Lord Jagannath, where the deities are brought out onto the streets in a grand procession for all to see.', 
        category: 'Festival',
        story: 'The Ratha Yatra commemorates the annual journey of Lord Jagannath, Lord Balabhadra, and Subhadra from their main temple to the Gundicha Temple, believed to be their aunt\'s home. Millions of devotees pull the massive, beautifully decorated chariots, an act considered highly auspicious. The festival symbolizes the journey of the soul from the material world to the spiritual realm.',
        references: ['Skanda Purana', 'Brahma Purana'] 
    },
    { id: 6, title: 'Vedanta Sammelan', date: '2024-12-20', peetham: 'Puri', description: 'An annual conference of eminent scholars, saints, and philosophers to discuss and deliberate on the timeless wisdom of Vedanta.', category: 'Sammelan' },
    { id: 7, title: 'Badrinath Temple Opening Ceremony', date: '2024-05-10', peetham: 'Jyotirmath', description: 'The ceremonial opening of the sacred Badrinath shrine after the winter closure, a moment of great joy and devotion for pilgrims.', category: 'Ceremony' },
    { id: 8, title: 'Summer Meditation & Yoga Retreat', date: '2024-06-15', peetham: 'Jyotirmath', description: 'A guided retreat for seekers of all levels, focusing on intensive meditation and yoga practices in the serene Himalayan environment.', category: 'Retreat' },
    { 
        id: 9, 
        title: 'Guru Purnima', 
        date: '2024-07-21', 
        peetham: 'Sringeri', 
        description: 'A day of special pujas and ceremonies to honor the sacred Guru Parampara, with devotees gathering to seek the blessings of the Jagadguru.', 
        category: 'Festival',
        story: 'Guru Purnima is celebrated on the full moon day (Purnima) in the month of Ashadha. It is a day dedicated to honoring one\'s spiritual teacher or Guru. The day is also known as Vyasa Purnima, as it marks the birth anniversary of Veda Vyasa, the revered sage who compiled the Vedas and authored the Mahabharata. On this day, disciples offer their respects and gratitude to their Gurus for the wisdom they have imparted.',
        references: ['Mahabharata', 'Guru Gita (Skanda Purana)']
    },
    { id: 10, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Dwaraka', description: 'Devotees from all over the world gather to offer their respects to the Jagadguru and receive his blessings on this auspicious day.', category: 'Festival' },
    { id: 11, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Puri', description: 'A special observance of the sacred day dedicated to the Guru, with discourses and pujas held at the Peetham.', category: 'Festival' },
    { id: 12, title: 'Guru Purnima', date: '2024-07-21', peetham: 'Jyotirmath', description: 'Paying homage to the lineage of spiritual masters, with special events and opportunities for darshan of the Shankaracharya.', category: 'Festival' },
    { id: 13, title: 'Maha Shivaratri', date: '2023-02-18', peetham: 'Sringeri', description: 'An all-night vigil and special pujas in honor of Lord Shiva, a major festival at Sringeri.', category: 'Festival' },
    { id: 14, title: 'Puri Beach Festival Address', date: '2022-11-25', peetham: 'Puri', description: 'The Shankaracharya of Puri delivers an address on Dharma at the annual Puri Beach Festival.', category: 'Discourse' },
    { id: 15, title: 'Winter Discourses in Delhi', date: '2023-12-10', peetham: 'Dwaraka', description: 'A series of discourses delivered by the Shankaracharya of Dwaraka to devotees in the national capital.', category: 'Discourse' },
    { id: 16, title: 'Ganga Aarti at Haridwar', date: '2022-09-05', peetham: 'Jyotirmath', description: 'The Shankaracharya of Jyotirmath participates in the evening Ganga Aarti at Har Ki Pauri in Haridwar.', category: 'Ceremony' },
    { id: 17, title: 'Historic Kumbh Mela Address', date: '2013-02-10', peetham: 'Puri', description: 'An address delivered by the Shankaracharya of Puri during the Maha Kumbh Mela in Prayagraj.', category: 'Discourse' },
    { id: 18, title: 'Dwaraka Temple Renovation Seva', date: '2012-06-15', peetham: 'Dwaraka', description: 'Launch of a major seva project for the renovation and upkeep of ancient temples in the Dwaraka region.', category: 'Seva' },
    { id: 19, title: 'Sringeri Pathashala Expansion', date: '2011-08-20', peetham: 'Sringeri', description: 'Inauguration of a new building for the Sringeri Pathashala to accommodate more students of Vedic studies.', category: 'Inauguration' },
    { id: 20, title: 'Himalayan Flood Relief Efforts', date: '2013-06-25', peetham: 'Jyotirmath', description: 'Jyotirmath Peetham organizes relief efforts for those affected by the devastating floods in Uttarakhand.', category: 'Seva' },
    { id: 21, title: 'Ratha Yatra 2010', date: '2010-07-13', peetham: 'Puri', description: 'The world-renowned chariot festival of Lord Jagannath, as it was celebrated in 2010.', category: 'Festival' },
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
