
export type Peetham = 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath';

export type SevaOpportunity = {
  id: number;
  title: string;
  description: string;
  locationType: 'On-site' | 'Remote';
  peetham: Peetham;
  cityRegion: string;
  skills: string[];
  contactEmail: string;
  applicationLink: string;
};

export const allSevaOpportunities: SevaOpportunity[] = [
    {
        id: 1,
        title: 'Website Content Translation (Sanskrit to English)',
        description: 'Assist in translating important discourses and texts from Sanskrit to English for the main Peetham website. A strong command of both languages is essential. This is a vital service to make timeless wisdom accessible to a global audience.',
        locationType: 'Remote',
        peetham: 'Sringeri',
        cityRegion: 'Global',
        skills: ['Translation', 'Sanskrit', 'English', 'Content Management'],
        contactEmail: 'seva.sringeri@example.com',
        applicationLink: '#',
    },
    {
        id: 2,
        title: 'Navaratri Festival On-site Volunteer',
        description: 'Support the organization and smooth running of the annual Sharada Sharannavaratri festival. Responsibilities include crowd management, prasadam distribution, and assisting pilgrims. A fulfilling opportunity to serve during a most auspicious time.',
        locationType: 'On-site',
        peetham: 'Sringeri',
        cityRegion: 'Sringeri, Karnataka',
        skills: ['Event Management', 'Public Speaking', 'Logistics'],
        contactEmail: 'events.sringeri@example.com',
        applicationLink: '#',
    },
    {
        id: 3,
        title: 'Digital Archive Metadata Tagging',
        description: 'Help categorize and tag thousands of hours of audio and video discourses from the Dwaraka Peetham archives. This remote role is crucial for making the teachings searchable and accessible to future generations of seekers.',
        locationType: 'Remote',
        peetham: 'Dwaraka',
        cityRegion: 'Global',
        skills: ['Archiving', 'Data Entry', 'Vedanta'],
        contactEmail: 'archives.dwaraka@example.com',
        applicationLink: '#',
    },
    {
        id: 4,
        title: 'Social Media Content Creator',
        description: 'Create engaging and reverent social media content for the Govardhana Peetham in Puri. Help share the teachings of the Jagadguru and important event updates on platforms like YouTube, Facebook, and Instagram. Requires graphic design and video editing skills.',
        locationType: 'Remote',
        peetham: 'Puri',
        cityRegion: 'Global',
        skills: ['Social Media', 'Graphic Design', 'Video Editing'],
        contactEmail: 'media.puri@example.com',
        applicationLink: '#',
    },
    {
        id: 5,
        title: 'Ashram Maintenance & Gardening Seva',
        description: 'Participate in the daily upkeep and beautification of the Jyotirmath Ashram grounds in the Himalayas. This is a physically demanding but spiritually rewarding on-site seva for those who love nature and wish to serve in a sacred environment.',
        locationType: 'On-site',
        peetham: 'Jyotirmath',
        cityRegion: 'Jyotirmath, Uttarakhand',
        skills: ['Gardening', 'Maintenance', 'Landscaping'],
        contactEmail: 'ashram.jyotirmath@example.com',
        applicationLink: '#',
    },
    {
        id: 6,
        title: 'Ratha Yatra Seva Coordination',
        description: 'Join the team coordinating volunteer activities for the world-famous Ratha Yatra in Puri. This high-energy role involves logistics, communication, and ensuring a safe and spiritual experience for all participants.',
        locationType: 'On-site',
        peetham: 'Puri',
        cityRegion: 'Puri, Odisha',
        skills: ['Event Coordination', 'Logistics', 'Communication'],
        contactEmail: 'rathyatra.puri@example.com',
        applicationLink: '#',
    },
];
