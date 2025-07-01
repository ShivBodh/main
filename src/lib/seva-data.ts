
export type Peetham = 'Sringeri' | 'Dwaraka' | 'Puri' | 'Jyotirmath';

export type SevaOpportunity = {
  id: number;
  title: string;
  peetham: Peetham;
  description: string;
  skills: string[];
  locationType: 'On-site' | 'Remote';
  cityRegion: string;
  applicationLink: string;
  contactEmail: string;
};

export const allSevaOpportunities: SevaOpportunity[] = [
    { 
        id: 1, 
        title: 'Annadana Seva for Pilgrims', 
        peetham: 'Sringeri', 
        description: `Assist in the preparation and distribution of blessed food (prasadam) to the thousands of pilgrims who visit the Peetham daily. This is a vital service that nourishes both body and soul.`,
        skills: ['Teamwork', 'Service Attitude', 'Physical Stamina'],
        locationType: 'On-site',
        cityRegion: 'Sringeri, Karnataka',
        applicationLink: '#',
        contactEmail: 'seva@sringeri.net'
    },
    { 
        id: 2, 
        title: 'Translate Ancient Manuscripts to English', 
        peetham: 'Dwaraka', 
        description: `Help translate and digitize rare Sanskrit and Gujarati manuscripts for preservation and global access. A profound opportunity for those with language skills to contribute to the dissemination of knowledge.`,
        skills: ['Sanskrit', 'English', 'Gujarati', 'Translation', 'Manuscript Handling'],
        locationType: 'Remote',
        cityRegion: 'Global',
        applicationLink: '#',
        contactEmail: 'seva@dwarakapeetham.org'
    },
    { 
        id: 3, 
        title: 'Goshala Care and Maintenance', 
        peetham: 'Puri', 
        description: `Participate in the sacred duty of caring for the cows at the Peetham's Goshala. Responsibilities include feeding, cleaning, and general maintenance of the Goshala premises.`,
        skills: ['Animal Care', 'Manual Labor', 'Devotion'],
        locationType: 'On-site',
        cityRegion: 'Puri, Odisha',
        applicationLink: '#',
        contactEmail: 'seva@govardhanpeeth.org'
    },
    { 
        id: 4, 
        title: 'Website & Social Media Content Creation', 
        peetham: 'Jyotirmath', 
        description: `Assist in creating engaging and informative content for the Peetham's digital platforms. Help spread the teachings of the Himalayas to a global audience.`,
        skills: ['Content Writing', 'Social Media', 'Video Editing', 'Graphic Design'],
        locationType: 'Remote',
        cityRegion: 'Global',
        applicationLink: '#',
        contactEmail: 'seva@jyotirmath.org'
    },
    { 
        id: 5, 
        title: 'Event Management Support for Festivals', 
        peetham: 'Sringeri', 
        description: `Provide logistical and organizational support during major festivals like Sharannavaratri. Help with crowd management, volunteer coordination, and ensuring a smooth experience for all devotees.`,
        skills: ['Event Management', 'Communication', 'Problem-Solving'],
        locationType: 'On-site',
        cityRegion: 'Sringeri, Karnataka',
        applicationLink: '#',
        contactEmail: 'seva@sringeri.net'
    },
    { 
        id: 6, 
        title: 'Audio Transcription of Discourses', 
        peetham: 'Puri', 
        description: `Transcribe the audio recordings of the Shankaracharya's discourses into text for publication in books and on the website. A great opportunity for those who are good listeners and typists.`,
        skills: ['Transcription', 'Oriya', 'English', 'Attention to Detail'],
        locationType: 'Remote',
        cityRegion: 'Global',
        applicationLink: '#',
        contactEmail: 'seva@govardhanpeeth.org'
    }
];
